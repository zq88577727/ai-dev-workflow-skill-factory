# ARCHITECTURE

## Summary

Demo Issue Tracker is a full-stack app with a React frontend and Node API.

## Directory Map

```text
.
├── apps/web
├── apps/api
└── packages/shared
```

## Core Modules

| Module | Responsibility | Key Files |
| --- | --- | --- |
| Web | Issue list and editor UI | `apps/web/src` |
| API | Issue CRUD endpoints | `apps/api/src` |
| Shared | Types and validation | `packages/shared/src` |

## Commands

```bash
npm test
npm run typecheck
npm run build
```

## Do Not Guess

- Database migration format.
- Production API credentials.

