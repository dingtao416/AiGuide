---
title: Semantic Kernel
icon: microsoft
---

# Semantic Kernel

Semantic Kernel 是微软开发的企业级 AI 编排框架，支持 .NET 和 Python。

## 📌 框架概述

Semantic Kernel (SK) 是一个轻量级的 SDK，帮助开发者将 AI 能力集成到应用中。

### 核心特点
- **企业级**：来自微软，适合企业应用
- **多语言**：支持 C#、Python、Java
- **插件系统**：灵活的功能扩展
- **安全性**：企业级安全考量

## 🚀 快速开始

### Python 安装

```bash
pip install semantic-kernel
```

### 基本使用

```python
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

# 创建 Kernel
kernel = sk.Kernel()

# 添加 AI 服务
kernel.add_service(
    OpenAIChatCompletion(
        service_id="chat",
        ai_model_id="gpt-4",
        api_key="your-api-key"
    )
)

# 创建函数
prompt = "用简单的话解释：{{$input}}"
explain = kernel.create_function_from_prompt(
    prompt_template=prompt,
    function_name="explain",
    plugin_name="helper"
)

# 调用
result = await kernel.invoke(explain, input="量子计算")
print(result)
```

## 🔧 核心概念

### 1. Kernel（内核）

SK 的核心，管理所有服务和插件。

```python
kernel = sk.Kernel()

# 添加多个服务
kernel.add_service(OpenAIChatCompletion(...))
kernel.add_service(AzureOpenAIEmbedding(...))
```

### 2. 插件 (Plugins)

功能模块的集合。

```python
# 从目录加载插件
plugins = kernel.add_plugin(
    parent_directory="./plugins",
    plugin_name="WriterPlugin"
)

# 调用插件函数
result = await kernel.invoke(
    plugins["ShortPoem"],
    input="春天"
)
```

### 3. 函数 (Functions)

两种类型的函数：

#### 语义函数
```python
# 基于 Prompt 的函数
summarize = kernel.create_function_from_prompt(
    prompt_template="""
    总结以下文本：
    {{$input}}
    
    摘要：
    """,
    function_name="summarize"
)
```

#### 原生函数
```python
from semantic_kernel.functions import kernel_function

class MathPlugin:
    @kernel_function(name="add", description="两数相加")
    def add(self, a: int, b: int) -> int:
        return a + b

# 注册插件
kernel.add_plugin(MathPlugin(), "Math")
```

### 4. 计划器 (Planner)

自动编排函数完成复杂任务。

```python
from semantic_kernel.planners import SequentialPlanner

planner = SequentialPlanner(kernel)

# 创建计划
plan = await planner.create_plan(
    goal="写一首关于春天的诗，然后翻译成英文"
)

# 执行计划
result = await plan.invoke(kernel)
```

## 📊 高级功能

### 内存管理

```python
from semantic_kernel.memory import SemanticTextMemory
from semantic_kernel.connectors.memory.chroma import ChromaMemoryStore

# 配置内存
memory = SemanticTextMemory(
    storage=ChromaMemoryStore(),
    embeddings_generator=embeddings
)

# 保存信息
await memory.save_information(
    collection="docs",
    id="doc1",
    text="Semantic Kernel 是微软的 AI 框架"
)

# 搜索
results = await memory.search(
    collection="docs",
    query="什么是 SK？"
)
```

### 过滤器 (Filters)

拦截和修改函数执行。

```python
from semantic_kernel.filters import FunctionInvocationContext

async def logging_filter(
    context: FunctionInvocationContext, 
    next
):
    print(f"调用函数: {context.function.name}")
    await next(context)
    print(f"结果: {context.result}")

kernel.add_filter("function_invocation", logging_filter)
```

## 📚 延伸阅读

- [Semantic Kernel 官方文档](https://learn.microsoft.com/semantic-kernel/)
- [Agent 框架对比](/agent/agent-frameworks)
