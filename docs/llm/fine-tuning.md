---
title: 大模型微调
category: 大语言模型
tag:
  - LLM
  - 微调
  - Fine-tuning
---

# 大模型微调

## 什么是微调

**微调（Fine-tuning）** 是在预训练模型基础上，使用特定领域或任务的数据进行进一步训练，使模型适应特定需求。

## 微调类型

| 类型 | 说明 | 资源需求 |
|------|------|----------|
| 全量微调 | 更新所有参数 | 高 |
| LoRA | 低秩适配 | 低 |
| QLoRA | 量化 + LoRA | 更低 |
| Adapter | 添加适配层 | 低 |
| Prompt Tuning | 只调 Prompt | 极低 |

## LoRA 原理

```
原始权重 W + 低秩矩阵 BA
W ∈ R^(d×k)
B ∈ R^(d×r), A ∈ R^(r×k)
r << min(d,k)
```

只训练 B 和 A，大幅减少可训练参数。

## 微调流程

```
1. 准备数据集（指令-回复对）
2. 选择基座模型
3. 配置训练参数
4. 开始训练
5. 评估效果
6. 合并权重/部署
```

## 代码示例（LoRA）

```python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=8,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1
)

model = get_peft_model(base_model, lora_config)
```

## 常用工具

- **PEFT**：参数高效微调库
- **LLaMA-Factory**：一站式微调工具
- **Axolotl**：微调框架
- **Unsloth**：加速训练

## 下一步

- [RAG 技术](../rag/what-is-rag.md)
- [AI Agent](../agent/what-is-agent.md)
