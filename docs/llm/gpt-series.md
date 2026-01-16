---
title: GPT 系列模型
category: 大语言模型
tag:
  - LLM
  - GPT
  - OpenAI
---

# GPT 系列模型

## 发展历程

| 模型 | 发布时间 | 参数量 | 特点 |
|------|----------|--------|------|
| GPT-1 | 2018.6 | 117M | 预训练+微调范式 |
| GPT-2 | 2019.2 | 1.5B | 零样本学习能力 |
| GPT-3 | 2020.6 | 175B | 少样本学习 |
| GPT-3.5 | 2022.3 | - | RLHF，对话能力 |
| GPT-4 | 2023.3 | - | 多模态 |
| GPT-4o | 2024.5 | - | 实时多模态 |

## 核心技术

### 自回归语言模型
```
P(文本) = P(w₁) × P(w₂|w₁) × P(w₃|w₁,w₂) × ...
```

### RLHF（基于人类反馈的强化学习）
1. 预训练基础模型
2. 监督微调（SFT）
3. 训练奖励模型
4. PPO 优化策略

## GPT-4 特点

- 多模态输入（文本+图像）
- 更长上下文（128K tokens）
- 更强推理能力
- 更好的指令遵循

## 使用示例

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "你好"}
    ]
)
print(response.choices[0].message.content)
```

## 下一步

- [Claude 模型](./claude.md)
- [开源模型 LLaMA](./llama.md)
