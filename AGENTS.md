# 仓库指南

## 项目结构与模块组织

本仓库是 AIGuide 的 VuePress 2 文档站点。主要内容放在 `docs/`，按主题拆分为 `docs/ai-agents/`、`docs/models-intro/`、`docs/multimodal-ai/`、`docs/practical-scenarios/`、`docs/tools-platforms/` 等目录。VuePress 配置集中在 `docs/.vuepress/`：`config.ts` 定义站点基础信息，`theme.ts` 配置 vuepress-theme-hope，`client.ts` 注册客户端组件与行为，`components/` 存放自定义 Vue 组件，`styles/` 存放 SCSS，`public/` 存放共享静态资源。构建产物输出到 `dist/`，不要手动修改生成文件。

## 构建、测试与开发命令

使用 `package.json` 中声明的 pnpm 10。

- `pnpm install`：根据 `pnpm-lock.yaml` 安装依赖。
- `pnpm docs:dev`：启动 `docs/` 的 VuePress 本地开发服务。
- `pnpm docs:clean-dev`：清理 VuePress 缓存后启动开发服务。
- `pnpm docs:build`：构建生产静态站点。
- `pnpm lint`：运行 Prettier 与 Markdown lint。
- `pnpm lint:md`：使用 `markdownlint-cli2` 检查 Markdown。
- `pnpm update`：执行 `vp-update` 更新 VuePress 生态依赖。

## 编码风格与命名约定

所有文本文件使用 UTF-8。优先沿用现有 TypeScript、Vue、SCSS 和 Markdown 风格，不引入第二套约定。Vue 组件使用 PascalCase，例如 `HeroParticles.vue`，可复用站点组件从 `docs/.vuepress/client.ts` 注册。配置、Markdown 示例、Vue 模板和 SCSS 使用 2 空格缩进。TypeScript 配置文件优先使用双引号；组件文件以 Prettier 结果为准。Markdown 标题使用 ATX 风格（`#`），无序列表使用短横线，符合 `.markdownlint-cli2.mjs`。

## 测试与验证要求

`package.json` 当前没有专门的单元测试或覆盖率脚本。内容和站点配置修改至少运行 `pnpm lint` 与 `pnpm docs:build`。修改 Vue 组件、样式或页面布局时，还应运行 `pnpm docs:dev`，并在浏览器中检查受影响页面。

## 提交与 Pull Request 约定

当前本地提交历史很少，尚不足以证明已有强约定。后续提交建议使用简洁语义化格式，例如 `docs: update agent guide`、`fix: correct sidebar link`、`feat: add milestones component`。PR 应说明变更的文档或 UI 范围，列出实际执行的验证命令，关联相关 issue；涉及可见页面或组件变化时附截图。

## 安全与配置提示

不要提交密钥、私有令牌、大体积生成产物或依赖缓存。站点元数据、导航、主题选项和插件配置应保留在 `docs/.vuepress/`。文章专属图片优先放在对应文档目录附近；跨页面共享资源放在 `docs/.vuepress/public/`。
