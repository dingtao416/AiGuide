---
title: 模型量化
icon: compress
---

# 模型量化

量化是将模型参数从高精度转换为低精度的技术，可以大幅减少模型体积和推理成本。

## 📌 什么是量化

量化（Quantization）是指将模型的权重和/或激活值从高精度（如 FP32、FP16）转换为低精度（如 INT8、INT4）的过程。

### 为什么需要量化？

| 问题 | 量化如何解决 |
|------|-------------|
| 内存占用大 | 降低数值精度，减少内存需求 |
| 推理速度慢 | 低精度计算更快 |
| 部署成本高 | 可以在消费级硬件上运行 |

### 精度对比

| 精度 | 位数 | 每参数内存 | 典型用途 |
|------|------|-----------|----------|
| FP32 | 32 bit | 4 bytes | 训练 |
| FP16/BF16 | 16 bit | 2 bytes | 混合精度训练 |
| INT8 | 8 bit | 1 byte | 推理 |
| INT4 | 4 bit | 0.5 byte | 边缘部署 |

## 🔧 量化方法

### 1. 训练后量化 (PTQ)

Post-Training Quantization，在训练完成后直接量化。

**优点**：简单快速，无需重新训练
**缺点**：可能有精度损失

```python
# 使用 bitsandbytes 进行 INT8 量化
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    load_in_8bit=True,
    device_map="auto"
)
```

### 2. 量化感知训练 (QAT)

Quantization-Aware Training，在训练过程中模拟量化。

**优点**：精度损失更小
**缺点**：需要重新训练

### 3. 常见量化格式

#### GPTQ
- GPU 友好的量化方法
- 支持 2/3/4/8 bit
- 需要校准数据集

```python
from transformers import AutoModelForCausalLM, GPTQConfig

quantization_config = GPTQConfig(
    bits=4,
    dataset="c4",
    tokenizer=tokenizer
)

model = AutoModelForCausalLM.from_pretrained(
    "model_path",
    quantization_config=quantization_config,
    device_map="auto"
)
```

#### AWQ (Activation-aware Weight Quantization)
- 保护重要权重的量化方法
- 精度损失更小
- 推理速度快

#### GGUF/GGML
- llama.cpp 使用的格式
- CPU 友好
- 广泛用于本地部署

```bash
# 使用 llama.cpp 运行 GGUF 模型
./main -m model.Q4_K_M.gguf -p "Hello"
```

## 📊 量化级别对比

以 Llama 2 7B 为例：

| 量化 | 模型大小 | 内存需求 | 相对质量 |
|------|----------|----------|----------|
| FP16 | 14 GB | ~16 GB | 100% |
| INT8 | 7 GB | ~8 GB | ~99% |
| INT4 | 3.5 GB | ~4 GB | ~95% |
| 2-bit | 1.75 GB | ~2 GB | ~85% |

## 🛠️ 实践指南

### 使用 Ollama

```bash
# 自动下载量化版本
ollama pull llama2:7b-q4_0  # 4-bit 量化

# 查看可用量化版本
ollama show llama2
```

### 使用 HuggingFace Transformers

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# 4-bit 量化配置
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=quantization_config,
    device_map="auto"
)
```

### 使用 llama.cpp

```bash
# 转换模型为 GGUF 格式
python convert.py model_path --outtype f16 --outfile model.gguf

# 量化
./quantize model.gguf model-q4_k_m.gguf Q4_K_M
```

## 💡 选择建议

| 场景 | 推荐量化 | 理由 |
|------|----------|------|
| 高质量推理 | INT8 | 精度损失小 |
| 消费级 GPU | INT4 (NF4) | 平衡质量和效率 |
| CPU 推理 | GGUF Q4_K_M | llama.cpp 优化 |
| 移动端部署 | INT4/2-bit | 极致压缩 |
| 微调 | QLoRA (NF4) | 低显存微调 |

## ⚠️ 注意事项

1. **精度损失**：量化越激进，精度损失越大
2. **任务敏感性**：数学推理等任务对量化更敏感
3. **校准数据**：GPTQ 等方法需要代表性数据
4. **硬件支持**：确保硬件支持目标精度

## 📈 量化效果评估

```python
# 评估量化模型
from lm_eval import evaluator

results = evaluator.simple_evaluate(
    model="hf",
    model_args="pretrained=path/to/quantized/model",
    tasks=["hellaswag", "mmlu"],
)
```

## 📚 延伸阅读

- [什么是 LLM](/llm/what-is-llm)
- [模型微调](/llm/fine-tuning)
- [模型部署](/llm/deployment)
