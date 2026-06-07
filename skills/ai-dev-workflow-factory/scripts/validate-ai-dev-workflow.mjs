#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const VALID_STATES = new Set(["S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11"]);
const VALID_STATUSES = new Set(["draft", "in-progress", "blocked", "complete", "example"]);
const VALID_CHECKS = new Set(["pass", "fail", "not-run"]);
const REQUIRED_ARTIFACTS = {
  projectBrief: "project-brief.md",
  architecture: "ARCHITECTURE.md",
  projectRules: "PROJECT_RULES.md",
  requirement: "REQUIREMENT.md",
  technicalDesign: "TECH_DESIGN.md",
  implementationPlan: "IMPLEMENTATION_PLAN.md",
  reviewReport: "REVIEW_REPORT.md"
};

function readArg(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function hasFlag(name) {
  return args.includes(name);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function fileExistsAndNonEmpty(root, relativePath, issues, label = relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    issues.push(`Missing required file: ${label}`);
    return false;
  }

  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) {
    issues.push(`Required path is not a file: ${label}`);
    return false;
  }

  if (stat.size === 0) {
    issues.push(`File is empty: ${label}`);
    return false;
  }

  return true;
}

function readJson(filePath, issues, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    issues.push(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function validateWorkflowRunShape(run, issues) {
  if (!isObject(run)) {
    issues.push("workflow-run.json must be an object");
    return;
  }

  if (typeof run.workflow !== "string" || run.workflow.trim() === "") {
    issues.push("workflow-run.json workflow must be a non-empty string");
  }

  if (!VALID_STATUSES.has(run.status)) {
    issues.push(`workflow-run.json status must be one of: ${Array.from(VALID_STATUSES).join(", ")}`);
  }

  if (!VALID_STATES.has(run.currentState)) {
    issues.push(`workflow-run.json currentState must be one of: ${Array.from(VALID_STATES).join(", ")}`);
  }

  if (!isObject(run.artifacts)) {
    issues.push("workflow-run.json artifacts must be an object");
  }

  if (!isObject(run.confirmations)) {
    issues.push("workflow-run.json confirmations must be an object");
  } else {
    if (typeof run.confirmations.requirement !== "boolean") {
      issues.push("workflow-run.json confirmations.requirement must be boolean");
    }
    if (typeof run.confirmations.technicalDesign !== "boolean") {
      issues.push("workflow-run.json confirmations.technicalDesign must be boolean");
    }
    if (!Array.isArray(run.confirmations.highRiskOperations)) {
      issues.push("workflow-run.json confirmations.highRiskOperations must be an array");
    }
  }

  if (!isObject(run.checks)) {
    issues.push("workflow-run.json checks must be an object");
  } else {
    for (const key of ["logicReview", "buildReview", "tests"]) {
      if (!VALID_CHECKS.has(run.checks[key])) {
        issues.push(`workflow-run.json checks.${key} must be pass, fail, or not-run`);
      }
    }
  }

  if (!Array.isArray(run.lessons)) {
    issues.push("workflow-run.json lessons must be an array");
  }
}

function validateArtifactPaths(root, run, issues, requiredFiles) {
  if (!isObject(run?.artifacts)) return;

  for (const [artifactKey, expectedPath] of Object.entries(REQUIRED_ARTIFACTS)) {
    const artifactPath = run.artifacts[artifactKey];
    if (requiredFiles.includes(expectedPath)) {
      if (artifactPath !== expectedPath) {
        issues.push(`workflow-run.json artifacts.${artifactKey} must be "${expectedPath}"`);
        continue;
      }
      fileExistsAndNonEmpty(root, artifactPath, issues, `artifact ${artifactKey}: ${artifactPath}`);
    }
  }

  if (typeof run.artifacts.generatedWorkflowSkill === "string" && run.artifacts.generatedWorkflowSkill.trim() !== "") {
    fileExistsAndNonEmpty(root, run.artifacts.generatedWorkflowSkill, issues, `artifact generatedWorkflowSkill: ${run.artifacts.generatedWorkflowSkill}`);
  }
}

function validateStrictCompletion(run, issues) {
  if (!isObject(run)) return;

  if (run.confirmations?.requirement !== true) {
    issues.push("Strict validation requires requirement confirmation");
  }

  if (run.confirmations?.technicalDesign !== true) {
    issues.push("Strict validation requires technical design confirmation");
  }

  if (run.checks?.logicReview !== "pass") {
    issues.push("Strict validation requires logicReview pass");
  }

  if (run.checks?.buildReview === "fail") {
    issues.push("Strict validation cannot pass with buildReview fail");
  }

  if (run.checks?.tests === "fail") {
    issues.push("Strict validation cannot pass with tests fail");
  }

  // A docs-only workflow may leave build and tests not-run, but REVIEW_REPORT.md
  // still has to document evidence or residual risk before strict validation passes.
}

function validateReview(root, issues, strict) {
  const reviewPath = path.join(root, "REVIEW_REPORT.md");
  if (!fs.existsSync(reviewPath)) return;

  const review = fs.readFileSync(reviewPath, "utf8");
  if (!review.includes("Review 1") || !review.includes("Review 2")) {
    issues.push("REVIEW_REPORT.md must include Review 1 and Review 2");
  }

  if (strict) {
    if (!/Final Status[\s\S]*-\s*\[x\]\s*pass/i.test(review)) {
      issues.push("Strict validation requires REVIEW_REPORT.md final pass checkbox");
    }

    const hasNotRunRisk = /Residual Risk[\s\S]*(not run|not-run|未运行|未测)/i.test(review);
    const hasEvidence = /Evidence[\s\S]*```text[\s\S]+```/i.test(review);
    if (!hasNotRunRisk && !hasEvidence) {
      issues.push("Strict validation requires review evidence or documented residual risk");
    }
  }
}

const root = readArg("--root");
const requireReview = hasFlag("--require-review");
const requireRun = hasFlag("--require-run");
const strict = hasFlag("--strict");

if (!root) {
  console.error("Usage: node validate-ai-dev-workflow.mjs --root <workflow-dir> [--require-review] [--require-run] [--strict]");
  process.exit(2);
}

const requiredFiles = [
  "project-brief.md",
  "ARCHITECTURE.md",
  "PROJECT_RULES.md",
  "REQUIREMENT.md",
  "TECH_DESIGN.md",
  "IMPLEMENTATION_PLAN.md"
];

if (requireReview) requiredFiles.push("REVIEW_REPORT.md");
if (requireRun) requiredFiles.push("workflow-run.json");

const issues = [];

for (const file of requiredFiles) {
  fileExistsAndNonEmpty(root, file, issues);
}

let run = null;
const workflowRunPath = path.join(root, "workflow-run.json");
if (fs.existsSync(workflowRunPath)) {
  run = readJson(workflowRunPath, issues, "workflow-run.json");
  validateWorkflowRunShape(run, issues);
  validateArtifactPaths(root, run, issues, requiredFiles);
  if (strict) validateStrictCompletion(run, issues);
}

validateReview(root, issues, strict);

const result = {
  ok: issues.length === 0,
  root,
  strict,
  checkedFiles: requiredFiles,
  issues
};

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
