---
title: LLM 术语表
icon: list
---

# LLM 术语表

大语言模型领域的核心术语解释。

## 📌 基础概念

### Token（标记）
文本被分词器切分后的最小单位。一个 Token 可能是一个完整单词、词的一部分或标点符号。

- 英文中，1 个单词约 1-2 个 Token
- 中文中，1 个汉字约 1-2 个 Token
- GPT-4 的 Token 上限约 128K

### Tokenizer（分词器）
将文本转换为 Token 序列的工具。常见的 Tokenizer：
- BPE (Byte Pair Encoding)
- WordPiece
- SentencePiece

### Context Window（上下文窗口）
模型一次能处理的最大 Token 数量。

| 模型 | 上下文窗口 |
|------|-----------|
| GPT-3.5 | 4K / 16K |
| GPT-4 | 8K / 32K / 128K |
| Claude 3 | 200K |
| Llama 3 | 8K |

### Parameters（参数量）
模型中可学习的权重数量，通常用 B（十亿）表示。

- GPT-3: 175B
- GPT-4: 推测 ~1.8T（MoE）
- Llama 3: 8B / 70B / 405B

---

## 💬 Prompt 相关

### Prompt（提示词）
输入给模型的文本指令或问题。

### System Prompt（系统提示词）
设定模型角色、行为准则的特殊提示词，通常用户不可见。

```
你是一个专业的技术顾问，回答要简洁准确...
```

### User Prompt（用户提示词）
用户直接输入的问题或指令。

### Few-shot Learning（少样本学习）
在 Prompt 中提供几个示例，引导模型学习任务模式。

```
输入：苹果
输出：水果

输入：汽车
输出：交通工具

输入：电脑
输出：
```

### Zero-shot Learning（零样本学习）
不提供示例，直接让模型完成任务。

### Chain of Thought (CoT)
引导模型逐步推理的提示技术。

```
请一步一步思考这个问题...
```

---

## ⚙️ 模型参数

### Temperature（温度）
控制输出随机性的参数：
- `0`: 确定性输出，选择概率最高的 Token
- `0.7`: 平衡创意和一致性
- `1.0+`: 更随机、更有创意

### Top-K
只从概率最高的 K 个 Token 中采样。

### Top-P（Nucleus Sampling）
从累积概率达到 P 的 Token 集合中采样。

### Max Tokens
限制模型生成的最大 Token 数量。

### Stop Sequences
遇到指定字符串时停止生成。

### Frequency Penalty
惩罚重复出现的 Token，减少重复。

### Presence Penalty
惩罚已出现过的 Token，鼓励多样性。

---

## 🔧 训练相关

### Pre-training（预训练）
在大规模语料上进行无监督训练，学习语言知识。

### Fine-tuning（微调）
在特定任务数据上继续训练预训练模型。

### SFT（Supervised Fine-tuning）
监督微调，使用人工标注的指令-回复数据训练。

### RLHF（Reinforcement Learning from Human Feedback）
基于人类反馈的强化学习：
1. 收集人类偏好数据
2. 训练奖励模型
3. 用 PPO 等算法优化

### DPO（Direct Preference Optimization）
直接偏好优化，RLHF 的简化替代方案。

### LoRA（Low-Rank Adaptation）
低秩适应，高效微调方法，只更新少量参数。

### QLoRA
结合量化和 LoRA，可在消费级 GPU 上微调大模型。

---

## 📊 评估指标

### Perplexity（困惑度）
衡量语言模型预测能力的指标，越低越好。

### BLEU
机器翻译评估指标，比较生成文本与参考文本的 n-gram 重叠。

### ROUGE
文本摘要评估指标，包括 ROUGE-1、ROUGE-2、ROUGE-L。

### Human Evaluation（人工评估）
由人类评估模型输出的质量、准确性、有用性等。

### Benchmark（基准测试）
标准化的评估数据集：
- MMLU：多任务语言理解
- HumanEval：代码生成
- GSM8K：数学推理

---

## ⚠️ 常见问题

### Hallucination（幻觉）
模型生成看似合理但实际错误或虚构的内容。

### Alignment（对齐）
让模型行为符合人类价值观和意图。

### Safety（安全）
防止模型生成有害、偏见或不当内容。

### Jailbreak（越狱）
绕过模型安全限制的技术或 Prompt。

---

## 🚀 部署相关

### Inference（推理）
使用训练好的模型生成输出。

### Latency（延迟）
从输入到输出的响应时间。

### Throughput（吞吐量）
单位时间内处理的请求数或 Token 数。

### Quantization（量化）
降低模型数值精度以减少内存和计算需求：
- FP16：半精度
- INT8：8 位整数
- INT4：4 位整数

### Batching（批处理）
将多个请求合并处理以提高效率。

### KV Cache
缓存注意力计算的 Key-Value，加速自回归生成。

### Streaming（流式输出）
逐 Token 输出，提升用户体验。
