import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/open-source-project/": false,
  "/ai-tools/": false,
  "/books/": false,
  "/papers/": false,
  "/tutorials/": false,
  "/about/": false,
  "/disclaimer": false,
  "/": [
    // ========== 项目介绍 ==========
    {
      text: "项目介绍",
      icon: "home",
      collapsible: true,
      prefix: "aiguide/",
      children: [
        "intro",
        "how-to-learn",
        "contribution-guideline",
      ],
    },

    // ========== AI 基础 ==========
    {
      text: "AI 基础",
      icon: "lightbulb",
      collapsible: true,
      prefix: "ai-basics/",
      children: [
        "what-is-ai",
        "ai-branches",
        "ai-glossary",
        "ai-history",
        "ai-ethics",
      ],
    },

    // ========== 人工智能理论 ==========
    {
      text: "机器学习",
      icon: "gears",
      collapsible: true,
      prefix: "machine-learning/",
      children: [
        "introduction",
        "supervised-learning",
        "unsupervised-learning",
        "reinforcement-learning",
        "model-evaluation",
        "feature-engineering",
      ],
    },
    {
      text: "深度学习",
      icon: "brain",
      collapsible: true,
      prefix: "deep-learning/",
      children: [
        "neural-networks",
        "cnn",
        "rnn",
        "transformer",
        "training-techniques",
      ],
    },

    // ========== AI 应用 ==========
    {
      text: "大语言模型",
      icon: "comments",
      collapsible: true,
      prefix: "llm/",
      children: [
        {
          text: "LLM 入门",
          icon: "book-open",
          children: [
            "what-is-llm",
            "llm-glossary",
            "prompt-engineering",
          ],
        },
        {
          text: "主流模型",
          icon: "cubes",
          children: [
            "gpt-series",
            "claude",
            "llama",
            "qwen",
            "deepseek",
          ],
        },
        {
          text: "进阶知识",
          icon: "graduation-cap",
          children: [
            "fine-tuning",
            "quantization",
            "deployment",
          ],
        },
      ],
    },
    {
      text: "RAG 技术",
      icon: "magnifying-glass",
      collapsible: true,
      prefix: "rag/",
      children: [
        "what-is-rag",
        "embedding",
        "vector-database",
        "chunking-strategies",
        "retrieval-strategies",
        "rag-evaluation",
      ],
    },
    {
      text: "AI Agent",
      icon: "robot",
      collapsible: true,
      prefix: "agent/",
      children: [
        "what-is-agent",
        "agent-architecture",
        "tool-use",
        "multi-agent",
        "agent-frameworks",
      ],
    },

    // ========== 开发框架与工具 ==========
    {
      text: "开发框架",
      icon: "layer-group",
      collapsible: true,
      prefix: "frameworks/",
      children: [
        "langchain",
        "llamaindex",
        "semantic-kernel",
        "dify",
        "flowise",
      ],
    },
    {
      text: "开发工具",
      icon: "screwdriver-wrench",
      collapsible: true,
      prefix: "tools/",
      children: [
        "python-for-ai",
        "pytorch",
        "huggingface",
        "ollama",
        "vllm",
      ],
    },

    // ========== 扩展领域 ==========
    {
      text: "计算机视觉",
      icon: "eye",
      collapsible: true,
      prefix: "computer-vision/",
      children: [
        "cv-basics",
        "image-classification",
        "object-detection",
        "image-generation",
      ],
    },
    {
      text: "自然语言处理",
      icon: "language",
      collapsible: true,
      prefix: "nlp/",
      children: [
        "nlp-basics",
        "text-classification",
        "named-entity-recognition",
        "text-generation",
      ],
    },
  ],
});
