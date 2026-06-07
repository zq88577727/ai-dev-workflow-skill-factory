# Harness Policy

## 核心定义

Harness 是受控执行流水线：AI 不能自由发挥，而是按确认后的需求、技术方案和任务清单逐步执行。

## 任务拆分

每个任务必须包含：

- 目标。
- 输入文件。
- 输出文件。
- 允许修改范围。
- 验收方式。
- 回滚或失败处理。

## 多 Agent 协作

如果使用多 Agent：

- 每个 Agent 必须先读 `ARCHITECTURE.md`、`PROJECT_RULES.md`、`TECH_DESIGN.md`。
- 每个 Agent 只负责一个清晰目标。
- Review Agent 与实现 Agent 分离。
- 任务完成后更新 `workflow-run.json`。

## 越界处理

发现计划外改动、需求不清、测试无法运行或风险扩大时，暂停实现，回到技术方案或需求阶段。

