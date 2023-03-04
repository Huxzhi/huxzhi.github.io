import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "随笔",
    icon: "note",
    link: "/note/",
  },

  {
    text: "代码笔记",
    icon: "code",
    link: "/code/",
   
  },

  {
    text: "github 文档",
    icon: "note",
    link: "https://huxzhi.github.io/",
  },
]);
