---
title: 文本分类
icon: tags
---

# 文本分类

文本分类是 NLP 的基础任务，将文本归类到预定义的类别中。

## 📌 任务介绍

### 应用场景
- 情感分析（正面/负面）
- 垃圾邮件检测
- 新闻分类
- 意图识别

## 🔧 实现方法

### 使用 Transformers

```python
from transformers import pipeline

classifier = pipeline("text-classification")
result = classifier("I love this movie!")
# [{'label': 'POSITIVE', 'score': 0.9998}]
```

### 微调 BERT

```python
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments
)

tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-chinese",
    num_labels=2
)

# 训练
trainer = Trainer(model=model, args=training_args, train_dataset=dataset)
trainer.train()
```

## 📊 评估指标

| 指标 | 描述 |
|------|------|
| 准确率 | 正确预测的比例 |
| 精确率 | 预测正确的正例比例 |
| 召回率 | 找到的正例比例 |
| F1 | 精确率和召回率的调和平均 |

## 📚 延伸阅读

- [NLP 基础](/nlp/nlp-basics)
- [HuggingFace](/tools/huggingface)
