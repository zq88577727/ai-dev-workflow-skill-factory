# TECHNICAL DESIGN

## Design Summary

Add a shared `IssuePriority` enum, update API validation and persistence mapping, then update the web issue list and editor.

## Modules Involved

| Module | Change | Risk |
| --- | --- | --- |
| Shared | Add priority type | Low |
| API | Validate and persist priority | Medium |
| Web | Render and filter priority | Medium |

## Testing Strategy

- API unit tests for invalid priority.
- UI smoke check for priority filter.

## Human Confirmation

- Confirmed by: example user
- Date: 2026-06-06

