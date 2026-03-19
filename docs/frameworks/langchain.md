---
title: LangChain
icon: link
---

# LangChain

LangChain 是最流行的 LLM 应用开发框架，提供构建 AI 应用的完整工具链。

## 📌 框架概述

LangChain 由 Harrison Chase 创建，旨在简化 LLM 应用开发。

### 核心价值
- **模块化**：组件可独立使用和组合
- **抽象层**：统一不同 LLM 和工具的接口
- **生态丰富**：大量集成和社区贡献

### 架构组成

```
┌─────────────────────────────────────────────────────────┐
│                    LangChain 生态                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ langchain   │  │ langchain   │  │ langsmith   │     │
│  │   -core     │  │ -community  │  │  (追踪)      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ langgraph   │  │ langserve   │  │ langchain   │     │
│  │  (工作流)    │  │  (部署)     │  │   -cli      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 安装

```bash
pip install langchain langchain-openai langchain-community
```

### 基本使用

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

# 创建模型
llm = ChatOpenAI(model="gpt-4")

# 简单调用
response = llm.invoke([HumanMessage(content="你好！")])
print(response.content)
```

## 🔧 核心概念

### 1. Chat Models

统一的聊天模型接口。

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# 切换模型只需更改一行
# llm = ChatOpenAI(model="gpt-4")
llm = ChatAnthropic(model="claude-3-sonnet-20240229")
```

### 2. Prompt Templates

结构化的提示词模板。

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业的{role}"),
    ("human", "{question}")
])

# 使用模板
messages = prompt.invoke({
    "role": "技术顾问",
    "question": "什么是 RAG？"
})
```

### 3. Output Parsers

结构化输出解析。

```python
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel

class Answer(BaseModel):
    content: str
    confidence: float

parser = JsonOutputParser(pydantic_object=Answer)

# 在链中使用
chain = prompt | llm | parser
result = chain.invoke({"question": "什么是AI?"})
print(result)  # {"content": "...", "confidence": 0.95}
```

### 4. Chains (LCEL)

LangChain Expression Language - 声明式链构建。

```python
from langchain_core.runnables import RunnablePassthrough

# 使用 | 操作符构建链
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | parser
)

result = chain.invoke("什么是RAG？")
```

### 5. Retrievers

检索器接口，用于 RAG。

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# 创建向量存储
vectorstore = Chroma.from_documents(
    documents,
    embedding=OpenAIEmbeddings()
)

# 获取检索器
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 5}
)

# 检索
docs = retriever.invoke("查询内容")
```

### 6. Tools & Agents

工具定义和 Agent。

```python
from langchain.tools import tool
from langchain.agents import create_tool_calling_agent, AgentExecutor

@tool
def search(query: str) -> str:
    """搜索互联网获取信息"""
    return f"搜索结果: {query}"

@tool
def calculator(expression: str) -> str:
    """计算数学表达式"""
    return str(eval(expression))

# 创建 Agent
tools = [search, calculator]
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

result = executor.invoke({"input": "计算 25 * 4 是多少？"})
```

## 📊 RAG 完整示例

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# 1. 加载文档
loader = WebBaseLoader("https://example.com/article")
docs = loader.load()

# 2. 分块
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(docs)

# 3. 创建向量存储
vectorstore = Chroma.from_documents(
    chunks,
    embedding=OpenAIEmbeddings()
)
retriever = vectorstore.as_retriever()

# 4. 创建 Prompt
prompt = ChatPromptTemplate.from_template("""
根据以下上下文回答问题：

上下文：{context}

问题：{question}
""")

# 5. 构建链
llm = ChatOpenAI(model="gpt-4")

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
)

# 6. 使用
answer = rag_chain.invoke("这篇文章讲了什么？")
print(answer.content)
```

## 🛠️ 进阶功能

### 流式输出

```python
for chunk in chain.stream({"question": "什么是AI?"}):
    print(chunk.content, end="", flush=True)
```

### 异步执行

```python
result = await chain.ainvoke({"question": "什么是AI?"})
```

### 批量处理

```python
questions = [{"question": "问题1"}, {"question": "问题2"}]
results = chain.batch(questions)
```

## 📚 延伸阅读

- [LangChain 官方文档](https://python.langchain.com/)
- [LangGraph](/frameworks/langchain)
- [RAG 技术](/rag/what-is-rag)
