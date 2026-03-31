<template>
  <div class="hero-particles-wrapper" :class="{ dark: isDark }">
    <canvas ref="canvasRef" class="particles-canvas"></canvas>
    <div class="hero-content">
      <div class="hero-badge">🚀 AI 学习新方式</div>
      <h1 class="hero-title">
        <span class="gradient-text">AI Guide</span>
      </h1>
      <div class="hero-subtitle">
        <span class="typing-text">{{ displayText }}</span>
        <span class="cursor-blink">|</span>
      </div>
      <p class="hero-desc">
        系统学习人工智能 · 从模型入门到 Agent 实战 · 覆盖 MCP / SKILL / RULES 全栈体系
      </p>
      <div class="hero-actions">
        <a href="/home.html" class="btn-primary">
          <span class="btn-icon">🎯</span>
          <span>开始学习</span>
          <span class="btn-arrow">→</span>
        </a>
        <a href="/home.html#ai智能体" class="btn-secondary">
          <span class="btn-icon">🤖</span>
          <span>AI Agent 专题</span>
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num" :data-target="134">{{ animatedArticles }}</span>
          <span class="stat-label">篇文章</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">5</span>
          <span class="stat-label">大模块</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-label">免费开源</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const canvasRef = ref(null)
const displayText = ref('')
const animatedArticles = ref(0)
const isDark = ref(true)

function checkDarkMode() {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
}

const phrases = [
  '从 ChatGPT 到 Agent 实战',
  '掌握 MCP 协议与 SKILL 系统',
  '用 AI 创作音乐、视频、漫画',
  '构建你的 AI 工作流',
  '成为 AI 应用高手 🔥',
]

let phraseIdx = 0
let charIdx = 0
let isDeleting = false
let typeTimer = null
let animFrame = null

function typeWriter() {
  const current = phrases[phraseIdx]
  if (!isDeleting) {
    displayText.value = current.substring(0, charIdx + 1)
    charIdx++
    if (charIdx === current.length) {
      isDeleting = true
      typeTimer = setTimeout(typeWriter, 2000)
      return
    }
    typeTimer = setTimeout(typeWriter, 80)
  } else {
    displayText.value = current.substring(0, charIdx - 1)
    charIdx--
    if (charIdx === 0) {
      isDeleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
      typeTimer = setTimeout(typeWriter, 500)
      return
    }
    typeTimer = setTimeout(typeWriter, 40)
  }
}

function animateNumber() {
  const target = 134
  const duration = 2000
  const start = performance.now()
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    animatedArticles.value = Math.floor(progress * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Particle system on canvas
function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h
  const particles = []
  const PARTICLE_COUNT = 80
  const CONNECTION_DIST = 150

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth
    h = canvas.height = canvas.parentElement.offsetHeight
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
      color: `hsla(${210 + Math.random() * 60}, 80%, 65%, ${0.4 + Math.random() * 0.4})`,
    }
  }

  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle())
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.25
          ctx.beginPath()
          ctx.strokeStyle = `rgba(120, 180, 255, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
    }

    animFrame = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(animFrame)
  }
}

let cleanup = null
let themeObserver = null

onMounted(() => {
  checkDarkMode()
  typeWriter()
  animateNumber()
  cleanup = initParticles()

  // 监听主题切换
  themeObserver = new MutationObserver(() => {
    checkDarkMode()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

onUnmounted(() => {
  clearTimeout(typeTimer)
  if (cleanup) cleanup()
  if (themeObserver) themeObserver.disconnect()
})
</script>

<style scoped>
.hero-particles-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 30%, #dbeafe 70%, #eef2ff 100%);
  transition: background 0.3s ease;
}
.hero-particles-wrapper.dark {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1040 30%, #0d1933 70%, #0a0e27 100%);
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 50px;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #6366f1;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  animation: fadeInDown 0.8s ease;
  transition: all 0.3s ease;
}
.dark .hero-badge {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.gradient-text {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 30%, #f472b6 60%, #fb923c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.6rem;
  color: #475569;
  margin-bottom: 1rem;
  min-height: 2.4rem;
  animation: fadeInUp 0.8s ease 0.4s both;
  transition: color 0.3s ease;
}
.dark .hero-subtitle {
  color: #cbd5e1;
}

.typing-text {
  color: #6366f1;
  transition: color 0.3s ease;
}
.dark .typing-text {
  color: #93c5fd;
}

.cursor-blink {
  color: #6366f1;
  animation: blink 1s infinite;
}
.dark .cursor-blink {
  color: #60a5fa;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-desc {
  font-size: 1.05rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  animation: fadeInUp 0.8s ease 0.6s both;
  transition: color 0.3s ease;
}
.dark .hero-desc {
  color: #94a3b8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease 0.8s both;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff !important;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: #4f46e5 !important;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
.dark .btn-secondary {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0 !important;
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}
.dark .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  animation: fadeInUp 0.8s ease 1s both;
}

.stat-item {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(99, 102, 241, 0.2);
  transition: background 0.3s ease;
}
.dark .stat-divider {
  background: rgba(255, 255, 255, 0.1);
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.8rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .hero-actions { flex-direction: column; align-items: center; }
  .hero-stats { gap: 1rem; }
  .stat-num { font-size: 1.5rem; }
}
</style>
