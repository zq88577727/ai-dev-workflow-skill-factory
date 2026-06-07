#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const validator = path.join(repoRoot, "skills/ai-dev-workflow-factory/scripts/validate-ai-dev-workflow.mjs");

const cases = [
  {
    name: "demo workflow passes strict validation",
    root: "examples/demo-project-workflow",
    expectOk: true
  },
  {
    name: "missing confirmation fails strict validation",
    root: "examples/failure-cases/missing-confirmation",
    expectOk: false,
    expectedIssue: "Strict validation requires requirement confirmation"
  },
  {
    name: "failed review fails strict validation",
    root: "examples/failure-cases/failed-review",
    expectOk: false,
    expectedIssue: "Strict validation requires logicReview pass"
  },
  {
    name: "missing test or risk evidence fails strict validation",
    root: "examples/failure-cases/missing-test-evidence",
    expectOk: false,
    expectedIssue: "Strict validation requires review evidence or documented residual risk"
  }
];

let failures = 0;

for (const testCase of cases) {
  const result = spawnSync(process.execPath, [
    validator,
    "--root",
    path.join(repoRoot, testCase.root),
    "--require-review",
    "--require-run",
    "--strict"
  ], {
    encoding: "utf8"
  });

  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = null;
  }

  const statusMatches = testCase.expectOk ? result.status === 0 : result.status !== 0;
  const issueMatches = !testCase.expectedIssue || parsed?.issues?.includes(testCase.expectedIssue);
  const passed = statusMatches && issueMatches;
  const icon = passed ? "PASS" : "FAIL";
  console.log(`${icon} ${testCase.name}`);

  if (!passed) {
    failures += 1;
    console.log(result.stdout);
    console.error(result.stderr);
  }
}

process.exit(failures === 0 ? 0 : 1);
