<template>
  <div class="milestones-page" :class="{ dark: isDark }" ref="pageRef"
       @mousemove="onMouseMove" @click="onPageClick">
    <!-- 全屏星空画布 -->
    <canvas ref="starCanvas" class="star-canvas"></canvas>

    <!-- 彗星尾迹画布 -->
    <canvas ref="cometCanvas" class="comet-canvas"></canvas>

    <!-- Hero 星云入口 -->
    <div class="ms-hero" ref="heroRef">
      <div class="nebula"></div>
      <div class="nebula nebula-2"></div>
      <div class="ms-hero-content">
        <h1 class="ms-hero-title">
          <span v-for="(char, ci) in heroChars" :key="ci"
                class="hero-char" :class="{ lit: litChars.has(ci) }"
                :style="{ animationDelay: ci * 0.05 + 's' }">{{ char }}</span>
        </h1>
        <p class="ms-hero-sub">
          <span v-for="(char, ci) in subChars" :key="'s'+ci"
                class="sub-char" :class="{ lit: litSubChars.has(ci) }"
                :style="{ animationDelay: (ci * 0.03 + 0.8) + 's' }">{{ char }}</span>
        </p>
        <div class="scroll-hint">
          <div class="scroll-arrow"></div>
          <span>向下探索星际旅程</span>
        </div>
      </div>
    </div>

    <!-- 星座时间线 -->
    <div class="constellation-section" ref="constellRef">
      <!-- 星座连线 SVG -->
      <svg class="constellation-lines" ref="svgRef">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.6" />
            <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#f472b6" stop-opacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- 连线 -->
        <line v-for="(line, li) in constellationLines" :key="'line'+li"
              :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
              class="constellation-line" :class="{ lit: line.lit }"
              filter="url(#glow)"
              :style="{ animationDelay: li * 0.15 + 's' }" />
        <!-- 流光粒子 -->
        <circle v-for="(line, li) in constellationLines" :key="'flow'+li"
                r="3" class="flow-particle" :class="{ active: line.lit }"
                filter="url(#glow)">
          <animateMotion v-if="line.lit" dur="2s" repeatCount="indefinite"
                         :path="`M${line.x1},${line.y1} L${line.x2},${line.y2}`" />
        </circle>
      </svg>

      <!-- 星星节点 -->
      <div v-for="(item, i) in milestones" :key="i"
           class="star-node" :class="{ active: activeNode === i, visible: visibleNodes.has(i), dragging: dragIndex === i }"
           :style="getNodeStyle(item, i)"
           :ref="el => { if(el) nodeRefs[i] = el }"
           @mousedown.stop="onDragStart(i, $event)"
           @touchstart.stop.prevent="onTouchDragStart(i, $event)"
           @mouseenter="hoverNode = i"
           @mouseleave="hoverNode = -1">
        <!-- 星星光晕 -->
        <div class="star-glow" :style="{ background: item.color, width: getStarSize(item) + 'px', height: getStarSize(item) + 'px' }"></div>
        <!-- 星星核心 -->
        <div class="star-core" :style="{ background: item.color, width: (getStarSize(item)*0.4) + 'px', height: (getStarSize(item)*0.4) + 'px' }">
          <span class="star-icon">{{ item.icon }}</span>
        </div>
        <!-- 年份标签 -->
        <div class="star-year" :style="{ color: item.color }">{{ item.year }}</div>
        <!-- 展开的详情卡片 -->
        <transition name="card-bloom">
          <div v-if="activeNode === i" class="star-card" @click.stop>
            <div class="card-aurora" :style="{ background: `linear-gradient(135deg, ${item.color}22, transparent, ${item.color}11)` }"></div>
            <button class="card-close" @click.stop="activeNode = -1">✕</button>
            <div class="card-year-label" :style="{ color: item.color }">{{ item.year }}</div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-tags">
              <span v-for="t in item.tags" :key="t" class="card-tag"
                    :style="{ borderColor: item.color + '66', color: item.color }">{{ t }}</span>
            </div>
            <div class="card-impact">
              <span class="impact-label">影响力</span>
              <div class="impact-bar">
                <div class="impact-fill" :style="{ width: item.impact + '%', background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }"></div>
              </div>
              <span class="impact-val" :style="{ color: item.color }">{{ item.impact }}%</span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 未来区域 - 膨胀光球 -->
    <div class="future-section" ref="futureRef">
      <div class="future-orb" :class="{ visible: futureVisible }">
        <div class="orb-ring ring-1"></div>
        <div class="orb-ring ring-2"></div>
        <div class="orb-ring ring-3"></div>
        <div class="orb-core"></div>
      </div>
      <h2 class="future-title" :class="{ visible: futureVisible }">🔮 未来已来</h2>
      <p class="future-desc" :class="{ visible: futureVisible }">AI 技术正以指数级速度演进，下一个里程碑也许就由你来创造</p>
      <a href="/home.html" class="future-btn" :class="{ visible: futureVisible }">开始学习 AI →</a>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, computed } from 'vue'

// ===== Refs =====
const pageRef = ref(null)
const starCanvas = ref(null)
const cometCanvas = ref(null)
const heroRef = ref(null)
const constellRef = ref(null)
const svgRef = ref(null)
const futureRef = ref(null)
const nodeRefs = ref([])
const isDark = ref(true)
const activeNode = ref(-1)
const hoverNode = ref(-1)
const visibleNodes = reactive(new Set())
const constellationLines = ref([])
const futureVisible = ref(false)
const litChars = reactive(new Set())
const litSubChars = reactive(new Set())

// 鼠标位置
const mouseX = ref(0)
const mouseY = ref(0)
const prevMouseX = ref(0)
const prevMouseY = ref(0)
const mouseSpeed = ref(0)

// 彗星尾迹数据
const cometTrail = ref([])

let animFrame = null
let themeObserver = null
let scrollObserver = null
let futureObserver = null

// Hero 文字
const heroText = 'AI 时代里程碑'
const subText = '从图灵测试到通用人工智能，回顾改变世界的关键时刻'
const heroChars = computed(() => heroText.split(''))
const subChars = computed(() => subText.split(''))

// 拖拽状态
const dragIndex = ref(-1)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragStartPosX = ref(0)
const dragStartPosY = ref(0)
const hasDragged = ref(false)

// ===== 里程碑数据 =====
const milestones = reactive([
  { year: '1950', icon: '🧪', title: '图灵测试', desc: '艾伦·图灵发表《计算机器与智能》，提出著名的"图灵测试"，标志着人工智能概念的诞生。', tags: ['Alan Turing', '计算理论'], impact: 95, color: '#6366f1', pos: { x: 15, y: 8 } },
  { year: '1956', icon: '🎓', title: '达特茅斯会议', desc: '约翰·麦卡锡等人组织达特茅斯会议，"人工智能"一词正式诞生，AI 成为一个独立的研究领域。', tags: ['John McCarthy', '学科诞生'], impact: 90, color: '#8b5cf6', pos: { x: 35, y: 15 } },
  { year: '1997', icon: '♟️', title: '深蓝击败卡斯帕罗夫', desc: 'IBM 的深蓝计算机在国际象棋比赛中击败世界冠军卡斯帕罗夫，AI 第一次在智力竞技中战胜人类顶尖选手。', tags: ['IBM Deep Blue', '博弈论'], impact: 80, color: '#3b82f6', pos: { x: 70, y: 5 } },
  { year: '2011', icon: '🗣️', title: 'Siri 与语音助手时代', desc: 'Apple 推出 Siri，语音助手走进千家万户。自然语言处理开始从实验室走向消费级产品。', tags: ['Apple Siri', 'NLP', '语音识别'], impact: 65, color: '#06b6d4', pos: { x: 85, y: 18 } },
  { year: '2012', icon: '🖼️', title: 'AlexNet 深度学习革命', desc: 'Alex Krizhevsky 的 AlexNet 在 ImageNet 竞赛中以巨大优势获胜，深度学习开始统治计算机视觉领域。', tags: ['AlexNet', 'CNN', 'ImageNet'], impact: 88, color: '#10b981', pos: { x: 20, y: 32 } },
  { year: '2014', icon: '🎨', title: 'GAN 生成对抗网络', desc: 'Ian Goodfellow 提出 GAN，开启了 AI 生成内容的大门，为后来的图像生成、Deepfake 等技术奠定基础。', tags: ['GAN', 'Ian Goodfellow', '生成式AI'], impact: 85, color: '#ec4899', pos: { x: 55, y: 28 } },
  { year: '2016', icon: '⚫', title: 'AlphaGo 击败李世石', desc: 'Google DeepMind 的 AlphaGo 以 4:1 击败围棋世界冠军李世石，深度强化学习展现惊人能力。', tags: ['DeepMind', 'AlphaGo', '强化学习'], impact: 92, color: '#f59e0b', pos: { x: 78, y: 35 } },
  { year: '2017', icon: '⚡', title: 'Transformer 架构发布', desc: 'Google 发表论文《Attention Is All You Need》，Transformer 架构横空出世，成为一切大模型的基石。', tags: ['Transformer', 'Attention', 'Google'], impact: 98, color: '#ef4444', pos: { x: 10, y: 50 } },
  { year: '2018', icon: '📚', title: 'BERT 预训练模型', desc: 'Google 发布 BERT，预训练 + 微调范式彻底改变了 NLP 领域，开启了大规模语言模型的时代。', tags: ['BERT', '预训练', 'Google'], impact: 82, color: '#8b5cf6', pos: { x: 40, y: 45 } },
  { year: '2020', icon: '🧠', title: 'GPT-3 震撼发布', desc: 'OpenAI 发布 1750 亿参数的 GPT-3，展现出令人惊叹的少样本学习能力，让世界重新认识语言模型的潜力。', tags: ['GPT-3', 'OpenAI', '175B参数'], impact: 90, color: '#10b981', pos: { x: 65, y: 52 } },
  { year: '2021', icon: '🎆', title: 'DALL·E 与 Copilot', desc: 'OpenAI 发布 DALL·E 文本生成图像模型，GitHub Copilot 开始改变程序员的工作方式，AI 进入创造力领域。', tags: ['DALL·E', 'Copilot', 'AI创作'], impact: 78, color: '#f472b6', pos: { x: 88, y: 48 } },
  { year: '2022.06', icon: '🖌️', title: 'Midjourney & Stable Diffusion', desc: 'Midjourney 和 Stable Diffusion 相继发布，AI 绘画走入大众视野，引发关于 AI 艺术创作的全球讨论。', tags: ['Midjourney', 'Stable Diffusion', 'AI绘画'], impact: 85, color: '#a78bfa', pos: { x: 22, y: 65 } },
  { year: '2022.11', icon: '💬', title: 'ChatGPT 横空出世', desc: 'OpenAI 发布 ChatGPT，两个月用户破亿，成为历史上增长最快的消费级应用，AI 正式进入全民时代。', tags: ['ChatGPT', 'OpenAI', 'RLHF'], impact: 100, color: '#6366f1', pos: { x: 50, y: 62 } },
  { year: '2023.03', icon: '🚀', title: 'GPT-4 多模态', desc: 'OpenAI 发布 GPT-4，首次支持图像输入，在各种专业考试中达到人类顶级水平，多模态 AI 时代开启。', tags: ['GPT-4', '多模态', 'AGI'], impact: 96, color: '#3b82f6', pos: { x: 75, y: 68 } },
  { year: '2023.07', icon: '🤖', title: 'Claude 2 & LLaMA 2 开源', desc: 'Anthropic 发布 Claude 2，Meta 开源 LLaMA 2。AI 大模型进入百家争鸣时代，开源力量崛起。', tags: ['Claude', 'LLaMA 2', '开源'], impact: 80, color: '#f59e0b', pos: { x: 12, y: 78 } },
  { year: '2024.02', icon: '🎬', title: 'Sora 视频生成', desc: 'OpenAI 发布 Sora 文本生成视频模型，可生成长达 60 秒的高质量视频，AI 视频创作跨越式进步。', tags: ['Sora', 'OpenAI', '视频生成'], impact: 88, color: '#ec4899', pos: { x: 42, y: 80 } },
  { year: '2024.05', icon: '👁️', title: 'GPT-4o 全模态融合', desc: 'GPT-4o 实现文本、音频、图像的原生多模态融合，响应速度接近人类对话，AI 开始拥有真正的"感官"。', tags: ['GPT-4o', 'Omni', '实时交互'], impact: 92, color: '#10b981', pos: { x: 68, y: 82 } },
  { year: '2024.11', icon: '🔗', title: 'MCP 协议发布', desc: 'Anthropic 发布 Model Context Protocol (MCP)，为 AI 连接外部数据源和工具提供标准化协议，Agent 生态基础设施成型。', tags: ['MCP', 'Anthropic', 'Agent'], impact: 75, color: '#8b5cf6', pos: { x: 88, y: 78 } },
  { year: '2025', icon: '🌐', title: 'AI Agent 元年', desc: '各大厂商纷纷推出 Agent 平台，SKILL 技能系统与 RULES 规则引擎成为标配，AI 从"对话"走向"自主行动"。', tags: ['Agent', 'SKILL', 'RULES', '自主AI'], impact: 94, color: '#ef4444', pos: { x: 50, y: 92 } },
])

// ===== 工具函数 =====
function checkDarkMode() {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
}

function getStarSize(item) {
  return 30 + (item.impact / 100) * 40
}

function getNodeStyle(item, i) {
  return {
    left: item.pos.x + '%',
    top: item.pos.y + '%',
    zIndex: activeNode.value === i ? 100 : (hoverNode.value === i ? 50 : 10),
  }
}

function toggleNode(i) {
  activeNode.value = activeNode.value === i ? -1 : i
}

function onMouseMove(e) {
  const rect = pageRef.value?.getBoundingClientRect()
  if (!rect) return
  prevMouseX.value = mouseX.value
  prevMouseY.value = mouseY.value
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  const dx = mouseX.value - prevMouseX.value
  const dy = mouseY.value - prevMouseY.value
  mouseSpeed.value = Math.sqrt(dx * dx + dy * dy)

  // 彗星尾迹
  if (mouseSpeed.value > 8) {
    cometTrail.value.push({
      x: e.clientX,
      y: e.clientY + window.scrollY,
      alpha: 1,
      r: Math.min(mouseSpeed.value * 0.3, 6),
    })
    if (cometTrail.value.length > 50) cometTrail.value.shift()
  }
}

function onPageClick(e) {
  // 点击空白处关闭卡片（拖拽时不触发）
  if (hasDragged.value) {
    hasDragged.value = false
    return
  }
  if (activeNode.value !== -1) {
    activeNode.value = -1
  }
}

// ===== 拖拽系统 =====
function onDragStart(i, e) {
  // 记录起始位置
  dragIndex.value = i
  dragStartX.value = e.clientX
  dragStartY.value = e.clientY
  dragStartPosX.value = milestones[i].pos.x
  dragStartPosY.value = milestones[i].pos.y
  hasDragged.value = false

  const onDragMove = (ev) => {
    if (dragIndex.value === -1) return
    const rect = constellRef.value?.getBoundingClientRect()
    if (!rect) return

    const dx = ev.clientX - dragStartX.value
    const dy = ev.clientY - dragStartY.value

    // 超过 5px 判定为拖拽
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasDragged.value = true
    }

    // 转换为百分比偏移
    const pxPercent = (dx / rect.width) * 100
    const pyPercent = (dy / rect.height) * 100

    // 限制在 2%~98% 范围内
    milestones[i].pos.x = Math.max(2, Math.min(98, dragStartPosX.value + pxPercent))
    milestones[i].pos.y = Math.max(2, Math.min(98, dragStartPosY.value + pyPercent))

    // 实时更新连线
    updateConstellationLines()
  }

  const onDragEnd = () => {
    dragIndex.value = -1
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)

    // 如果没有真正拖拽，则视为点击 → toggle 卡片
    if (!hasDragged.value) {
      toggleNode(i)
    }
  }

  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

// 触摸拖拽（移动端）
function onTouchDragStart(i, e) {
  const touch = e.touches[0]
  dragIndex.value = i
  dragStartX.value = touch.clientX
  dragStartY.value = touch.clientY
  dragStartPosX.value = milestones[i].pos.x
  dragStartPosY.value = milestones[i].pos.y
  hasDragged.value = false

  const onTouchMove = (ev) => {
    if (dragIndex.value === -1) return
    const t = ev.touches[0]
    const rect = constellRef.value?.getBoundingClientRect()
    if (!rect) return

    const dx = t.clientX - dragStartX.value
    const dy = t.clientY - dragStartY.value

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasDragged.value = true
    }

    const pxPercent = (dx / rect.width) * 100
    const pyPercent = (dy / rect.height) * 100

    milestones[i].pos.x = Math.max(2, Math.min(98, dragStartPosX.value + pxPercent))
    milestones[i].pos.y = Math.max(2, Math.min(98, dragStartPosY.value + pyPercent))

    updateConstellationLines()
    ev.preventDefault()
  }

  const onTouchEnd = () => {
    dragIndex.value = -1
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)

    if (!hasDragged.value) {
      toggleNode(i)
    }
  }

  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend', onTouchEnd)
}

// ===== 星空系统 =====
function initStarField() {
  const canvas = starCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h

  // 三层星星
  const farStars = []    // 远景
  const midStars = []    // 中景
  const nearStars = []   // 近景

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = Math.max(document.body.scrollHeight, window.innerHeight)
  }

  function createStars() {
    farStars.length = 0
    midStars.length = 0
    nearStars.length = 0
    for (let i = 0; i < 200; i++) {
      farStars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1 + 0.3, alpha: Math.random() * 0.4 + 0.1, pulse: Math.random() * Math.PI * 2 })
    }
    for (let i = 0; i < 80; i++) {
      midStars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.8, alpha: Math.random() * 0.5 + 0.2, pulse: Math.random() * Math.PI * 2 })
    }
    for (let i = 0; i < 30; i++) {
      nearStars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1.5, alpha: Math.random() * 0.6 + 0.3, pulse: Math.random() * Math.PI * 2, hue: 210 + Math.random() * 60 })
    }
  }

  resize()
  createStars()
  window.addEventListener('resize', () => { resize(); createStars() })

  function draw() {
    ctx.clearRect(0, 0, w, h)
    const scrollY = window.scrollY
    const mx = mouseX.value
    const my = mouseY.value + scrollY
    const dark = isDark.value

    const starColor = dark ? [165, 180, 252] : [99, 102, 241]
    const nearColor = dark ? [200, 210, 255] : [79, 70, 229]

    // 远景星 - 微视差
    for (const s of farStars) {
      s.pulse += 0.008
      const a = s.alpha + Math.sin(s.pulse) * 0.1
      const px = s.x + (mx - w/2) * 0.005
      const py = s.y - scrollY * 0.02
      ctx.beginPath()
      ctx.arc(px, py + scrollY, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${starColor[0]},${starColor[1]},${starColor[2]},${Math.max(0, a)})`
      ctx.fill()
    }

    // 中景星 - 呼吸闪烁
    for (const s of midStars) {
      s.pulse += 0.02
      const a = s.alpha + Math.sin(s.pulse) * 0.25
      const px = s.x + (mx - w/2) * 0.015
      const py = s.y - scrollY * 0.05
      ctx.beginPath()
      ctx.arc(px, py + scrollY, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${starColor[0]},${starColor[1]},${starColor[2]},${Math.max(0, a)})`
      ctx.fill()
    }

    // 近景星 - 光晕
    for (const s of nearStars) {
      s.pulse += 0.015
      const a = s.alpha + Math.sin(s.pulse) * 0.2
      const px = s.x + (mx - w/2) * 0.03
      const py = s.y - scrollY * 0.08

      // 鼠标距离 → 涟漪点亮
      const dist = Math.sqrt((px - (mx))** 2 + ((py + scrollY) - my) ** 2)
      const ripple = dist < 200 ? (1 - dist / 200) * 0.5 : 0

      // 光晕
      const grad = ctx.createRadialGradient(px, py + scrollY, 0, px, py + scrollY, s.r * 6)
      grad.addColorStop(0, `rgba(${nearColor[0]},${nearColor[1]},${nearColor[2]},${(a + ripple) * 0.3})`)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(px, py + scrollY, s.r * 6, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // 核心
      ctx.beginPath()
      ctx.arc(px, py + scrollY, s.r * (1 + ripple), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${nearColor[0]},${nearColor[1]},${nearColor[2]},${Math.max(0, a + ripple)})`
      ctx.fill()
    }

    animFrame = requestAnimationFrame(draw)
  }
  draw()

  return () => {
    cancelAnimationFrame(animFrame)
  }
}

// ===== 彗�星尾迹渲染 =====
function initCometCanvas() {
  const canvas = cometCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const scrollY = window.scrollY
    const trail = cometTrail.value

    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i]
      p.alpha -= 0.025
      if (p.alpha <= 0) { trail.splice(i, 1); continue }

      const screenY = p.y - scrollY
      const grad = ctx.createRadialGradient(p.x, screenY, 0, p.x, screenY, p.r * 3)
      const dark = isDark.value
      if (dark) {
        grad.addColorStop(0, `rgba(165, 180, 252, ${p.alpha * 0.8})`)
        grad.addColorStop(0.5, `rgba(139, 92, 246, ${p.alpha * 0.3})`)
      } else {
        grad.addColorStop(0, `rgba(99, 102, 241, ${p.alpha * 0.6})`)
        grad.addColorStop(0.5, `rgba(139, 92, 246, ${p.alpha * 0.2})`)
      }
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(p.x, screenY, p.r * 3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    requestAnimationFrame(draw)
  }
  draw()
}

// ===== 星座连线计算 =====
function updateConstellationLines() {
  if (!constellRef.value) return
  const rect = constellRef.value.getBoundingClientRect()
  const scrollTop = window.scrollY
  const lines = []

  for (let i = 0; i < milestones.length - 1; i++) {
    const a = milestones[i]
    const b = milestones[i + 1]
    lines.push({
      x1: (a.pos.x / 100) * rect.width,
      y1: (a.pos.y / 100) * rect.height,
      x2: (b.pos.x / 100) * rect.width,
      y2: (b.pos.y / 100) * rect.height,
      lit: visibleNodes.has(i) && visibleNodes.has(i + 1),
    })
  }
  constellationLines.value = lines
}

// ===== Hero 文字点亮动画 =====
function lightUpHeroChars() {
  heroChars.value.forEach((_, i) => {
    setTimeout(() => litChars.add(i), i * 80 + 300)
  })
  subChars.value.forEach((_, i) => {
    setTimeout(() => litSubChars.add(i), i * 30 + 1200)
  })
}

// ===== 生命周期 =====
let cleanupStar = null

onMounted(async () => {
  checkDarkMode()
  themeObserver = new MutationObserver(() => { checkDarkMode() })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  await nextTick()

  cleanupStar = initStarField()
  initCometCanvas()
  lightUpHeroChars()

  // 节点滚动观察
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = nodeRefs.value.indexOf(entry.target)
      if (idx !== -1 && entry.isIntersecting) {
        visibleNodes.add(idx)
        nextTick(() => updateConstellationLines())
      }
    })
  }, { threshold: 0.3 })

  setTimeout(() => {
    nodeRefs.value.forEach(el => { if (el) scrollObserver.observe(el) })
    updateConstellationLines()
  }, 200)

  // 未来区域观察
  futureObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) futureVisible.value = true
  }, { threshold: 0.3 })
  if (futureRef.value) futureObserver.observe(futureRef.value)

  // resize 时更新连线
  window.addEventListener('resize', updateConstellationLines)
  window.addEventListener('scroll', () => {
    // 更新星空画布尺寸
    if (starCanvas.value) {
      const newH = Math.max(document.body.scrollHeight, window.innerHeight)
      if (starCanvas.value.height !== newH) {
        starCanvas.value.height = newH
      }
    }
  })
})

onUnmounted(() => {
  if (cleanupStar) cleanupStar()
  if (themeObserver) themeObserver.disconnect()
  if (scrollObserver) scrollObserver.disconnect()
  if (futureObserver) futureObserver.disconnect()
  window.removeEventListener('resize', updateConstellationLines)
})
</script>

<style scoped>
/* ===== 页面基础 ===== */
.milestones-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #eef2ff 0%, #dbeafe 30%, #e0e7ff 70%, #eef2ff 100%);
  overflow: hidden;
  transition: background 0.5s ease;
}
.milestones-page.dark {
  background: linear-gradient(180deg, #020617 0%, #0a0e27 30%, #0f172a 70%, #020617 100%);
}

/* ===== 全屏星空 ===== */
.star-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.comet-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* ===== Hero 星云 ===== */
.ms-hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  overflow: hidden;
}

.nebula {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%);
  animation: nebulaRotate 30s linear infinite;
  pointer-events: none;
}
.dark .nebula {
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%);
}
.nebula-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(236,72,153,0.06) 0%, rgba(251,146,60,0.03) 40%, transparent 70%);
  animation: nebulaRotate 25s linear infinite reverse;
  top: 20%;
  right: 10%;
}
.dark .nebula-2 {
  background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(251,146,60,0.05) 40%, transparent 70%);
}

@keyframes nebulaRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ms-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
}

.ms-hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height: 1.3;
}

.hero-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  background: linear-gradient(135deg, #6366f1 0%, #a78bfa 40%, #f472b6 70%, #fb923c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: brightness(0.5);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-char.lit {
  opacity: 1;
  transform: translateY(0);
  filter: brightness(1);
  text-shadow: 0 0 30px rgba(99,102,241,0.3);
}

.ms-hero-sub {
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

.sub-char {
  display: inline;
  opacity: 0;
  color: #64748b;
  transition: all 0.4s ease;
}
.dark .sub-char {
  color: #94a3b8;
}
.sub-char.lit {
  opacity: 1;
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.85rem;
  animation: floatUp 2s ease-in-out infinite;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid #6366f1;
  border-bottom: 2px solid #6366f1;
  transform: rotate(45deg);
  opacity: 0.6;
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

/* ===== 星座区域 ===== */
.constellation-section {
  position: relative;
  width: 100%;
  height: 3200px;
  z-index: 2;
}

.constellation-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.constellation-line {
  stroke: rgba(99,102,241,0.1);
  stroke-width: 1;
  transition: all 0.8s ease;
}
.constellation-line.lit {
  stroke: url(#lineGradient);
  stroke-width: 1.5;
  animation: linePulse 3s ease-in-out infinite;
}
.dark .constellation-line {
  stroke: rgba(99,102,241,0.08);
}
.dark .constellation-line.lit {
  stroke: url(#lineGradient);
}

@keyframes linePulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.flow-particle {
  fill: #a5b4fc;
  opacity: 0;
  transition: opacity 0.5s;
}
.flow-particle.active {
  opacity: 0.8;
}

/* ===== 星星节点 ===== */
.star-node {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: z-index 0s;
}

.star-glow {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  filter: blur(15px);
  transition: opacity 0.6s ease;
  animation: starPulseGlow 4s ease-in-out infinite;
}
.star-node.visible .star-glow {
  opacity: 0.3;
}
.star-node:hover .star-glow {
  opacity: 0.6;
}
.dark .star-node.visible .star-glow {
  opacity: 0.4;
}
.dark .star-node:hover .star-glow {
  opacity: 0.7;
}

@keyframes starPulseGlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.star-core {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px currentColor;
  opacity: 0;
  transform: scale(0.3);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 2;
}
.star-node.visible .star-core {
  opacity: 1;
  transform: scale(1);
}
.star-node:hover .star-core {
  transform: scale(1.2);
  box-shadow: 0 0 40px currentColor;
}

/* 拖拽状态 */
.star-node.dragging {
  z-index: 200 !important;
  cursor: grabbing !important;
}
.star-node.dragging .star-core {
  transform: scale(1.4);
  box-shadow: 0 0 50px currentColor, 0 0 80px currentColor;
  filter: brightness(1.3);
}
.star-node.dragging .star-glow {
  opacity: 0.8 !important;
  transform: scale(1.6);
}

.star-icon {
  font-size: 1rem;
  line-height: 1;
}

.star-year {
  margin-top: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.5s ease 0.2s;
  white-space: nowrap;
  text-shadow: 0 0 10px currentColor;
}
.star-node.visible .star-year {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 卡片绽放 ===== */
.star-card {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  padding: 1.5rem;
  margin-top: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(99, 102, 241, 0.15);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1), 0 0 60px rgba(99, 102, 241, 0.08);
  z-index: 100;
  overflow: hidden;
}
.dark .star-card {
  background: rgba(15, 23, 42, 0.92);
  border-color: rgba(99, 102, 241, 0.25);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(99, 102, 241, 0.15);
}

.card-aurora {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  animation: auroraFlow 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes auroraFlow {
  0%, 100% { transform: translateX(-30%) rotate(0deg); opacity: 0.3; }
  50% { transform: translateX(30%) rotate(5deg); opacity: 0.6; }
}

.card-close {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  z-index: 2;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.card-close:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.card-year-label {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem;
  position: relative;
  z-index: 1;
}
.dark .card-title {
  color: #f1f5f9;
}

.card-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 1;
}
.dark .card-desc {
  color: #94a3b8;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 1;
}

.card-tag {
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 0.7rem;
  background: rgba(99,102,241,0.06);
}
.dark .card-tag {
  background: rgba(0,0,0,0.2);
}

.card-impact {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.impact-label {
  font-size: 0.7rem;
  color: #64748b;
  white-space: nowrap;
}

.impact-bar {
  flex: 1;
  height: 4px;
  background: rgba(99,102,241,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.dark .impact-bar {
  background: rgba(255,255,255,0.08);
}

.impact-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.impact-val {
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 30px;
  text-align: right;
}

/* 卡片动画 */
.card-bloom-enter-active {
  animation: cardBloomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-bloom-leave-active {
  animation: cardBloomOut 0.3s ease;
}

@keyframes cardBloomIn {
  0% { opacity: 0; transform: translateX(-50%) scale(0.3); filter: blur(10px); }
  100% { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0); }
}
@keyframes cardBloomOut {
  0% { opacity: 1; transform: translateX(-50%) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) scale(0.5); filter: blur(5px); }
}

/* ===== 未来区域 ===== */
.future-section {
  position: relative;
  text-align: center;
  padding: 8rem 2rem 6rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.future-orb {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 3rem;
  opacity: 0;
  transform: scale(0.3);
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.future-orb.visible {
  opacity: 1;
  transform: scale(1);
}

.orb-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, #a78bfa 0%, #6366f1 100%);
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.3);
  animation: orbPulse 3s ease-in-out infinite;
}

.orb-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(99, 102, 241, 0.3);
  animation: ringExpand 4s ease-in-out infinite;
}
.ring-1 { width: 80px; height: 80px; transform: translate(-50%, -50%); animation-delay: 0s; }
.ring-2 { width: 130px; height: 130px; transform: translate(-50%, -50%); animation-delay: 1.3s; }
.ring-3 { width: 180px; height: 180px; transform: translate(-50%, -50%); animation-delay: 2.6s; }

@keyframes orbPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.3); }
  50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 60px rgba(99,102,241,0.8), 0 0 120px rgba(99,102,241,0.4); }
}

@keyframes ringExpand {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
}

.future-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.3s;
}
.dark .future-title {
  color: #f1f5f9;
}
.future-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.future-desc {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.5s;
}
.dark .future-desc {
  color: #94a3b8;
}
.future-desc.visible {
  opacity: 1;
  transform: translateY(0);
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
  opacity: 0;
  transform: translateY(20px);
}
.future-btn.visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease 0.7s;
}
.future-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 30px rgba(99,102,241,0.6);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .ms-hero-title { font-size: 2.5rem; }
  .ms-hero-sub { font-size: 1rem; }
  .constellation-section { height: 4000px; }
  .star-card {
    width: 280px;
    padding: 1.2rem;
  }
  .star-icon { font-size: 0.8rem; }
}

@media (max-width: 480px) {
  .ms-hero-title { font-size: 2rem; }
  .constellation-section { height: 5000px; }
  .star-card {
    width: 240px;
    left: auto;
    right: 0;
    transform: none;
  }
  .card-bloom-enter-active {
    animation: cardBloomInMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-bloom-leave-active {
    animation: cardBloomOutMobile 0.3s ease;
  }
}

@keyframes cardBloomInMobile {
  0% { opacity: 0; scale: 0.3; filter: blur(10px); }
  100% { opacity: 1; scale: 1; filter: blur(0); }
}
@keyframes cardBloomOutMobile {
  0% { opacity: 1; }
  100% { opacity: 0; scale: 0.5; filter: blur(5px); }
}
</style>
