# OpenClaw 技术栈与架构全景

> 项目仓库：https://github.com/openclaw/openclaw
> 文档站点：https://docs.openclaw.ai

## 项目定位

OpenClaw 是一个**多通道 AI 网关（Multi-channel AI Gateway）**，核心理念是"跑在你的设备上、用你的规则"。它将 LLM（大语言模型）的能力通过多种消息渠道暴露出来，让 AI 真正能够执行任务——不只是聊天，而是操作文件、运行代码、管理服务。

---

## 技术栈

| 层面 | 技术选型 |
|---|---|
| **语言** | TypeScript (ESM)，严格类型，Node 22+ |
| **运行时** | Node.js（生产）+ Bun（开发/脚本/测试） |
| **包管理** | pnpm (workspace monorepo) |
| **构建** | tsdown (基于 Rollup) → `dist/` |
| **Lint/格式化** | Oxlint + Oxfmt |
| **测试** | Vitest (V8 coverage, 70% 覆盖率门槛) |
| **原生应用** | macOS/iOS: Swift (SwiftUI + Observation)；Android: Kotlin (Gradle) |
| **容器** | Docker / Podman（沙箱执行环境） |
| **部署** | Fly.io (服务端)；本地 Gateway 模式 |
| **文档** | Mintlify (docs.openclaw.ai)，含 zh-CN i18n 管线 |
| **CI/CD** | GitHub Actions |

---

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                       客户端层                               │
│  macOS App  │  iOS App  │  Android App  │  Web UI  │  CLI   │
└──────┬──────┴─────┬─────┴──────┬────────┴────┬─────┴───┬────┘
       │            │            │             │         │
       ▼            ▼            ▼             ▼         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Gateway 网关层                             │
│  HTTP/WS Server │ Auth │ Session │ Plugin Loader │ Hooks    │
│  src/gateway/                                               │
└──────┬──────────────────────────────────────────────────────┘
       │
       ├──────────────────────┐
       ▼                      ▼
┌──────────────┐    ┌──────────────────────────────────────┐
│  消息通道层   │    │            Agent 引擎层               │
│ (Channels)   │    │  src/agents/                          │
│              │    │  ┌─ Pi Embedded Runner (核心推理循环)  │
│  Telegram    │    │  ├─ Model Selection / Failover        │
│  Discord     │    │  ├─ System Prompt Composition         │
│  Slack       │    │  ├─ Tool Catalog & Policy             │
│  WhatsApp    │    │  ├─ Session / Compaction / Memory     │
│  Signal      │    │  ├─ Sandbox (Docker 执行)             │
│  iMessage    │    │  ├─ Sub-agent Registry                │
│  Feishu      │    │  └─ Skills (技能系统)                 │
│  Matrix      │    └──────────────────────────────────────┘
│  LINE        │
│  MS Teams    │         ┌─────────────────────────┐
│  IRC         │         │     Provider 层          │
│  Nostr       │         │  extensions/             │
│  Googlechat  │         │                          │
│  ...60+ 个   │         │  OpenAI  │  Anthropic   │
│              │         │  Google  │  Ollama       │
└──────────────┘         │  Mistral │  xAI          │
                         │  Bedrock │  HuggingFace  │
                         │  Qianfan │  Moonshot     │
                         │  Together│  Volcengine   │
                         │  ...30+ providers        │
                         └─────────────────────────┘
```

---

## 核心目录结构

| 路径 | 职责 |
|---|---|
| `src/entry.ts` | CLI 入口 |
| `src/cli/` | CLI 命令接线 |
| `src/commands/` | 各子命令实现 (onboard, config, agent...) |
| `src/gateway/` | **网关核心**：HTTP/WS 服务、认证、会话管理、通道调度、插件加载 |
| `src/agents/` | **Agent 引擎**：模型选择、Failover、System Prompt、工具策略、沙箱、子代理、上下文压缩 |
| `src/channels/` | 通道抽象层（路由、配置、健康检查） |
| `src/routing/` | 消息路由逻辑 |
| `src/providers/` | Provider 契约定义 |
| `src/plugin-sdk/` | 插件 SDK（30+ 子路径导出） |
| `src/plugins/` | 插件运行时加载器 |
| `src/hooks/` | 生命周期钩子系统 |
| `src/config/` | 配置读写（`openclaw.json`） |
| `src/sessions/` | 会话持久化 |
| `src/media/` | 媒体管线（图片/音频/视频处理） |
| `src/tts/` | 文本转语音 |
| `src/web-search/` | 网页搜索能力 |
| `src/security/` | 安全策略（路径策略、角色） |
| `extensions/` | **60+ 个扩展插件**（通道 + Provider） |
| `apps/` | 原生应用 (macOS, iOS, Android) |
| `ui/` | Web 前端 (Control UI) |
| `docs/` | Mintlify 文档源文件 |
| `skills/` | 内置技能文件 |
| `scripts/` | 构建/发布/工具脚本 |

---

## 关键设计模式

### 1. 插件架构 (Plugin System)

- 每个扩展在 `extensions/<name>/` 下是独立 workspace package
- 通过 `openclaw.plugin.json` 声明清单
- Plugin SDK 提供 30+ 子路径导出（`openclaw/plugin-sdk/*`），覆盖 channel、provider、routing、sandbox、media 等各个扩展点
- 构建时统一打包进 `dist/extensions/`
- 插件安装运行 `npm install --omit=dev`，运行时依赖必须在 `dependencies` 中
- 避免 `workspace:*` 出现在 `dependencies`（npm install 会破坏）

### 2. Agent 执行循环（Pi Embedded Runner）

`src/agents/pi-embedded-runner.ts` 是核心推理循环，关键子模块：

| 文件 | 职责 |
|---|---|
| `model-selection.ts` | 模型选择（按配置/可用性/能力匹配） |
| `model-fallback.ts` | 模型故障自动降级 |
| `failover-error.ts` | HTTP 错误分类 → 自动重试/切换 Provider |
| `system-prompt.ts` | System Prompt 组装（身份、规则、工具说明） |
| `prompt-composition.ts` | 多段 Prompt 拼接策略 |
| `tool-catalog.ts` | 工具注册表 |
| `tool-policy.ts` | 工具访问策略（白名单/黑名单/沙箱隔离） |
| `pi-tools.ts` | 内置工具实现（文件读写、bash执行、搜索） |
| `pi-embedded-subscribe.ts` | 流式响应订阅（SSE 流、块回复、代码块分割） |
| `compaction.ts` | 上下文窗口溢出时自动压缩历史 |
| `subagent-registry.ts` | 多层代理嵌套、生命周期管理 |
| `skills.ts` | 技能加载与 Prompt 注入 |
| `sandbox.ts` | Docker/Podman 沙箱创建与管理 |
| `auth-profiles.ts` | 多 API Key 轮换、冷却期、round-robin |

### 3. Gateway 服务器

`src/gateway/server.ts` / `server.impl.ts` 是网关核心：

- **HTTP + WebSocket 双协议**服务
- **多租户认证**：token、device-pair、role-based
- **通道健康监控**：`channel-health-monitor.ts`
- **配置热重载**：`config-reload.ts`（无需重启即可更新配置）
- **OpenAI 兼容端点**：`openai-http.ts`（允许任何 OpenAI SDK 客户端直接连接）
- **Control UI**：静态资源服务 + CSP 安全策略
- **钩子系统**：`hooks.ts`（before/after tool call、消息生命周期等）

### 4. 沙箱执行

- Docker/Podman 隔离的代码执行环境
- `Dockerfile.sandbox` — 标准沙箱
- `Dockerfile.sandbox-browser` — 带浏览器的沙箱
- 工具调用（bash/文件操作）在沙箱内运行，宿主机受保护
- 挂载策略可配置：workspace-only 或更宽松的路径映射

### 5. 认证与安全

- **Auth Profile 系统**：多 API Key 轮换、冷却期、round-robin 负载均衡
- **设备配对认证**：`device-auth.ts`（移动端/远程设备）
- **路径策略**：`path-policy.ts`（限制文件系统访问范围）
- **工具策略**：`tool-policy.ts`（工具级别的权限控制）
- **输入白名单**：`input-allowlist.ts`（消息来源过滤）
- **角色策略**：`role-policy.ts`（owner/operator/user 分级）

---

## 扩展生态（60+ 插件）

### 通道类插件（消息平台接入）

| 分类 | 平台 |
|---|---|
| **主流 IM** | Telegram, Discord, Slack, WhatsApp, Signal, iMessage |
| **企业通信** | Feishu (飞书), MS Teams, Mattermost, Googlechat, Synology Chat, Nextcloud Talk |
| **社交/社区** | Matrix, IRC, Nostr, Twitch, Tlon |
| **区域性** | LINE, Zalo (越南), BlueBubbles (iMessage 桥接) |
| **语音** | Voice Call, Talk Voice |

### Provider 类插件（LLM 接入）

| 分类 | Provider |
|---|---|
| **头部商业** | OpenAI, Anthropic, Google, Mistral, xAI |
| **云厂商** | Amazon Bedrock, NVIDIA, Microsoft (Azure) |
| **聚合/网关** | OpenRouter, Cloudflare AI Gateway, Vercel AI Gateway, Copilot Proxy |
| **开源/自托管** | Ollama, vLLM, sglang |
| **国内厂商** | Qianfan (百度), Moonshot (月之暗面), Volcengine (火山引擎), BytePlus, MiniMax, ModelStudio, Qwen Portal |
| **社区/新锐** | Together, HuggingFace, Chutes, Venice, Perplexity |

### 功能类插件

| 插件 | 能力 |
|---|---|
| `memory-core` / `memory-lancedb` | 长期记忆（向量检索） |
| `elevenlabs` / `talk-voice` | TTS 语音合成 |
| `diagnostics-otel` | OpenTelemetry 遥测诊断 |
| `fal` | 图像生成 |
| `brave` / `firecrawl` | 网页搜索/爬取 |
| `device-pair` | 设备配对 |
| `voice-call` | 语音通话 |
| `diffs` | 代码 diff 展示 |
| `thread-ownership` | 线程所有权管理 |
| `phone-control` | 手机远控 |

---

## 原生应用

| 平台 | 路径 | 技术 | 说明 |
|---|---|---|---|
| macOS | `apps/macos/` | SwiftUI + Sparkle | 菜单栏应用，内嵌 Gateway |
| iOS | `apps/ios/` | SwiftUI + Observation | 移动端伴侣应用 |
| Android | `apps/android/` | Kotlin + Gradle | 移动端伴侣应用 |
| 共享层 | `apps/shared/` | — | 跨平台共享代码 |

---

## 测试体系

| 类型 | 说明 |
|---|---|
| **单元测试** | 与源文件同目录 `*.test.ts`，Vitest |
| **E2E 测试** | `*.e2e.test.ts`，端到端流程 |
| **Live 测试** | 真实 API Key 跑真实请求（`LIVE=1`） |
| **Contract 测试** | Provider 契约一致性验证 |
| **Parallels Smoke** | macOS/Windows/Linux 虚拟机端到端安装验证 |
| **Docker Live** | 容器化的模型/网关测试 |
| **覆盖率门槛** | 70% lines/branches/functions/statements |

运行命令：

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 覆盖率
pnpm test:coverage

# 指定测试
pnpm test -- src/agents/failover-error.test.ts

# Live 测试
LIVE=1 pnpm test:live

# 类型检查
pnpm tsgo

# Lint + 格式化
pnpm check

# 构建
pnpm build
```

---

## 数据流概览

```
用户消息
    │
    ▼
[消息通道] (Telegram/Discord/Slack/...)
    │
    ▼
Gateway (认证 → 会话路由 → 通道适配)
    │
    ▼
Agent Runner
    ├─ 模型选择（配置优先级 → Provider 可用性）
    ├─ Auth Profile 解析（API Key 轮换）
    ├─ System Prompt 组装（身份 + 规则 + 工具 + 技能）
    ├─ LLM API 调用（流式 SSE）
    │   ├─ 成功 → 流式响应
    │   └─ 失败 → Failover（错误分类 → 重试/切换 Provider）
    ├─ 工具调用
    │   ├─ 内置工具（文件/bash/搜索/代理管理）
    │   ├─ 插件工具
    │   └─ MCP 工具（via mcporter）
    ├─ 沙箱执行（Docker 隔离）
    ├─ 上下文压缩（窗口溢出时自动 compaction）
    └─ 子代理调度（嵌套任务分发）
    │
    ▼
回复消息
    │
    ▼
[消息通道] → 用户
```

---

## 配置系统

OpenClaw 使用 `~/.openclaw/openclaw.json` 作为主配置文件，支持：

- **通道配置**：每个通道的 token、guild/group 白名单、行为开关
- **模型配置**：Provider 列表、API Key、模型别名、优先级
- **Agent 配置**：System Prompt 覆盖、工具策略、沙箱设置
- **网关配置**：绑定地址、端口、认证模式
- **钩子配置**：自定义 before/after 生命周期脚本

配置热重载：修改配置后无需重启 Gateway，自动检测并应用变更。

---

## 版本管理

版本号分布在多个文件中，采用日期版本格式 `YYYY.M.D`：

| 文件 | 字段 |
|---|---|
| `package.json` | `version` |
| `apps/android/app/build.gradle.kts` | `versionName` / `versionCode` |
| `apps/ios/Sources/Info.plist` | `CFBundleShortVersionString` / `CFBundleVersion` |
| `apps/macos/Sources/OpenClaw/Resources/Info.plist` | 同上 |
| `docs/install/updating.md` | 固定的 npm 版本引用 |

发布通道：
- **stable**：tagged releases (`vYYYY.M.D`)，npm dist-tag `latest`
- **beta**：prerelease tags (`vYYYY.M.D-beta.N`)，npm dist-tag `beta`
- **dev**：`main` 分支最新提交

---

## 总结

OpenClaw 是一个架构成熟、插件化程度极高的开源 AI 网关项目：

- **代码规模**：`src/agents/` 单独就有 300+ 文件，`extensions/` 有 60+ 插件
- **设计哲学**：核心保持精简，能力通过插件扩展
- **安全优先**：沙箱隔离、路径策略、工具策略、角色分级
- **全平台覆盖**：CLI + Web + macOS + iOS + Android
- **全通道接入**：覆盖主流 IM/企业通信/社交/区域性平台
- **全 Provider 支持**：30+ LLM Provider，含国内外主流厂商
- **TypeScript 选型**：保持可读性和可扩展性，降低贡献门槛
