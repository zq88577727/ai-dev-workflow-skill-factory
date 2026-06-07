---
name: demo-issue-tracker-workflow
description: Use when working on Demo Issue Tracker features, bug fixes, tests, or AI-assisted implementation tasks that need project context and confirmation gates
---

# Demo Issue Tracker Workflow

这个示例 skill 把 Demo Issue Tracker 的开发任务收束到文档、确认、计划、实现、双 Review 和测试记录里。

## Required Context

- `ARCHITECTURE.md`
- `PROJECT_RULES.md`
- `REQUIREMENT.md`
- `TECH_DESIGN.md`
- `workflow-run.json`

## State Machine

| State | Action | Pass Condition |
| --- | --- | --- |
| S0 | Confirm delivery stop point | Scope is clear |
| S1 | Read app architecture | Key modules are known |
| S2 | Apply project rules | Boundaries are clear |
| S3 | Expand issue requirement | User confirms requirement |
| S4 | Write technical design | User confirms design |
| S5 | Split implementation tasks | Each task is verifiable |
| S6 | Execute planned changes | No unrelated edits |
| S7 | Debug with hypotheses | Fix has regression check |
| S8 | Double review | Logic and build review pass |
| S9 | Test and record risk | Results are documented |
| S10 | Update workflow run | Lessons are saved |

## Validation

```bash
node "skills/ai-dev-workflow-factory/scripts/validate-ai-dev-workflow.mjs" \
  --root "examples/demo-project-workflow" \
  --require-review \
  --require-run \
  --strict
```
