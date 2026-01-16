---
title: Claude 模型
category: 大语言模型
tag:
  - LLM
  - Claude
  - Anthropic
---

# Claude 模型

## 简介

**Claude** 是 Anthropic 公司开发的大语言模型，以安全性和长文本处理著称。

## 版本对比

| 版本 | 特点 |
|------|------|
| Claude 2 | 100K 上下文 |
| Claude 3 Haiku | 快速、低成本 |
| Claude 3 Sonnet | 平衡性能和成本 |
| Claude 3 Opus | 最强能力 |
| Claude 3.5 Sonnet | 性价比最高 |

## 核心特点

- **长文本**：支持 200K tokens
- **安全性**：Constitutional AI
- **准确性**：减少幻觉
- **代码能力**：优秀的编程助手

## 使用示例

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "你好"}
    ]
)
print(message.content)
```

## 下一步

- [LLaMA 模型](./llama.md)
- [Qwen 模型](./qwen.md)
