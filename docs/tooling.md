# Tooling Guide

This project is tool-agnostic: the skill defines the workflow contract, while
the AI coding tool supplies the model, filesystem access and command runner.

## Codex

1. Copy `skills/ai-dev-workflow-factory/` into your Codex skills directory or keep
   it inside the target repository as project documentation.
2. Ask Codex to use `ai-dev-workflow-factory` for the project or task.
3. Let the workflow create the required artifacts and pause at requirement and
   technical-design confirmation gates.
4. Run validation before marking the workflow complete:

```bash
npm run validate
```

## Claude Code

1. Keep this repository or the copied `skills/ai-dev-workflow-factory/` folder
   available in the project workspace.
2. Paste or reference `SKILL.md` as the controlling workflow instruction.
3. Require the assistant to write the standard artifacts before implementation.
4. Run the validator with Node.js after each full workflow run.

## Cursor

1. Add the workflow folder to the project or to a shared team docs repository.
2. Reference `SKILL.md`, `references/` and the generated workflow artifacts in
   Cursor rules or chat context.
3. Use `PROJECT_RULES.md`, `REQUIREMENT.md` and `TECH_DESIGN.md` as pinned
   context before applying code changes.
4. Run `npm test` in this repository to verify the factory examples, and run the
   validator against each generated workflow workspace.
