# Workflow Contract

## 目标

把项目级 AI 开发从自由问答变成受控流水线。每个阶段必须有输入、输出、通过条件和失败处理。

## 强制产物

完整运行至少生成：

- `project-brief.md`
- `ARCHITECTURE.md`
- `PROJECT_RULES.md`
- `REQUIREMENT.md`
- `TECH_DESIGN.md`
- `IMPLEMENTATION_PLAN.md`
- `REVIEW_REPORT.md`
- `workflow-run.json`

## 人工确认闸门

以下阶段必须人工确认：

- 需求文档确认。
- 技术方案确认。
- 高风险操作确认。
- 最终提交、推送、部署确认。

## 禁止事项

- 未读项目就写代码。
- 未确认需求就写技术方案。
- 未确认技术方案就改代码。
- 自动提交、推送或部署。
- 调用生产 API 或修改数据库结构而不确认。
- 把测试失败、验收失败包装成完成。

## 完成定义

完成必须满足：

- 目标产物存在。
- 人工确认点已记录。
- Review 通过。
- 测试结果或未测风险明确。
- 验收脚本通过，或最终回复明确说明阻塞项。

