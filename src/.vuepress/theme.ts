import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://huxzhi.github.io",

  author: {
    name: "Huxzhi",
    url: "https://huxzhi.fun",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "Huxzhi/huxzhi.github.io",

  docsDir: "src",
  docsBranch: "main",
  blog: {
    medias: {
      Email: "huxzhi@gmail.com",
      GitHub: "https://github.com/Huxzhi",
    },
  },

  locales: {
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        description: "A FrontEnd programmer",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "一般页脚路过",

      displayFooter: true,

      blog: {
        description: "一个前端开发者",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/en/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: true,
    // dev模式显示最后更新时间和作者
    // git:true,
    copyright: true,

    components: {
      /** 
       * 需要被注册的组件。
       * expsamle
       * <BiliBili bvid="BV1kt411o7C3" />
       * <YouTube id="0JJPfz5dg20" />
       * 
       * Badge Test <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />

       * 
       * @see  https://vuepress-theme-hope.github.io/v2/components/zh/config.html#components
       */
      components: ["BiliBili", "YouTube", "Badge"],

      rootComponents: {
        // 该插件提供了一个全局组件 Notice 供你向访问者显示一些通知。
        notice: [
          {
            //
            path: "/en/",
            title: "切换中文",
            content: "获得更好的体验 <br> 也可以点击🔝 语言切换",
            actions: [
              {
                text: "切换中文主页",
                link: "/",
                type: "primary",
              },
              { text: "cancel" },
            ],
            fullscreen: false,
          },
        ],
      },
    },

    comment: {
      ////@ts-expect-error: You should generate and use your own comment service
      provider: "Giscus",
      repo: "Huxzhi/giscus-discussions",
      repoId: "R_kgDOJAIHGQ",
      category: "Announcements",
      categoryId: "DIC_kwDOJAIHGc4CUVEI",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
