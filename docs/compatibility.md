# Compatibility

## Runtime

- Node.js 20 is the CI baseline.
- The scripts use only Node.js built-in modules and do not require package
  installation.
- The workflow artifacts are plain Markdown and JSON.

## Workflow Contract

- `workflow-run.schema.json` is the canonical shape for `workflow-run.json`.
- The validator checks the schema before applying stricter workflow semantics.
- Breaking schema changes should be released with a version bump and migration
  note.

## Tool Support

| Tool | Support Level | Notes |
| --- | --- | --- |
| Codex | Primary | Native skill folder maps directly to this repository layout. |
| Claude Code | Compatible | Use `SKILL.md` and `references/` as project instructions. |
| Cursor | Compatible | Use the workflow documents as rules and pinned context. |

The project intentionally avoids production API calls, automatic commits,
pushes or deployments so the same contract can be used across local AI coding
environments.
