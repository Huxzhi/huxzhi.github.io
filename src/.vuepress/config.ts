import { defineUserConfig ,Page,} from "vuepress";
import theme from "./theme.js";
import { searchProPlugin, } from "vuepress-plugin-search-pro";
import { componentsPlugin } from "vuepress-plugin-components";
export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Huxzhiの小站",
      description: "vuepress-theme-hope 的博客演示",
    },
    "/en/": {
      lang: "en-US",
      title: "Huxzhi's blog",
      description: "A blog demo for vuepress-theme-hope",
    },
  },

  plugins:[ searchProPlugin({

    locales: {
      "/": {
        // 覆盖 placeholder
        placeholder: "开始搜索",
      },},
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter:  (page) => page.frontmatter.category  as  string | string[] | null,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag as  string | string[] | null,
          formatter: "标签：$content",
        },
      ],
    }),
  ],

  theme,

  shouldPrefetch: false,
});
