import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  dest: "./dist",

  title: "AIGuide",
  description:
    "「AI 学习指南」一份涵盖人工智能、机器学习、深度学习、大语言模型等核心知识的学习指南。学习 AI，首选 AIGuide！",
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
          "「AI 学习指南」一份涵盖人工智能、机器学习、深度学习、大语言模型等核心知识的学习指南。学习 AI，首选 AIGuide！",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],

  // ✅ 关键修改：把 allowedHosts 配进去
  bundler: viteBundler({
    viteOptions: {
      server: {
        host: "0.0.0.0",
        allowedHosts: ["aiguide.icu", "www.aiguide.icu"],
      },
    },
  }),

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  shouldPreload: false,
});
