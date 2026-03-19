---
title: 无监督学习
category: 机器学习
tag:
  - ML
  - 无监督学习
---

# 无监督学习

## 定义

**无监督学习（Unsupervised Learning）** 是从无标签数据中发现隐藏模式和结构的机器学习方法。

## 主要任务

### 聚类（Clustering）
将相似数据分组：
- **K-Means**：基于距离的聚类
- **DBSCAN**：基于密度的聚类
- **层次聚类**：构建聚类树

### 降维（Dimensionality Reduction）
减少特征数量：
- **PCA**：主成分分析
- **t-SNE**：可视化降维
- **UMAP**：保持局部结构

### 异常检测
发现异常数据点：
- 孤立森林
- 基于密度的方法

## K-Means 示例

```python
from sklearn.cluster import KMeans

# 创建模型
kmeans = KMeans(n_clusters=3)

# 拟合数据
kmeans.fit(X)

# 获取聚类标签
labels = kmeans.labels_
```

## 应用场景

- 客户分群
- 图像压缩
- 推荐系统
- 异常检测

## 下一步

- [强化学习](./reinforcement-learning.md)
- [模型评估](./model-evaluation.md)
