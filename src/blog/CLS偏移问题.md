---
title: "CLS偏移问题"
slug: "cls"
tags: ["HTML", "HTML/cls"]
created: "2025-09-05T09:05"
updated: "2025-09-05T09:05"
draft: false
wordCount: 973
---

#HTML/cls

[优化博客的累计布局偏移（CLS）问题](https://blog.skk.moe/post/fix-blog-cls/)

> 什么是 CLS？ 当用户浏览一个页面的时候，若是想要点击一个按钮或者其他交互时，页面的布局突然出然抖动，可以会造成用户的交互行为造成期望之外的结果。大多数情况下，这些体验只是令人恼火——用户不得不返回上一个页面，但在某些情况下，后果有可能非常严重： Google 针对这种页面布局抖动，提供了一系列计算公式，用于衡量和标准化一个页面的抖动对用户体验的影响，这就是 CLS（Cumulative Layout Shift，累计布局偏移）。CLS 是 Google 衡量网站用户体验的指标 Web Vitals 之一。
>
> 但是由于我的响应式布局需要同时考虑移动端和桌面端的体验，因此我不得不将的 main 放置在最前面。不过，我还是实现了一个 workaround，在前面插入一个 100% 宽度 0 高度的空 div 元素：

实际操作还是有点问题,加这个 col-start-1 有问题，目前没有加

```html
<div
  class="min-h-screen max-w-[992px] grid mx-auto gap-6 py-6 px-4 md:grid-cols-[12fr_25fr] xl:grid-cols-[23fr_54fr_23fr] xl:max-w-[1376px]"
>
  <!-- 为了解决cls 累计布局偏移（CLS）问题 ，目前内容少还没有发现有这个问题
        加这个 col-start-1 有问题，目前没有加 https://blog.skk.moe/post/fix-blog-cls/ -->

  <div class="left-placeholder col-end-1 -order-1 max-h-0 min-w-0 h-0"></div>
  <main class="flex flex-col order-first md:order-0 min-w-0">
    <slot />
  </main>
  <aside class="min-w-0 -order-1 max-md:order-1">
    <slot name="left" />
  </aside>
  <aside class="min-w-0 order-1 max-xl:hidden">
    <slot name="right" />
  </aside>
</div>
```