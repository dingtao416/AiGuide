---
title: LlamaIndex
icon: database
---

# LlamaIndex

LlamaIndex 是专注于数据索引和检索的 LLM 框架，特别适合构建 RAG 应用。

## 📌 框架概述

LlamaIndex（原 GPT Index）专注于连接 LLM 与数据源。

### 核心特点
- **数据连接器**：支持多种数据源
- **索引结构**：多种索引类型优化检索
- **查询引擎**：灵活的查询接口
- **Agent 支持**：数据驱动的 Agent

## 🚀 快速开始

### 安装

```bash
pip install llama-index
pip install llama-index-llms-openai
pip install llama-index-embeddings-openai
```

### 基本使用

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 加载文档
documents = SimpleDirectoryReader("./data").load_data()

# 创建索引
index = VectorStoreIndex.from_documents(documents)

# 创建查询引擎
query_engine = index.as_query_engine()

# 查询
response = query_engine.query("这份文档讲了什么？")
print(response)
```

## 🔧 核心组件

### 1. 数据加载器

支持多种数据源。

```python
from llama_index.core import SimpleDirectoryReader
from llama_index.readers.web import SimpleWebPageReader
from llama_index.readers.database import DatabaseReader

# 文件目录
docs = SimpleDirectoryReader("./docs").load_data()

# 网页
docs = SimpleWebPageReader(html_to_text=True).load_data([
    "https://example.com/page1"
])

# 数据库
from sqlalchemy import create_engine
engine = create_engine("sqlite:///database.db")
reader = DatabaseReader(engine=engine)
docs = reader.load_data(query="SELECT * FROM articles")
```

### 2. 索引类型

```python
from llama_index.core import (
    VectorStoreIndex,
    SummaryIndex,
    TreeIndex,
    KeywordTableIndex
)

# 向量索引 - 语义搜索
vector_index = VectorStoreIndex.from_documents(documents)

# 摘要索引 - 遍历所有节点
summary_index = SummaryIndex.from_documents(documents)

# 树索引 - 层次结构
tree_index = TreeIndex.from_documents(documents)

# 关键词索引 - 关键词匹配
keyword_index = KeywordTableIndex.from_documents(documents)
```

### 3. 查询引擎

```python
# 基本查询引擎
query_engine = index.as_query_engine()

# 配置参数
query_engine = index.as_query_engine(
    similarity_top_k=5,
    response_mode="tree_summarize",
    streaming=True
)

# 流式响应
streaming_response = query_engine.query("问题")
for text in streaming_response.response_gen:
    print(text, end="")
```

### 4. 聊天引擎

支持多轮对话。

```python
chat_engine = index.as_chat_engine(
    chat_mode="context",
    verbose=True
)

response = chat_engine.chat("你好！")
response = chat_engine.chat("刚才我问了什么？")

# 查看历史
print(chat_engine.chat_history)
```

## 📊 高级功能

### 1. 自定义节点解析

```python
from llama_index.core.node_parser import SentenceSplitter

# 自定义分块
splitter = SentenceSplitter(
    chunk_size=1024,
    chunk_overlap=200
)

nodes = splitter.get_nodes_from_documents(documents)
index = VectorStoreIndex(nodes)
```

### 2. 多索引查询

```python
from llama_index.core.query_engine import RouterQueryEngine
from llama_index.core.selectors import LLMSingleSelector

# 创建多个索引
tech_index = VectorStoreIndex.from_documents(tech_docs)
business_index = VectorStoreIndex.from_documents(business_docs)

# 路由查询引擎
query_engine = RouterQueryEngine(
    selector=LLMSingleSelector.from_defaults(),
    query_engine_tools=[
        QueryEngineTool.from_defaults(
            query_engine=tech_index.as_query_engine(),
            description="技术相关问题"
        ),
        QueryEngineTool.from_defaults(
            query_engine=business_index.as_query_engine(),
            description="业务相关问题"
        )
    ]
)
```

### 3. 子问题查询

自动分解复杂问题。

```python
from llama_index.core.query_engine import SubQuestionQueryEngine

query_engine = SubQuestionQueryEngine.from_defaults(
    query_engine_tools=[tool1, tool2, tool3]
)

response = query_engine.query(
    "比较2022年和2023年的业绩，并分析原因"
)
```

### 4. Agent

```python
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import QueryEngineTool, FunctionTool

# 定义工具
search_tool = QueryEngineTool.from_defaults(
    query_engine=index.as_query_engine(),
    name="search",
    description="搜索文档内容"
)

def calculate(expression: str) -> str:
    """计算数学表达式"""
    return str(eval(expression))

calc_tool = FunctionTool.from_defaults(fn=calculate)

# 创建 Agent
agent = ReActAgent.from_tools(
    [search_tool, calc_tool],
    verbose=True
)

response = agent.chat("文档中提到的销售额是多少？乘以2是多少？")
```

## 🔄 与向量数据库集成

```python
import chromadb
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext

# 使用 Chroma
chroma_client = chromadb.Client()
collection = chroma_client.create_collection("my_collection")

vector_store = ChromaVectorStore(chroma_collection=collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context
)
```

## 📊 LlamaIndex vs LangChain

| 特性 | LlamaIndex | LangChain |
|------|------------|-----------|
| 核心定位 | 数据索引与检索 | 通用 LLM 应用 |
| RAG 能力 | ⭐⭐⭐ | ⭐⭐ |
| Agent 能力 | ⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | 较低 | 中等 |
| 索引类型 | 丰富 | 基础 |
| 生态系统 | 中等 | 丰富 |

## 📚 延伸阅读

- [LlamaIndex 官方文档](https://docs.llamaindex.ai/)
- [什么是 RAG](/rag/what-is-rag)
- [向量数据库](/rag/vector-database)
