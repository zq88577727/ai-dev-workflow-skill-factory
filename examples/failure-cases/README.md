# Failure Cases

These fixtures intentionally fail strict validation. They protect the workflow
contract from becoming a file-existence check only.

Run all validator regression tests from the repository root:

```bash
npm test
```

Each fixture keeps the required files present, then violates one workflow rule:

- `missing-confirmation`: requirement confirmation is false.
- `failed-review`: logic review is fail.
- `missing-test-evidence`: review and tests are not run without documented evidence or residual risk.
