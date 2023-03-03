import { sidebar } from "vuepress-theme-hope";
import { code } from "./code.js";
import {  software } from "./software.js";
import {  linux } from "./linux.js";
export const zhSidebar = sidebar({
  "/": [
    // "", //对应主页不需要侧边栏
    {
      text: "随笔",
      icon: "creative",
      prefix: "note/",
      link: "/note/",
      children: "structure",
    },
   
  ],
  "/code/vue" :"structure",
  "/code/": code,
  "/linux/": linux,
  "/software/": software,
});
