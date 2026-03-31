import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "首页", icon: "home", link: "/" },
  { text: "AI进阶之路", icon: "guide", link: "/home" },
  { text: "AI里程碑", icon: "time", link: "/milestones" },
  {
    text: "学习资源",
    icon: "book",
    children: [
      { text: "推荐书籍", icon: "book", link: "/books/" },
      { text: "论文解读", icon: "article", link: "/papers/" },
      { text: "视频教程", icon: "recommend", link: "/tutorials/" },
    ],
  },
  {
    text: "关于",
    icon: "about",
    children: [
      { text: "关于本站", icon: "about", link: "/about/" },
      { text: "开源项目", icon: "github", link: "/open-source-project/" },
      { text: "更新历史", icon: "history", link: "/timeline/" },
    ],
  },
]);
