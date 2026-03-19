---
title: 决策树
category: 机器学习
tag:
  - ML
  - 分类
---

# 决策树

## 定义

**决策树**是一种树形结构的分类/回归算法，通过一系列决策规则对数据进行划分。

## 结构示例

```
          [天气晴朗?]
           /      \
         是        否
        /            \
   [温度>30°?]      打球
      /   \
    是     否
    ↓      ↓
  不打球  打球
```

## 关键概念

- **信息增益**：选择最佳分裂特征
- **基尼系数**：衡量不纯度
- **剪枝**：防止过拟合

## 代码示例

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

## 优缺点

**优点：**
- 可解释性强
- 无需特征缩放

**缺点：**
- 容易过拟合
- 对数据变化敏感

## 下一步

- [模型评估](./model-evaluation.md)
