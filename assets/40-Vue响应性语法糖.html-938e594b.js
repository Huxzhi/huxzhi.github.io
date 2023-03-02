const n=JSON.parse(`{"key":"v-1571e8b2","path":"/posts/code/xiaoman-zsVue3-vite-Ts/40-Vue%E5%93%8D%E5%BA%94%E6%80%A7%E8%AF%AD%E6%B3%95%E7%B3%96.html","title":"40-Vue响应性语法糖","lang":"zh-CN","frontmatter":{"date":"2023-01-11 14:38","title":"40-Vue响应性语法糖","description":"小提示 本章内容所讲的东西都是实验性的产物 暂时不要再生产环境使用，自己开发玩可以使用，不过大体框架应该不会变了。 要求 vue 版本 3.2.25 及以上 1.开启配置（开启之后才能使用新特性） vite&nbsp; 开启 &nbsp;reactivityTransform import { fileURLToPath, URL } from 'url' import { defineConfig } from 'vite' import vue from '@vitejs/plugin-vue' import vueJsx from '@vitejs/plugin-vue-jsx' // https://vitejs.dev/config/ export default defineConfig({ server: { port: 3000 }, plugins: [ vue({ reactivityTransform:true }), vueJsx()], resolve: { alias: { '@': fileURLToPath(new URL('./src', i​mport.meta.url)) } }, })","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/posts/code/xiaoman-zsVue3-vite-Ts/40-Vue%E5%93%8D%E5%BA%94%E6%80%A7%E8%AF%AD%E6%B3%95%E7%B3%96.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"40-Vue响应性语法糖"}],["meta",{"property":"og:description","content":"小提示 本章内容所讲的东西都是实验性的产物 暂时不要再生产环境使用，自己开发玩可以使用，不过大体框架应该不会变了。 要求 vue 版本 3.2.25 及以上 1.开启配置（开启之后才能使用新特性） vite&nbsp; 开启 &nbsp;reactivityTransform import { fileURLToPath, URL } from 'url' import { defineConfig } from 'vite' import vue from '@vitejs/plugin-vue' import vueJsx from '@vitejs/plugin-vue-jsx' // https://vitejs.dev/config/ export default defineConfig({ server: { port: 3000 }, plugins: [ vue({ reactivityTransform:true }), vueJsx()], resolve: { alias: { '@': fileURLToPath(new URL('./src', i​mport.meta.url)) } }, })"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-02T14:17:02.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"40-Vue响应性语法糖"}],["meta",{"property":"article:published_time","content":"2023-01-11T14:38:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T14:17:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"40-Vue响应性语法糖\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-01-11T14:38:00.000Z\\",\\"dateModified\\":\\"2023-03-02T14:17:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.开启配置（开启之后才能使用新特性）","slug":"_1-开启配置-开启之后才能使用新特性","link":"#_1-开启配置-开启之后才能使用新特性","children":[{"level":3,"title":"2.$ref 的弊端","slug":"_2-ref-的弊端","link":"#_2-ref-的弊端","children":[]},{"level":3,"title":"3.解构","slug":"_3-解构","link":"#_3-解构","children":[]}]}],"git":{"createdTime":1677766622000,"updatedTime":1677766622000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":2.21,"words":663},"filePathRelative":"posts/code/xiaoman-zsVue3-vite-Ts/40-Vue响应性语法糖.md","localizedDate":"2023年1月11日","excerpt":"<p><strong>小提示 本章内容所讲的东西都是实验性的产物 暂时不要再生产环境使用，自己开发玩可以使用，不过大体框架应该不会变了。</strong></p>\\n<p>要求 vue 版本 3.2.25 及以上</p>\\n<h2> 1.开启配置（开启之后才能使用新特性）</h2>\\n<p>vite&nbsp; 开启 &nbsp;reactivityTransform</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> fileURLToPath<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">URL</span> <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'url'</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> defineConfig <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vite'</span>\\n<span class=\\"token keyword\\">import</span> vue <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'@vitejs/plugin-vue'</span>\\n<span class=\\"token keyword\\">import</span> vueJsx <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'@vitejs/plugin-vue-jsx'</span>\\n<span class=\\"token comment\\">// https://vitejs.dev/config/</span>\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> <span class=\\"token function\\">defineConfig</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n  server<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">{</span>\\n    port<span class=\\"token operator\\">:</span> <span class=\\"token number\\">3000</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  plugins<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n    <span class=\\"token function\\">vue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n      reactivityTransform<span class=\\"token operator\\">:</span><span class=\\"token boolean\\">true</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n   <span class=\\"token function\\">vueJsx</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n  resolve<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">{</span>\\n    alias<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token string-property property\\">'@'</span><span class=\\"token operator\\">:</span> <span class=\\"token function\\">fileURLToPath</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\"><span class=\\"token constant\\">URL</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'./src'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">import</span><span class=\\"token punctuation\\">.</span>meta<span class=\\"token punctuation\\">.</span>url<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
