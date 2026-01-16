---
title: 模型部署
icon: server
---

# 模型部署

将训练好的大语言模型部署到生产环境，提供稳定高效的推理服务。

## 📌 部署概述

模型部署是将 LLM 从开发环境转移到生产环境的过程，需要考虑性能、成本、可用性等因素。

### 部署挑战

| 挑战 | 描述 |
|------|------|
| 内存占用 | 大模型需要大量 GPU 显存 |
| 推理延迟 | 自回归生成较慢 |
| 并发处理 | 同时服务多个请求 |
| 成本控制 | GPU 资源昂贵 |

## 🚀 部署方案

### 1. 云端 API 服务

直接使用云服务商提供的 API。

**适用场景**：快速启动、无运维负担

```python
from openai import OpenAI

client = OpenAI(api_key="your-api-key")
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**主流服务商**：
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- 阿里云 (通义千问)
- 百度 (文心一言)

### 2. 自托管部署

在自己的服务器上部署模型。

#### vLLM

高性能推理引擎，支持 PagedAttention。

```python
from vllm import LLM, SamplingParams

# 加载模型
llm = LLM(model="meta-llama/Llama-2-7b-chat-hf")

# 配置采样参数
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=256
)

# 批量推理
prompts = ["Hello, how are you?", "What is AI?"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(output.outputs[0].text)
```

启动 API 服务：
```bash
python -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Llama-2-7b-chat-hf \
    --port 8000
```

#### Text Generation Inference (TGI)

HuggingFace 的推理服务器。

```bash
# Docker 部署
docker run --gpus all -p 8080:80 \
    -v /path/to/model:/model \
    ghcr.io/huggingface/text-generation-inference:latest \
    --model-id /model
```

#### Ollama

本地部署最简单的方案。

```bash
# 安装并运行
ollama pull llama2
ollama serve

# API 调用
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Hello!"
}'
```

### 3. 容器化部署

使用 Docker 和 Kubernetes 进行容器化部署。

```dockerfile
# Dockerfile
FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

RUN pip install vllm

COPY . /app
WORKDIR /app

CMD ["python", "-m", "vllm.entrypoints.openai.api_server", \
     "--model", "/model", "--port", "8000"]
```

```yaml
# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: llm-server
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: llm
        image: llm-server:latest
        resources:
          limits:
            nvidia.com/gpu: 1
        ports:
        - containerPort: 8000
```

## ⚡ 性能优化

### 1. 模型优化

| 技术 | 效果 |
|------|------|
| 量化 | 减少内存，加速推理 |
| 模型剪枝 | 减少参数量 |
| 知识蒸馏 | 用小模型替代大模型 |

### 2. 推理优化

#### KV Cache
缓存注意力计算结果，避免重复计算。

#### Continuous Batching
动态批处理，提高吞吐量。

```python
# vLLM 自动支持 continuous batching
llm = LLM(
    model="model_path",
    max_num_batched_tokens=8192
)
```

#### Speculative Decoding
使用小模型预测，大模型验证。

### 3. 硬件优化

| 硬件 | 适用场景 |
|------|----------|
| NVIDIA A100 | 高性能生产环境 |
| NVIDIA T4 | 性价比部署 |
| AMD MI250 | 替代方案 |
| Apple M-series | 本地开发 |

## 🔧 部署架构

### 单机部署

```
┌─────────────────────────────────────┐
│              负载均衡               │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         推理服务器 (vLLM)            │
│     ┌─────────────────────────┐     │
│     │      LLM Model          │     │
│     │    (GPU Memory)         │     │
│     └─────────────────────────┘     │
└─────────────────────────────────────┘
```

### 分布式部署

```
┌──────────────────────────────────────────────┐
│                  网关 / 负载均衡              │
└──────────────┬───────────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐
│ Node1 │  │ Node2 │  │ Node3 │
│ GPU×4 │  │ GPU×4 │  │ GPU×4 │
└───────┘  └───────┘  └───────┘
```

## 📊 监控与运维

### 关键指标

| 指标 | 描述 | 目标 |
|------|------|------|
| Latency (TTFT) | 首 Token 延迟 | < 500ms |
| Latency (TPS) | Token 生成速度 | > 30 tokens/s |
| Throughput | 吞吐量 | 最大化 |
| GPU Utilization | GPU 利用率 | > 80% |

### 监控工具

```python
# Prometheus 指标示例
from prometheus_client import Counter, Histogram

request_counter = Counter('llm_requests_total', 'Total requests')
latency_histogram = Histogram('llm_latency_seconds', 'Request latency')
```

## 💰 成本估算

### GPU 云服务价格（参考）

| GPU | 云服务商 | 价格/小时 |
|-----|----------|-----------|
| A100 40GB | AWS | ~$3.5 |
| A10G | AWS | ~$1.2 |
| T4 | AWS | ~$0.5 |

### 成本优化建议

1. **使用量化模型**：降低 GPU 需求
2. **Spot 实例**：非关键场景使用竞价实例
3. **自动扩缩容**：根据负载动态调整
4. **混合部署**：热门请求用 API，长尾请求自建

## 📚 延伸阅读

- [模型量化](/llm/quantization)
- [vLLM 官方文档](https://docs.vllm.ai/)
- [Ollama 工具](/tools/ollama)
