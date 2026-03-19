---
title: 文本分块策略
icon: scissors
---

# 文本分块策略

文本分块（Chunking）是 RAG 系统中将长文档切分为小片段的关键步骤。

## 📌 为什么需要分块

1. **模型限制**：Embedding 模型和 LLM 有 Token 长度限制
2. **检索精度**：较小的块更容易精确匹配查询
3. **上下文相关性**：合理的块保持语义完整性

## 🔧 分块方法

### 1. 固定大小分块

最简单的方法，按固定字符/Token 数切分。

```python
from langchain.text_splitter import CharacterTextSplitter

splitter = CharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separator="\n"
)

chunks = splitter.split_text(document)
```

**优点**：简单、快速
**缺点**：可能切断句子或段落

### 2. 递归字符分块

按层级分隔符递归切分，尽量保持语义完整。

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", "。", ".", " ", ""]
)

chunks = splitter.split_text(document)
```

**分割顺序**：
1. 先按段落 `\n\n`
2. 再按行 `\n`
3. 再按句子 `。` `.`
4. 最后按字符

### 3. 语义分块

基于语义相似度进行分块。

```python
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
splitter = SemanticChunker(
    embeddings,
    breakpoint_threshold_type="percentile"
)

chunks = splitter.split_text(document)
```

**优点**：语义完整性好
**缺点**：需要调用 Embedding，速度慢

### 4. 基于文档结构

根据文档结构（标题、章节）分块。

#### Markdown 分块

```python
from langchain.text_splitter import MarkdownHeaderTextSplitter

headers = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
]

splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers)
chunks = splitter.split_text(markdown_doc)
```

#### HTML 分块

```python
from langchain.text_splitter import HTMLHeaderTextSplitter

headers = [
    ("h1", "Header 1"),
    ("h2", "Header 2"),
]

splitter = HTMLHeaderTextSplitter(headers_to_split_on=headers)
chunks = splitter.split_text(html_doc)
```

### 5. 代码分块

根据代码语法结构分块。

```python
from langchain.text_splitter import (
    Language,
    RecursiveCharacterTextSplitter
)

splitter = RecursiveCharacterTextSplitter.from_language(
    language=Language.PYTHON,
    chunk_size=1000,
    chunk_overlap=100
)

chunks = splitter.split_text(code)
```

## 📊 参数调优

### Chunk Size

| 场景 | 建议大小 |
|------|----------|
| 问答系统 | 500-1000 tokens |
| 摘要任务 | 1000-2000 tokens |
| 代码检索 | 函数/类级别 |
| 对话系统 | 200-500 tokens |

### Chunk Overlap

通常设置为 chunk_size 的 10-20%。

**作用**：
- 保持上下文连续性
- 避免信息在边界丢失

```
Chunk 1: [       文本内容       ]
Chunk 2:              [       文本内容       ]
                      ↑
                   重叠部分
```

## 💡 最佳实践

### 1. 保持语义完整

```python
# ❌ 不好的分块 - 句子被切断
"人工智能是计算机科学的一个重要分" | "支，它让机器能够模拟人类智能。"

# ✅ 好的分块 - 完整句子
"人工智能是计算机科学的一个重要分支，它让机器能够模拟人类智能。"
```

### 2. 添加元数据

```python
from langchain.schema import Document

chunks_with_metadata = []
for i, chunk in enumerate(chunks):
    doc = Document(
        page_content=chunk,
        metadata={
            "source": "document.pdf",
            "chunk_index": i,
            "section": "Introduction"
        }
    )
    chunks_with_metadata.append(doc)
```

### 3. 父子文档策略

存储小块用于检索，关联大块用于生成。

```python
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore

# 子块用于检索（更精确）
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)

# 父块用于回答（更完整）
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)

retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=InMemoryStore(),
    child_splitter=child_splitter,
    parent_splitter=parent_splitter
)
```

## 📈 评估分块质量

### 检查点

1. **完整性**：块是否包含完整的概念
2. **独立性**：块是否可以独立理解
3. **相关性**：块是否与查询相关
4. **大小一致性**：块大小分布是否合理

### 评估代码

```python
def evaluate_chunks(chunks):
    sizes = [len(c) for c in chunks]
    print(f"块数量: {len(chunks)}")
    print(f"平均大小: {sum(sizes)/len(sizes):.0f}")
    print(f"最小/最大: {min(sizes)}/{max(sizes)}")
    
    # 检查过小的块
    small_chunks = [c for c in chunks if len(c) < 100]
    print(f"过小的块 (<100): {len(small_chunks)}")
```

## 📚 延伸阅读

- [什么是 RAG](/rag/what-is-rag)
- [向量数据库](/rag/vector-database)
- [检索策略](/rag/retrieval-strategies)
