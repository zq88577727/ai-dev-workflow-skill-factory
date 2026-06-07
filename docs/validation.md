# Validation

The validator has two levels:

- Default mode checks required artifacts, non-empty files and basic JSON shape.
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

Strict validation is intentionally conservative. If build or tests were not run,
`REVIEW_REPORT.md` must explain the residual risk instead of marking the workflow
as silently complete.
