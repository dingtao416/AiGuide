---
title: 线性回归
category: 机器学习
tag:
  - ML
  - 回归
---

# 线性回归

## 定义

**线性回归**是预测连续值的基础算法，假设特征与目标之间存在线性关系。

## 公式

```
y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
```

## 损失函数

均方误差（MSE）：
```
MSE = (1/n) Σ(yᵢ - ŷᵢ)²
```

## 代码示例

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

## 注意事项

- 假设线性关系
- 对异常值敏感
- 需要特征缩放（正则化时）

## 下一步

- [决策树](./decision-tree.md)
- [模型评估](./model-evaluation.md)
