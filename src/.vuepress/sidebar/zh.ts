import { sidebar } from "vuepress-theme-hope";
import { code } from "./code.js";
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
  "/code/language" :"structure",
  "/code/java-spring": "structure",
  "/code/nest-js" :"structure", 
  "/code/oracle总结" :"structure", 
  "/code/tools" :"structure", 
  "/code/vue" :"structure",
  "/code/react" :"structure",
  "/code/linux": "structure",
  "/code/website" :"structure",
  "/code/计算机网络基础" :"structure",
  "/code/": code, //固定

});
