---
title: 监督学习
category: 机器学习
tag:
  - ML
  - 监督学习
---

# 监督学习

## 定义

**监督学习（Supervised Learning）** 是机器学习的一种方法，通过从带有标签的训练数据中学习输入和输出之间的映射关系。

```
训练数据 = 输入特征(X) + 标签(Y)
          ↓
       学习算法
          ↓
       模型 f
          ↓
新数据输入 X → 预测输出 Y = f(X)
```

## 任务类型

### 分类（Classification）

预测离散的类别标签。

**二分类示例：**
- 邮件：垃圾 / 正常
- 交易：欺诈 / 正常
- 图片：猫 / 狗

**多分类示例：**
- 手写数字识别：0-9
- 新闻分类：体育/财经/科技/娱乐
- 图像分类：1000 种物体

### 回归（Regression）

预测连续的数值。

**示例：**
- 房价预测
- 销量预测
- 温度预测

## 常见算法

### 1. 线性回归

```python
# 简单线性回归
y = wx + b

# 多元线性回归
y = w1*x1 + w2*x2 + ... + wn*xn + b
```

**适用场景：**
- 特征与目标呈线性关系
- 快速建立 baseline

### 2. 逻辑回归

用于二分类，输出概率值：

```python
# Sigmoid 函数
P(y=1|x) = 1 / (1 + e^(-wx+b))
```

**特点：**
- 简单高效
- 可解释性强
- 输出概率

### 3. 决策树

```
          [年龄 > 30?]
           /        \
         是          否
         /            \
    [收入 > 10万?]   [有房?]
       /   \          /   \
      是   否        是    否
      ↓    ↓         ↓     ↓
     批准  拒绝     批准   拒绝
```

**优点：**
- 可解释性强
- 无需特征缩放
- 可处理非线性

**缺点：**
- 容易过拟合

### 4. 随机森林

集成多棵决策树：

```
决策树1 → 预测1
决策树2 → 预测2  → 投票/平均 → 最终预测
决策树3 → 预测3
  ...
```

**优点：**
- 准确率高
- 不容易过拟合
- 可处理高维数据

### 5. 支持向量机 (SVM)

寻找最优分类超平面：

```
类别 A:  ●●●●
              \
               \ ← 最大间隔超平面
                \
类别 B:          ○○○○
```

**适用场景：**
- 中小规模数据
- 高维特征空间

### 6. K近邻 (KNN)

```
预测点 ⭐ 周围 K 个最近邻居
       ●●○
        ⭐
       ●○○

K=3 时，2○ > 1●，预测为 ○
```

**特点：**
- 简单直观
- 无需训练
- 对数据规模敏感

### 7. 朴素贝叶斯

基于贝叶斯定理：

```
P(类别|特征) ∝ P(特征|类别) × P(类别)
```

**适用场景：**
- 文本分类
- 垃圾邮件检测

## 代码示例

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report

# 准备数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 特征缩放
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 模型列表
models = {
    '逻辑回归': LogisticRegression(),
    '决策树': DecisionTreeClassifier(),
    '随机森林': RandomForestClassifier(),
    'SVM': SVC()
}

# 训练和评估
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    print(f"\n{name}:")
    print(classification_report(y_test, y_pred))
```

## 模型选择建议

| 场景 | 推荐算法 |
|------|----------|
| 快速 baseline | 逻辑回归、决策树 |
| 高精度要求 | 随机森林、XGBoost |
| 可解释性要求 | 决策树、逻辑回归 |
| 小数据量 | SVM |
| 文本分类 | 朴素贝叶斯 |

## 下一步

- [无监督学习](./unsupervised-learning.md)
- [线性回归详解](./linear-regression.md)
- [决策树详解](./decision-tree.md)
