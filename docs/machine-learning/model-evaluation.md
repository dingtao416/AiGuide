---
title: 模型评估
category: 机器学习
tag:
  - ML
  - 评估指标
---

# 模型评估

## 分类评估指标

### 混淆矩阵

```
              预测
           正    负
实际  正  [TP]  [FN]
      负  [FP]  [TN]
```

### 常用指标

| 指标 | 公式 | 说明 |
|------|------|------|
| 准确率 | (TP+TN)/总数 | 整体正确率 |
| 精确率 | TP/(TP+FP) | 预测为正中实际为正 |
| 召回率 | TP/(TP+FN) | 实际为正中被预测为正 |
| F1 | 2×P×R/(P+R) | 精确率和召回率的调和平均 |

### AUC-ROC
ROC 曲线下面积，越接近 1 越好。

## 回归评估指标

| 指标 | 说明 |
|------|------|
| MAE | 平均绝对误差 |
| MSE | 均方误差 |
| RMSE | 均方根误差 |
| R² | 决定系数 |

## 交叉验证

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5)
print(f"平均准确率: {scores.mean():.2f}")
```

## 下一步

- [深度学习](../deep-learning/neural-networks.md)
