---
category: vue3
date: 2023-01-08 17:00
title: 34-Vue3集成Tailwind CSS
updated: 2023-05-13 22:56
---

# Tailwind CSS

Tailwind CSS 是一个由 js 编写的 CSS 框架 他是基于 postCss 去解析的

官网地址 Tailwind CSS 中文文档 - 无需离开您的 HTML，即可快速建立现代网站。

对于 PostCSS 的插件使用，我们再使用的过程中一般都需要如下步骤：

1. PostCSS 配置文件 postcss.config.js，新增 tailwindcss 插件。
2. TaiWindCss 插件需要一份配置文件，比如: tailwind.config.js。

PostCSS - 是一个用 JavaScript 工具和插件来转换 CSS 代码的工具 | PostCSS 中文网

## postCss 功能介绍

1. 增强代码的可读性 （利用从 Can I Use 网站获取的数据为 CSS 规则添加特定厂商的前缀。 Autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。）

2. 将未来的 CSS 特性带到今天！（PostCSS Preset Env 帮你将最新的 CSS 语法转换成大多数浏览器都能理解的语法，并根据你的目标浏览器或运行时环境来确定你需要的 polyfills，此功能基于 cssdb 实现。）

3. 终结全局 CSS（CSS 模块 能让你你永远不用担心命名太大众化而造成冲突，只要用最有意义的名字就行了。）

4. 避免 CSS 代码中的错误（通过使用 stylelint 强化一致性约束并避免样式表中的错误。stylelint 是一个现代化 CSS 代码检查工具。它支持最新的 CSS 语法，也包括类似 CSS 的语法，例如 SCSS 。）

### postCss 处理 tailWind Css 大致流程

-   将 CSS 解析成抽象语法树(AST 树)
-   读取插件配置，根据配置文件，生成新的抽象语法树
-   将 AST 树”传递”给一系列数据转换操作处理（变量数据循环生成，切套类名循环等）
-   清除一系列操作留下的数据痕迹
-   将处理完毕的 AST 树重新转换成字符串

## 安装

1. 初始化项目
    `npm init vue@latest`
2. 安装 Tailwind 以及其它依赖项=
    ```sh
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    ```
3. 生成配置文件
    ```sh
    npx tailwindcss init -p
    ```
    [配置 - Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs/configuration)
4. 修改配置文件 tailwind.config.js  
    3.0版本
    ```ts
    module.exports = {
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
5. 创建一个index.css
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    ![](./_images/image-2023-01-08_23-24-18-024-34-Vue3集成Tailwind-CSS.png)
6.  在 main.ts 引入
    ![](./_images/image-2023-01-08_23-26-33-157-34-Vue3集成Tailwind-CSS.png)

最后npm run dev 就可以使用啦

```html
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img class="h-48 w-full object-cover md:w-48" src="http://n.sinaimg.cn/translate/20170815/OoVn-fyixtym5144510.jpg" alt="Man looking at item at a store">
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers
          for your new business</a>
        <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas
          you can use to find your first customers.</p>
      </div>
    </div>
  </div>
```