---
title: 向量数据库
category: RAG
tag:
  - 向量数据库
  - VectorDB
---

# 向量数据库

## 什么是向量数据库

**向量数据库**是专门存储和检索高维向量的数据库，支持高效的相似性搜索。

## 主流选择

| 数据库 | 类型 | 特点 |
|--------|------|------|
| Chroma | 嵌入式 | 轻量级，开发友好 |
| Milvus | 分布式 | 高性能，大规模 |
| Pinecone | 云服务 | 全托管 |
| Weaviate | 开源 | 混合搜索 |
| Qdrant | 开源 | 高性能 |
| FAISS | 库 | Facebook 出品 |
| pgvector | 扩展 | PostgreSQL 插件 |

## Chroma 示例

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("docs")

# 添加文档
collection.add(
    documents=["文档1", "文档2"],
    ids=["id1", "id2"]
)

# 查询
results = collection.query(
    query_texts=["查询内容"],
    n_results=5
)
```

## Milvus 示例

```python
from pymilvus import connections, Collection

connections.connect("default", host="localhost", port="19530")
collection = Collection("docs")

# 搜索
results = collection.search(
    data=[query_embedding],
    anns_field="embedding",
    limit=10
)
```

## 选型建议

- **开发测试**：Chroma
- **生产环境**：Milvus、Qdrant
- **不想运维**：Pinecone
- **已有 PostgreSQL**：pgvector

## 下一步

- [检索策略](./retrieval-strategies.md)
