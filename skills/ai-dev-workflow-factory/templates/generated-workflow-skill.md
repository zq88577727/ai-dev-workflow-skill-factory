---
name: project-specific-workflow
description: Use when [write only the triggering conditions for this project workflow, not the workflow summary]
---

# Project Specific Workflow

这个 skill 是当前项目的 Workflow Orchestrator。它把项目上下文、团队规则、需求确认、技术方案、受控实现、Bug 修复、双 Review、测试和复盘串成可重复执行的开发流水线。

## Required Context

开始完整任务时，先读取：

- `ARCHITECTURE.md`
- `PROJECT_RULES.md`
- `REQUIREMENT.md` 或用户原始需求
- `TECH_DESIGN.md`，如果已经存在
- `workflow-run.json`，如果已经存在

## Core Principles

- 先读项目，再写代码。
- 需求和技术方案必须人工确认。
- 代码生成必须按 implementation plan 执行。
- Bug 修复必须先假设验证，再最小 patch。
- 双 Review 和测试是交付闸门。
- 不自动提交、不推送、不部署。

## Workflow State Machine

| State | Required Action | Pass Condition |
| --- | --- | --- |
| S0 Define Delivery | Generate or update `project-brief.md` | Scope, stop point and risks are clear |
| S1 Read Project | Generate or update `ARCHITECTURE.md` | Architecture and commands are clear |
| S2 Extract Rules | Generate or update `PROJECT_RULES.md` | Style, boundaries and tests are clear |
| S3 Expand Requirement | Generate or update `REQUIREMENT.md` | User confirms requirement |
| S4 Technical Design | Generate or update `TECH_DESIGN.md` | User confirms design |
| S5 Implementation Plan | Generate or update `IMPLEMENTATION_PLAN.md` | Tasks are small and verifiable |
| S6 Execute | Apply planned changes only | Changes map back to design |
| S7 Debug | Use hypothesis and minimal verification | Fix has regression checklist |
| S8 Double Review | Generate `REVIEW_REPORT.md` | Two reviews pass |
| S9 Test | Run or document checks | Results and residual risks are clear |
| S10 Retrospective | Update `workflow-run.json` | Lessons feed back into rules |

## Entry Routing

| Input | Route |
| --- | --- |
| Rough idea | S0 then S3 |
| Existing project | S1 then S2 |
| Confirmed requirement | S4 |
| Confirmed technical design | S5 |
| Error log | S7 |
| Request for code | Check S3/S4 confirmation first |

## Validation

Run the project validation command defined by this workflow. If no custom command exists, use the generic factory validator:

```bash
node "skills/ai-dev-workflow-factory/scripts/validate-ai-dev-workflow.mjs" \
  --root "/absolute/path/to/workflow" \
  --require-review \
  --require-run \
  --strict
```

Validation failure means the workflow is not complete.

## Failure Review

If the workflow fails, identify the missed state first:

- Missing project context: return to S1.
- Missing rules: return to S2.
- Requirement ambiguity: return to S3.
- Design mismatch: return to S4.
- Code changed outside plan: return to S5/S6.
- Bug fixed by guessing: return to S7.
- Review or tests missing: return to S8/S9.

Then update the relevant document so the same failure is less likely next time.
