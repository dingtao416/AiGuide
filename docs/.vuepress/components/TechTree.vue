<template>
  <div class="tech-tree-section" :class="{ dark: isDark }">
    <div class="section-header">
      <h2 class="section-title">🗺️ 学习路径</h2>
      <p class="section-desc">点击节点探索你的 AI 学习之旅</p>
    </div>
    <div class="tree-container" ref="treeRef">
      <svg class="tree-lines" :viewBox="`0 0 ${svgW} ${svgH}`" v-if="mounted">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.6" />
          </linearGradient>
        </defs>
        <line
          v-for="(line, i) in lines"
          :key="i"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          stroke="url(#lineGrad)"
          stroke-width="2"
          stroke-dasharray="6,4"
          class="tree-line"
          :style="{ animationDelay: i * 0.2 + 's' }"
        />
      </svg>
      <div class="tree-nodes">
        <div
          v-for="(node, index) in nodes"
          :key="index"
          class="tree-node"
          :class="[`level-${node.level}`, { active: activeNode === index }]"
          :style="{ gridColumn: node.col, gridRow: node.row }"
          @click="activeNode = activeNode === index ? -1 : index"
          @mouseenter="hoverNode = index"
          @mouseleave="hoverNode = -1"
        >
          <div class="node-pulse" :style="{ background: node.color }"></div>
          <div class="node-icon">{{ node.icon }}</div>
          <div class="node-label">{{ node.label }}</div>
          <div
            class="node-sub"
            v-if="activeNode === index || hoverNode === index"
          >
            {{ node.desc }}
          </div>
        </div>
      </div>
    </div>
    <!-- Hot articles -->
    <div class="hot-articles">
      <h3 class="hot-title">🔥 热门文章</h3>
      <div class="hot-grid">
        <a
          v-for="(a, i) in hotArticles"
          :key="i"
          :href="a.link"
          class="hot-card"
        >
          <span class="hot-rank">#{{ i + 1 }}</span>
          <span class="hot-name">{{ a.title }}</span>
          <span class="hot-tag">{{ a.tag }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const treeRef = ref(null);
const activeNode = ref(-1);
const hoverNode = ref(-1);
const mounted = ref(false);
const svgW = ref(900);
const svgH = ref(400);
const lines = ref([]);
const isDark = ref(true);

function checkDarkMode() {
  isDark.value = document.documentElement.getAttribute("data-theme") === "dark";
}

let themeObserver = null;

const nodes = [
  {
    icon: "📖",
    label: "AI基础",
    desc: "了解AI的基本概念与发展历程",
    level: 0,
    col: "3",
    row: "1",
    color: "rgba(99,102,241,0.3)",
  },
  {
    icon: "🧠",
    label: "模型入门",
    desc: "GPT/Claude/Gemini 等主流模型",
    level: 1,
    col: "1",
    row: "2",
    color: "rgba(59,130,246,0.3)",
  },
  {
    icon: "🎨",
    label: "多模态",
    desc: "图像/视频/音频/3D 创作",
    level: 1,
    col: "3",
    row: "2",
    color: "rgba(236,72,153,0.3)",
  },
  {
    icon: "🤖",
    label: "Agent",
    desc: "MCP/SKILL/RULES 智能体开发",
    level: 1,
    col: "5",
    row: "2",
    color: "rgba(34,197,94,0.3)",
  },
  {
    icon: "🚀",
    label: "实战场景",
    desc: "AI写作/漫剧/视频/自动化",
    level: 2,
    col: "2",
    row: "3",
    color: "rgba(251,146,60,0.3)",
  },
  {
    icon: "🛠️",
    label: "工具平台",
    desc: "Dify/Coze/Cursor 等开发工具",
    level: 2,
    col: "4",
    row: "3",
    color: "rgba(14,165,233,0.3)",
  },
];

const hotArticles = [
  {
    title: "GPT 系列模型全览",
    link: "/models-intro/gpt-family/gpt-overview.html",
    tag: "模型",
  },
  {
    title: "MCP 协议完整指南",
    link: "/ai-agents/mcp-protocol/mcp-overview.html",
    tag: "Agent",
  },
  {
    title: "Midjourney 从入门到精通",
    link: "/multimodal-ai/image-ai/image-generation/midjourney.html",
    tag: "多模态",
  },
  {
    title: "Spec Coding 新范式",
    link: "/practical-scenarios/content-creation/ai-writing/spec-coding.html",
    tag: "实战",
  },
  {
    title: "Cursor AI 编程助手",
    link: "/tools-platforms/development-tools/cursor-ai.html",
    tag: "工具",
  },
  {
    title: "SKILL 技能系统解析",
    link: "/ai-agents/skill-systems/skill-fundamentals.html",
    tag: "Agent",
  },
];

onMounted(() => {
  checkDarkMode();
  themeObserver = new MutationObserver(() => {
    checkDarkMode();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Simple line connections based on grid positions
  lines.value = [
    { x1: 450, y1: 70, x2: 150, y2: 170 }, // 基础 → 模型
    { x1: 450, y1: 70, x2: 450, y2: 170 }, // 基础 → 多模态
    { x1: 450, y1: 70, x2: 750, y2: 170 }, // 基础 → Agent
    { x1: 150, y1: 230, x2: 300, y2: 310 }, // 模型 → 实战
    { x1: 450, y1: 230, x2: 300, y2: 310 }, // 多模态 → 实战
    { x1: 750, y1: 230, x2: 600, y2: 310 }, // Agent → 工具
    { x1: 450, y1: 230, x2: 600, y2: 310 }, // 多模态 → 工具
  ];
  mounted.value = true;
});

onUnmounted(() => {
  if (themeObserver) themeObserver.disconnect();
});
</script>

<style scoped>
.tech-tree-section {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
  transition: background 0.3s ease;
}
.tech-tree-section.dark {
  background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}
.dark .section-title {
  color: #f1f5f9;
}

.section-desc {
  color: #64748b;
  font-size: 1.1rem;
}

.tree-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto 4rem;
  min-height: 380px;
}

.tree-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tree-line {
  animation: drawLine 1s ease both;
}

@keyframes drawLine {
  from {
    stroke-dashoffset: 500;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.tree-nodes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 120px);
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.dark .tree-node {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.tree-node:hover,
.tree-node.active {
  transform: scale(1.08);
  border-color: rgba(99, 102, 241, 0.5);
  background: rgba(99, 102, 241, 0.1);
}

.node-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  opacity: 0;
  animation: pulse 3s infinite;
}

.tree-node:hover .node-pulse {
  opacity: 1;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
}

.node-icon {
  font-size: 2rem;
  margin-bottom: 0.3rem;
}

.node-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f2937;
  transition: color 0.3s ease;
}
.dark .node-label {
  color: #e2e8f0;
}

.node-sub {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 4px;
  text-align: center;
  animation: fadeIn 0.3s ease;
  transition: color 0.3s ease;
}
.dark .node-sub {
  color: #94a3b8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hot Articles */
.hot-articles {
  max-width: 900px;
  margin: 0 auto;
}

.hot-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
  transition: color 0.3s ease;
}
.dark .hot-title {
  color: #f1f5f9;
}

.hot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.8rem;
}

.hot-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(99, 102, 241, 0.1);
  text-decoration: none !important;
  color: #334155 !important;
  transition: all 0.3s ease;
}
.dark .hot-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
  color: #cbd5e1 !important;
}

.hot-card:hover {
  background: rgba(99, 102, 241, 0.08);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(4px);
}
.dark .hot-card:hover {
  background: rgba(99, 102, 241, 0.1);
}

.hot-rank {
  font-size: 0.8rem;
  font-weight: 800;
  color: #6366f1;
  min-width: 24px;
}

.hot-name {
  flex: 1;
  font-size: 0.9rem;
}

.hot-tag {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-size: 0.7rem;
  transition: all 0.3s ease;
}
.dark .hot-tag {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

@media (max-width: 768px) {
  .tree-nodes {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
  .tree-lines {
    display: none;
  }
  .tree-node {
    grid-column: auto !important;
    grid-row: auto !important;
  }
}
</style>
