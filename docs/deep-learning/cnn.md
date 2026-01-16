---
title: 卷积神经网络 CNN
category: 深度学习
tag:
  - DL
  - CNN
  - 计算机视觉
---

# 卷积神经网络 (CNN)

## 定义

**CNN（Convolutional Neural Network）** 是专门处理网格状数据（如图像）的神经网络，通过卷积操作自动提取特征。

## 核心组件

### 卷积层 (Convolution)
```
输入图像        卷积核        特征图
[1 2 3 4]      [1 0]      
[5 6 7 8]  *   [0 1]   →   特征提取
[9 1 2 3]
```

### 池化层 (Pooling)
降采样，减少参数：
- Max Pooling：取最大值
- Average Pooling：取平均值

### 全连接层 (FC)
最后的分类层

## 经典架构

| 网络 | 年份 | 特点 |
|------|------|------|
| LeNet | 1998 | 首个成功 CNN |
| AlexNet | 2012 | 深度学习革命 |
| VGG | 2014 | 小卷积核堆叠 |
| ResNet | 2015 | 残差连接 |
| EfficientNet | 2019 | 高效缩放 |

## PyTorch 示例

```python
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.fc = nn.Linear(64 * 8 * 8, 10)
```

## 应用

- 图像分类
- 目标检测
- 图像分割
- 人脸识别

## 下一步

- [RNN 循环神经网络](./rnn.md)
- [Transformer](./transformer.md)
