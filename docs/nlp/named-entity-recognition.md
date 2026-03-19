---
title: 命名实体识别
icon: user-tag
---

# 命名实体识别 (NER)

命名实体识别（Named Entity Recognition）是从文本中识别出人名、地名、机构名等实体的任务。

## 📌 任务介绍

### 常见实体类型

| 类型 | 标签 | 示例 |
|------|------|------|
| 人名 | PER | 张三、Elon Musk |
| 地名 | LOC | 北京、California |
| 机构 | ORG | 阿里巴巴、Google |
| 时间 | TIME | 2024年、明天 |

## 🔧 实现方法

### 使用 Transformers

```python
from transformers import pipeline

ner = pipeline("ner", grouped_entities=True)
result = ner("Apple was founded by Steve Jobs in California.")
# [{'entity_group': 'ORG', 'word': 'Apple', ...},
#  {'entity_group': 'PER', 'word': 'Steve Jobs', ...},
#  {'entity_group': 'LOC', 'word': 'California', ...}]
```

### BIO 标注格式

```
B-PER: 实体开始
I-PER: 实体内部
O: 非实体

张   三   是   北   京   人
B-PER I-PER O  B-LOC I-LOC O
```

## 📚 延伸阅读

- [NLP 基础](/nlp/nlp-basics)
- [文本分类](/nlp/text-classification)
