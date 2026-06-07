# Method

## One Sentence

Force AI coding work through documents, confirmation gates, harness execution, double review, tests, and retrospective updates.

## Why This Works

AI coding fails most often when it guesses project context, invents missing requirements, or edits before the technical plan is stable. This workflow moves judgment-heavy work to the front:

```text
Read project
→ Write architecture map
→ Write explicit rules
→ Expand requirements
→ Confirm requirements
→ Write technical design
→ Confirm technical design
→ Execute small tasks
→ Review twice
→ Test
→ Feed lessons back
```

## Design Principles

- KISS: keep the workflow readable and inspectable.
- YAGNI: add rules only when the current project needs them.
- DRY: one rule lives in one file and is referenced by the workflow.
- SOLID: keep each artifact responsible for one decision layer.

## What To Customize

- Project-specific architecture template.
- Team coding rules.
- Required confirmation gates.
- Test commands.
- Version control conventions.
- Failure playbook entries.

