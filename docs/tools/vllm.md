---
title: vLLM
icon: rocket
---

# vLLM

vLLM 是高性能 LLM 推理引擎，专为生产环境设计。

## 📌 工具概述

vLLM 由 UC Berkeley 开发，以其创新的 PagedAttention 技术著称。

### 核心特点
- **高吞吐量**：PagedAttention 技术
- **低延迟**：持续批处理
- **易部署**：OpenAI 兼容 API
- **多模型**：支持主流 LLM

## 🚀 快速开始

### 安装

```bash
pip install vllm
```

### 离线推理

```python
from vllm import LLM, SamplingParams

# 加载模型
llm = LLM(model="meta-llama/Llama-2-7b-chat-hf")

# 配置参数
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=256
)

# 生成
prompts = ["你好，请介绍一下自己", "什么是人工智能？"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(output.outputs[0].text)
```

### 启动 API 服务

```bash
python -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Llama-2-7b-chat-hf \
    --host 0.0.0.0 \
    --port 8000
```

### 调用 API

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="token"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-2-7b-chat-hf",
    messages=[{"role": "user", "content": "你好"}]
)
```

## ⚡ 核心技术

### PagedAttention

将 KV Cache 分页管理，大幅减少内存浪费。

```
传统方式：连续分配 → 内存碎片多
PagedAttention：分页管理 → 内存利用率高
```

### Continuous Batching

动态批处理，新请求无需等待。

## 🔧 常用配置

```bash
python -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Llama-2-7b-chat-hf \
    --tensor-parallel-size 2 \           # 多 GPU
    --gpu-memory-utilization 0.9 \       # GPU 内存使用率
    --max-model-len 4096 \               # 最大上下文
    --quantization awq                    # 量化
```

## 📊 性能对比

| 引擎 | 吞吐量 | 延迟 |
|------|--------|------|
| HuggingFace | 1x | 高 |
| TGI | 3-4x | 中 |
| vLLM | 10-24x | 低 |

## 📚 延伸阅读

- [vLLM 官方文档](https://docs.vllm.ai/)
- [模型部署](/llm/deployment)
- [模型量化](/llm/quantization)
