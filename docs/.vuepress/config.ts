import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  dest: "./dist",

  title: "AIGuide",
  description:
    "「AI Guide」面向所有人的AI知识网站 — 从AI模型入门到实战应用，系统学习人工智能。风趣幽默、通俗易懂，学习 AI 就认准 AI Guide！",
  lang: "zh-CN",

  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "AIGuide" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "人工智能, AI, 机器学习, 深度学习, 大语言模型, LLM, ChatGPT, Prompt, RAG, Agent, 神经网络, NLP, 计算机视觉",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content:
          "「AI Guide」面向所有人的AI知识网站 — 从AI模型入门到实战应用，系统学习人工智能。风趣幽默、通俗易懂，学习 AI 就认准 AI Guide！",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],

  // ✅ 关键修改：把 allowedHosts 配进去
  bundler: viteBundler({
    viteOptions: {
      server: {
        host: "0.0.0.0",
        port: 8090,
        allowedHosts: ["aiguide.icu", "www.aiguide.icu"],
      },
    },
  }),

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  shouldPreload: false,
});
