
---
title: Agent底层全是Tool Use
icon: tool
order: 5
---

# Agent 底层全是 Tool Use

> "如果你真的理解了 Tool Use，你就理解了 Agent 的一切。"

## 🎯 开篇：一个颠覆认知的真相

很多人第一次接触 AI Agent 时，会被各种概念搞晕——推理、规划、记忆、反思、多智能体协作……听起来 Agent 像是一个拥有"自主意识"的智能系统。

**但如果你拆开 Agent 的引擎盖，你会发现一个惊人的事实：**

> Agent 的所有"智能行为"，底层都是在做同一件事——**Tool Use（工具调用），也叫Function Calling**。

推理？是 Tool Use。搜索？是 Tool Use。记忆？是 Tool Use。写代码、读文件、调 API、甚至"思考"本身？**全是 Tool Use。**

这不是简化，这是 Agent 架构的本质。理解了这一点，你看 Agent 的眼光会完全不同。

---

## 01｜从一个例子说起

假设你对一个 Agent 说：

> "帮我查一下北京今天的天气，然后用邮件发给我的同事张三。"

Agent 的执行过程：

```
第 1 步：LLM 理解意图 → 决定调用天气查询工具
第 2 步：Tool Use → 调用 get_weather(city="北京")
第 3 步：LLM 拿到结果 → 决定调用邮件发送工具
第 4 步：Tool Use → 调用 send_email(to="张三", body="北京今天晴，25°C")
第 5 步：LLM 判断任务完成 → 返回最终回答
```

看起来 Agent 做了"理解→规划→执行→总结"，但**拆解到最小单元**，每一步的"行动"都是一次 Tool Use 调用。

LLM 本身不能查天气，不能发邮件，不能读数据库，不能写代码——**它唯一能做的是"决定调用哪个工具、传什么参数"**。

---

## 02｜Tool Use 到底是什么？

### 本质定义

Tool Use（也叫 Function Calling）是大语言模型的一种**结构化输出能力**：

> LLM 不直接输出自然语言回答，而是输出一个**函数调用指令**（工具名 + 参数），由外部系统执行后把结果返回给 LLM。

```json
// LLM 的输出不是文字，而是这样的结构化指令：
{
  "tool": "get_weather",
  "arguments": {
    "city": "北京",
    "date": "today"
  }
}
```

### 完整的 Tool Use 循环

```
用户输入
   ↓
┌─────────────────────────────┐
│  LLM（大脑）                 │
│                             │
│  1. 理解用户意图              │
│  2. 判断需要调用什么工具       │
│  3. 生成工具调用指令          │ ──→ { tool: "xxx", args: {...} }
│                             │
│  5. 拿到工具返回结果          │ ←── 工具执行结果
│  6. 判断是否还需要调用工具    │
│  7. 如果是 → 回到第2步       │
│  8. 如果否 → 生成最终回答     │
└─────────────────────────────┘
   ↓
最终回答
```

**这就是 Agent 的完整运行机制。没有魔法，只有循环。**

---

## 03｜所有 Agent 能力都是 Tool Use 的变体

这是本文的核心论点。让我们逐一拆解：

### 🔍 推理（Reasoning）

Agent 的"推理"能力来自 LLM 的 Chain-of-Thought，但当推理需要**外部信息**时：

```
"计算这家公司的 PE 比率"
  → Tool Use: 调用 get_stock_price(ticker="AAPL")
  → Tool Use: 调用 get_financial_report(ticker="AAPL", metric="earnings")
  → LLM 用返回的数据做计算
```

没有 Tool Use，LLM 只能用训练数据里的过期信息"幻觉式推理"。**真正的推理 = LLM 思考能力 + Tool Use 获取真实数据。**

### 📋 规划（Planning）

"规划"听起来很高级，但在 Agent 框架中：

```python
# Agent 的"规划"本质上是 LLM 生成了一个 tool 调用序列
plan = [
    {"tool": "search_web", "args": {"query": "React 最佳实践"}},
    {"tool": "read_file", "args": {"path": "src/App.tsx"}},
    {"tool": "write_file", "args": {"path": "src/App.tsx", "content": "..."}},
    {"tool": "run_tests", "args": {"suite": "unit"}},
]
```

**规划 = LLM 输出一个 Tool Use 列表。** 没有更多了。

### 🧠 记忆（Memory）

Agent 的"记忆"是怎么实现的？

```
短期记忆 → 对话上下文（直接塞进 prompt，不需要 tool）

长期记忆 → Tool Use:
  存储: 调用 memory_store(key="用户偏好", value="喜欢简洁风格")
  检索: 调用 memory_search(query="用户偏好")

  底层通常是向量数据库：
  存储: 调用 vector_db.upsert(text, embedding)
  检索: 调用 vector_db.query(embedding, top_k=5)
```

**记忆 = 对向量数据库的 Tool Use。**

### 🔄 反思（Reflection）

Agent 执行出错后"自我反思"并修正——看起来很智能，实际上：

```
第 1 轮: Tool Use → run_code(code="...") → 返回报错信息
第 2 轮: LLM 读到报错 → 决定重新调用 → Tool Use → run_code(code="修复后的代码")
```

**反思 = "Tool Use 失败后再次 Tool Use"。** LLM 看到了工具的错误返回，然后调整参数重新调用，仅此而已。

### 🌐 RAG（检索增强生成）

```
用户: "MCP 协议是什么？"

Agent 内部:
  1. Tool Use → search_knowledge_base(query="MCP 协议")
  2. 拿到相关文档片段
  3. LLM 结合检索结果生成回答
```

**RAG = 先 Tool Use 检索，再 LLM 生成。**

### 💻 代码执行

```
Agent: "我来帮你分析这个 CSV 文件"

内部:
  1. Tool Use → read_file("data.csv")
  2. Tool Use → execute_python("import pandas as pd; df = pd.read_csv('data.csv'); print(df.describe())")
  3. LLM 根据执行结果生成分析报告
```

### 👥 多 Agent 协作

```
Agent A（研究员）:  Tool Use → search_papers(query="transformer 最新进展")
Agent A → Agent B:  传递搜索结果
Agent B（写作者）:  Tool Use → write_file("report.md", content="...")
Agent B → Agent C:  传递报告
Agent C（审核员）:  Tool Use → read_file("report.md") → 返回审核意见
```

**多 Agent 协作 = 多个 LLM 各自做 Tool Use，通过状态传递串联。**（多 Agent 状态传递详解见：[多 Agent 状态传递：如何让 AI 们协同工作](/ai-agents/multi-agent-systems/state-passing.md)）

### 🔌 MCP 协议（Model Context Protocol）

MCP 看起来是一个"新协议"，但透过 Tool Use 的视角，它**只是 Tool Use 的标准化封装**：

```
传统 Tool Use:
  tools = [自己定义的函数A, 自己定义的函数B]  ← 硬编码，换个项目就要重写

MCP Tool Use:
  tools = mcp_client.list_tools()              ← 自动发现，即插即用
  result = mcp_client.call_tool("xxx", args)   ← 标准化调用
```

MCP 的三大能力，**全是 Tool Use 的变体**：

| MCP 能力 | 本质 | 等价的 Tool Use |
|---------|------|----------------|
| **Tools** | 调用远端函数 | `call_tool(name, args) → result` |
| **Resources** | 读取远端数据 | `read_resource(uri) → content`（只读 Tool） |
| **Prompts** | 获取模板 | `get_prompt(name, args) → formatted_text`（返回文本的 Tool） |

```python
# MCP Server 定义一个 Tool —— 本质就是 Function Calling 的标准化
@server.tool()
async def query_database(sql: str) -> str:
    """执行 SQL 查询"""
    result = await db.execute(sql)
    return json.dumps(result)

# Agent 调用 MCP Tool —— 和调用本地函数完全一样
response = llm.chat(messages, tools=mcp_tools)  # tools 来自 MCP Server
```

**MCP 没有发明新东西，它只是让 Tool Use "即插即用"。** 就像 USB 没有发明数据传输，只是让设备连接标准化了。

### 🎯 SKILL 技能系统

SKILL 听起来比 Tool 高级很多——"技能"嘛，带有"专业能力"的意味。但拆开来看：

> **SKILL = Prompt 模板 + Tool 集合 + 执行流程的打包**

```yaml
# 一个 SKILL 的定义文件
name: "tech-article-writer"
description: "专业技术文章写作技能"

# 本质1：一段 system prompt
instructions: |
  你是一个专业的技术文章写手。
  请按照以下结构写作：开篇→原理→实战→总结...

# 本质2：一组可用的 Tools
tools:
  - web_search          # Tool Use: 搜索资料
  - read_file           # Tool Use: 读取参考文件
  - write_file          # Tool Use: 保存文章

# 本质3：执行流程（哪些阶段、什么顺序）
workflow:
  - step: research      # LLM + search Tool
  - step: outline       # LLM 生成大纲（纯文本输出）
  - step: write         # LLM + write_file Tool
  - step: review        # LLM 自检（纯推理）
```

**SKILL 的本质**：把"这个 Agent 应该有什么 system prompt + 可以用什么 tools + 按什么流程执行"封装成一个可复用的包。

和直接写 Tool 的区别：

| 维度 | 裸 Tool Use | SKILL |
|------|-----------|-------|
| **Prompt** | 每次手写 | 封装好的模板 |
| **工具集** | 全部暴露 | 按需裁剪 |
| **流程** | 无约束 | 预定义步骤 |
| **可复用性** | 低 | 高（像"插件"一样分发） |
| **底层** | Tool Use | **还是 Tool Use** |

### 📏 RULES 规则引擎

RULES 更简单——它甚至不是 Tool Use，而是 **Prompt 注入**：

```
RULES = 注入到 system prompt 中的约束条件

例如：
- "代码必须用 TypeScript"         → prompt 约束
- "变量命名用 camelCase"          → prompt 约束
- "每个函数不超过 50 行"          → prompt 约束 + lint Tool 校验
- "修改前必须读取原文件"          → prompt 约束（影响 Tool 调用顺序）
```

**RULES = 控制 LLM "怎么选工具、怎么传参数"的约束文本。** 它不创造新能力，它**约束**已有能力的行使方式。

---

## 04｜统一视角：Agent = LLM + Tool Use Loop

所有的 Agent 框架（LangChain、LangGraph、AutoGen、CrewAI），剥去封装后，核心循环都是同一个：

```python
def agent_loop(user_input, tools, llm):
    messages = [{"role": "user", "content": user_input}]
    
    while True:
        # 1. LLM 决策：要不要调用工具
        response = llm.chat(messages, tools=tools)
        
        # 2. 如果 LLM 决定调用工具 → 执行 Tool Use
        if response.tool_calls:
            for tool_call in response.tool_calls:
                result = execute_tool(
                    name=tool_call.name,
                    args=tool_call.arguments
                )
                messages.append({
                    "role": "tool",
                    "content": result
                })
        
        # 3. 如果 LLM 不调用工具 → 任务完成
        else:
            return response.content
```

**这 20 行代码就是一个完整的 Agent。** 所有的框架都是在这个核心上叠加：
- **LangChain**：封装了 Tools 定义和 Chain 编排
- **LangGraph**：加了状态机控制循环逻辑
- **AutoGen**：加了多 Agent 消息传递
- **CrewAI**：加了角色分工和任务分配

**但底层永远是这个 loop。**

---

## 05｜为什么理解这一点很重要？

### 1. 调试 Agent 变得简单

当 Agent 行为异常时，你不需要猜它"在想什么"——**只需要看它调用了什么工具、传了什么参数、拿到了什么返回值**。

```
Bug: Agent 发了错误的邮件内容
Debug: 
  ✅ search_contacts(name="张三") → 返回正确邮箱
  ❌ send_email(body="...") → 发现 body 内容有误
  → 问题出在 LLM 组织邮件内容的 prompt 上
```

### 2. 设计 Agent 变得清晰

不要想"我要让 Agent 具备 XX 能力"，而是想：

> **"我需要给 Agent 提供什么工具？"**

| 你想要的能力 | 你需要提供的工具 |
|------------|---------------|
| 搜索能力 | `web_search`, `knowledge_base_search` |
| 记忆能力 | `memory_store`, `memory_retrieve` |
| 代码能力 | `execute_code`, `read_file`, `write_file` |
| 数据分析 | `query_database`, `execute_python` |
| 通信能力 | `send_email`, `send_slack`, `create_ticket` |
| 自省能力 | `review_output`, `check_constraints` |

**Agent 的能力上限 = 你给它的工具集合的上限。**

### 3. 安全控制变得精确

既然所有行为都是 Tool Use，那么安全控制就是**工具的权限控制**：

```python
# 只读 Agent：只给查询工具，不给写入工具
read_only_tools = [search_web, read_file, query_db]

# 安全 Agent：工具执行前需要人工确认
@require_approval
def delete_record(id: str):
    db.delete(id)

# 沙箱 Agent：代码执行工具在容器中运行
sandbox_execute = DockerExecutor(image="python:3.11", timeout=30)
```

### 4. 评估 Agent 变得量化

Agent 好不好？看三个指标：

| 指标 | 含义 |
|------|------|
| **工具选择准确率** | LLM 是否选了正确的工具 |
| **参数生成准确率** | 工具参数是否正确 |
| **循环效率** | 多少轮 Tool Use 完成任务（越少越好） |

---

## 06｜Tool Use 的进化路径

### 第一代：单轮 Function Calling（2023）

```
用户 → LLM → 调用1个函数 → 返回结果
```
OpenAI 在 GPT-3.5/4 中首次引入 Function Calling。

### 第二代：多轮循环调用（2023-2024）

```
用户 → LLM → 调用工具A → 结果 → LLM → 调用工具B → 结果 → LLM → 最终回答
```
ReAct 模式、LangChain Agent。

### 第三代：并行调用 + 工具编排（2024-2025）

```
用户 → LLM → 同时调用 [工具A, 工具B, 工具C] → 汇总结果 → LLM → 回答
```
GPT-4o 的 parallel tool calls、LangGraph 的并行节点。

### 第四代：标准化工具协议（2025+）

```
用户 → Agent → 通过 MCP 协议连接任意工具 → 通过 A2A 协议连接其他 Agent
```
MCP 让工具即插即用，A2A 让 Agent 互联互通。**Tool Use 从"硬编码"变成了"协议驱动"。**

---

## 07｜从底层到上层：底层全是 Tool Use，上层全是 Prompt Engineering

到这里，我们已经证明了 Agent 的底层全是 Tool Use。但很多人会问：那些上层的方法论——SDD（Spec-Driven Development）、Superpowers 等等，是不是更"高级"？

**答案是：底层全是 Tool Use，上层全是 Prompt Engineering。** 区别只在于**模板写了什么、阶段怎么划分、人工审批卡在哪里**。

### 拆解 SDD（Spec-Driven Development）

SDD 的流程是：`PRD → design.md → tasks.md → code → test`

透过 Tool Use 视角来看：

```
阶段 1：PRD → design.md
  ├── Prompt: "你是架构师，请根据 PRD 输出技术设计文档"   ← Prompt Engineering
  ├── Tool Use: read_file("prd.md")                     ← 读取需求
  ├── LLM 推理: 生成设计方案                              ← 纯文本输出
  └── Tool Use: write_file("design.md", content)        ← 写入文件

阶段 2：design.md → tasks.md
  ├── Prompt: "请将设计拆分为可独立执行的任务清单"         ← Prompt Engineering
  ├── Tool Use: read_file("design.md")                  ← 读取设计
  └── Tool Use: write_file("tasks.md", content)         ← 写入文件

阶段 3：tasks.md → code
  ├── Prompt: "你是开发者，按照 task 描述实现代码"         ← Prompt Engineering
  ├── Tool Use: read_file("tasks.md")                   ← 读取任务
  ├── Tool Use: read_file("src/xxx.ts")                 ← 读取现有代码
  └── Tool Use: write_file("src/xxx.ts", new_code)      ← 写入代码

阶段 4：code → test
  ├── Tool Use: read_file("src/xxx.ts")                 ← 读取代码
  ├── Tool Use: write_file("test/xxx.test.ts", tests)   ← 写入测试
  └── Tool Use: run_terminal("npm test")                ← 执行测试

人工审批卡点:
  ├── design.md 完成后 → 人工 review 设计方案 ⏸️
  ├── tasks.md 完成后 → 人工确认任务粒度 ⏸️
  └── code 完成后 → 人工 code review ⏸️
```

**SDD 做了什么？** 它没有发明新的底层能力，它做的是：
1. **定义了 Prompt 模板**：每个阶段的 system prompt 不同（架构师、开发者、测试员）
2. **规定了 Tool Use 顺序**：先读 PRD、再写 design、再读 design 写 tasks……
3. **插入了人工审批点**：在关键阶段暂停，让人类确认后再继续

### 拆解 Superpowers（AI 超能力方法论）

Superpowers 的核心理念是：给 AI 赋予"超能力"来完成复杂任务。拆解后：

| Superpowers 概念 | 实际等价物 |
|-----------------|----------|
| 赋予 AI "网络搜索能力" | `tools.append(web_search)` |
| 赋予 AI "代码执行能力" | `tools.append(execute_code)` |
| 赋予 AI "记忆能力" | `tools.append(memory_store)` |
| 赋予 AI "协作能力" | `tools.append(delegate_to_agent)` |
| "能力等级控制" | RULES 约束哪些 Tool 可用 |

```
"超能力"         = 一组精心定义的 Tools
"超能力激活"      = 选择性加载对应的 SKILL（Prompt + Tools）
"超能力组合"      = 多个 SKILL 串联 = 多阶段 Tool Use
"能力边界控制"    = RULES（Prompt 约束）
```

### 所有方法论的统一公式

```
任何 AI 开发方法论 = Prompt 模板 × Tool 集合 × 阶段划分 × 审批卡点
```

| 方法论 | Prompt 模板 | Tool 集合 | 阶段划分 | 审批卡点 |
|--------|-----------|----------|---------|---------|
| **裸 Agent** | 随便写 | 全部暴露 | 无 | 无 |
| **ReAct** | "先思考再行动" | 通用工具 | Think→Act 循环 | 无 |
| **SDD** | 架构/开发/测试模板 | 文件读写+执行 | PRD→设计→任务→编码→测试 | 设计后、编码后 |
| **Superpowers** | 能力描述模板 | 按能力分组 | 按任务动态 | 按风险等级 |
| **SKILL 系统** | 封装的专业模板 | 按技能裁剪 | 预定义工作流 | 可配置 |

**它们的底层完全相同：LLM + Tool Use Loop。**

区别只在于：
- **模板写了什么** → 决定 LLM 的"人格"和"思维方式"
- **给了什么工具** → 决定 Agent 能做什么
- **阶段怎么划分** → 决定 Tool Use 的执行顺序
- **审批卡在哪里** → 决定人类在哪一步介入

### 为什么这个认知很重要？

**因为当你理解了这个统一公式，你就可以自己设计方法论了。**

不需要等别人发布新框架，不需要追逐每一个新概念。你只需要回答四个问题：

1. 我的 Agent 需要什么**人格**？ → 写对应的 Prompt
2. 我的 Agent 需要什么**能力**？ → 选对应的 Tools
3. 任务应该分几个**阶段**？ → 定义执行流程
4. 哪些**风险点**需要人工确认？ → 插入审批卡点

**你就创造了自己的方法论。** 不管你叫它 SDD、Superpowers 还是什么别的名字，底层都是同一个 Agent Loop。

---

## 08｜一张图总结

```
┌─────────────────────────────────────────────────┐
│                  AI Agent                        │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │           LLM（大脑）                     │   │
│   │                                          │   │
│   │   理解意图 → 选择工具 → 生成参数           │   │
│   │       ↑                    │              │   │
│   │       │            Tool Use 调用          │   │
│   │       │                    ↓              │   │
│   │   读取结果 ← ── 工具执行 ← ─┘             │   │
│   │       │                                  │   │
│   │   判断：继续调用？ ──是→ 回到"选择工具"    │   │
│   │       │                                  │   │
│   │      否                                  │   │
│   │       ↓                                  │   │
│   │   生成最终回答                            │   │
│   └──────────────────────────────────────────┘   │
│                       ↕                          │
│   ┌──────────────────────────────────────────┐   │
│   │         Tools（手脚）                     │   │
│   │                                          │   │
│   │  search    read_file    execute_code     │   │
│   │  send_email  query_db   memory_store     │   │
│   │  web_browse  write_file  create_pr       │   │
│   └──────────────────────────────────────────┘   │
│                                                  │
│   推理 = LLM + Tool       记忆 = Tool            │
│   规划 = LLM → Tool列表   反思 = Tool重试         │
│   RAG = Tool + LLM        协作 = 多LLM×多Tool     │
└─────────────────────────────────────────────────┘
```

---

## 💡 总结

| 层级 | 本质 | 具体内容 |
|------|------|---------|
| **最底层** | Tool Use | `call_tool(name, args) → result` 的循环 |
| **能力层** | Tool Use 变体 | 推理、规划、记忆、反思、RAG、代码执行 |
| **协议层** | Tool Use 标准化 | MCP（工具即插即用）、A2A（Agent 互联） |
| **封装层** | Prompt + Tools 打包 | SKILL（技能系统）、RULES（约束注入） |
| **方法论层** | Prompt Engineering | SDD、Superpowers、ReAct 等 |
| **区别** | 四个维度 | 模板写什么 × 给什么工具 × 阶段怎么分 × 审批卡哪里 |

**两句话记住全文**：
1. **底层全是 Tool Use** —— LLM 是大脑，Tool 是手脚，Agent 就是"大脑不断指挥手脚干活"的循环。
2. **上层全是 Prompt Engineering** —— 所有方法论的区别，只在于模板写了什么、阶段怎么划分、人工审批卡在哪里。

理解了这两句话，你就理解了 Agent 的全部，也具备了设计自己方法论的能力。

---

> 📖 **推荐阅读**：
> - [什么是 AI Agent](/ai-agents/agent-fundamentals/what-is-agent.md) - 从零了解 Agent 概念
> - [Agent 架构设计](/ai-agents/agent-fundamentals/agent-architecture.md) - 深入 Agent 技术架构
> - [MCP 协议概述](/ai-agents/mcp-protocol/mcp-overview.md) - Tool Use 的标准化协议
