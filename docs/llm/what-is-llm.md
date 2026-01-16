---
title: 什么是大语言模型
category: 大语言模型
tag:
  - LLM
  - AI基础
---

# 什么是大语言模型 (LLM)

## 简介

**大语言模型（Large Language Model，LLM）** 是一种基于深度学习的自然语言处理模型，通过在海量文本数据上进行预训练，学习语言的统计规律和语义知识，从而具备强大的语言理解和生成能力。

## 发展历程

### 早期阶段（2017-2019）
- **Transformer 架构诞生**：2017年 Google 发布 "Attention Is All You Need" 论文
- **BERT**：2018年 Google 发布，开创了预训练+微调的范式
- **GPT**：2018年 OpenAI 发布，采用自回归语言模型

### 规模化阶段（2020-2022）
- **GPT-3**：2020年发布，参数量达到 1750 亿，展现出强大的少样本学习能力
- **涌现能力**：随着模型规模增大，出现了意想不到的能力

### 爆发阶段（2022-至今）
- **ChatGPT**：2022年11月发布，引爆全球 AI 热潮
- **GPT-4**：多模态能力，更强的推理能力
- **开源模型**：LLaMA、Qwen、DeepSeek 等开源模型涌现

## LLM 的核心特点

### 1. 大规模参数
现代 LLM 通常具有数十亿到数千亿的参数：
- GPT-3: 175B 参数
- LLaMA 2: 7B - 70B 参数
- GPT-4: 传闻 1.8T 参数（MoE 架构）

### 2. 预训练+微调范式
```
预训练（Pre-training）
    ↓
[海量无标注文本] → 学习语言知识
    ↓
微调（Fine-tuning）
    ↓
[特定任务数据] → 适应具体任务
```

### 3. 涌现能力（Emergent Abilities）
当模型规模超过一定阈值时，会突然展现出一些能力：
- 思维链推理（Chain-of-Thought）
- 指令遵循（Instruction Following）
- 上下文学习（In-Context Learning）

### 4. 通用性
一个模型可以处理多种任务：
- 文本生成
- 问答对话
- 代码编写
- 翻译总结
- 逻辑推理

## LLM 的基本架构

大多数 LLM 基于 **Transformer** 架构，主要分为三种类型：

| 类型 | 代表模型 | 特点 | 适用任务 |
|------|----------|------|----------|
| Encoder-only | BERT | 双向注意力 | 文本理解、分类 |
| Decoder-only | GPT | 单向注意力 | 文本生成 |
| Encoder-Decoder | T5, BART | 完整架构 | 翻译、摘要 |

目前主流的 LLM（如 GPT、LLaMA）主要采用 **Decoder-only** 架构。

## LLM 的工作原理

### 1. Tokenization（分词）
将文本转换为 Token 序列：
```
"Hello, world!" → [15496, 11, 995, 0]
```

### 2. 自回归生成
基于已有 Token 预测下一个 Token：
```
P(下一个词 | 前面所有词)
```

### 3. 采样策略
- **Temperature**：控制输出的随机性
- **Top-p (Nucleus Sampling)**：只考虑累积概率达到 p 的词
- **Top-k**：只考虑概率最高的 k 个词

## 主流 LLM 对比

| 模型 | 公司 | 特点 |
|------|------|------|
| GPT-4 | OpenAI | 最强综合能力 |
| Claude 3 | Anthropic | 安全性、长文本 |
| Gemini | Google | 多模态原生 |
| LLaMA 3 | Meta | 开源、社区活跃 |
| Qwen | 阿里 | 中文能力强 |
| DeepSeek | DeepSeek | 性价比高 |

## 学习资源

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - Transformer 原始论文
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) - GPT-3 论文
- [LLM Course](https://github.com/mlabonne/llm-course) - 系统学习 LLM 的开源课程

## 下一步

- [LLM 工作原理详解](./how-llm-works.md)
- [主流模型介绍](./gpt-series.md)
- [Prompt 工程入门](./prompt-basics.md)
