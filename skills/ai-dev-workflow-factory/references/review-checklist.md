# Review Checklist

## Review 1: Logic

- 是否符合 `REQUIREMENT.md`。
- 是否符合 `TECH_DESIGN.md`。
- 是否遗漏边界条件。
- 是否违反 `PROJECT_RULES.md`。
- 是否引入不必要复杂度。
- 是否有过度设计或未来功能预留。

## Review 2: Syntax / Build / Test

- 是否能编译或启动。
- lint/typecheck/test 是否通过。
- 失败测试是否解释清楚。
- 是否有运行时低级错误。
- 是否有未覆盖的高风险路径。
- 是否更新必要文档。

## 通过条件

两轮 Review 都为 pass，或明确列出 fail 项并完成修正。不得用“看起来没问题”替代可检查证据。

