import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "首页", icon: "home", link: "/" },
  { text: "AI进阶之路", icon: "creative", link: "/home" },
  { text: "AI里程碑", icon: "time", link: "/milestones" },
  {
    text: "学习资源",
    icon: "book",
    children: [
      { text: "推荐书籍", icon: "book", link: "/books/" },
      { text: "论文解读", icon: "article", link: "/papers/" },
      { text: "视频教程", icon: "video", link: "/tutorials/" },
      { text: "案例集", icon: "folder", link: "/case-studies/" },
    ],
  },
  {
    text: "关于",
    icon: "info",
    children: [
      { text: "关于本站", icon: "info", link: "/about/" },
      { text: "开源项目", icon: "github", link: "/open-source-project/" },
      { text: "更新历史", icon: "history", link: "/timeline/" },
    ],
  },
]);
