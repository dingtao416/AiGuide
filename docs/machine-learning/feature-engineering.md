---
title: 特征工程
icon: filter
---

# 特征工程

特征工程是机器学习中将原始数据转换为更好表示的过程，好的特征可以显著提升模型性能。

## 🎯 什么是特征工程

特征工程（Feature Engineering）是指使用领域知识从原始数据中提取、选择和转换特征的过程，以提高机器学习模型的性能。

> "数据和特征决定了机器学习的上限，而模型和算法只是逼近这个上限。" — 机器学习界名言

## 📊 特征工程流程

```
┌─────────────────────────────────────────────────────────────────┐
│                       特征工程流程                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  原始数据 → 数据清洗 → 特征提取 → 特征选择 → 特征转换 → 建模    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 常用技术

### 1. 数值特征处理

#### 标准化 (Standardization)
将数据转换为均值为 0、标准差为 1 的分布。

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```

#### 归一化 (Normalization)
将数据缩放到 [0, 1] 范围。

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X)
```

#### 对数变换
处理偏态分布的数据。

```python
import numpy as np
X_log = np.log1p(X)  # log(1+x)，避免 log(0)
```

### 2. 类别特征处理

#### One-Hot 编码
将类别变量转换为二进制向量。

```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse=False)
X_encoded = encoder.fit_transform(X_categorical)
```

#### Label 编码
将类别映射为整数。

```python
from sklearn.preprocessing import LabelEncoder

encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)
```

#### Target 编码
用目标变量的统计量替换类别值。

```python
# 计算每个类别的目标均值
target_means = df.groupby('category')['target'].mean()
df['category_encoded'] = df['category'].map(target_means)
```

### 3. 缺失值处理

```python
from sklearn.impute import SimpleImputer

# 数值特征用均值填充
num_imputer = SimpleImputer(strategy='mean')

# 类别特征用众数填充
cat_imputer = SimpleImputer(strategy='most_frequent')
```

### 4. 特征生成

#### 多项式特征
```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
```

#### 交叉特征
```python
# 创建交叉特征
df['feature_cross'] = df['feature1'] * df['feature2']
```

#### 时间特征
```python
import pandas as pd

df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
```

## 📈 特征选择

### 1. 过滤法 (Filter)

基于统计检验选择特征：

```python
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X, y)
```

### 2. 包装法 (Wrapper)

使用模型性能选择特征：

```python
from sklearn.feature_selection import RFE
from sklearn.ensemble import RandomForestClassifier

selector = RFE(RandomForestClassifier(), n_features_to_select=10)
X_selected = selector.fit_transform(X, y)
```

### 3. 嵌入法 (Embedded)

利用模型自身的特征重要性：

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X, y)

# 获取特征重要性
importance = model.feature_importances_
```

## 🏆 最佳实践

### ✅ 推荐做法

| 场景 | 建议 |
|------|------|
| 线性模型 | 特征标准化/归一化 |
| 树模型 | 无需标准化 |
| 高基数类别 | Target 编码 |
| 低基数类别 | One-Hot 编码 |
| 偏态数值 | 对数变换 |

### ⚠️ 注意事项

1. **数据泄露**：只在训练集上 fit，再 transform 测试集
2. **特征过多**：可能导致过拟合，需要特征选择
3. **缺失值**：根据业务含义选择填充策略
4. **异常值**：考虑截断或变换处理

## 📚 完整示例

```python
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

# 定义数值和类别特征
numeric_features = ['age', 'income']
categorical_features = ['gender', 'city']

# 数值特征处理流程
numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# 类别特征处理流程
categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# 组合处理器
preprocessor = ColumnTransformer([
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# 在模型 Pipeline 中使用
from sklearn.ensemble import RandomForestClassifier

model = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

model.fit(X_train, y_train)
```

## 📖 延伸阅读

- [机器学习入门](/machine-learning/introduction)
- [模型评估](/machine-learning/model-evaluation)
- [监督学习](/machine-learning/supervised-learning)
