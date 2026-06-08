# Validation

The validator has two levels:

- Default mode checks required artifacts, non-empty files and `workflow-run.schema.json`.
- Strict mode also checks confirmation gates, valid workflow states, artifact path consistency, review status, test status and review evidence.

Run the complete suite:

```bash
npm test
```

Run only the complete demo:

```bash
npm run validate
```

Run the validator directly:

```bash
node "skills/ai-dev-workflow-factory/scripts/validate-ai-dev-workflow.mjs" \
  --root "examples/demo-project-workflow" \
  --require-review \
  --require-run \
  --strict
```

Initialize a new workflow workspace from templates:

```bash
npm run init -- --target work/my-project-workflow
```

Use `--force` only when you intentionally want to overwrite existing generated
workflow artifacts in that target directory.

Strict validation is intentionally conservative. If build or tests were not run,
`REVIEW_REPORT.md` must explain the residual risk instead of marking the workflow
as silently complete.
