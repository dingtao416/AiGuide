---
title: Transformer 架构
category: 深度学习
tag:
  - DL
  - Transformer
  - LLM
---

# Transformer 架构

## 简介

**Transformer** 是 2017 年提出的革命性架构，完全基于注意力机制，是现代大语言模型的基础。

> "Attention Is All You Need" — Google, 2017

## 核心创新

### 自注意力机制 (Self-Attention)

```
Query(Q)、Key(K)、Value(V)

Attention(Q,K,V) = softmax(QKᵀ/√d) × V
```

让每个位置都能关注序列中的所有位置。

### 多头注意力 (Multi-Head Attention)

多个注意力头并行计算，捕获不同类型的关系。

### 位置编码 (Positional Encoding)

由于没有循环结构，需要显式添加位置信息。

## 架构

```
┌─────────────┐    ┌─────────────┐
│   Encoder   │ →  │   Decoder   │
├─────────────┤    ├─────────────┤
│ Self-Attn   │    │ Masked Attn │
│ Feed Forward│    │ Cross-Attn  │
│     ×N      │    │ Feed Forward│
└─────────────┘    │     ×N      │
                   └─────────────┘
```

## 模型类型

| 类型 | 代表 | 特点 |
|------|------|------|
| Encoder-only | BERT | 双向理解 |
| Decoder-only | GPT | 自回归生成 |
| Encoder-Decoder | T5 | 完整架构 |

## 为什么重要

- 支持并行计算
- 长距离依赖建模
- 扩展性好（Scaling Law）
- 统一多种任务

## 下一步

- [大语言模型](../llm/what-is-llm.md)
- [训练技巧](./training-techniques.md)
