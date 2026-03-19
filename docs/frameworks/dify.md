---
title: Dify
icon: cube
---

# Dify

Dify 是一个开源的 LLM 应用开发平台，提供可视化的工作流编排能力。

## 📌 平台概述

Dify 让你无需编写大量代码即可构建 AI 应用。

### 核心特点
- **可视化编排**：拖拽式工作流设计
- **开箱即用**：内置 RAG、Agent 等能力
- **多模型支持**：集成主流 LLM
- **开源免费**：可私有化部署

## 🚀 快速开始

### Docker 部署

```bash
# 克隆仓库
git clone https://github.com/langgenius/dify.git

# 进入目录
cd dify/docker

# 启动服务
docker compose up -d
```

访问 `http://localhost:3000` 开始使用。

### 云服务

直接访问 [dify.ai](https://dify.ai) 使用云服务。

## 🔧 核心功能

### 1. 工作室 (Studio)

可视化构建 AI 应用。

**应用类型**：
- 聊天助手
- 文本生成
- Agent
- 工作流

### 2. 知识库

内置 RAG 能力。

**支持的数据源**：
- 文档上传 (PDF, Word, TXT 等)
- 网页爬取
- Notion 同步
- API 导入

### 3. 工作流

拖拽式流程编排。

**节点类型**：
- LLM 节点
- 知识检索节点
- 代码执行节点
- HTTP 请求节点
- 条件分支节点

### 4. Agent

配置式 Agent 构建。

**能力配置**：
- 工具选择
- 推理策略
- 记忆设置

## 💡 使用场景

| 场景 | 配置建议 |
|------|----------|
| 客服机器人 | 聊天助手 + 知识库 |
| 内容生成 | 文本生成 + 工作流 |
| 数据分析 | Agent + 代码工具 |
| 流程自动化 | 工作流 |

## 📊 与其他平台对比

| 特性 | Dify | Coze | FlowiseAI |
|------|------|------|-----------|
| 开源 | ✅ | ❌ | ✅ |
| 私有部署 | ✅ | ❌ | ✅ |
| 中文支持 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| 工作流 | ✅ | ✅ | ✅ |
| 知识库 | ✅ | ✅ | ✅ |

## 📚 延伸阅读

- [Dify 官方文档](https://docs.dify.ai/)
- [什么是 RAG](/rag/what-is-rag)
- [AI Agent](/agent/what-is-agent)
