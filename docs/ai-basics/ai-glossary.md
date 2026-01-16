---
title: AI 术语表
icon: book
---

# AI 术语表

本页面收录 AI 领域常用术语，帮助你快速理解相关概念。

## 📌 基础概念

### 人工智能 (Artificial Intelligence, AI)
使计算机系统能够执行通常需要人类智能的任务，如学习、推理、感知和决策。

### 机器学习 (Machine Learning, ML)
AI 的子领域，让计算机能够从数据中学习，而无需明确编程。

### 深度学习 (Deep Learning, DL)
机器学习的子集，使用多层神经网络来学习数据的层次表示。

### 神经网络 (Neural Network, NN)
受生物神经系统启发的计算模型，由相互连接的节点（神经元）组成。

---

## 🧠 模型与训练

### 模型 (Model)
从数据中学习得到的数学表示，可用于预测或生成。

### 参数 (Parameters)
模型内部可学习的数值，通过训练过程调整。

### 权重 (Weights)
神经网络中连接不同神经元的参数值。

### 偏置 (Bias)
神经网络中的额外参数，帮助模型更好地拟合数据。

### 训练 (Training)
使用数据调整模型参数的过程。

### 推理 (Inference)
使用训练好的模型进行预测的过程。

### 过拟合 (Overfitting)
模型在训练数据上表现很好，但在新数据上表现差。

### 欠拟合 (Underfitting)
模型过于简单，无法捕捉数据中的规律。

### 损失函数 (Loss Function)
衡量模型预测与真实值差距的函数。

### 梯度下降 (Gradient Descent)
通过计算梯度来最小化损失函数的优化算法。

### 学习率 (Learning Rate)
控制模型参数更新步长的超参数。

### Epoch
完整遍历训练数据集一次。

### Batch Size
一次训练迭代中使用的样本数量。

---

## 🔤 自然语言处理 (NLP)

### Token
文本被分割后的基本单元，可以是单词、子词或字符。

### Tokenization
将文本分割成 Token 的过程。

### Embedding
将离散数据（如单词）映射为连续向量的表示。

### 注意力机制 (Attention)
让模型能够关注输入的不同部分的机制。

### Transformer
一种基于自注意力机制的神经网络架构。

### 上下文窗口 (Context Window)
模型一次能处理的最大 Token 数量。

---

## 💬 大语言模型 (LLM)

### 大语言模型 (Large Language Model, LLM)
具有大量参数、在海量文本上训练的语言模型。

### GPT (Generative Pre-trained Transformer)
OpenAI 开发的生成式预训练 Transformer 模型。

### Prompt
给模型的输入指令或问题。

### Prompt Engineering
设计和优化 Prompt 以获得更好输出的技术。

### System Prompt
定义模型角色和行为的系统级指令。

### Temperature
控制模型输出随机性的参数，越高越随机。

### Top-K / Top-P
控制模型采样策略的参数。

### Fine-tuning
在特定数据集上进一步训练预训练模型。

### RLHF (Reinforcement Learning from Human Feedback)
使用人类反馈进行强化学习的训练方法。

### 幻觉 (Hallucination)
模型生成看似合理但实际错误的内容。

---

## 📚 RAG 相关

### RAG (Retrieval-Augmented Generation)
检索增强生成，结合检索和生成的技术。

### 向量数据库 (Vector Database)
专门存储和检索向量的数据库。

### 相似度搜索 (Similarity Search)
根据向量相似度查找最相关内容。

### Chunk
将长文档分割成的小片段。

### Rerank
对检索结果进行重新排序。

---

## 🤖 AI Agent

### Agent
能够感知环境、做出决策并执行动作的 AI 系统。

### Tool Use
Agent 调用外部工具完成任务的能力。

### ReAct
Reasoning + Acting，一种 Agent 推理框架。

### Planning
Agent 分解任务、制定计划的能力。

### Memory
Agent 存储和检索历史信息的能力。

---

## 📊 评估指标

### 准确率 (Accuracy)
预测正确的样本比例。

### 精确率 (Precision)
预测为正的样本中实际为正的比例。

### 召回率 (Recall)
实际为正的样本中被正确预测的比例。

### F1 Score
精确率和召回率的调和平均。

### Perplexity
衡量语言模型预测能力的指标。

### BLEU
评估机器翻译质量的指标。

---

## 🔧 模型优化

### 量化 (Quantization)
降低模型数值精度以减少内存和计算需求。

### 剪枝 (Pruning)
移除模型中不重要的参数。

### 知识蒸馏 (Knowledge Distillation)
将大模型的知识迁移到小模型。

### LoRA (Low-Rank Adaptation)
一种高效微调大模型的方法。

### QLoRA
结合量化和 LoRA 的微调方法。
