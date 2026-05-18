---
title: Gemini 系列模型全览
description: Google 出品的多模态 AI 模型家族，从 Bard 到 Gemini 3.1，一口气搞懂有什么模型、怎么选。零基础友好。
---

# Gemini 系列模型全览

> Google 出品、原生多模态、深度整合谷歌生态 —— 一文搞懂 Gemini 全家桶

## Gemini 是什么？

Gemini 是 Google 开发的 AI 模型家族。它的最大特点是 **原生多模态** —— 从设计之初就同时理解文本、图像、音频、视频和代码，不是后来"拼凑"上去的能力。

把 Gemini 想象成一个**生来就会用多种感官感知世界的 AI**：它不只是"读文字"，还能"看"图片、"听"声音、"理解"视频。

Gemini 还有一个独特优势：**和 Google 生态无缝打通**。Gmail、Google Docs、Google Maps、YouTube、Google Search —— 这些你每天都在用的工具，Gemini 都能直接整合。

## Gemini 进化简史

```
2023 ── Bard 诞生 ── Google 的第一个 AI 聊天机器人，基于 LaMDA
2024 ── Gemini 1.0 ── 正式改名，推出 Ultra/Pro/Nano 三档
2024 ── Gemini 1.5 ── 100万 token 超长上下文，首次超越 GPT-4
2025 ── Gemini 2.5 ── 推理能力大幅提升，Flash 成为性价比之王
2026 ── Gemini 3.x ── 原生图像生成（Nano Banana）、实时音频、视频理解
```

### 关键里程碑

**Bard → Gemini（2024年2月）** — Google 放弃 Bard 品牌，统一更名为 Gemini。同时推出 Ultra（最强）、Pro（平衡）、Nano（手机端）三档。

**Gemini 1.5（2024年）** — 100 万 token 上下文窗口横空出世，一时间成为长文本处理的标杆。实验版甚至支持 1000 万 token。

**Gemini 2.5（2025年）** — 引入"思考"能力，推理水平大幅提升。Flash 模型以极低价格提供接近 Pro 的能力，成为开发者首选。

**Gemini 3.x（2026年）** — 能力全面升级。Nano Banana 原生图像生成内置到模型中，Veo 视频生成成熟，实时音频对话可用。Google 搜索深度整合，让每个回答都能接入实时互联网信息。

## 当前模型线

_截至 2026 年 5 月_

### 主力模型

| 模型                      | 定位           | 一句话                                      |
| ------------------------- | -------------- | ------------------------------------------- |
| **Gemini 3.1 Pro**        | 最强旗舰       | 深度推理、超长上下文（200K+），适合复杂任务 |
| **Gemini 3.1 Flash**      | 速度与智能平衡 | 大多数场景的首选，快且聪明                  |
| **Gemini 3.1 Flash-Lite** | 最经济         | 轻量任务、高并发、成本敏感场景              |

### 专用模型

| 模型                                        | 用途                           |
| ------------------------------------------- | ------------------------------ |
| **Gemini 3 Pro Image**（Nano Banana Pro）   | 专业级图像生成，最高 4K 分辨率 |
| **Gemini 3.1 Flash Image**（Nano Banana 2） | 高吞吐图像生成，2K 分辨率      |
| **Gemini 3.1 Flash Live**                   | 实时音频对话                   |
| **Gemini 3.1 Flash TTS**                    | 文本转语音                     |

### 已弃用

Gemini 2.0 Flash 和 Flash-Lite 将于 2026 年 6 月 1 日退役。

## 我应该用哪个？

| 你的需求             | 推荐                                      |
| -------------------- | ----------------------------------------- |
| 日常聊天、写作、学习 | **Gemini 3.1 Flash** — 免费且好用         |
| 深度分析、复杂推理   | **Gemini 3.1 Pro**                        |
| 画图、图片编辑       | **Gemini 3 Pro Image**（Nano Banana Pro） |
| 大量调用、自动化     | **Gemini 3.1 Flash-Lite**                 |
| 视频生成             | **Veo 3.1**（通过 Gemini 或 API）         |
| 在手机上用           | **Google App 中的 Gemini**                |

## Gemini 的亮点

**1. Google 生态无缝整合**

在 Gmail 中让 Gemini 总结邮件，在 Google Docs 中辅助写作，在 Google Maps 中规划行程 —— 这是其他 AI 做不到的。

**2. 原生多模态**

不只是"能看图片"，而是真正理解图片、视频、音频的内容和关系。上传一段视频，Gemini 能描述画面、分析对话、给出总结。

**3. 超长上下文**

200K+ token 上下文窗口，能一次处理数百页文档。结合 Google Drive 集成，可以直接分析你云盘里的文件。

**4. 搜索接地（Grounding）**

Gemini 可以接入 Google 搜索的实时数据，生成的回答附带来源链接，你需要核实信息时直接点击查看原文。

## 如何开始使用？

**最简单的方式：**

1. 访问 [gemini.google.com](https://gemini.google.com)
2. 用 Google 账号登录（有 Gmail 就行）
3. 开始对话

**免费版就能使用 Gemini 3.1 Flash**，日常使用完全足够。付费版（Gemini Advanced，包含在 Google One AI Premium 中）解锁 Pro 模型和更多功能。

**开发者**可以通过 [Google AI Studio](https://aistudio.google.com) 免费试用所有模型。

---

> 下一步：[Gemini 使用指南](./gemini-practical.html) — 看看 Gemini 的特色功能和 Google 生态整合怎么用。
