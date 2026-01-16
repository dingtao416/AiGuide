import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "AI 学习指南", icon: "creative", link: "/home.md" },
  { text: "开源项目", icon: "github", link: "/open-source-project/" },
  { text: "AI 工具", icon: "tool", link: "/ai-tools/" },
  {
    text: "学习资源",
    icon: "book",
    children: [
      { text: "推荐书籍", icon: "book", link: "/books/" },
      { text: "论文解读", icon: "article", link: "/papers/" },
      { text: "视频教程", icon: "video", link: "/tutorials/" },
    ],
  },
  {
    text: "关于",
    icon: "about",
    children: [
      { text: "关于本站", icon: "info", link: "/about/" },
      { text: "更新历史", icon: "history", link: "/timeline/" },
    ],
  },
]);
