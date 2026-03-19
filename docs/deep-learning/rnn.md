---
title: 循环神经网络 RNN
category: 深度学习
tag:
  - DL
  - RNN
  - 序列模型
---

# 循环神经网络 (RNN)

## 定义

**RNN（Recurrent Neural Network）** 是处理序列数据的神经网络，具有记忆能力，可以处理变长输入。

## 结构

```
    h₀ → h₁ → h₂ → h₃
         ↑    ↑    ↑
        x₁   x₂   x₃
```

隐藏状态 h 在时间步之间传递，携带历史信息。

## 变体

| 类型 | 特点 |
|------|------|
| LSTM | 长短期记忆，解决梯度消失 |
| GRU | 门控循环单元，简化版 LSTM |
| Bi-RNN | 双向 RNN |

## LSTM 结构

```
遗忘门: 决定丢弃哪些信息
输入门: 决定存储哪些新信息
输出门: 决定输出哪些信息
```

## 应用

- 语言模型
- 机器翻译
- 语音识别
- 时间序列预测

## 局限性

- 难以并行化
- 长序列处理困难
- 已被 Transformer 取代

## 下一步

- [Transformer](./transformer.md)
- [训练技巧](./training-techniques.md)
