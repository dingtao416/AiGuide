---
title: Ollama
icon: terminal
---

# Ollama

Ollama 是本地运行大语言模型最简单的工具，一行命令即可运行 Llama、Mistral 等模型。

## 📌 工具概述

Ollama 让在本地运行 LLM 变得极其简单。

### 核心特点
- **一键安装**：简单的安装流程
- **模型丰富**：支持主流开源模型
- **资源高效**：自动量化，优化内存
- **API 兼容**：提供 OpenAI 兼容 API

## 🚀 快速开始

### 安装

**Windows**:
下载 [ollama.com](https://ollama.com/download)

**Mac**:
```bash
brew install ollama
```

**Linux**:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 运行模型

```bash
# 运行 Llama 2
ollama run llama2

# 运行其他模型
ollama run mistral
ollama run codellama
ollama run llama3
```

### 对话示例

```
>>> 你好！
你好！我是 Llama，有什么我可以帮助你的吗？

>>> 介绍一下自己
我是一个由 Meta 训练的大型语言模型...
```

## 🔧 常用命令

```bash
# 列出已下载模型
ollama list

# 下载模型
ollama pull llama3

# 删除模型
ollama rm llama2

# 查看模型信息
ollama show llama3

# 启动服务
ollama serve
```

## 📊 支持的模型

| 模型 | 大小 | 命令 |
|------|------|------|
| Llama 3 8B | ~4.7GB | `ollama run llama3` |
| Llama 3 70B | ~40GB | `ollama run llama3:70b` |
| Mistral 7B | ~4GB | `ollama run mistral` |
| CodeLlama | ~4GB | `ollama run codellama` |
| Phi-3 | ~2GB | `ollama run phi3` |
| Gemma 2 | ~5GB | `ollama run gemma2` |
| Qwen 2 | ~4GB | `ollama run qwen2` |
| DeepSeek | ~4GB | `ollama run deepseek-coder` |

## 🔌 API 使用

### REST API

```bash
# 生成
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "你好",
  "stream": false
}'

# 聊天
curl http://localhost:11434/api/chat -d '{
  "model": "llama3",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}'
```

### Python 客户端

```python
import ollama

# 简单生成
response = ollama.generate(model='llama3', prompt='你好')
print(response['response'])

# 聊天
response = ollama.chat(model='llama3', messages=[
    {'role': 'user', 'content': '你好！'}
])
print(response['message']['content'])

# 流式输出
for chunk in ollama.chat(model='llama3', messages=messages, stream=True):
    print(chunk['message']['content'], end='', flush=True)
```

### OpenAI 兼容 API

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # 任意值
)

response = client.chat.completions.create(
    model="llama3",
    messages=[{"role": "user", "content": "你好"}]
)
print(response.choices[0].message.content)
```

## ⚙️ 自定义模型

创建 `Modelfile`:

```dockerfile
FROM llama3

# 设置系统提示
SYSTEM 你是一个专业的技术顾问

# 设置参数
PARAMETER temperature 0.7
PARAMETER num_ctx 4096
```

构建模型:
```bash
ollama create my-assistant -f Modelfile
ollama run my-assistant
```

## 💡 使用建议

| 内存 | 推荐模型 |
|------|----------|
| 8GB | phi3, gemma:2b |
| 16GB | llama3:8b, mistral |
| 32GB | llama3:70b-q4 |
| 64GB+ | llama3:70b |

## 📚 延伸阅读

- [Ollama 官网](https://ollama.com/)
- [模型库](https://ollama.com/library)
- [模型部署](/llm/deployment)
