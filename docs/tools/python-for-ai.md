---
title: Python AI 开发
icon: python
---

# Python AI 开发

Python 是 AI 开发的首选语言，本文介绍 AI 开发必备的 Python 知识。

## 📌 为什么选择 Python

- **生态丰富**：NumPy, Pandas, PyTorch, TensorFlow
- **易学易用**：语法简洁，上手快
- **社区活跃**：大量教程和开源项目
- **工具支持**：Jupyter, Colab 等

## 🚀 环境配置

### Conda 环境管理

```bash
# 安装 Miniconda
# 下载地址: https://docs.conda.io/en/latest/miniconda.html

# 创建环境
conda create -n ai python=3.10

# 激活环境
conda activate ai

# 安装依赖
pip install numpy pandas torch transformers
```

### 虚拟环境

```bash
# 创建虚拟环境
python -m venv venv

# 激活 (Windows)
venv\Scripts\activate

# 激活 (Linux/Mac)
source venv/bin/activate
```

## 📊 核心库

### NumPy - 数值计算

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])

# 矩阵运算
matrix = np.random.randn(3, 4)
result = np.dot(matrix, matrix.T)

# 广播
a = np.array([[1], [2], [3]])
b = np.array([1, 2, 3])
c = a + b  # 3x3 矩阵
```

### Pandas - 数据处理

```python
import pandas as pd

# 读取数据
df = pd.read_csv("data.csv")

# 数据处理
df['new_col'] = df['col1'] + df['col2']
df_filtered = df[df['value'] > 0]

# 分组统计
df.groupby('category')['value'].mean()
```

### Matplotlib - 可视化

```python
import matplotlib.pyplot as plt

# 绑图
plt.figure(figsize=(10, 6))
plt.plot(x, y, label='data')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()
```

## 🧠 AI 相关库

### Transformers

```python
from transformers import pipeline

# 文本分类
classifier = pipeline("sentiment-analysis")
result = classifier("I love AI!")

# 文本生成
generator = pipeline("text-generation", model="gpt2")
text = generator("AI is", max_length=50)
```

### LangChain

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
response = llm.invoke("Hello!")
```

### OpenAI SDK

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## 💡 最佳实践

### 项目结构

```
my_ai_project/
├── src/
│   ├── __init__.py
│   ├── model.py
│   └── utils.py
├── tests/
├── notebooks/
├── data/
├── requirements.txt
└── README.md
```

### 依赖管理

```txt
# requirements.txt
numpy>=1.24.0
pandas>=2.0.0
torch>=2.0.0
transformers>=4.30.0
langchain>=0.1.0
```

## 📚 延伸阅读

- [PyTorch 入门](/tools/pytorch)
- [HuggingFace 使用](/tools/huggingface)
