---
title: 深度学习训练技巧
category: 深度学习
tag:
  - DL
  - 训练
---

# 深度学习训练技巧

## 优化器

| 优化器 | 特点 |
|--------|------|
| SGD | 基础，需调学习率 |
| Adam | 自适应学习率，常用 |
| AdamW | 权重衰减修正 |
| LAMB | 大批量训练 |

## 学习率调度

- **StepLR**：阶梯下降
- **CosineAnnealing**：余弦退火
- **WarmupLR**：预热后下降

## 正则化

- **Dropout**：随机丢弃神经元
- **L1/L2 正则**：权重惩罚
- **数据增强**：扩充训练数据

## 批归一化

```python
nn.BatchNorm2d(num_features)
```
加速训练，稳定梯度。

## 梯度技巧

- **梯度裁剪**：防止梯度爆炸
- **梯度累积**：模拟大 batch

## 混合精度训练

使用 FP16 加速训练：
```python
scaler = torch.cuda.amp.GradScaler()
with torch.cuda.amp.autocast():
    output = model(input)
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 过拟合 | 增加数据、Dropout、正则化 |
| 梯度消失 | ReLU、残差连接、BatchNorm |
| 训练不稳定 | 降低学习率、梯度裁剪 |

## 下一步

- [大语言模型](../llm/what-is-llm.md)
