#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");
const templateRoot = path.join(skillRoot, "templates");

const TEMPLATE_FILES = [
  ["project-brief.md", "project-brief.md"],
  ["architecture.md", "ARCHITECTURE.md"],
  ["project-rules.md", "PROJECT_RULES.md"],
  ["requirement.md", "REQUIREMENT.md"],
  ["technical-design.md", "TECH_DESIGN.md"],
  ["implementation-plan.md", "IMPLEMENTATION_PLAN.md"],
  ["review-report.md", "REVIEW_REPORT.md"],
  ["workflow-run.json", "workflow-run.json"],
  ["generated-workflow-skill.md", "generated-workflow-skill.md"]
];

function readArg(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function hasFlag(name) {
  return args.includes(name);
}

const target = readArg("--target");
const force = hasFlag("--force");

if (!target) {
  console.error("Usage: node init-workflow.mjs --target <workflow-dir> [--force]");
  process.exit(2);
}

const targetRoot = path.resolve(process.cwd(), target);
fs.mkdirSync(targetRoot, { recursive: true });

const copied = [];
const skipped = [];

for (const [templateName, outputName] of TEMPLATE_FILES) {
  const source = path.join(templateRoot, templateName);
  const destination = path.join(targetRoot, outputName);

  if (fs.existsSync(destination) && !force) {
    skipped.push(outputName);
    continue;
  }

  fs.copyFileSync(source, destination);
  copied.push(outputName);
}

console.log(JSON.stringify({
  ok: true,
  target: targetRoot,
  copied,
  skipped,
  next: "Fill the artifacts, record confirmations, then run npm run validate -- --root <workflow-dir>."
}, null, 2));
