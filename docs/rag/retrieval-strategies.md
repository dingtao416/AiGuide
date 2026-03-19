---
title: 检索策略优化
category: RAG
tag:
  - 检索
  - RAG优化
---

# 检索策略优化

## 基础检索

### 向量相似度搜索
```python
results = vectorstore.similarity_search(query, k=5)
```

### 相似度阈值
```python
results = vectorstore.similarity_search_with_score(query, k=5)
filtered = [doc for doc, score in results if score > 0.7]
```

## 高级策略

### 混合检索
结合关键词和语义搜索：
```
查询 → 关键词检索 → 结果A
    → 向量检索   → 结果B
           ↓
        合并排序 → 最终结果
```

### 重排序 (Reranking)
使用专门的 Reranker 模型优化结果：
```python
from sentence_transformers import CrossEncoder
reranker = CrossEncoder('BAAI/bge-reranker-base')
scores = reranker.predict([(query, doc) for doc in docs])
```

### 查询改写
- 扩展查询关键词
- 生成多个查询变体
- HyDE：生成假设性文档

### 多路召回
```python
# 从不同来源召回
results_1 = vectorstore.search(query)
results_2 = keyword_search(query)
results_3 = knowledge_graph.search(query)

# 融合结果
final = merge_and_dedupe(results_1, results_2, results_3)
```

## 分块策略

| 策略 | 说明 |
|------|------|
| 固定大小 | 按字符数/Token数切分 |
| 语义切分 | 按段落/章节切分 |
| 递归切分 | 多级分隔符 |
| 重叠切分 | 保留上下文连续性 |

## 评估指标

- **召回率**：相关文档被检索到的比例
- **MRR**：Mean Reciprocal Rank
- **NDCG**：归一化折损累计增益

## 下一步

- [AI Agent](../agent/what-is-agent.md)
