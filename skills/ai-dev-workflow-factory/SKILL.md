---
name: ai-dev-workflow-factory
description: Use when a user wants to turn a software project, rough product idea, legacy codebase, team convention, debugging habit, or AI coding process into a reusable project-level development workflow skill
---

# AI Dev Workflow Factory

这个 skill 是 AI 自动化开发的 **Workflow Orchestrator**。它不是单点“写代码”skill，而是把项目摸底、规则显性化、需求扩写、技术方案、harness 代码生成、Bug 修复、双 Review、测试和持续迭代串成可复用流水线。

执行时不要只给建议。只要进入完整工作流，就必须真实生成可检查文件、等待关键人工确认、运行验收脚本，并在失败时回到对应状态修正。

开始完整任务时，先读取：

- `references/workflow-contract.md`
- `references/architecture-policy.md`
- `references/rules-policy.md`
- `references/harness-policy.md`
- `references/review-checklist.md`
- `references/failure-playbook.md`

可复制模板：

- `templates/project-brief.md`
- `templates/architecture.md`
- `templates/project-rules.md`
- `templates/requirement.md`
- `templates/technical-design.md`
- `templates/implementation-plan.md`
- `templates/review-report.md`
- `templates/workflow-run.json`
- `templates/generated-workflow-skill.md`

校验契约：

- `workflow-run.schema.json`
- `scripts/validate-ai-dev-workflow.mjs`
- `scripts/test-validator.mjs`

## 核心原则

- 先读项目，再写代码；不要让 AI 凭空猜架构。
- 先收窄范围，再读取必要上下文；不要默认全仓库深扫。
- 需求文档和技术文档必须人工确认。前期把关松了，后面跑得越快错得越远。
- 把隐性规矩显性化：命名、错误处理、测试、提交、模块边界、禁止修改区。
- 代码生成必须基于确认后的技术文档和 implementation plan。
- Bug 修复必须先提出假设和验证步骤，再做最小 patch。
- 双 Review 是强制闸门：逻辑 Review 和语法/编译/测试 Review 分开。
- 工作流不是一次成型；每次翻车都要反向补规则、模板或检查项。
- 不自动提交、不推送、不部署、不调用生产环境 API。

## Workflow 状态机

按状态推进，不要跳步。每个状态都要留下可检查产物。

| 状态 | 必做动作 | 通过条件 |
| --- | --- | --- |
| S0 定义项目与交付 | 生成 `project-brief.md`，明确项目类型、目标、停止点和风险边界 | brief 明确本次工作流的输入、输出、人工确认点 |
| S1 项目摸底 | 读取入口、README、配置和关键模块，生成 `ARCHITECTURE.md` | 架构、模块边界、关键流程、运行命令清楚 |
| S2 规矩显性化 | 生成 `PROJECT_RULES.md` | 编码规范、测试规范、提交规范、禁止事项清楚 |
| S3 需求扩写 | 把粗需求转成 `REQUIREMENT.md` | 场景、边界、异常、数据流、影响范围清楚，并人工确认 |
| S4 技术方案 | 把需求转成 `TECH_DESIGN.md` | 模块、接口、数据结构、兼容风险、测试策略清楚，并人工确认 |
| S5 Harness 计划 | 生成 `IMPLEMENTATION_PLAN.md`，拆成小任务 | 每个任务单一目标、输入文件、输出文件、验收方式清楚 |
| S6 受控实现 | 按 plan 执行代码生成或改动建议 | 不越界改无关代码，变更能映射回技术方案 |
| S7 Bug 解决 | 遇阻时生成假设、验证步骤和最小修复 | 修复原因、影响范围、回归检查清楚 |
| S8 双 Review | 生成 `REVIEW_REPORT.md` | 逻辑 Review 和语法/编译/测试 Review 均 pass |
| S9 测试与版本控制 | 运行或给出项目适配测试；生成提交说明建议 | 测试结果、未测风险、Git/SVN 建议清楚 |
| S10 迭代复盘 | 更新 `workflow-run.json`，记录翻车点和规则补丁 | 本轮经验能反向改进下次工作流 |
| S11 生成项目专属 skill | 把本轮产物整理成 `generated-workflow-skill.md` | 新 skill 能独立描述触发条件、状态机、产物、验收和失败复盘 |

如果某个状态因为缺少上下文、命令失败、凭证不足或用户未确认而不能完成，不要假装完成。报告阻塞原因、已完成产物和下一步最小动作。

## 入口分流

先判断输入类型，只读取必要资料。

| 输入 | 优先路径 |
| --- | --- |
| 老项目目录 | 先读 README、配置、入口、路由、核心服务，再生成架构文档 |
| 新产品想法 | 先生成 project brief，再进入需求扩写 |
| 粗需求 / 任务标题 | 先进入需求扩写，不直接写代码 |
| 已确认需求 | 进入技术方案，但仍检查边界和验收标准 |
| 报错日志 | 进入 Bug 解决流程，要求复现步骤和期望行为 |
| 团队规则 | 进入规矩显性化，生成 PROJECT_RULES.md |
| 希望生成自己的 workflow skill | 先跑本状态机，再把产物整理成项目专属 SKILL.md |

## 标准流程

### 1. 定义项目与交付

确认或合理推断：

- 项目类型：前端、后端、全栈、CLI、库、游戏、数据工程、老 C++ 项目等。
- 当前目标：生成工作流、实现功能、修复 Bug、重构、补测试、规范化 AI 协作。
- 停止点：只生成文档、生成实现计划、执行代码改动、等待用户确认后再提交。
- 风险边界：数据库、生产 API、批量改动、权限、凭证、删除操作。

完整 workflow 必须生成 `project-brief.md`。

### 2. 项目摸底

新项目可以从 README 和目录结构开始。老项目必须先让 AI 读代码，而不是直接写代码。

最低读取顺序：

1. README、package/build 配置、启动脚本。
2. 入口文件、路由、服务注册、核心模块。
3. 测试目录、CI 配置、lint/format 配置。
4. 近期相关模块和用户点名文件。

输出 `ARCHITECTURE.md`，至少包含：

- 项目用途。
- 目录结构。
- 核心模块职责。
- 关键数据流或调用链。
- 运行和测试命令。
- 高风险区域和禁止猜测区域。

### 3. 规矩显性化

生成 `PROJECT_RULES.md`，把隐性习惯写清楚：

- 编码规范：命名、错误处理、注释语言、日志风格。
- 模块边界：哪些层能调用哪些层。
- 代码生成协议：模板、目录、禁止修改文件。
- 数据库规则：迁移流程、命名、兼容要求。
- 测试规则：单测、集成测试、端到端测试、覆盖重点。
- 提交规则：Git/SVN 粒度、提交信息格式、PR 要求。

遇到一次偏差，就补一条规则。不要为了未来不确定场景提前写复杂规则。

### 4. 需求扩写

输入是用户原始需求。输出 `REQUIREMENT.md`。

必须补全：

- 使用场景。
- 用户角色。
- 正常流程。
- 边界条件。
- 异常处理。
- 数据流向。
- 影响范围。
- 非目标。
- 验收标准。

这一关必须人工确认。用户未确认前，不进入技术方案和代码生成。

### 5. 技术方案

输入是确认后的 `REQUIREMENT.md`、`ARCHITECTURE.md` 和 `PROJECT_RULES.md`。输出 `TECH_DESIGN.md`。

必须说明：

- 涉及模块。
- 文件级改动计划。
- 接口和数据结构。
- 调用链路。
- 兼容性风险。
- 测试策略。
- 回滚或降级方式。

这一关也必须人工确认。用户未确认前，不进入代码生成。

### 6. Harness 代码生成

输入是确认后的 `TECH_DESIGN.md`。输出 `IMPLEMENTATION_PLAN.md`。

拆任务原则：

- 一个任务一个目标。
- 每个任务列出输入文件、输出文件、验收方式。
- 先测试或保护现有行为，再改实现。
- 多 Agent 协作时，每个 Agent 必须先读架构文档、规则文档和技术方案。
- 每完成一个任务，更新相关文档和 `workflow-run.json`。

代码实现只做计划中明确的改动。发现计划外问题，先停下更新计划或请求确认。

### 7. Bug 解决

不要直接乱改。先收集：

- 完整报错日志。
- 复现步骤。
- 期望行为。
- 最近改动。
- 相关测试结果。

处理流程：

1. 列出嫌疑文件和函数。
2. 给出 1-3 个假设。
3. 用日志、测试或最小实验验证假设。
4. 假设成立后再做最小修复。
5. 评估影响范围。
6. 写回归检查清单。

输出修复 patch、原因和回归检查。不要批量改无关代码。

### 8. 双 Review

完整 workflow 必须生成 `REVIEW_REPORT.md`。

Review 1：逻辑 Review。

- 是否符合需求文档。
- 是否符合技术方案。
- 是否漏边界条件。
- 是否违反模块边界。

Review 2：语法 / 编译 / 测试 Review。

- 是否能编译或启动。
- lint/typecheck/test 是否通过。
- 是否有低级运行时错误。
- 是否有未测风险。

Review fail 时不得交付为完成。修正后更新 review。

### 9. 测试与版本控制

让 AI 根据项目推荐测试方案，不追求一次 100% 覆盖。

优先补：

- 本次改动核心路径。
- 高风险分支。
- 曾经出错的路径。
- 用户可见行为。

版本控制只生成建议，不自动提交：

- Git：提交信息、拆分建议、PR 摘要。
- SVN：changelog、提交粒度、影响范围。

### 10. 持续迭代

每次失败复盘：

- 是需求漏字段？
- 是技术方案没约束？
- 是架构文档过时？
- 是规则不够细？
- 是 Review 漏项？
- 是测试缺失？

然后补到对应文件：

- 规则不够细：补 `PROJECT_RULES.md`。
- 架构过时：补 `ARCHITECTURE.md`。
- 需求漏字段：补需求模板。
- Review 总漏同类问题：补检查清单。
- 测试缺失：补测试策略。

### 11. 生成项目专属 Skill

当用户目标是“建立我这样的类似工作流”时，最终必须输出 `generated-workflow-skill.md`，而不是只停在项目文档。

生成规则：

- description 只写触发条件，不摘要流程。
- skill body 必须包含核心原则、状态机、入口分流、强制产物、验收命令、失败复盘。
- 状态机来自本项目的真实产物，不凭空编。
- 保留人工确认闸门。
- 保留禁止自动提交、推送、部署的边界。
- 如果要进一步安装到本机 skill 目录，必须另行获得用户确认。

## Workflow 验收

生成工作流后运行：

```bash
node "skills/ai-dev-workflow-factory/scripts/validate-ai-dev-workflow.mjs" \
  --root "/absolute/path/to/generated-workflow" \
  --require-review \
  --require-run \
  --strict
```

如果只做文档草案，可不加强制参数，但最终回复必须说明未完成项。

验收失败时，不要交付为完成；回到失败项对应状态修正。

## 常用检查清单

- 是否先读项目再写代码。
- 是否生成 `project-brief.md`。
- 是否生成 `ARCHITECTURE.md` 和 `PROJECT_RULES.md`。
- 是否有人工确认需求和技术方案的记录。
- 是否禁止自动提交、推送和部署。
- 是否有双 Review。
- 是否有测试结果或未测风险。
- 是否有 `workflow-run.json` 记录状态。
- 如果用户要生成 workflow skill，是否有 `generated-workflow-skill.md`。
- 是否把失败经验写回规则或模板。

## 失败复盘规则

如果用户指出“没有按 workflow 执行”，先复盘漏掉的状态，不要辩解。常见漏项：

- 直接写代码，没有先生成需求和技术方案。
- 架构文档只扫目录，没有读关键代码。
- 技术方案没有人工确认就进入实现。
- Bug 修复靠猜，没有假设验证。
- Review 只有一轮，或者自己写自己审。
- 测试没跑，却说完成。
- 验收脚本失败还交付为完成。

修正时从漏掉的状态继续执行，并更新规则或模板。
