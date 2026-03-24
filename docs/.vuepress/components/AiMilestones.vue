<template>
  <div class="milestones-page">
    <!-- Hero -->
    <div class="ms-hero">
      <canvas ref="bgCanvas" class="ms-bg-canvas"></canvas>
      <div class="ms-hero-content">
        <h1 class="ms-hero-title"><span class="grad">AI 时代里程碑</span></h1>
        <p class="ms-hero-desc">从图灵测试到通用人工智能，回顾改变世界的关键时刻</p>
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      <div
        v-for="(item, i) in milestones"
        :key="i"
        class="timeline-item"
        :class="{ left: i % 2 === 0, right: i % 2 !== 0 }"
        :ref="el => { if (el) itemRefs[i] = el }"
      >
        <div class="timeline-dot" :style="{ background: item.color }">
          <span class="dot-icon">{{ item.icon }}</span>
        </div>
        <div class="timeline-card" :class="{ visible: visibleItems.has(i) }">
          <div class="card-year" :style="{ color: item.color }">{{ item.year }}</div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
          <div class="card-tags">
            <span v-for="t in item.tags" :key="t" class="card-tag" :style="{ borderColor: item.color, color: item.color }">{{ t }}</span>
          </div>
          <div class="card-impact">
            <span class="impact-label">影响力</span>
            <div class="impact-bar">
              <div class="impact-fill" :style="{ width: visibleItems.has(i) ? item.impact + '%' : '0%', background: item.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Future -->
    <div class="future-section">
      <div class="future-glow"></div>
      <h2 class="future-title">🔮 未来已来</h2>
      <p class="future-desc">AI 技术正以指数级速度演进，下一个里程碑也许就由你来创造</p>
      <a href="/home.html" class="future-btn">开始学习 AI →</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const bgCanvas = ref(null)
const itemRefs = ref([])
const visibleItems = reactive(new Set())
let observer = null
let animFrame = null

const milestones = [
  {
    year: '1950',
    icon: '🧪',
    title: '图灵测试',
    desc: '艾伦·图灵发表《计算机器与智能》，提出著名的"图灵测试"，标志着人工智能概念的诞生。',
    tags: ['Alan Turing', '计算理论'],
    impact: 95,
    color: '#6366f1',
  },
  {
    year: '1956',
    icon: '🎓',
    title: '达特茅斯会议',
    desc: '约翰·麦卡锡等人组织达特茅斯会议，"人工智能"一词正式诞生，AI 成为一个独立的研究领域。',
    tags: ['John McCarthy', '学科诞生'],
    impact: 90,
    color: '#8b5cf6',
  },
  {
    year: '1997',
    icon: '♟️',
    title: '深蓝击败卡斯帕罗夫',
    desc: 'IBM 的深蓝计算机在国际象棋比赛中击败世界冠军卡斯帕罗夫，AI 第一次在智力竞技中战胜人类顶尖选手。',
    tags: ['IBM Deep Blue', '博弈论'],
    impact: 80,
    color: '#3b82f6',
  },
  {
    year: '2011',
    icon: '🗣️',
    title: 'Siri 与语音助手时代',
    desc: 'Apple 推出 Siri，语音助手走进千家万户。自然语言处理开始从实验室走向消费级产品。',
    tags: ['Apple Siri', 'NLP', '语音识别'],
    impact: 65,
    color: '#06b6d4',
  },
  {
    year: '2012',
    icon: '🖼️',
    title: 'AlexNet 深度学习革命',
    desc: 'Alex Krizhevsky 的 AlexNet 在 ImageNet 竞赛中以巨大优势获胜，深度学习开始统治计算机视觉领域。',
    tags: ['AlexNet', 'CNN', 'ImageNet'],
    impact: 88,
    color: '#10b981',
  },
  {
    year: '2014',
    icon: '🎨',
    title: 'GAN 生成对抗网络',
    desc: 'Ian Goodfellow 提出 GAN，开启了 AI 生成内容的大门，为后来的图像生成、Deepfake 等技术奠定基础。',
    tags: ['GAN', 'Ian Goodfellow', '生成式AI'],
    impact: 85,
    color: '#ec4899',
  },
  {
    year: '2016',
    icon: '⚫',
    title: 'AlphaGo 击败李世石',
    desc: 'Google DeepMind 的 AlphaGo 以 4:1 击败围棋世界冠军李世石，深度强化学习展现惊人能力。',
    tags: ['DeepMind', 'AlphaGo', '强化学习'],
    impact: 92,
    color: '#f59e0b',
  },
  {
    year: '2017',
    icon: '⚡',
    title: 'Transformer 架构发布',
    desc: 'Google 发表论文《Attention Is All You Need》，Transformer 架构横空出世，成为一切大模型的基石。',
    tags: ['Transformer', 'Attention', 'Google'],
    impact: 98,
    color: '#ef4444',
  },
  {
    year: '2018',
    icon: '📚',
    title: 'BERT 预训练模型',
    desc: 'Google 发布 BERT，预训练 + 微调范式彻底改变了 NLP 领域，开启了大规模语言模型的时代。',
    tags: ['BERT', '预训练', 'Google'],
    impact: 82,
    color: '#8b5cf6',
  },
  {
    year: '2020',
    icon: '🧠',
    title: 'GPT-3 震撼发布',
    desc: 'OpenAI 发布 1750 亿参数的 GPT-3，展现出令人惊叹的少样本学习能力，让世界重新认识语言模型的潜力。',
    tags: ['GPT-3', 'OpenAI', '175B参数'],
    impact: 90,
    color: '#10b981',
  },
  {
    year: '2021',
    icon: '🎆',
    title: 'DALL·E 与 Copilot',
    desc: 'OpenAI 发布 DALL·E 文本生成图像模型，GitHub Copilot 开始改变程序员的工作方式，AI 进入创造力领域。',
    tags: ['DALL·E', 'Copilot', 'AI创作'],
    impact: 78,
    color: '#f472b6',
  },
  {
    year: '2022.06',
    icon: '🖌️',
    title: 'Midjourney & Stable Diffusion',
    desc: 'Midjourney 和 Stable Diffusion 相继发布，AI 绘画走入大众视野，引发关于 AI 艺术创作的全球讨论。',
    tags: ['Midjourney', 'Stable Diffusion', 'AI绘画'],
    impact: 85,
    color: '#a78bfa',
  },
  {
    year: '2022.11',
    icon: '💬',
    title: 'ChatGPT 横空出世',
    desc: 'OpenAI 发布 ChatGPT，两个月用户破亿，成为历史上增长最快的消费级应用，AI 正式进入全民时代。',
    tags: ['ChatGPT', 'OpenAI', 'RLHF'],
    impact: 100,
    color: '#6366f1',
  },
  {
    year: '2023.03',
    icon: '🚀',
    title: 'GPT-4 多模态',
    desc: 'OpenAI 发布 GPT-4，首次支持图像输入，在各种专业考试中达到人类顶级水平，多模态 AI 时代开启。',
    tags: ['GPT-4', '多模态', 'AGI'],
    impact: 96,
    color: '#3b82f6',
  },
  {
    year: '2023.07',
    icon: '🤖',
    title: 'Claude 2 & LLaMA 2 开源',
    desc: 'Anthropic 发布 Claude 2，Meta 开源 LLaMA 2。AI 大模型进入百家争鸣时代，开源力量崛起。',
    tags: ['Claude', 'LLaMA 2', '开源'],
    impact: 80,
    color: '#f59e0b',
  },
  {
    year: '2024.02',
    icon: '🎬',
    title: 'Sora 视频生成',
    desc: 'OpenAI 发布 Sora 文本生成视频模型，可生成长达 60 秒的高质量视频，AI 视频创作跨越式进步。',
    tags: ['Sora', 'OpenAI', '视频生成'],
    impact: 88,
    color: '#ec4899',
  },
  {
    year: '2024.05',
    icon: '👁️',
    title: 'GPT-4o 全模态融合',
    desc: 'GPT-4o 实现文本、音频、图像的原生多模态融合，响应速度接近人类对话，AI 开始拥有真正的"感官"。',
    tags: ['GPT-4o', 'Omni', '实时交互'],
    impact: 92,
    color: '#10b981',
  },
  {
    year: '2024.11',
    icon: '🔗',
    title: 'MCP 协议发布',
    desc: 'Anthropic 发布 Model Context Protocol (MCP)，为 AI 连接外部数据源和工具提供标准化协议，Agent 生态基础设施成型。',
    tags: ['MCP', 'Anthropic', 'Agent'],
    impact: 75,
    color: '#8b5cf6',
  },
  {
    year: '2025',
    icon: '🌐',
    title: 'AI Agent 元年',
    desc: '各大厂商纷纷推出 Agent 平台，SKILL 技能系统与 RULES 规则引擎成为标配，AI 从"对话"走向"自主行动"。',
    tags: ['Agent', 'SKILL', 'RULES', '自主AI'],
    impact: 94,
    color: '#ef4444',
  },
]

function initBgCanvas() {
  const canvas = bgCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h
  const stars = []

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth
    h = canvas.height = canvas.parentElement.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    })
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    for (const s of stars) {
      s.pulse += 0.02
      const a = s.alpha + Math.sin(s.pulse) * 0.2
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(165, 180, 252, ${Math.max(0, a)})`
      ctx.fill()
      s.y -= s.speed
      if (s.y < -5) { s.y = h + 5; s.x = Math.random() * w }
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
  return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animFrame) }
}

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = itemRefs.value.indexOf(entry.target)
        if (idx !== -1 && entry.isIntersecting) {
          visibleItems.add(idx)
        }
      })
    },
    { threshold: 0.2 }
  )
  itemRefs.value.forEach((el) => { if (el) observer.observe(el) })
}

let cleanup = null
onMounted(() => {
  cleanup = initBgCanvas()
  setTimeout(setupObserver, 100)
})
onUnmounted(() => {
  if (cleanup) cleanup()
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.milestones-page {
  background: #0a0e27;
  min-height: 100vh;
}

/* Hero */
.ms-hero {
  position: relative;
  height: 50vh;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0e27 0%, #131835 100%);
}
.ms-bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.ms-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
.ms-hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  animation: fadeInUp 0.8s ease;
}
.grad {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 40%, #f472b6 70%, #fb923c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ms-hero-desc {
  color: #94a3b8;
  font-size: 1.15rem;
  animation: fadeInUp 0.8s ease 0.2s both;
}

/* Timeline */
.timeline-wrapper {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.3) 50%, rgba(99,102,241,0.1) 100%);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  width: 50%;
}
.timeline-item.left {
  padding-right: 3rem;
  justify-content: flex-end;
  margin-left: 0;
}
.timeline-item.right {
  padding-left: 3rem;
  justify-content: flex-start;
  margin-left: 50%;
}

.timeline-dot {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 20px rgba(99,102,241,0.3);
  transition: transform 0.3s ease;
}
.timeline-item.left .timeline-dot {
  right: -22px;
}
.timeline-item.right .timeline-dot {
  left: -22px;
}
.timeline-item:hover .timeline-dot {
  transform: scale(1.2);
}
.dot-icon {
  font-size: 1.2rem;
}

/* Card */
.timeline-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1.5rem;
  max-width: 400px;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.timeline-item.left .timeline-card {
  transform: translateX(-30px);
}
.timeline-item.right .timeline-card {
  transform: translateX(30px);
}
.timeline-card.visible {
  opacity: 1;
  transform: translate(0, 0) !important;
}
.timeline-card:hover {
  border-color: rgba(99,102,241,0.4);
  background: rgba(255,255,255,0.08);
}

.card-year {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}
.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 0.5rem;
}
.card-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 0.8rem;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 0.8rem;
}
.card-tag {
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 0.7rem;
  background: rgba(0,0,0,0.2);
}

/* Impact bar */
.card-impact {
  display: flex;
  align-items: center;
  gap: 8px;
}
.impact-label {
  font-size: 0.7rem;
  color: #64748b;
  white-space: nowrap;
}
.impact-bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
  overflow: hidden;
}
.impact-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

/* Future */
.future-section {
  position: relative;
  text-align: center;
  padding: 5rem 2rem;
  overflow: hidden;
}
.future-glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.future-title {
  font-size: 2rem;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 1rem;
  position: relative;
}
.future-desc {
  color: #94a3b8;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  position: relative;
}
.future-btn {
  display: inline-block;
  padding: 14px 36px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff !important;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  position: relative;
}
.future-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(99,102,241,0.6);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .ms-hero-title { font-size: 2.2rem; }
  .timeline-line { left: 24px; }
  .timeline-item,
  .timeline-item.left,
  .timeline-item.right {
    width: 100%;
    margin-left: 0;
    padding-left: 4rem;
    padding-right: 1rem;
    justify-content: flex-start;
  }
  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 2px;
    right: auto;
  }
  .timeline-item.left .timeline-card,
  .timeline-item.right .timeline-card {
    transform: translateX(30px);
  }
  .timeline-card { max-width: 100%; }
}
</style>
