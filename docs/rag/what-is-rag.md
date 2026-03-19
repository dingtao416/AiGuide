---
title: 什么是 RAG
category: RAG
tag:
  - RAG
  - 检索增强生成
  - LLM应用
---

# 什么是 RAG（检索增强生成）

## 简介

**RAG（Retrieval-Augmented Generation，检索增强生成）** 是一种结合信息检索和文本生成的技术，通过从外部知识库中检索相关信息，增强大语言模型的生成能力，从而产生更准确、更有依据的回答。

## 为什么需要 RAG？

### LLM 的局限性

尽管大语言模型能力强大，但存在以下问题：

| 问题 | 描述 |
|------|------|
| 知识截止 | 训练数据有截止日期，无法获取最新信息 |
| 幻觉问题 | 可能生成看似合理但实际错误的内容 |
| 缺乏专业知识 | 对特定领域或私有数据了解有限 |
| 不可追溯 | 难以追踪答案的来源 |

### RAG 如何解决

```
传统 LLM:  用户问题 → LLM → 回答（可能有幻觉）

RAG 方式:  用户问题 → 检索相关文档 → LLM + 文档 → 有依据的回答
```

## RAG 工作原理

### 基本流程

```
┌─────────────────────────────────────────────────────────────┐
│                        RAG 系统架构                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 用户查询  │ → │  向量化查询   │ → │  向量数据库检索   │  │
│  └──────────┘    └──────────────┘    └──────────────────┘  │
│                                              ↓              │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 生成回答  │ ← │   LLM 生成   │ ← │ 检索到的相关文档  │  │
│  └──────────┘    └──────────────┘    └──────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 核心步骤

#### 1. 索引阶段（Indexing）
构建知识库的索引：

```python
# 伪代码示例
documents = load_documents("./data/")           # 加载文档
chunks = split_into_chunks(documents)            # 文档切分
embeddings = embedding_model.encode(chunks)      # 向量化
vector_store.add(chunks, embeddings)            # 存入向量数据库
```

#### 2. 检索阶段（Retrieval）
根据用户查询检索相关文档：

```python
query = "什么是 Transformer 架构？"
query_embedding = embedding_model.encode(query)
relevant_docs = vector_store.similarity_search(
    query_embedding, 
    top_k=5
)
```

#### 3. 生成阶段（Generation）
将检索结果与问题一起送入 LLM：

```python
prompt = f"""
基于以下参考资料回答问题：

参考资料：
{relevant_docs}

问题：{query}

回答：
"""
response = llm.generate(prompt)
```

## 关键组件

### 1. 文档加载器（Document Loader）
支持多种格式：
- PDF、Word、PPT
- Markdown、HTML
- 数据库、API

### 2. 文本切分器（Text Splitter）
常见策略：
- **固定大小切分**：按字符/Token 数切分
- **语义切分**：按段落、章节切分
- **递归切分**：混合多种分隔符

### 3. 向量模型（Embedding Model）
将文本转换为向量：

| 模型 | 维度 | 特点 |
|------|------|------|
| OpenAI text-embedding-3 | 1536/3072 | 效果好，需付费 |
| BGE | 768/1024 | 中文效果好，开源 |
| M3E | 768 | 中文优化，开源 |
| Jina | 768 | 多语言，开源 |

### 4. 向量数据库（Vector Database）
存储和检索向量：

| 数据库 | 特点 |
|--------|------|
| Chroma | 轻量级，适合开发 |
| Milvus | 高性能，支持大规模 |
| Pinecone | 全托管，易用 |
| Weaviate | 混合搜索支持 |
| Qdrant | 高性能，开源 |

### 5. 检索器（Retriever）
检索策略：
- **相似度搜索**：基于向量余弦相似度
- **混合搜索**：结合关键词和语义搜索
- **重排序**：使用 Reranker 优化结果

## RAG 进阶技术

### 1. 查询改写（Query Rewriting）
优化用户原始查询：
- 扩展查询
- 分解复杂问题
- HyDE（假设性文档嵌入）

### 2. 多路召回（Multi-way Retrieval）
从多个来源/策略获取候选文档：
```
查询 → 向量检索
    → 关键词检索  → 合并 → 重排序 → Top-K
    → 知识图谱
```

### 3. 重排序（Reranking）
使用专门的模型对检索结果重新排序：
- Cross-encoder 模型
- BGE-reranker
- Cohere Rerank

### 4. 上下文压缩（Context Compression）
压缩检索到的文档，只保留相关部分：
- 提取式压缩
- 生成式摘要

## 简单实现示例

使用 LangChain 实现一个基础 RAG：

```python
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = DirectoryLoader("./docs/", glob="**/*.md")
documents = loader.load()

# 2. 切分文档
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

# 3. 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. 创建 RAG 链
llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5})
)

# 5. 提问
response = qa_chain.run("请解释 RAG 的工作原理")
print(response)
```

## RAG vs Fine-tuning

| 方面 | RAG | Fine-tuning |
|------|-----|-------------|
| 知识更新 | 只需更新知识库 | 需要重新训练 |
| 成本 | 较低 | 较高 |
| 可解释性 | 可追溯来源 | 黑盒 |
| 幻觉控制 | 有效减少 | 仍可能存在 |
| 私有数据 | 灵活支持 | 需要大量数据 |
| 实时性 | 支持实时更新 | 不支持 |

## 应用场景

- **企业知识库问答**：基于内部文档的智能客服
- **智能文档助手**：论文阅读、合同分析
- **代码助手**：基于代码库的编程辅助
- **个人知识管理**：笔记搜索和整理

## 学习资源

- [LangChain 文档](https://python.langchain.com/) - 主流 RAG 框架
- [LlamaIndex](https://docs.llamaindex.ai/) - 另一个流行的 RAG 框架
- [RAG 论文原文](https://arxiv.org/abs/2005.11401) - Facebook 的原始论文

## 下一步

- [RAG 系统架构设计](./rag-architecture.md)
- [向量数据库选型](./vector-databases.md)
- [检索策略优化](./retrieval-strategies.md)
