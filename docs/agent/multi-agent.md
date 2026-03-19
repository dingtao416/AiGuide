---
title: 多 Agent 系统
category: AI Agent
tag:
  - Agent
  - Multi-Agent
---

# 多 Agent 系统

## 什么是多 Agent

多个 Agent 协作完成复杂任务，每个 Agent 负责特定角色或功能。

## 协作模式

### 顺序协作
```
Agent A → Agent B → Agent C → 结果
```

### 层级协作
```
        Manager Agent
       /      |      \
    Agent A  Agent B  Agent C
```

### 对等协作
```
Agent A ←→ Agent B
   ↕          ↕
Agent C ←→ Agent D
```

## 常见角色

| 角色 | 职责 |
|------|------|
| 规划者 | 分解任务、制定计划 |
| 执行者 | 具体执行任务 |
| 评审者 | 检查结果质量 |
| 协调者 | 协调各 Agent |

## 框架对比

| 框架 | 特点 |
|------|------|
| AutoGen | 微软出品，对话协作 |
| CrewAI | 角色扮演，团队协作 |
| LangGraph | 图结构工作流 |
| MetaGPT | 软件开发团队 |

## CrewAI 示例

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role='研究员',
    goal='收集相关信息',
    backstory='资深研究专家'
)

writer = Agent(
    role='作家',
    goal='撰写高质量内容',
    backstory='专业技术写手'
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task]
)

result = crew.kickoff()
```

## 应用场景

- 软件开发流程
- 内容创作流水线
- 数据分析报告
- 客服问题处理

## 下一步

- [计算机视觉](../computer-vision/cv-basics.md)
