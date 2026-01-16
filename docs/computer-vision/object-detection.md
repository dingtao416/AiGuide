---
title: 目标检测
icon: bullseye
category: 计算机视觉
tag:
  - CV
  - 检测
---

# 目标检测

目标检测是计算机视觉中识别图像中物体位置和类别的任务。

## 📌 任务定义

### 输出内容
- 边界框 (Bounding Box)
- 类别标签
- 置信度分数

```
输入：图像
输出：[(类别, x, y, w, h, confidence), ...]
```

## 🧠 主流方法

### 两阶段检测器

| 模型 | 特点 |
|------|------|
| R-CNN | 开创性工作 |
| Fast R-CNN | 共享特征图 |
| Faster R-CNN | 引入 RPN |

### 单阶段检测器

| 模型 | 特点 |
|------|------|
| YOLO | 实时检测 |
| SSD | 多尺度特征 |
| RetinaNet | Focal Loss |

## 🔧 YOLO 示例

```python
from ultralytics import YOLO

# 加载模型
model = YOLO("yolov8n.pt")

# 推理
results = model("image.jpg")

# 解析结果
for box in results[0].boxes:
    cls = int(box.cls[0])
    conf = float(box.conf[0])
    xyxy = box.xyxy[0].tolist()
    print(f"类别: {cls}, 置信度: {conf:.2f}, 坐标: {xyxy}")
```

## 📊 评估指标

| 指标 | 描述 |
|------|------|
| mAP | 平均精度均值 |
| IoU | 交并比 |
| FPS | 推理速度 |

## 📚 延伸阅读

- [计算机视觉基础](/computer-vision/cv-basics)
- [神经网络基础](/deep-learning/neural-networks)
