---
category: vue3
date: 2023-01-09 16:59
title: 36-Vue如何开发移动端
updated: 2023-05-13 22:56
---

如果使用 npm init vue@latest 报错

`error when starting dev server: Error: Cannot find module 'node:path'`

nodejs 升级为 16 版本就好了

开发移动端最主要的就是适配各种手机，为此我研究了一套解决方案

在之前我们用的是 rem 根据 HTML font-size 去做缩放

## 现在有了更好用的 vw vh

-   vw 视口的最大宽度，1vw 等于视口宽度的百分之一
-   vh 视口的最大高度，1vh 等于视口高度的百分之一

    1.安装依赖

```sh
npm install postcss-px-to-viewport -D
```

因为[vite](https://so.csdn.net/so/search?q=vite&spm=1001.2101.3001.7020)中已经内联了 postcss，所以并不需要额外的创建 postcss.config.js 文件

vite.config.ts

```ts
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcsspxtoviewport from "postcss-px-to-viewport" //插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

**如果你用的 vite 是 ts 他这个插件并没有提供声明文件我已经帮大家写好了声明文件（良心）**

```ts
declare module 'postcss-px-to-viewport' {

    type Options = {
        unitToConvert: 'px' | 'rem' | 'cm' | 'em',
        viewportWidth: number,
        viewportHeight: number, // not now used; TODO: need for different units and math for different properties
        unitPrecision: number,
        viewportUnit: string,
        fontViewportUnit: string,  // vmin is more suitable.
        selectorBlackList: string[],
        propList: string[],
        minPixelValue: number,
        mediaQuery: boolean,
        replace: boolean,
        landscape: boolean,
        landscapeUnit: string,
        landscapeWidth: number
    }

    export default function(options: Partial<Options>):any
}
```

引入声明文件  tsconfig.app **postcss-px-to-viewport.d.ts 跟 vite.ts 同级**

```typescript
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "postcss-px-to-viewport.d.ts"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 代码案例

```vue
<template>
  <div class="wraps">
    <header class="header">
      <div>left</div>
      <div>中间</div>
      <div>right</div>
    </header>

    <main class="main">
      <div class="main-items" v-for="item in 100">
        <div class="main-port">头像</div>
        <div class="main-desc">
          <div>小满{{item}}</div>
          <div>你妈妈喊你回家穿丝袜啦</div>
        </div>
      </div>
    </main>


    <footer class="footer">
      <div class="footer-items" v-for="item in footer">
        <div>{{ item.icon }}</div>
        <div>{{ item.text }}</div>
      </div>
    </footer>
  </div>

</template>

<script setup lang='ts'>
import { reactive } from 'vue';

type Footer<T> = {
  icon: T,
  text: T
}

const footer = reactive<Footer<string>[]>([
  {
    icon: "1",
    text: "首页"
  },
  {
    icon: "2",
    text: "商品"
  },
  {
    icon: "3",
    text: "信息"
  },
  {
    icon: "4",
    text: "我的"
  }
])
</script>

<style lang="less">
@import url('@/assets/base.css');

html,
body,
#app {
  height: 100%;
  overflow: hidden;
  font-size: 14px;
}

.wraps {
  height: inherit;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: pink;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-around;

  div:nth-child(1) {
    width: 40px;
  }

  div:nth-child(2) {
    text-align: center;
  }

  div:nth-child(3) {
    width: 40px;
    text-align: right;
  }
}

.main {
  flex: 1;
  overflow: auto;

  &-items {
    display: flex;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 5px;
  }

  &-port {
    background: black;
    width: 30px;
    height: 30px;
    border-radius: 200px;
  }
  &-desc{
     margin-left:10px;
     div:last-child{
        font-size: 10px;
        color:#333;
        margin-top: 5px;
     }
  }
}

.footer {

  border-top: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  &-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
}
</style>
```

**基本适配百分之 99 的屏幕**

## 如何将我们的 Vue 项目打包成 App（会安卓的可以跳过）

[小满 Vue3 第三十六章（Vue 如何开发移动端）](https://xiaoman.blog.csdn.net/article/details/125490078)