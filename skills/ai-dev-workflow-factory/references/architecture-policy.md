# Architecture Policy

## 读取策略

先读入口和索引，再读关键模块。不要默认全仓库深扫。

优先读取：

- README / docs / architecture notes。
- package、build、CI、lint、test 配置。
- app/server/main/index/router 等入口。
- 用户点名模块。
- 与本次需求直接相关的测试。

## ARCHITECTURE.md 必含内容

- 项目一句话说明。
- 技术栈。
- 目录结构。
- 核心模块职责。
- 数据流或调用链。
- 启动、测试、构建命令。
- 高风险区域。
- AI 不得猜测的区域。

## 老项目原则

老项目尤其需要先建地图。架构文档不是目录清单，而是 AI 后续执行前必须读取的项目上下文。

