---
title: 神经网络基础
category: 深度学习
tag:
  - DL
  - 神经网络
---

# 神经网络基础

## 什么是神经网络

**神经网络**是模仿生物神经元结构的计算模型，由大量互连的节点（神经元）组成，能够学习复杂的非线性关系。

## 基本结构

```
输入层      隐藏层      输出层
 ○           ○
 ○    →     ○     →     ○
 ○           ○
```

## 神经元模型

```
输入: x₁, x₂, ..., xₙ
      ↓
加权求和: z = Σ(wᵢxᵢ) + b
      ↓
激活函数: a = f(z)
      ↓
输出: a
```

## 激活函数

| 函数 | 公式 | 特点 |
|------|------|------|
| Sigmoid | 1/(1+e⁻ˣ) | 输出(0,1) |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | 输出(-1,1) |
| ReLU | max(0,x) | 最常用 |
| Softmax | eˣⁱ/Σeˣʲ | 多分类输出 |

## 训练过程

1. **前向传播**：计算预测值
2. **计算损失**：与真实值对比
3. **反向传播**：计算梯度
4. **更新参数**：梯度下降

## PyTorch 示例

```python
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 10)
        )
    
    def forward(self, x):
        return self.layers(x)

model = SimpleNN()
```

## 下一步

- [CNN 卷积神经网络](./cnn.md)
- [RNN 循环神经网络](./rnn.md)
- [Transformer](./transformer.md)
