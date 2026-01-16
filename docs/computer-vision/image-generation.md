---
title: 图像生成
icon: image
---

# 图像生成

图像生成是使用 AI 根据文本描述或其他输入创建图像的技术。

## 📌 技术概述

### 主流技术

| 技术 | 代表模型 |
|------|----------|
| Diffusion | Stable Diffusion, DALL-E, Midjourney |
| GAN | StyleGAN, BigGAN |
| VAE | VQ-VAE |
| Autoregressive | DALL-E (v1) |

## 🎨 Diffusion 模型

### 工作原理

```
正向过程：原图 → 逐步加噪 → 纯噪声
反向过程：纯噪声 → 逐步去噪 → 生成图像
```

### Stable Diffusion

```python
from diffusers import StableDiffusionPipeline
import torch

# 加载模型
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# 生成图像
image = pipe("a photo of a cat wearing sunglasses").images[0]
image.save("cat.png")
```

## 🔧 常用服务

| 服务 | 特点 |
|------|------|
| Midjourney | 艺术风格强 |
| DALL-E 3 | OpenAI，质量高 |
| Stable Diffusion | 开源，可本地部署 |

## 📚 延伸阅读

- [计算机视觉基础](/computer-vision/cv-basics)
- [深度学习基础](/deep-learning/neural-networks)
