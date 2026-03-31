<template>
  <div class="features-section" :class="{ dark: isDark }">
    <div class="section-header">
      <h2 class="section-title">📚 知识体系</h2>
      <p class="section-desc">5 大模块，覆盖 AI 全栈学习路径</p>
    </div>
    <div class="features-grid">
      <a
        v-for="(item, index) in features"
        :key="index"
        :href="item.link"
        class="feature-card"
        :style="{ animationDelay: index * 0.1 + 's' }"
      >
        <div class="card-glow" :style="{ background: item.glow }"></div>
        <div class="card-icon">{{ item.icon }}</div>
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
        <div class="card-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="card-count">{{ item.count }} 篇文章 →</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(true)

function checkDarkMode() {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
}

let themeObserver = null

onMounted(() => {
  checkDarkMode()
  themeObserver = new MutationObserver(() => { checkDarkMode() })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

onUnmounted(() => {
  if (themeObserver) themeObserver.disconnect()
})

const features = [
  {
    icon: '🧠',
    title: 'AI模型入门',
    desc: '系统了解 GPT、Claude、Gemini、国产模型和开源模型的特点与用法',
    tags: ['GPT-4o', 'Claude 3', 'Qwen', 'LLaMA'],
    count: 18,
    link: '/home.html#ai模型入门',
    glow: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
  },
  {
    icon: '🎨',
    title: '多模态AI',
    desc: '图像生成、视频创作、语音合成、音乐生成、3D建模全覆盖',
    tags: ['Midjourney', 'Runway', 'Suno', 'ElevenLabs'],
    count: 32,
    link: '/home.html#多模态ai',
    glow: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
  },
  {
    icon: '🤖',
    title: 'AI智能体',
    desc: 'Agent 架构、MCP 协议、SKILL 技能系统、RULES 规则引擎深度解析',
    tags: ['MCP', 'SKILL', 'RULES', 'LangChain'],
    count: 46,
    link: '/home.html#ai智能体',
    glow: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
  },
  {
    icon: '🚀',
    title: '实战场景',
    desc: 'AI 写作、漫画制作、短视频、工作流自动化等真实应用场景',
    tags: ['AI写作', '漫剧', '短视频', '自动化'],
    count: 25,
    link: '/home.html#实战场景',
    glow: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
  },
  {
    icon: '🛠️',
    title: '工具平台',
    desc: 'Dify、Coze、Cursor 等无代码平台和 AI 开发工具实操指南',
    tags: ['Dify', 'Coze', 'Cursor', 'Copilot'],
    count: 11,
    link: '/home.html#工具平台',
    glow: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
  },
]
</script>

<style scoped>
.features-section {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
  transition: background 0.3s ease;
}
.features-section.dark {
  background: linear-gradient(180deg, #0a0e27 0%, #111827 100%);
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.12);
  backdrop-filter: blur(20px);
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.4s ease;
  overflow: hidden;
  animation: fadeInUp 0.6s ease both;
}
.dark .feature-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.1);
}
.dark .feature-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.feature-card:hover .card-glow {
  opacity: 1;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}
.dark .card-title {
  color: #f1f5f9;
}

.card-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}
.dark .card-desc {
  color: #94a3b8;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1rem;
}

.tag {
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-size: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.15);
  transition: all 0.3s ease;
}
.dark .tag {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.card-count {
  font-size: 0.85rem;
  color: #6366f1;
  font-weight: 600;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>