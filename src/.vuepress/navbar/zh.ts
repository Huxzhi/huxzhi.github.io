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
    children: [
      {
        text: "代码笔记",
        icon: "code",
        link: "/code/",
        activeMatch: "^/code/$",
      },
      {
        text: "后端运维",
        children: ["/linux/"],
      },
    ],
  },
  {
    text: "软件教程",
    icon: "software",
    prefix: "/software/",
    children: [
      {
        text: "软件教程",
        icon: "software",
        link: "",
        activeMatch: "^/software/$",
      },

    ],
  },

  {
    text: "github 文档",
    icon: "note",
    link: "https://huxzhi.github.io/",
  },
]);
