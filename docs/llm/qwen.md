---
title: Qwen 通义千问
category: 大语言模型
tag:
  - LLM
  - Qwen
  - 国产模型
---

# Qwen 通义千问

## 简介

**Qwen（通义千问）** 是阿里云推出的大语言模型系列，中文能力出色，提供开源版本。

## 版本系列

| 模型 | 特点 |
|------|------|
| Qwen | 基础语言模型 |
| Qwen-Chat | 对话模型 |
| Qwen-VL | 视觉语言模型 |
| Qwen-Audio | 语音模型 |
| Qwen2 | 最新版本 |

## 特点

- 优秀的中文能力
- 多模态支持
- 开源可商用
- 长文本支持

## 使用示例

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen2-7B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

messages = [{"role": "user", "content": "你好"}]
text = tokenizer.apply_chat_template(messages, tokenize=False)
inputs = tokenizer(text, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=512)
print(tokenizer.decode(outputs[0]))
```

## 下一步

- [模型微调](./fine-tuning.md)
- [Prompt 工程](./prompt-engineering.md)
