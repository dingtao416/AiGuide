---
title: HuggingFace
icon: face-smile
---

# HuggingFace

HuggingFace 是 AI 领域最重要的开源平台，提供模型、数据集和工具库。

## 📌 平台概述

HuggingFace 被称为"AI 界的 GitHub"，是开源 AI 社区的核心。

### 核心服务
- **Hub**：模型和数据集托管平台
- **Transformers**：预训练模型库
- **Datasets**：数据集加载库
- **Spaces**：AI 应用托管

## 🚀 Transformers 库

### 安装

```bash
pip install transformers
```

### Pipeline - 最简用法

```python
from transformers import pipeline

# 情感分析
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.9998}]

# 文本生成
generator = pipeline("text-generation", model="gpt2")
text = generator("AI is", max_length=50)

# 问答
qa = pipeline("question-answering")
result = qa(question="What is AI?", context="AI stands for...")

# 翻译
translator = pipeline("translation_en_to_zh", model="Helsinki-NLP/opus-mt-en-zh")
result = translator("Hello, world!")
```

### 使用预训练模型

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

# 加载 tokenizer 和模型
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-hf")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")

# 推理
inputs = tokenizer("Hello, I'm a language model", return_tensors="pt")
outputs = model.generate(**inputs, max_length=50)
text = tokenizer.decode(outputs[0])
```

### 常用 Pipeline

| 任务 | Pipeline |
|------|----------|
| 文本分类 | `text-classification` |
| 命名实体识别 | `ner` |
| 问答 | `question-answering` |
| 文本生成 | `text-generation` |
| 翻译 | `translation` |
| 摘要 | `summarization` |
| 图像分类 | `image-classification` |
| 目标检测 | `object-detection` |

## 📊 Datasets 库

```python
from datasets import load_dataset

# 加载数据集
dataset = load_dataset("imdb")

# 查看数据
print(dataset["train"][0])

# 数据处理
def tokenize(examples):
    return tokenizer(examples["text"], truncation=True)

tokenized = dataset.map(tokenize, batched=True)
```

## 🏠 Hub 使用

### 浏览模型

访问 [huggingface.co/models](https://huggingface.co/models)

### 上传模型

```python
from huggingface_hub import login, HfApi

# 登录
login(token="your_token")

# 上传
model.push_to_hub("your-username/model-name")
tokenizer.push_to_hub("your-username/model-name")
```

### 下载模型

```bash
# CLI
huggingface-cli download meta-llama/Llama-2-7b-hf

# Python
from huggingface_hub import snapshot_download
snapshot_download("meta-llama/Llama-2-7b-hf")
```

## 🔧 模型微调

```python
from transformers import Trainer, TrainingArguments

# 配置训练参数
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    learning_rate=2e-5,
    evaluation_strategy="epoch"
)

# 创建 Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)

# 训练
trainer.train()
```

## 📚 延伸阅读

- [HuggingFace 官网](https://huggingface.co/)
- [Transformers 文档](https://huggingface.co/docs/transformers)
- [什么是 LLM](/llm/what-is-llm)
