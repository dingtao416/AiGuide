---
title: 文本向量化 Embedding
category: RAG
tag:
  - Embedding
  - 向量化
---

# 文本向量化 (Embedding)

## 什么是 Embedding

**Embedding（嵌入）** 是将文本转换为稠密向量表示的技术，使语义相似的文本在向量空间中距离更近。

## 工作原理

```
文本: "机器学习"
     ↓
Embedding Model
     ↓
向量: [0.12, -0.34, 0.56, ..., 0.78]
```

## 常用模型

| 模型 | 维度 | 特点 |
|------|------|------|
| OpenAI text-embedding-3-small | 1536 | 效果好 |
| BGE-large-zh | 1024 | 中文最佳 |
| M3E | 768 | 中文优化 |
| Jina | 768 | 多语言 |
| GTE | 768 | 通用 |

## 使用示例

```python
# OpenAI
from openai import OpenAI
client = OpenAI()
response = client.embeddings.create(
    input="你好世界",
    model="text-embedding-3-small"
)
embedding = response.data[0].embedding

# Sentence Transformers
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('BAAI/bge-large-zh-v1.5')
embedding = model.encode("你好世界")
```

## 相似度计算

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
```

## 下一步

- [向量数据库](./vector-database.md)
- [检索策略](./retrieval-strategies.md)
