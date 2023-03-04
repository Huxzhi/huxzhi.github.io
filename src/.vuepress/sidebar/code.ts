import { arraySidebar } from "vuepress-theme-hope";

export const code = arraySidebar([
  "",
  {
    text: "基础介绍",
    icon: "module",
    children: ["计算机网络基础/"],
  },
  {
    text: "前端开发",
    icon: "code",
    children: [
      "vue/",
      "react/",
    ],
  }, {
    text: "后端开发",
    icon: "code",
    children: [
      "java-spring/",
      "nest-js/",
   
    ],
  },
  {
    text: "语言",
    icon: "language",
    prefix: "language/",
    link: "language/",
    children: [
      "java",
      "js/",
      "typescript/",
      "编译原理/",
    ],
  },

]);