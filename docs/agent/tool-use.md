---
title: Agent 工具使用
category: AI Agent
tag:
  - Agent
  - Tool
---

# Agent 工具使用

## 什么是工具

**工具（Tool）** 是 Agent 可以调用的外部功能，扩展 LLM 的能力边界。

## 常见工具类型

| 类型 | 示例 |
|------|------|
| 搜索 | Google、Bing、维基百科 |
| 计算 | Python REPL、计算器 |
| 数据 | SQL 查询、API 调用 |
| 文件 | 读写文件、上传下载 |
| 浏览 | 网页抓取、截图 |
| 通信 | 邮件、消息推送 |

## 定义工具

### LangChain 方式

```python
from langchain.tools import tool

@tool
def search(query: str) -> str:
    """搜索互联网信息"""
    return search_api.search(query)

@tool  
def calculator(expression: str) -> str:
    """执行数学计算"""
    return str(eval(expression))
```

### OpenAI Function Calling

```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取天气信息",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名"}
            },
            "required": ["city"]
        }
    }
}]
```

## 工具描述最佳实践

1. 清晰说明功能
2. 明确参数要求
3. 说明返回值格式
4. 提供使用示例

## 下一步

- [多 Agent 系统](./multi-agent.md)
