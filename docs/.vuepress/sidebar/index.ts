import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 关闭独立页面的侧边栏
  "/open-source-project/": false,
  "/books/": false,
  "/papers/": false,
  "/tutorials/": false,
  "/about/": false,
  "/disclaimer": false,
  "/case-studies/": false,
  "/milestones": false,

  // AI模型子页面侧边栏
  "/models-intro/": [
    "",
    {
      text: "GPT 系列模型",
      prefix: "gpt-family/",
      children: [
        { text: "GPT-4o 详解", link: "gpt-4o" },
        { text: "ChatGPT实用技巧", link: "chatgpt" },
        { text: "GPT API开发指南", link: "gpt-api" },
      ],
    },
    {
      text: "Claude 系列模型",
      prefix: "claude-family/",
      children: [
        { text: "Claude 3 系列对比", link: "claude-3" },
        { text: "Claude Sonnet 最佳实践", link: "claude-sonnet" },
        { text: "Claude API 使用指南", link: "claude-api" },
      ],
    },
    {
      text: "Gemini 系列模型",
      prefix: "gemini-family/",
      children: [
        { text: "Gemini Pro 使用指南", link: "gemini-pro" },
        { text: "Gemini Ultra 高级功能", link: "gemini-ultra" },
        { text: "从Bard到Gemini", link: "bard-to-gemini" },
      ],
    },
    {
      text: "国产模型",
      prefix: "domestic-models/",
      children: [
        { text: "通义千问(Qwen)", link: "qwen" },
        { text: "百川大模型", link: "baichuan" },
        { text: "ChatGLM系列", link: "chatglm" },
        { text: "豆包大模型", link: "doubao" },
      ],
    },
    {
      text: "开源模型",
      prefix: "open-source-models/",
      children: [
        { text: "LLaMA系列模型", link: "llama" },
        { text: "Mistral模型家族", link: "mistral" },
        { text: "本地部署指南", link: "local-deployment" },
      ],
    },
    { text: "模型对比与选型", link: "model-comparison" },
  ],

  // 多模态AI子页面侧边栏
  "/multimodal-ai/": [
    "",
    {
      text: "音频AI应用",
      prefix: "audio-ai/",
      children: [
        {
          text: "文本转语音",
          prefix: "text-to-speech/",
          children: [
            { text: "ElevenLabs", link: "elevenlabs" },
            { text: "Azure TTS", link: "azure-tts" },
            { text: "OpenAI TTS", link: "openai-tts" },
          ],
        },
        {
          text: "语音转文本",
          prefix: "speech-to-text/",
          children: [
            { text: "Whisper", link: "whisper" },
            { text: "Azure STT", link: "azure-stt" },
            { text: "实时语音转录", link: "real-time-stt" },
          ],
        },
        {
          text: "音乐生成",
          prefix: "music-generation/",
          children: [
            { text: "Suno", link: "suno" },
            { text: "Udio", link: "udio" },
            { text: "Stable Audio", link: "stable-audio" },
          ],
        },
      ],
    },
    {
      text: "图像AI应用",
      prefix: "image-ai/",
      children: [
        {
          text: "图像生成",
          prefix: "image-generation/",
          children: [
            { text: "Midjourney", link: "midjourney" },
            { text: "DALL-E", link: "dalle" },
            { text: "Stable Diffusion", link: "stable-diffusion" },
            { text: "Leonardo AI", link: "leonardo-ai" },
          ],
        },
        {
          text: "图像编辑",
          prefix: "image-editing/",
          children: [
            { text: "Photoshop AI", link: "photoshop-ai" },
            { text: "Canva AI", link: "canva-ai" },
            { text: "Remove.bg", link: "remove-bg" },
          ],
        },
        {
          text: "图像增强",
          prefix: "image-upscaling/",
          children: [
            { text: "Topaz AI", link: "topaz-ai" },
            { text: "Waifu2x", link: "waifu2x" },
          ],
        },
      ],
    },
    {
      text: "视频AI应用",
      prefix: "video-ai/",
      children: [
        {
          text: "视频生成",
          prefix: "video-generation/",
          children: [
            { text: "Runway", link: "runway" },
            { text: "Pika", link: "pika" },
            { text: "Stable Video", link: "stable-video" },
            { text: "Luma Dream", link: "luma-dream" },
          ],
        },
        {
          text: "视频编辑",
          prefix: "video-editing/",
          children: [
            { text: "Premiere AI", link: "premiere-ai" },
            { text: "DaVinci AI", link: "davinci-ai" },
            { text: "剪映AI", link: "capcut-ai" },
          ],
        },
        {
          text: "数字人生成",
          prefix: "avatar-generation/",
          children: [
            { text: "HeyGen", link: "heygen" },
            { text: "Synthesia", link: "synthesia" },
            { text: "D-ID", link: "d-id" },
          ],
        },
      ],
    },
    {
      text: "3D AI应用",
      prefix: "3d-ai/",
      children: [
        { text: "3D建模", link: "3d-modeling" },
        { text: "3D动画", link: "3d-animation" },
        { text: "VR/AR AI", link: "vr-ar-ai" },
      ],
    },
  ],

  // AI Agent子页面侧边栏
  "/ai-agents/": [
    "",
    {
      text: "Agent 基础概念",
      prefix: "agent-fundamentals/",
      children: [
        { text: "什么是AI Agent", link: "what-is-agent" },
        { text: "Agent vs 聊天机器人", link: "agent-vs-chatbot" },
        { text: "Agent架构设计", link: "agent-architecture" },
        { text: "Agent工作流程", link: "agent-workflow" },
      ],
    },
    {
      text: "Agent 开发框架",
      prefix: "agent-frameworks/",
      children: [
        {
          text: "LangChain Agents",
          prefix: "langchain-agents/",
          children: [
            { text: "LangChain入门", link: "langchain-intro" },
            { text: "Tool Calling", link: "tool-calling" },
            { text: "Memory Management", link: "memory-management" },
          ],
        },
        {
          text: "AutoGen",
          prefix: "autogen/",
          children: [
            { text: "AutoGen基础", link: "autogen-basics" },
            { text: "Multi-Agent Chat", link: "multi-agent-chat" },
          ],
        },
        {
          text: "CrewAI",
          prefix: "crewai/",
          children: [
            { text: "CrewAI入门", link: "crewai-intro" },
            { text: "Team Collaboration", link: "team-collaboration" },
          ],
        },
      ],
    },
    {
      text: "MCP 协议",
      prefix: "mcp-protocol/",
      children: [
        { text: "MCP概述", link: "mcp-overview" },
        { text: "MCP架构", link: "mcp-architecture" },
        { text: "MCP Server", link: "mcp-servers" },
        { text: "MCP Client", link: "mcp-clients" },
        { text: "MCP Tools", link: "mcp-tools" },
        { text: "MCP Resources", link: "mcp-resources" },
        { text: "MCP最佳实践", link: "mcp-best-practices" },
      ],
    },
    {
      text: "SKILL 技能系统",
      prefix: "skill-systems/",
      children: [
        { text: "SKILL基础概念", link: "skill-fundamentals" },
        { text: "技能定义", link: "skill-definition" },
        { text: "技能生命周期", link: "skill-lifecycle" },
        { text: "技能组合", link: "skill-composition" },
        { text: "技能市场", link: "skill-marketplace" },
        { text: "自定义技能", link: "custom-skills" },
        { text: "技能优化", link: "skill-optimization" },
      ],
    },
    {
      text: "RULES 规则引擎",
      prefix: "rules-engine/",
      children: [
        { text: "RULES概述", link: "rules-overview" },
        { text: "规则定义", link: "rule-definition" },
        { text: "规则执行", link: "rule-execution" },
        { text: "条件逻辑", link: "conditional-logic" },
        { text: "规则优先级", link: "rule-priorities" },
        { text: "动态规则", link: "dynamic-rules" },
        { text: "规则调试", link: "rule-debugging" },
      ],
    },
    {
      text: "Agent 能力模块",
      prefix: "agent-capabilities/",
      children: [
        { text: "推理能力", link: "reasoning" },
        { text: "规划能力", link: "planning" },
        { text: "工具使用", link: "tool-use" },
        { text: "记忆能力", link: "memory" },
        { text: "学习能力", link: "learning" },
      ],
    },
    {
      text: "多智能体系统",
      prefix: "multi-agent-systems/",
      children: [
        { text: "Agent通信", link: "agent-communication" },
        { text: "任务委派", link: "task-delegation" },
        { text: "协作求解", link: "collaborative-solving" },
        { text: "群体智能", link: "swarm-intelligence" },
      ],
    },
    {
      text: "Agent 应用案例",
      prefix: "agent-applications/",
      children: [
        { text: "智能客服", link: "customer-service" },
        { text: "研究助手", link: "research-assistant" },
        { text: "代码审查", link: "code-reviewer" },
        { text: "个人助理", link: "personal-assistant" },
      ],
    },
  ],

  // 实战场景子页面侧边栏
  "/practical-scenarios/": [
    "",
    {
      text: "内容创作",
      prefix: "content-creation/",
      children: [
        {
          text: "AI写作",
          prefix: "ai-writing/",
          children: [
            { text: "博客文章生成", link: "blog-generation" },
            { text: "文案写作", link: "copywriting" },
            { text: "学术写作辅助", link: "academic-writing" },
          ],
        },
        {
          text: "AI漫剧制作",
          prefix: "ai-comics/",
          children: [
            { text: "漫画工作流", link: "comic-workflow" },
            { text: "角色设计", link: "character-design" },
            { text: "故事生成", link: "story-generation" },
            { text: "分镜布局", link: "panel-layout" },
          ],
        },
        {
          text: "短视频制作",
          prefix: "short-videos/",
          children: [
            { text: "脚本写作", link: "script-writing" },
            { text: "视频组装", link: "video-assembly" },
            { text: "封面设计", link: "thumbnail-design" },
          ],
        },
      ],
    },
    {
      text: "工作流自动化",
      prefix: "workflow-automation/",
      children: [
        { text: "Zapier AI", link: "zapier-ai" },
        { text: "Notion AI", link: "notion-ai" },
        { text: "Airtable AI", link: "airtable-ai" },
        { text: "Make Scenarios", link: "make-scenarios" },
        { text: "自定义工作流", link: "custom-workflows" },
      ],
    },
    {
      text: "商业应用",
      prefix: "business-applications/",
      children: [
        {
          text: "数据分析",
          prefix: "data-analysis/",
          children: [
            { text: "AI Excel", link: "ai-excel" },
            { text: "Tableau AI", link: "tableau-ai" },
            { text: "Python数据分析", link: "python-analysis" },
          ],
        },
        {
          text: "营销自动化",
          prefix: "marketing-automation/",
          children: [
            { text: "邮件营销", link: "email-marketing" },
            { text: "社交媒体", link: "social-media" },
            { text: "线索生成", link: "lead-generation" },
          ],
        },
        {
          text: "客户支持",
          prefix: "customer-support/",
          children: [
            { text: "聊天机器人搭建", link: "chatbot-setup" },
            { text: "工单路由", link: "ticket-routing" },
            { text: "知识库构建", link: "knowledge-base" },
          ],
        },
      ],
    },
  ],

  // 工具平台子页面侧边栏
  "/tools-platforms/": [
    "",
    {
      text: "无代码平台",
      prefix: "no-code-platforms/",
      children: [
        { text: "Dify", link: "dify" },
        { text: "Coze", link: "coze" },
        { text: "Flowise", link: "flowise" },
        { text: "LangFlow", link: "langflow" },
        { text: "Bubble AI", link: "bubble-ai" },
      ],
    },
    {
      text: "开发工具",
      prefix: "development-tools/",
      children: [
        { text: "Cursor AI", link: "cursor-ai" },
        { text: "GitHub Copilot", link: "copilot" },
        { text: "Codeium", link: "codeium" },
        { text: "Replit AI", link: "replit-ai" },
        { text: "v0.dev", link: "v0-dev" },
      ],
    },
  ],

  // ★ home.html 专用侧边栏 — 模仿 javabetter.cn 的章节目录结构
  "/home": [
    {
      text: "一、前言",
      link: "/home",
      collapsible: false,
    },
    {
      text: "二、AI模型入门",
      collapsible: true,
      children: [
        {
          text: "2.1 GPT 系列模型",
          collapsible: true,
          children: [
            { text: "GPT-4o 详解", link: "/models-intro/gpt-family/gpt-4o" },
            { text: "ChatGPT实用技巧", link: "/models-intro/gpt-family/chatgpt" },
            { text: "GPT API开发指南", link: "/models-intro/gpt-family/gpt-api" },
          ],
        },
        {
          text: "2.2 Claude 系列模型",
          collapsible: true,
          children: [
            { text: "Claude 3 系列对比", link: "/models-intro/claude-family/claude-3" },
            { text: "Claude Sonnet 最佳实践", link: "/models-intro/claude-family/claude-sonnet" },
            { text: "Claude API 使用指南", link: "/models-intro/claude-family/claude-api" },
          ],
        },
        {
          text: "2.3 Gemini 系列模型",
          collapsible: true,
          children: [
            { text: "Gemini Pro 使用指南", link: "/models-intro/gemini-family/gemini-pro" },
            { text: "Gemini Ultra 高级功能", link: "/models-intro/gemini-family/gemini-ultra" },
            { text: "从Bard到Gemini", link: "/models-intro/gemini-family/bard-to-gemini" },
          ],
        },
        {
          text: "2.4 国产模型",
          collapsible: true,
          children: [
            { text: "通义千问(Qwen)", link: "/models-intro/domestic-models/qwen" },
            { text: "百川大模型", link: "/models-intro/domestic-models/baichuan" },
            { text: "ChatGLM系列", link: "/models-intro/domestic-models/chatglm" },
            { text: "豆包大模型", link: "/models-intro/domestic-models/doubao" },
          ],
        },
        {
          text: "2.5 开源模型",
          collapsible: true,
          children: [
            { text: "LLaMA系列模型", link: "/models-intro/open-source-models/llama" },
            { text: "Mistral模型家族", link: "/models-intro/open-source-models/mistral" },
            { text: "本地部署指南", link: "/models-intro/open-source-models/local-deployment" },
          ],
        },
        { text: "2.6 模型对比与选型", link: "/models-intro/model-comparison" },
      ],
    },
    {
      text: "三、多模态AI",
      collapsible: true,
      children: [
        {
          text: "3.1 图像AI — 图像生成",
          collapsible: true,
          children: [
            { text: "Midjourney完整指南", link: "/multimodal-ai/image-ai/image-generation/midjourney" },
            { text: "DALL-E详解", link: "/multimodal-ai/image-ai/image-generation/dalle" },
            { text: "Stable Diffusion", link: "/multimodal-ai/image-ai/image-generation/stable-diffusion" },
            { text: "Leonardo AI", link: "/multimodal-ai/image-ai/image-generation/leonardo-ai" },
          ],
        },
        {
          text: "3.2 图像AI — 图像编辑",
          collapsible: true,
          children: [
            { text: "Photoshop AI", link: "/multimodal-ai/image-ai/image-editing/photoshop-ai" },
            { text: "Canva AI", link: "/multimodal-ai/image-ai/image-editing/canva-ai" },
            { text: "Remove.bg", link: "/multimodal-ai/image-ai/image-editing/remove-bg" },
          ],
        },
        {
          text: "3.3 图像AI — 图像增强",
          collapsible: true,
          children: [
            { text: "Topaz AI", link: "/multimodal-ai/image-ai/image-upscaling/topaz-ai" },
            { text: "Waifu2x", link: "/multimodal-ai/image-ai/image-upscaling/waifu2x" },
          ],
        },
        {
          text: "3.4 视频AI — 视频生成",
          collapsible: true,
          children: [
            { text: "Runway", link: "/multimodal-ai/video-ai/video-generation/runway" },
            { text: "Pika Labs", link: "/multimodal-ai/video-ai/video-generation/pika" },
            { text: "Stable Video", link: "/multimodal-ai/video-ai/video-generation/stable-video" },
            { text: "Luma Dream Machine", link: "/multimodal-ai/video-ai/video-generation/luma-dream" },
          ],
        },
        {
          text: "3.5 视频AI — 视频编辑",
          collapsible: true,
          children: [
            { text: "Premiere AI", link: "/multimodal-ai/video-ai/video-editing/premiere-ai" },
            { text: "DaVinci AI", link: "/multimodal-ai/video-ai/video-editing/davinci-ai" },
            { text: "剪映AI", link: "/multimodal-ai/video-ai/video-editing/capcut-ai" },
          ],
        },
        {
          text: "3.6 视频AI — 数字人",
          collapsible: true,
          children: [
            { text: "HeyGen", link: "/multimodal-ai/video-ai/avatar-generation/heygen" },
            { text: "Synthesia", link: "/multimodal-ai/video-ai/avatar-generation/synthesia" },
            { text: "D-ID", link: "/multimodal-ai/video-ai/avatar-generation/d-id" },
          ],
        },
        {
          text: "3.7 音频AI — 文本转语音",
          collapsible: true,
          children: [
            { text: "ElevenLabs", link: "/multimodal-ai/audio-ai/text-to-speech/elevenlabs" },
            { text: "Azure TTS", link: "/multimodal-ai/audio-ai/text-to-speech/azure-tts" },
            { text: "OpenAI TTS", link: "/multimodal-ai/audio-ai/text-to-speech/openai-tts" },
          ],
        },
        {
          text: "3.8 音频AI — 语音转文本",
          collapsible: true,
          children: [
            { text: "Whisper", link: "/multimodal-ai/audio-ai/speech-to-text/whisper" },
            { text: "Azure STT", link: "/multimodal-ai/audio-ai/speech-to-text/azure-stt" },
            { text: "实时语音转录", link: "/multimodal-ai/audio-ai/speech-to-text/real-time-stt" },
          ],
        },
        {
          text: "3.9 音频AI — 音乐生成",
          collapsible: true,
          children: [
            { text: "Suno", link: "/multimodal-ai/audio-ai/music-generation/suno" },
            { text: "Udio", link: "/multimodal-ai/audio-ai/music-generation/udio" },
            { text: "Stable Audio", link: "/multimodal-ai/audio-ai/music-generation/stable-audio" },
          ],
        },
        {
          text: "3.10 3D AI应用",
          collapsible: true,
          children: [
            { text: "AI 3D建模", link: "/multimodal-ai/3d-ai/3d-modeling" },
            { text: "AI 3D动画", link: "/multimodal-ai/3d-ai/3d-animation" },
            { text: "VR/AR与AI", link: "/multimodal-ai/3d-ai/vr-ar-ai" },
          ],
        },
      ],
    },
    {
      text: "四、AI智能体",
      collapsible: true,
      children: [
        {
          text: "4.1 Agent基础概念",
          collapsible: true,
          children: [
            { text: "什么是AI Agent", link: "/ai-agents/agent-fundamentals/what-is-agent" },
            { text: "Agent vs 聊天机器人", link: "/ai-agents/agent-fundamentals/agent-vs-chatbot" },
            { text: "Agent架构设计", link: "/ai-agents/agent-fundamentals/agent-architecture" },
            { text: "Agent工作流程", link: "/ai-agents/agent-fundamentals/agent-workflow" },
          ],
        },
        {
          text: "4.2 Agent开发框架",
          collapsible: true,
          children: [
            { text: "LangChain入门", link: "/ai-agents/agent-frameworks/langchain-agents/langchain-intro" },
            { text: "Tool Calling", link: "/ai-agents/agent-frameworks/langchain-agents/tool-calling" },
            { text: "Memory Management", link: "/ai-agents/agent-frameworks/langchain-agents/memory-management" },
            { text: "AutoGen基础", link: "/ai-agents/agent-frameworks/autogen/autogen-basics" },
            { text: "Multi-Agent Chat", link: "/ai-agents/agent-frameworks/autogen/multi-agent-chat" },
            { text: "CrewAI入门", link: "/ai-agents/agent-frameworks/crewai/crewai-intro" },
            { text: "Team Collaboration", link: "/ai-agents/agent-frameworks/crewai/team-collaboration" },
          ],
        },
        {
          text: "4.3 MCP协议",
          collapsible: true,
          children: [
            { text: "MCP概述", link: "/ai-agents/mcp-protocol/mcp-overview" },
            { text: "MCP架构", link: "/ai-agents/mcp-protocol/mcp-architecture" },
            { text: "MCP Server开发", link: "/ai-agents/mcp-protocol/mcp-servers" },
            { text: "MCP Client集成", link: "/ai-agents/mcp-protocol/mcp-clients" },
            { text: "MCP Tools", link: "/ai-agents/mcp-protocol/mcp-tools" },
            { text: "MCP Resources", link: "/ai-agents/mcp-protocol/mcp-resources" },
            { text: "MCP最佳实践", link: "/ai-agents/mcp-protocol/mcp-best-practices" },
          ],
        },
        {
          text: "4.4 SKILL技能系统",
          collapsible: true,
          children: [
            { text: "SKILL基础概念", link: "/ai-agents/skill-systems/skill-fundamentals" },
            { text: "技能定义", link: "/ai-agents/skill-systems/skill-definition" },
            { text: "技能生命周期", link: "/ai-agents/skill-systems/skill-lifecycle" },
            { text: "技能组合", link: "/ai-agents/skill-systems/skill-composition" },
            { text: "技能市场", link: "/ai-agents/skill-systems/skill-marketplace" },
            { text: "自定义技能", link: "/ai-agents/skill-systems/custom-skills" },
            { text: "技能优化", link: "/ai-agents/skill-systems/skill-optimization" },
          ],
        },
        {
          text: "4.5 RULES规则引擎",
          collapsible: true,
          children: [
            { text: "RULES概述", link: "/ai-agents/rules-engine/rules-overview" },
            { text: "规则定义", link: "/ai-agents/rules-engine/rule-definition" },
            { text: "规则执行", link: "/ai-agents/rules-engine/rule-execution" },
            { text: "条件逻辑", link: "/ai-agents/rules-engine/conditional-logic" },
            { text: "规则优先级", link: "/ai-agents/rules-engine/rule-priorities" },
            { text: "动态规则", link: "/ai-agents/rules-engine/dynamic-rules" },
            { text: "规则调试", link: "/ai-agents/rules-engine/rule-debugging" },
          ],
        },
        {
          text: "4.6 Agent能力模块",
          collapsible: true,
          children: [
            { text: "推理能力", link: "/ai-agents/agent-capabilities/reasoning" },
            { text: "规划能力", link: "/ai-agents/agent-capabilities/planning" },
            { text: "工具使用", link: "/ai-agents/agent-capabilities/tool-use" },
            { text: "记忆能力", link: "/ai-agents/agent-capabilities/memory" },
            { text: "学习能力", link: "/ai-agents/agent-capabilities/learning" },
          ],
        },
        {
          text: "4.7 多智能体系统",
          collapsible: true,
          children: [
            { text: "Agent通信", link: "/ai-agents/multi-agent-systems/agent-communication" },
            { text: "任务委派", link: "/ai-agents/multi-agent-systems/task-delegation" },
            { text: "协作求解", link: "/ai-agents/multi-agent-systems/collaborative-solving" },
            { text: "群体智能", link: "/ai-agents/multi-agent-systems/swarm-intelligence" },
          ],
        },
        {
          text: "4.8 Agent应用案例",
          collapsible: true,
          children: [
            { text: "智能客服", link: "/ai-agents/agent-applications/customer-service" },
            { text: "研究助手", link: "/ai-agents/agent-applications/research-assistant" },
            { text: "代码审查", link: "/ai-agents/agent-applications/code-reviewer" },
            { text: "个人助理", link: "/ai-agents/agent-applications/personal-assistant" },
          ],
        },
      ],
    },
    {
      text: "五、实战场景",
      collapsible: true,
      children: [
        {
          text: "5.1 AI写作",
          collapsible: true,
          children: [
            { text: "博客文章生成", link: "/practical-scenarios/content-creation/ai-writing/blog-generation" },
            { text: "文案写作", link: "/practical-scenarios/content-creation/ai-writing/copywriting" },
            { text: "学术写作辅助", link: "/practical-scenarios/content-creation/ai-writing/academic-writing" },
            { text: "Spec Coding", link: "/practical-scenarios/content-creation/ai-writing/spec-coding" },
          ],
        },
        {
          text: "5.2 AI漫剧制作",
          collapsible: true,
          children: [
            { text: "漫画工作流", link: "/practical-scenarios/content-creation/ai-comics/comic-workflow" },
            { text: "角色设计", link: "/practical-scenarios/content-creation/ai-comics/character-design" },
            { text: "故事生成", link: "/practical-scenarios/content-creation/ai-comics/story-generation" },
            { text: "分镜布局", link: "/practical-scenarios/content-creation/ai-comics/panel-layout" },
          ],
        },
        {
          text: "5.3 短视频制作",
          collapsible: true,
          children: [
            { text: "脚本写作", link: "/practical-scenarios/content-creation/short-videos/script-writing" },
            { text: "视频组装", link: "/practical-scenarios/content-creation/short-videos/video-assembly" },
            { text: "封面设计", link: "/practical-scenarios/content-creation/short-videos/thumbnail-design" },
          ],
        },
        {
          text: "5.4 工作流自动化",
          collapsible: true,
          children: [
            { text: "Zapier AI", link: "/practical-scenarios/workflow-automation/zapier-ai" },
            { text: "Notion AI", link: "/practical-scenarios/workflow-automation/notion-ai" },
            { text: "Airtable AI", link: "/practical-scenarios/workflow-automation/airtable-ai" },
            { text: "Make Scenarios", link: "/practical-scenarios/workflow-automation/make-scenarios" },
            { text: "自定义工作流", link: "/practical-scenarios/workflow-automation/custom-workflows" },
          ],
        },
        {
          text: "5.5 数据分析",
          collapsible: true,
          children: [
            { text: "AI Excel", link: "/practical-scenarios/business-applications/data-analysis/ai-excel" },
            { text: "Tableau AI", link: "/practical-scenarios/business-applications/data-analysis/tableau-ai" },
            { text: "Python数据分析", link: "/practical-scenarios/business-applications/data-analysis/python-analysis" },
          ],
        },
        {
          text: "5.6 营销自动化",
          collapsible: true,
          children: [
            { text: "邮件营销", link: "/practical-scenarios/business-applications/marketing-automation/email-marketing" },
            { text: "社交媒体", link: "/practical-scenarios/business-applications/marketing-automation/social-media" },
            { text: "线索生成", link: "/practical-scenarios/business-applications/marketing-automation/lead-generation" },
          ],
        },
        {
          text: "5.7 客户支持",
          collapsible: true,
          children: [
            { text: "聊天机器人搭建", link: "/practical-scenarios/business-applications/customer-support/chatbot-setup" },
            { text: "工单路由", link: "/practical-scenarios/business-applications/customer-support/ticket-routing" },
            { text: "知识库构建", link: "/practical-scenarios/business-applications/customer-support/knowledge-base" },
          ],
        },
      ],
    },
    {
      text: "六、工具平台",
      collapsible: true,
      children: [
        {
          text: "6.1 无代码平台",
          collapsible: true,
          children: [
            { text: "Dify", link: "/tools-platforms/no-code-platforms/dify" },
            { text: "Coze", link: "/tools-platforms/no-code-platforms/coze" },
            { text: "Flowise", link: "/tools-platforms/no-code-platforms/flowise" },
            { text: "LangFlow", link: "/tools-platforms/no-code-platforms/langflow" },
            { text: "Bubble AI", link: "/tools-platforms/no-code-platforms/bubble-ai" },
          ],
        },
        {
          text: "6.2 开发工具",
          collapsible: true,
          children: [
            { text: "Cursor AI", link: "/tools-platforms/development-tools/cursor-ai" },
            { text: "GitHub Copilot", link: "/tools-platforms/development-tools/copilot" },
            { text: "Codeium", link: "/tools-platforms/development-tools/codeium" },
            { text: "Replit AI", link: "/tools-platforms/development-tools/replit-ai" },
            { text: "v0.dev", link: "/tools-platforms/development-tools/v0-dev" },
          ],
        },
      ],
    },
    {
      text: "七、联系作者",
      link: "/home#联系作者",
      collapsible: false,
    },
  ],

  // 默认首页不显示侧边栏
  "/": false,
});
