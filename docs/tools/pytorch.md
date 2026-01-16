---
title: PyTorch
icon: fire
---

# PyTorch

PyTorch 是当前最流行的深度学习框架，以动态图和 Pythonic 风格著称。

## 📌 框架概述

PyTorch 由 Meta AI 开发，是学术研究和工业应用的首选框架。

### 核心特点
- **动态计算图**：便于调试和灵活编程
- **Pythonic**：符合 Python 编程习惯
- **生态丰富**：HuggingFace, Lightning 等
- **GPU 加速**：无缝切换 CPU/GPU

## 🚀 快速开始

### 安装

```bash
# CPU 版本
pip install torch

# CUDA 版本 (根据 CUDA 版本选择)
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

### 基本张量操作

```python
import torch

# 创建张量
x = torch.tensor([1, 2, 3])
y = torch.zeros(3, 4)
z = torch.randn(3, 4)

# 设备转移
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
x = x.to(device)

# 基本运算
a = torch.randn(3, 4)
b = torch.randn(4, 5)
c = torch.matmul(a, b)  # 矩阵乘法
```

## 🧠 神经网络

### 定义模型

```python
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

model = SimpleNN(784, 256, 10)
```

### 训练循环

```python
import torch.optim as optim

# 准备
model = SimpleNN(784, 256, 10).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练
for epoch in range(num_epochs):
    for batch_x, batch_y in dataloader:
        batch_x, batch_y = batch_x.to(device), batch_y.to(device)
        
        # 前向传播
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        
        # 反向传播
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")
```

### 数据加载

```python
from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

dataset = MyDataset(data, labels)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)
```

## 💾 模型保存与加载

```python
# 保存
torch.save(model.state_dict(), "model.pth")

# 加载
model = SimpleNN(784, 256, 10)
model.load_state_dict(torch.load("model.pth"))
model.eval()
```

## 📊 常用模块

| 模块 | 用途 |
|------|------|
| `torch.nn` | 神经网络层 |
| `torch.optim` | 优化器 |
| `torch.utils.data` | 数据加载 |
| `torchvision` | 计算机视觉 |
| `torchaudio` | 音频处理 |
| `torchtext` | NLP 工具 |

## 📚 延伸阅读

- [PyTorch 官方文档](https://pytorch.org/docs/)
- [深度学习基础](/deep-learning/neural-networks)
- [HuggingFace](/tools/huggingface)
