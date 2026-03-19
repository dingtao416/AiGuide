---
title: Agent 框架
icon: boxes-stacked
---

# Agent 框架

主流 AI Agent 开发框架介绍与对比。

## 📌 框架概览

| 框架 | 开发者 | 特点 | 适用场景 |
|------|--------|------|----------|
| LangGraph | LangChain | 图状态机 | 复杂工作流 |
| AutoGen | Microsoft | 多智能体 | 协作系统 |
| CrewAI | CrewAI | 角色扮演 | 团队协作 |
| Semantic Kernel | Microsoft | 企业级 | .NET/Python |
| Dify | Dify.AI | 低代码 | 快速开发 |

## 🔧 LangGraph

LangChain 团队开发的图状态机框架。

### 核心概念

```
┌─────────────────────────────────────────┐
│              LangGraph                   │
├─────────────────────────────────────────┤
│  State: 状态对象，贯穿整个流程           │
│  Node: 节点，执行具体操作                │
│  Edge: 边，定义节点间的转移条件          │
│  Graph: 图，组织整体流程                 │
└─────────────────────────────────────────┘
```

### 基本示例

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 定义状态
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_action: str

# 定义节点
def agent_node(state: AgentState):
    # Agent 决策逻辑
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def tool_node(state: AgentState):
    # 工具执行逻辑
    result = execute_tool(state["next_action"])
    return {"messages": [result]}

# 构建图
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# 定义边
graph.add_edge("agent", "tools")
graph.add_conditional_edges(
    "tools",
    should_continue,
    {"continue": "agent", "end": END}
)

graph.set_entry_point("agent")
app = graph.compile()
```

### 优势
- 可视化工作流
- 支持循环和条件分支
- 状态持久化
- 人机协作节点

## 🤖 AutoGen

Microsoft 开发的多智能体框架。

### 核心特点
- 多 Agent 对话
- 代码执行能力
- 人类参与机制

### 基本示例

```python
from autogen import AssistantAgent, UserProxyAgent

# 创建 Agent
assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "gpt-4"}
)

user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="TERMINATE",
    code_execution_config={"work_dir": "coding"}
)

# 开始对话
user_proxy.initiate_chat(
    assistant,
    message="帮我写一个计算斐波那契数列的Python函数"
)
```

### 多 Agent 协作

```python
from autogen import GroupChat, GroupChatManager

# 创建多个专业 Agent
coder = AssistantAgent(name="Coder", ...)
reviewer = AssistantAgent(name="Reviewer", ...)
tester = AssistantAgent(name="Tester", ...)

# 创建群聊
groupchat = GroupChat(
    agents=[user_proxy, coder, reviewer, tester],
    messages=[],
    max_round=10
)

manager = GroupChatManager(groupchat=groupchat)

# 开始群聊
user_proxy.initiate_chat(
    manager,
    message="开发一个简单的待办事项 API"
)
```

## 👥 CrewAI

基于角色的多 Agent 协作框架。

### 核心概念
- **Agent**: 具有特定角色和目标的智能体
- **Task**: 需要完成的任务
- **Crew**: Agent 团队
- **Process**: 协作流程

### 基本示例

```python
from crewai import Agent, Task, Crew, Process

# 定义 Agent
researcher = Agent(
    role="研究员",
    goal="收集和分析AI领域最新信息",
    backstory="你是一位资深AI研究员...",
    tools=[search_tool, web_tool]
)

writer = Agent(
    role="技术作家",
    goal="撰写清晰易懂的技术文章",
    backstory="你是一位经验丰富的技术作家..."
)

# 定义任务
research_task = Task(
    description="研究2024年AI发展趋势",
    expected_output="详细的研究报告",
    agent=researcher
)

writing_task = Task(
    description="基于研究报告撰写博客文章",
    expected_output="2000字的技术博客",
    agent=writer
)

# 创建团队
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential
)

# 执行
result = crew.kickoff()
```

## 🏢 Semantic Kernel

Microsoft 开发的企业级 AI 框架。

### 特点
- 企业级设计
- 支持 .NET 和 Python
- 插件系统
- 内存管理

### Python 示例

```python
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

# 创建 Kernel
kernel = sk.Kernel()

# 添加 AI 服务
kernel.add_service(OpenAIChatCompletion(
    service_id="chat",
    ai_model_id="gpt-4"
))

# 定义插件函数
@kernel.function(name="search", description="搜索信息")
def search(query: str) -> str:
    return f"搜索结果: {query}"

# 创建 Agent
agent = kernel.create_agent(
    name="assistant",
    instructions="你是一个有帮助的助手"
)

# 执行
response = await agent.invoke("帮我搜索AI最新进展")
```

## 📊 框架对比

| 特性 | LangGraph | AutoGen | CrewAI | Semantic Kernel |
|------|-----------|---------|--------|-----------------|
| 学习曲线 | 中等 | 低 | 低 | 中等 |
| 灵活性 | 高 | 中 | 中 | 高 |
| 多 Agent | ✅ | ✅ | ✅ | ✅ |
| 可视化 | ✅ | ❌ | ❌ | ❌ |
| 代码执行 | 需插件 | ✅ | 需插件 | 需插件 |
| 企业支持 | LangChain | Microsoft | 社区 | Microsoft |
| 语言支持 | Python | Python | Python | Python/.NET |

## 💡 选择建议

| 场景 | 推荐框架 |
|------|----------|
| 复杂工作流 | LangGraph |
| 代码生成 | AutoGen |
| 团队协作模拟 | CrewAI |
| 企业应用 | Semantic Kernel |
| 快速原型 | CrewAI / AutoGen |
| 生产部署 | LangGraph |

## 📚 延伸阅读

- [什么是 Agent](/agent/what-is-agent)
- [Agent 架构](/agent/agent-architecture)
- [工具使用](/agent/tool-use)
- [多智能体系统](/agent/multi-agent)
