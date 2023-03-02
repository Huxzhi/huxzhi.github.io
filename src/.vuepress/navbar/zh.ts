import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "文档", icon: "discover", link: "/demo/" },
  {
    text: "博文", icon: "edit",link: "/article/"
  },
  {
    text: "github 文档",
    icon: "note",
    link: "https://huxzhi.github.io/",
  },
]);
