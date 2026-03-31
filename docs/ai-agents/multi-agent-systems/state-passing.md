
---
title: 多Agent状态传递
icon: network
order: 5
---

# 多 Agent 状态传递：如何让 AI 们协同工作

> "单个 Agent 是个体户，多个 Agent 是流水线。流水线的核心不是工人，而是传送带——状态传递机制。"

## 🎯 开篇：多 Agent 的核心难题

当你只有一个 Agent 时，一切很简单——LLM 自己决策、自己调工具、自己拿结果。但当你有**多个 Agent 协作**时，一个根本性问题出现了：

> **Agent A 做完了，怎么告诉 Agent B 该做什么？**

这不是"发个消息"那么简单。你需要回答：
- 传什么？（原始输入？中间结果？全部上下文？）
- 怎么传？（文件？内存？消息队列？）
- 谁来控制传递顺序？（中心调度？自组织？）
- 状态冲突了怎么办？（两个 Agent 同时改了同一个东西）

**状态传递机制的选择，直接决定了多 Agent 系统的上限。**

---

## 01｜什么是"状态"？

在多 Agent 系统中，"状态"指的是**所有 Agent 共享的、用于驱动任务推进的数据集合**。

```python
# 一个典型的多 Agent 状态
state = {
    "messages": [...],          # 对话历史
    "task": "写一篇技术博客",    # 原始任务
    "research_results": [...],  # 研究 Agent 的产出
    "draft": "...",             # 写作 Agent 的产出
    "review_feedback": "...",   # 审核 Agent 的反馈
    "status": "reviewing",     # 当前阶段
    "iteration": 2,            # 第几轮迭代
}
```

**状态就是多个 Agent 之间的"共享记忆"。** 每个 Agent 从状态中读取输入，执行任务后把结果写回状态。

---

## 02｜四种状态传递模式

### 模式一：消息传递（Message Passing）

```
Agent A ──消息──→ Agent B ──消息──→ Agent C
```

**原理**：Agent 之间通过消息（通常是对话 messages 列表）传递信息。每个 Agent 把自己的输出追加到消息列表，下一个 Agent 从消息列表中读取上下文。

```python
# 最简单的消息传递
messages = [HumanMessage("帮我写一篇关于 MCP 的文章")]

# Agent A：研究员
response_a = researcher_llm.invoke(messages)
messages.append(response_a)  # 追加研究结果

# Agent B：写手
response_b = writer_llm.invoke(messages)
messages.append(response_b)  # 追加文章草稿

# Agent C：编辑
response_c = editor_llm.invoke(messages)
messages.append(response_c)  # 追加修改意见
```

**优点**：简单直观，不需要额外基础设施

**缺点**：
- 消息越积越长，token 消耗爆炸
- 后面的 Agent 要在一大堆消息里"找"自己需要的信息
- 没有结构化，Agent 可能误读前面的上下文

**适用场景**：简单的顺序对话、2~3 个 Agent 的简单链路

---

### 模式二：共享状态对象（Shared State）

```
          ┌──────────────┐
          │  共享 State   │
          │              │
          │ messages: [] │
          │ draft: ""    │
          │ review: ""   │
          └──────┬───────┘
          ↗      ↑      ↖
     读/写    读/写    读/写
      ↗        ↑        ↖
  Agent A   Agent B   Agent C
```

**原理**：定义一个结构化的 State 对象，所有 Agent 共享。每个 Agent 从 State 中读取自己需要的字段，执行完后更新对应字段。

```python
from typing import TypedDict, Annotated
from operator import add

# 定义结构化状态
class TeamState(TypedDict):
    messages: Annotated[list, add]   # 消息自动追加
    task: str                         # 任务描述
    research: str                     # 研究结果
    draft: str                        # 文章草稿
    feedback: str                     # 审核反馈
    final_article: str                # 最终文章
    status: str                       # 当前状态

# 研究 Agent：只读 task，只写 research
def researcher(state: TeamState) -> dict:
    result = research_llm.invoke(
        f"请研究以下主题：{state['task']}"
    )
    return {"research": result.content, "status": "researched"}

# 写作 Agent：读 task + research，只写 draft
def writer(state: TeamState) -> dict:
    result = writer_llm.invoke(
        f"任务：{state['task']}\n参考资料：{state['research']}\n请写一篇文章。"
    )
    return {"draft": result.content, "status": "drafted"}

# 审核 Agent：读 draft，只写 feedback
def reviewer(state: TeamState) -> dict:
    result = review_llm.invoke(
        f"请审核以下文章：\n{state['draft']}"
    )
    return {"feedback": result.content, "status": "reviewed"}
```

**优点**：
- 结构化，每个 Agent 只读写自己关心的字段
- 不会有 token 爆炸问题
- 状态可以持久化、可以 debug

**缺点**：需要预先定义好 State 结构

**适用场景**：LangGraph 的默认模式，适合大多数生产级系统

---

### 模式三：文件/工件传递（Artifact Passing）

```
Agent A ──→ 写入 design.md ──→ Agent B 读取 design.md
Agent B ──→ 写入 code.py   ──→ Agent C 读取 code.py
Agent C ──→ 写入 test.py   ──→ Agent D 读取 test.py
```

**原理**：Agent 之间通过**文件**传递状态。每个 Agent 的产出是一个文件（文档、代码、配置等），下一个 Agent 从文件系统读取。

```python
# Agent A：架构师 → 输出 design.md
def architect(task: str):
    design = architect_llm.invoke(f"为以下需求设计技术方案：{task}")
    write_file("design.md", design.content)

# Agent B：开发者 → 读 design.md，输出 app.py
def developer():
    design = read_file("design.md")
    code = developer_llm.invoke(f"根据以下设计实现代码：\n{design}")
    write_file("app.py", code.content)

# Agent C：测试员 → 读 app.py，输出 test.py
def tester():
    code = read_file("app.py")
    tests = tester_llm.invoke(f"为以下代码编写测试：\n{code}")
    write_file("test.py", tests.content)
```

**优点**：
- 天然可审查——每一步的产出都是人类可读的文件
- 天然可中断恢复——文件在磁盘上，随时可以从任意步骤重来
- 完美匹配软件开发流程（Spec Coding 就是这种模式）

**缺点**：
- 文件 IO 速度较慢
- 不适合需要高频交互的场景

**适用场景**：Spec Coding（PRD → design.md → tasks.md → code）、内容创作流水线、文档处理管道

---

### 模式四：黑板模式（Blackboard Pattern）

```
┌─────────────────────────────────────────┐
│              黑板（Blackboard）           │
│                                         │
│  [研究结果]  [草稿v1]  [审核意见]         │
│  [数据分析]  [草稿v2]  [最终版本]         │
│  [图片素材]  [SEO建议]                   │
└────────────┬────────────────────────────┘
             │
     ┌───────┼───────┬──────────┐
     ↕       ↕       ↕          ↕
  研究Agent 写作Agent 审核Agent SEO Agent
  （看到主题  （看到研究  （看到草稿   （看到草稿
   就工作）   结果就工作） 就工作）    就工作）
```

**原理**：有一个全局的"黑板"（共享数据空间），所有 Agent 都可以读写。每个 Agent 自主监控黑板上的变化，发现自己能处理的内容就主动工作。

```python
class Blackboard:
    def __init__(self):
        self.data = {}
        self.listeners = []
    
    def write(self, key: str, value: any):
        self.data[key] = value
        # 通知所有监听者
        for listener in self.listeners:
            listener.on_update(key, value)
    
    def read(self, key: str):
        return self.data.get(key)

# 研究 Agent：监控 "task" 字段
class ResearchAgent:
    def on_update(self, key, value):
        if key == "task":
            result = self.research(value)
            blackboard.write("research_results", result)

# 写作 Agent：监控 "research_results" 字段
class WriterAgent:
    def on_update(self, key, value):
        if key == "research_results":
            draft = self.write_article(value)
            blackboard.write("draft", draft)

# 审核 Agent：监控 "draft" 字段
class ReviewAgent:
    def on_update(self, key, value):
        if key == "draft":
            feedback = self.review(value)
            blackboard.write("feedback", feedback)
```

**优点**：
- 高度解耦——Agent 之间不直接通信
- 易扩展——加新 Agent 只需注册监听
- 支持并行——多个 Agent 可以同时工作

**缺点**：
- 执行顺序不确定，调试较困难
- 可能产生"写入冲突"
- 需要设计好键空间，避免混乱

**适用场景**：创意协作、开放式问题求解、Agent 数量动态变化的系统

---

## 03｜四种模式对比

| 维度 | 消息传递 | 共享状态 | 文件传递 | 黑板模式 |
|------|---------|---------|---------|---------|
| **复杂度** | ⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **结构化** | 弱 | 强 | 强 | 中 |
| **可审查性** | 低 | 中 | 高 | 中 |
| **可中断恢复** | 难 | 易 | 最易 | 中 |
| **并行支持** | 差 | 好 | 差 | 最好 |
| **Token 效率** | 差 | 好 | 好 | 好 |
| **典型框架** | AutoGen | LangGraph | Spec Coding | 自定义系统 |
| **适合场景** | 简单对话 | 生产系统 | 软件开发 | 创意协作 |

---

## 04｜LangGraph 实战：共享状态的完整示例

LangGraph 是目前最成熟的多 Agent 状态管理框架。下面是一个**研究→写作→审核**的完整流水线：

```python
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated, Literal
from operator import add
from langchain_openai import ChatOpenAI

# ========== 1. 定义共享状态 ==========
class ArticleState(TypedDict):
    messages: Annotated[list, add]
    task: str
    research: str
    draft: str
    feedback: str
    revision_count: int
    status: str

# ========== 2. 定义 Agent 节点 ==========
researcher_llm = ChatOpenAI(model="gpt-4o", temperature=0.3)
writer_llm = ChatOpenAI(model="gpt-4o", temperature=0.7)
reviewer_llm = ChatOpenAI(model="gpt-4o", temperature=0.2)

def research_node(state: ArticleState) -> dict:
    """研究 Agent：收集资料"""
    result = researcher_llm.invoke(
        f"请深入研究以下主题，列出关键概念、最新进展和重要数据：\n{state['task']}"
    )
    return {
        "research": result.content,
        "status": "researched",
        "messages": [{"role": "研究员", "content": "研究完成"}],
    }

def write_node(state: ArticleState) -> dict:
    """写作 Agent：撰写文章"""
    prompt = f"""任务：{state['task']}
研究资料：{state['research']}
"""
    # 如果有审核反馈，加入修改要求
    if state.get("feedback"):
        prompt += f"\n上一版反馈，请据此修改：{state['feedback']}"
    
    result = writer_llm.invoke(prompt + "\n请撰写一篇高质量文章。")
    return {
        "draft": result.content,
        "status": "drafted",
        "revision_count": state.get("revision_count", 0) + 1,
        "messages": [{"role": "写手", "content": f"第 {state.get('revision_count', 0) + 1} 版草稿完成"}],
    }

def review_node(state: ArticleState) -> dict:
    """审核 Agent：评审文章"""
    result = reviewer_llm.invoke(
        f"请严格审核以下文章，指出问题并给出 PASS 或 REVISE 的判定：\n{state['draft']}"
    )
    return {
        "feedback": result.content,
        "status": "reviewed",
        "messages": [{"role": "审核员", "content": "审核完成"}],
    }

# ========== 3. 定义条件边 ==========
def review_decision(state: ArticleState) -> Literal["revise", "publish"]:
    """审核决策：通过还是打回"""
    if state["revision_count"] >= 3:
        return "publish"  # 最多修改 3 次
    if "PASS" in state["feedback"].upper():
        return "publish"
    return "revise"

# ========== 4. 组装图 ==========
graph = StateGraph(ArticleState)

# 添加节点
graph.add_node("research", research_node)
graph.add_node("write", write_node)
graph.add_node("review", review_node)

# 添加边
graph.add_edge(START, "research")
graph.add_edge("research", "write")
graph.add_edge("write", "review")
graph.add_conditional_edges("review", review_decision, {
    "revise": "write",    # 打回 → 重写（循环）
    "publish": END,       # 通过 → 结束
})

# ========== 5. 编译并运行 ==========
app = graph.compile()

result = app.invoke({
    "task": "写一篇关于 MCP 协议的技术文章",
    "messages": [],
    "research": "",
    "draft": "",
    "feedback": "",
    "revision_count": 0,
    "status": "init",
})

print(f"经过 {result['revision_count']} 轮修改")
print(f"最终文章：\n{result['draft']}")
```

**状态流转的可视化：**

```
  ┌──────────┐     state.research     ┌──────────┐
  │ Research  │ ──────────────────→    │  Write   │
  │  Agent   │                        │  Agent   │
  └──────────┘                        └────┬─────┘
                                           │
                                    state.draft
                                           │
                                           ↓
                                     ┌──────────┐
                               ┌──── │  Review  │
                               │     │  Agent   │
                               │     └──────────┘
                               │           │
                        state.feedback     │
                               │      PASS?│
                               ↓           ↓
                          ┌──────────┐   ┌──────┐
                          │  Write   │   │ END  │
                          │ (修改版)  │   └──────┘
                          └──────────┘
```

---

## 05｜AutoGen 实战：消息传递模式

AutoGen 采用的是多 Agent **对话式**状态传递：

```python
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# 定义 Agent
researcher = AssistantAgent(
    name="Researcher",
    system_message="你是一名技术研究员，负责收集和整理技术资料。",
    llm_config={"model": "gpt-4o"},
)

writer = AssistantAgent(
    name="Writer",
    system_message="你是一名技术作家，负责将研究资料转化为高质量文章。",
    llm_config={"model": "gpt-4o"},
)

reviewer = AssistantAgent(
    name="Reviewer",
    system_message="你是一名严格的编辑，负责审核文章质量。回复 APPROVE 表示通过。",
    llm_config={"model": "gpt-4o"},
)

user = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config=False,
)

# 创建群聊 — Agent 之间通过消息列表传递状态
group_chat = GroupChat(
    agents=[user, researcher, writer, reviewer],
    messages=[],            # ← 共享消息列表就是"状态"
    max_round=10,
    speaker_selection_method="round_robin",
)

manager = GroupChatManager(groupchat=group_chat, llm_config={"model": "gpt-4o"})

# 启动对话
user.initiate_chat(manager, message="请写一篇关于 MCP 协议的技术文章")
```

**AutoGen 的状态传递本质**：所有 Agent 共享一个 `messages` 列表，每个 Agent 的输出自动追加到列表中，后续 Agent 能看到之前所有对话内容。

---

## 06｜状态冲突与解决策略

当多个 Agent 并行工作时，可能同时修改同一个状态字段：

### 场景：两个 Agent 同时写研究结果

```
Agent A: state["research"] = "关于 Transformer 的研究..."
Agent B: state["research"] = "关于 Attention 的研究..."
# 谁的结果被保留？
```

### 解决策略

| 策略 | 做法 | 适用场景 |
|------|------|---------|
| **追加而非覆盖** | 用列表字段，`Annotated[list, add]`，所有结果自动合并 | 研究、搜索等可聚合的结果 |
| **分字段写入** | 每个 Agent 写不同字段（`research_a`, `research_b`） | Agent 职责明确不重叠 |
| **版本控制** | 状态带版本号，写入前检查版本是否一致 | 需要严格一致性的场景 |
| **最后写入胜出** | 谁最后完成就用谁的结果 | 竞争式任务 |
| **协调者仲裁** | 由一个 Coordinator Agent 决定采纳谁的结果 | 结果质量差异大的场景 |

**LangGraph 的 Annotated 机制**：

```python
from typing import Annotated
from operator import add

class State(TypedDict):
    # add 策略：多个 Agent 的消息自动追加，不会覆盖
    messages: Annotated[list, add]
    
    # 自定义合并策略：取最新的非空值
    draft: Annotated[str, lambda old, new: new if new else old]
    
    # 自定义合并策略：计数器累加
    revision_count: Annotated[int, lambda old, new: old + new]
```

---

## 07｜状态持久化与中断恢复

生产级多 Agent 系统必须支持**中断后恢复**——Agent 执行到一半服务重启了，或者需要等待人工审核。

### LangGraph Checkpointer

```python
from langgraph.checkpoint.sqlite import SqliteSaver

# 状态自动持久化到数据库
checkpointer = SqliteSaver.from_conn_string("agent_states.db")
app = graph.compile(checkpointer=checkpointer)

# 每次调用带上 thread_id
config = {"configurable": {"thread_id": "article-001"}}

# 第一次运行 — 执行到 review 节点暂停
result = app.invoke(initial_state, config)

# ... 服务重启、人工审核 ...

# 从上次的状态恢复继续执行
result = app.invoke(None, config)  # 自动从 checkpoint 恢复
```

### 文件传递模式的天然持久化

```python
# 文件传递模式不需要额外的持久化机制
# 因为每一步的产出都已经是磁盘上的文件

def resume_pipeline():
    """从断点恢复"""
    if os.path.exists("test_report.md"):
        print("测试已完成，跳过")
    elif os.path.exists("app.py"):
        print("代码已生成，从测试步骤恢复")
        run_tester()
    elif os.path.exists("design.md"):
        print("设计已完成，从编码步骤恢复")
        run_developer()
    else:
        print("从头开始")
        run_architect()
```

---

## 08｜选型决策树

```
你的多 Agent 系统需要什么？
│
├─ Agent 数量 ≤ 3，顺序执行？
│  → 消息传递（最简单）
│
├─ 需要循环/条件分支/人工介入？
│  → LangGraph 共享状态（推荐）
│
├─ Agent 产出是文档/代码/文件？
│  → 文件传递（Spec Coding 模式）
│
├─ Agent 数量动态变化，需要高度并行？
│  → 黑板模式
│
└─ 跨组织、跨平台的 Agent 协作？
   → A2A 协议（标准化消息传递）
```

---

## 💡 总结

| 要点 | 内容 |
|------|------|
| **状态的本质** | 多个 Agent 共享的、驱动任务推进的结构化数据 |
| **四种模式** | 消息传递、共享状态、文件传递、黑板模式 |
| **生产推荐** | LangGraph 共享状态（结构化 + 持久化 + 条件控制） |
| **开发流程推荐** | 文件传递（可审查 + 可中断 + 人类可读） |
| **冲突解决** | 追加合并、分字段、版本控制、协调者仲裁 |
| **核心原则** | 每个 Agent 只读自己需要的、只写自己负责的 |

**一句话总结**：多 Agent 的难点不在于单个 Agent 有多聪明，而在于它们之间的**状态传递有多靠谱**。选对模式，协作就是流水线；选错模式，协作就是一团乱麻。

---

> 📖 **推荐阅读**：
> - [Agent 底层全是 Tool Use](/ai-agents/agent-fundamentals/agent-is-tool-use.md) — 理解 Agent 的本质
> - [Agent 通信](/ai-agents/multi-agent-systems/agent-communication.md) — Agent 间通信协议详解
> - [MCP 协议概述](/ai-agents/mcp-protocol/mcp-overview.md) — AI 连接工具的标准协议
