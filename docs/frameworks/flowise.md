---
title: Flowise
icon: diagram-project
---

# Flowise

Flowise 是一个基于 LangChain 的开源可视化 LLM 应用构建工具。

## 📌 工具概述

Flowise 提供拖拽式界面，让非开发者也能构建 AI 应用。

### 核心特点
- **拖拽式 UI**：可视化流程构建
- **基于 LangChain**：支持丰富组件
- **本地部署**：数据安全可控
- **API 导出**：便于集成

## 🚀 快速开始

### NPM 安装

```bash
npm install -g flowise
flowise start
```

### Docker 部署

```bash
docker run -d -p 3000:3000 flowiseai/flowise
```

访问 `http://localhost:3000`

## 🔧 核心组件

### 节点类型

| 类别 | 节点 |
|------|------|
| LLMs | OpenAI, Anthropic, Ollama |
| Embeddings | OpenAI, HuggingFace |
| Vector Stores | Pinecone, Chroma, Milvus |
| Tools | Calculator, Search, API |
| Memory | Buffer, Summary, Vector |

### 创建 Chatflow

1. 拖入 ChatOpenAI 节点
2. 拖入 Prompt Template 节点
3. 拖入 LLM Chain 节点
4. 连接各节点
5. 保存并测试

### API 调用

```python
import requests

response = requests.post(
    "http://localhost:3000/api/v1/prediction/{chatflow-id}",
    json={"question": "你好"}
)
print(response.json())
```

## 📚 延伸阅读

- [Flowise 官方文档](https://docs.flowiseai.com/)
- [LangChain 框架](/frameworks/langchain)
