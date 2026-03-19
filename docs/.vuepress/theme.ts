import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar/index.js";

const __dirname = getDirname(import.meta.url);

export default hopeTheme({
  hostname: "https://aiguide.dev/",
  logo: "/logo.png",
  favicon: "/favicon.ico",

  author: {
    name: "AIGuide",
    url: "https://aiguide.dev/",
  },

  repo: "",
  docsDir: "docs",
  pure: true,
  focus: false,
  breadcrumb: false,
  navbar,
  sidebar,
  footer: 'AI Guide - 人工智能知识分享平台 | 基于 <a href="https://javaguide.cn/" target="_blank">JavaGuide</a> 框架开发 | <a href="/disclaimer.html">免责声明</a>',
  displayFooter: true,

  pageInfo: ["Category", "Tag", "Word", "ReadingTime"],

  blog: {
    intro: "/about/",
    medias: {},
  },

  markdown: {
    align: true,
    codeTabs: true,
    gfm: true,
    include: {
      resolvePath: (file, cwd) => {
        if (file.startsWith("@"))
          return path.resolve(
            __dirname,
            "../snippets",
            file.replace("@", "./"),
          );

        return path.resolve(cwd, file);
      },
    },
    tasklist: true,
  },

  plugins: {
    blog: true,

    copyright: {
      author: "AIGuide",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: "https://aiguide.dev/",
      global: true,
    },

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    icon: {
      assets: "//at.alicdn.com/t/c/font_2922463_o9q9dxmps9.css",
    },

    search: {
      isSearchable: (page) => page.path !== "/",
      maxSuggestions: 10,
    },
  },
});
