---
title: 文本生成
icon: pen-to-square
---

# 文本生成

文本生成是让模型根据输入生成连贯文本的任务。

## 📌 任务介绍

### 应用场景
- 对话系统
- 内容创作
- 代码生成
- 机器翻译

## 🔧 生成方法

### 使用 GPT

```python
from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")
result = generator(
    "AI is",
    max_length=50,
    num_return_sequences=1
)
```

### 解码策略

| 策略 | 描述 |
|------|------|
| Greedy | 选择概率最高的 Token |
| Beam Search | 保留多个候选路径 |
| Top-K | 从 Top K 中采样 |
| Top-P | 从累积概率达 P 的集合中采样 |
| Temperature | 调整概率分布的平滑度 |

```python
generator = pipeline("text-generation", model="gpt2")
result = generator(
    "AI is",
    max_length=50,
    do_sample=True,
    temperature=0.7,
    top_p=0.95
)
```

## 📚 延伸阅读

- [什么是 LLM](/llm/what-is-llm)
- [Prompt Engineering](/llm/prompt-engineering)
