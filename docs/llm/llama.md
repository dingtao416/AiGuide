---
title: LLaMA 开源模型
category: 大语言模型
tag:
  - LLM
  - LLaMA
  - 开源
---

# LLaMA 开源模型

## 简介

**LLaMA（Large Language Model Meta AI）** 是 Meta 发布的开源大语言模型系列，推动了开源 LLM 生态的繁荣。

## 版本演进

| 版本 | 参数量 | 特点 |
|------|--------|------|
| LLaMA 1 | 7B-65B | 首次开源 |
| LLaMA 2 | 7B-70B | 商用许可 |
| LLaMA 3 | 8B-70B | 更强性能 |
| LLaMA 3.1 | 8B-405B | 最大开源模型 |

## 衍生模型

开源社区基于 LLaMA 开发了大量优秀模型：
- **Alpaca**：指令微调
- **Vicuna**：对话微调
- **Chinese-LLaMA**：中文增强
- **CodeLlama**：代码能力

## 使用方式

### Transformers

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
```

### Ollama（本地部署）

```bash
ollama run llama3
```

## 下一步

- [Qwen 模型](./qwen.md)
- [模型微调](./fine-tuning.md)
