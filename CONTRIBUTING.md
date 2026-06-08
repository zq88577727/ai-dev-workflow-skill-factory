# Contributing

Thank you for improving AI Dev Workflow Skill Factory.

## Principles

- Keep the workflow readable before making it clever.
- Add validation when adding a new required behavior.
- Add an expected-failure fixture for rules that should block bad workflows.
- Do not add production-side effects such as automatic commits, pushes,
  deployments or production API calls.

## Local Checks

Run the full validator suite before opening a pull request:

```bash
npm test
```

For documentation-only changes, still run the suite so examples and validation
fixtures stay aligned.

## Pull Requests

Describe:

- the workflow problem being solved;
- which artifacts, references or scripts changed;
- whether the schema changed;
- what validation evidence was collected.
