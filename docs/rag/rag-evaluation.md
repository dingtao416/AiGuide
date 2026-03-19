---
title: RAG 评估
icon: chart-line
---

# RAG 评估

系统化评估 RAG 系统的性能，确保检索和生成质量。

## 📌 评估维度

RAG 系统评估主要关注三个方面：

```
┌─────────────────────────────────────────────────────────┐
│                    RAG 评估框架                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   检索质量    │  │   生成质量    │  │   端到端     │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ - 召回率     │  │ - 准确性     │  │ - 用户满意度 │   │
│  │ - 精确率     │  │ - 流畅度     │  │ - 任务完成率 │   │
│  │ - 相关性     │  │ - 相关性     │  │ - 响应时间   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📊 检索评估

### 1. 传统指标

#### 召回率 (Recall)

检索到的相关文档占所有相关文档的比例。

```python
def recall_at_k(retrieved_docs, relevant_docs, k):
    retrieved_set = set(retrieved_docs[:k])
    relevant_set = set(relevant_docs)
    return len(retrieved_set & relevant_set) / len(relevant_set)
```

#### 精确率 (Precision)

检索结果中相关文档的比例。

```python
def precision_at_k(retrieved_docs, relevant_docs, k):
    retrieved_set = set(retrieved_docs[:k])
    relevant_set = set(relevant_docs)
    return len(retrieved_set & relevant_set) / k
```

#### MRR (Mean Reciprocal Rank)

第一个相关文档排名的倒数。

```python
def mrr(retrieved_docs, relevant_docs):
    for i, doc in enumerate(retrieved_docs):
        if doc in relevant_docs:
            return 1 / (i + 1)
    return 0
```

### 2. 语义相关性

使用 LLM 或交叉编码器评估检索文档与查询的相关性。

```python
from sentence_transformers import CrossEncoder

model = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def score_relevance(query, documents):
    pairs = [[query, doc] for doc in documents]
    scores = model.predict(pairs)
    return scores
```

## 📝 生成评估

### 1. 忠实度 (Faithfulness)

生成内容是否基于检索到的上下文，避免幻觉。

```python
# 使用 RAGAS 评估忠实度
from ragas.metrics import faithfulness
from ragas import evaluate

result = evaluate(
    dataset,
    metrics=[faithfulness]
)
```

### 2. 答案相关性 (Answer Relevancy)

生成的答案是否回答了用户的问题。

```python
from ragas.metrics import answer_relevancy

result = evaluate(
    dataset,
    metrics=[answer_relevancy]
)
```

### 3. 上下文利用率

检索内容被有效利用的程度。

```python
from ragas.metrics import context_utilization

result = evaluate(
    dataset,
    metrics=[context_utilization]
)
```

## 🔧 评估工具

### RAGAS

专门用于 RAG 评估的框架。

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset

# 准备评估数据
eval_data = {
    "question": ["什么是RAG?"],
    "answer": ["RAG是检索增强生成..."],
    "contexts": [["RAG全称是...", "RAG的优势是..."]],
    "ground_truth": ["RAG（检索增强生成）是一种..."]
}

dataset = Dataset.from_dict(eval_data)

# 执行评估
result = evaluate(
    dataset,
    metrics=[
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall
    ]
)

print(result)
```

### LangSmith

LangChain 的追踪和评估平台。

```python
from langsmith import Client
from langsmith.evaluation import evaluate

client = Client()

# 定义评估函数
def relevance_evaluator(run, example):
    # 评估逻辑
    return {"score": 0.9}

# 执行评估
evaluate(
    lambda x: rag_chain.invoke(x),
    data="dataset_name",
    evaluators=[relevance_evaluator]
)
```

### DeepEval

另一个流行的评估框架。

```python
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

test_case = LLMTestCase(
    input="什么是RAG?",
    actual_output="RAG是检索增强生成...",
    retrieval_context=["RAG全称是...", "RAG的优势是..."]
)

metric = AnswerRelevancyMetric()
metric.measure(test_case)
print(metric.score)
```

## 📈 评估流程

### 1. 构建评估数据集

```python
# 评估数据集结构
eval_dataset = [
    {
        "query": "用户问题",
        "ground_truth": "标准答案",
        "relevant_docs": ["相关文档1", "相关文档2"]
    },
    # ...
]
```

### 2. 自动化评估流程

```python
def evaluate_rag_system(rag_chain, eval_dataset):
    results = []
    
    for item in eval_dataset:
        # 执行 RAG
        response = rag_chain.invoke(item["query"])
        
        # 计算指标
        result = {
            "query": item["query"],
            "response": response["answer"],
            "retrieved_docs": response["source_documents"],
            "retrieval_score": calculate_retrieval_metrics(
                response["source_documents"],
                item["relevant_docs"]
            ),
            "generation_score": calculate_generation_metrics(
                response["answer"],
                item["ground_truth"]
            )
        }
        results.append(result)
    
    return aggregate_results(results)
```

### 3. 持续监控

```python
# 生产环境监控
import logging

def monitor_rag_quality(query, response, feedback=None):
    metrics = {
        "latency": response["latency"],
        "num_retrieved": len(response["contexts"]),
        "confidence": response.get("confidence"),
        "user_feedback": feedback
    }
    
    logging.info(f"RAG Metrics: {metrics}")
    
    # 发送到监控系统
    send_to_monitoring(metrics)
```

## 💡 最佳实践

### 评估建议

| 场景 | 重点指标 |
|------|----------|
| 问答系统 | 准确性、忠实度 |
| 客服机器人 | 相关性、用户满意度 |
| 知识检索 | 召回率、精确率 |
| 内容生成 | 流畅度、一致性 |

### 常见问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 召回率低 | 检索策略不佳 | 优化 Embedding、混合检索 |
| 幻觉严重 | 上下文不足 | 增加检索数量、优化 Prompt |
| 答案不相关 | 检索质量差 | 重排序、优化分块 |

## 📚 延伸阅读

- [什么是 RAG](/rag/what-is-rag)
- [检索策略](/rag/retrieval-strategies)
- [RAGAS 文档](https://docs.ragas.io/)
