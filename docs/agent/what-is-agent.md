---
title: 什么是 AI Agent
category: AI Agent
tag:
  - Agent
  - 智能体
  - LLM应用
---

# 什么是 AI Agent（智能体）

## 简介

**AI Agent（人工智能智能体）** 是一种能够感知环境、自主决策并执行行动以达成特定目标的智能系统。在大语言模型时代，Agent 通常指由 LLM 驱动的自主代理，能够分解任务、调用工具、与环境交互并完成复杂任务。

## Agent 与传统 AI 的区别

### 传统 Chatbot vs Agent

| 特性 | 传统 Chatbot | AI Agent |
|------|-------------|----------|
| 交互方式 | 一问一答 | 多轮自主推理 |
| 能力范围 | 仅对话 | 对话 + 工具调用 + 行动 |
| 任务复杂度 | 简单问答 | 复杂多步骤任务 |
| 自主性 | 被动响应 | 主动规划执行 |

### 核心特征

```
传统 LLM: 输入 → 思考 → 输出文本

AI Agent: 输入 → 思考 → 规划 → 行动 → 观察 → 再思考 → ... → 完成目标
```

## Agent 的核心组件

```
┌────────────────────────────────────────────────────────────┐
│                      AI Agent 架构                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                   🧠 LLM（大脑）                     │  │
│  │              推理、规划、决策中心                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                          ↕                                 │
│  ┌─────────┐  ┌─────────────┐  ┌────────────────────┐    │
│  │ 📝 记忆  │  │ 🔧 工具集   │  │ 📋 规划模块        │    │
│  │         │  │             │  │                    │    │
│  │ 短期记忆 │  │ 搜索引擎    │  │ 任务分解          │    │
│  │ 长期记忆 │  │ 代码执行    │  │ 子任务规划        │    │
│  │ 知识库  │  │ API 调用    │  │ 反思优化          │    │
│  └─────────┘  └─────────────┘  └────────────────────┘    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 1. LLM（大脑）
Agent 的核心推理引擎，负责：
- 理解用户意图
- 制定执行计划
- 决策下一步行动
- 生成最终输出

### 2. 记忆系统（Memory）
帮助 Agent 记住历史信息：

**短期记忆**
- 当前对话上下文
- 执行过程中的中间结果
- 通常使用上下文窗口

**长期记忆**
- 历史交互记录
- 学习到的知识
- 通常使用向量数据库存储

### 3. 工具集（Tools）
扩展 Agent 的能力边界：

| 工具类型 | 示例 | 能力 |
|---------|------|------|
| 搜索工具 | Google, Bing | 获取实时信息 |
| 代码工具 | Python REPL | 执行计算和数据处理 |
| 浏览工具 | 网页抓取 | 读取网页内容 |
| API 工具 | 天气、股票 API | 获取结构化数据 |
| 文件工具 | 读写文件 | 操作本地文件 |

### 4. 规划模块（Planning）
负责任务分解和执行策略：
- **任务分解**：将复杂任务拆分为子任务
- **路径规划**：确定执行顺序
- **反思优化**：评估执行结果并调整

## Agent 工作原理

### ReAct 框架

最经典的 Agent 推理框架是 **ReAct**（Reasoning + Acting）：

```
思考（Thought）→ 行动（Action）→ 观察（Observation）→ 循环...
```

**示例**：

```
用户：上海今天的天气适合户外运动吗？

Thought 1: 我需要先查询上海今天的天气情况
Action 1: search("上海今天天气")
Observation 1: 上海今天晴，气温 18-25°C，微风

Thought 2: 天气情况是晴天，温度适中，我可以给出建议了
Action 2: finish("今天上海天气很好，晴天 18-25°C，非常适合户外运动！")
```

### 代码实现示例

```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

# 定义工具
def search(query):
    # 实际应调用搜索 API
    return f"搜索结果: {query}"

def calculator(expression):
    return str(eval(expression))

tools = [
    Tool(name="Search", func=search, description="搜索互联网信息"),
    Tool(name="Calculator", func=calculator, description="进行数学计算"),
]

# 创建 Agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools, 
    llm, 
    agent="zero-shot-react-description",
    verbose=True
)

# 运行
agent.run("苹果公司的市值除以微软的市值等于多少？")
```

## 常见 Agent 类型

### 1. 单 Agent 系统
一个 Agent 独立完成任务：
- 个人助手
- 代码生成器
- 研究助手

### 2. 多 Agent 系统
多个 Agent 协作完成复杂任务：

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 规划 Agent  │ → │ 执行 Agent  │ → │ 评审 Agent  │
└─────────────┘    └─────────────┘    └─────────────┘
      ↑                                      │
      └──────────────────────────────────────┘
```

**应用场景**：
- 软件开发团队模拟
- 辩论和决策系统
- 游戏 NPC 系统

### 3. 自主 Agent
具有更高自主性的 Agent：
- AutoGPT
- BabyAGI
- 可以自主设定子目标并执行

## 主流 Agent 框架

| 框架 | 特点 | 适用场景 |
|------|------|----------|
| **LangChain** | 生态丰富，组件多 | 通用 Agent 开发 |
| **LlamaIndex** | 数据处理强 | RAG + Agent |
| **AutoGen** | 多 Agent 协作 | 复杂对话系统 |
| **CrewAI** | 角色扮演 Agent | 团队协作模拟 |
| **MetaGPT** | 软件开发 | 代码生成项目 |

## Agent 的挑战

### 1. 可靠性
- LLM 可能做出错误决策
- 工具调用可能失败
- 需要良好的错误处理机制

### 2. 效率
- 多次 LLM 调用导致延迟
- Token 消耗较高
- 需要优化调用次数

### 3. 安全性
- 工具权限控制
- 防止恶意输入
- 行动的可控性

### 4. 上下文限制
- 长任务可能超出上下文窗口
- 需要有效的记忆管理

## 应用场景

- **个人助手**：日程管理、信息搜索、自动回复
- **代码助手**：代码生成、调试、重构
- **数据分析**：自动化数据处理和报告生成
- **客户服务**：智能客服、工单处理
- **自动化办公**：邮件处理、文档生成

## 学习资源

- [LangChain Agent 文档](https://python.langchain.com/docs/modules/agents/)
- [ReAct 论文](https://arxiv.org/abs/2210.03629)
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)
- [The Rise of AI Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)

## 下一步

- [Agent 框架对比](./agent-frameworks.md)
- [构建你的第一个 Agent](./build-first-agent.md)
- [多 Agent 系统设计](./multi-agent-systems.md)
