---
title: NLP 基础
icon: language
---

# 自然语言处理基础

自然语言处理（NLP）是让计算机理解和生成人类语言的技术。

## 📌 什么是 NLP

NLP（Natural Language Processing）是 AI 的重要分支，处理人类语言与计算机的交互。

### 核心任务

| 任务 | 描述 | 应用 |
|------|------|------|
| 文本分类 | 将文本归类 | 情感分析、垃圾邮件 |
| 命名实体识别 | 识别实体 | 信息抽取 |
| 机器翻译 | 语言转换 | Google 翻译 |
| 问答系统 | 回答问题 | 智能客服 |
| 文本生成 | 生成文本 | ChatGPT |

## 🔧 基础概念

### 分词 (Tokenization)

```python
# 英文分词
text = "Hello world"
tokens = text.split()  # ['Hello', 'world']

# 中文分词
import jieba
text = "我爱自然语言处理"
tokens = jieba.lcut(text)  # ['我', '爱', '自然语言处理']
```

### 词向量 (Word Embeddings)

将词转换为稠密向量表示。

```python
from gensim.models import Word2Vec

# 训练 Word2Vec
model = Word2Vec(sentences, vector_size=100, window=5)

# 获取词向量
vector = model.wv['king']

# 词语相似度
model.wv.most_similar('king')
```

### 注意力机制

让模型关注输入的重要部分。

## 📊 发展历程

```
规则方法 → 统计方法 → 深度学习 → Transformer → 大语言模型
  1950s      1990s      2013        2017        2022
```

## 📚 延伸阅读

- [Transformer 架构](/deep-learning/transformer)
- [什么是 LLM](/llm/what-is-llm)
- [文本分类](/nlp/text-classification)
