# PROJECT RULES

## Coding Style

- Use TypeScript.
- Keep comments in English.
- Prefer small functions and explicit validation.

## Module Boundaries

- Web imports shared types only.
- API owns persistence.
- Shared package cannot import app code.

## Testing Rules

- Changed API behavior requires unit tests.
- Changed UI behavior requires component tests or browser smoke checks.

## Version Control Rules

- Do not commit automatically.
- Suggest commit messages only.

