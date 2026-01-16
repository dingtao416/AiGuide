---
title: 图像分类
category: 计算机视觉
tag:
  - CV
  - 分类
---

# 图像分类

## 任务定义

输入图像，输出类别标签。

## 经典数据集

| 数据集 | 类别 | 规模 |
|--------|------|------|
| MNIST | 10 | 70K |
| CIFAR-10 | 10 | 60K |
| ImageNet | 1000 | 1.2M |

## PyTorch 示例

```python
import torchvision.models as models
from torchvision import transforms
from PIL import Image

# 加载预训练模型
model = models.resnet50(pretrained=True)
model.eval()

# 预处理
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225])
])

# 推理
img = Image.open("image.jpg")
input_tensor = transform(img).unsqueeze(0)
output = model(input_tensor)
predicted_class = output.argmax(1)
```

## 下一步

- [目标检测](./object-detection.md)
