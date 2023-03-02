const e=JSON.parse(`{"key":"v-e977503e","path":"/posts/literature-notes/xiaoman-zsVue3-vite-Ts/18-%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%A0%81%E5%88%86%E5%8C%85%E5%92%8Csuspense.html","title":"18-异步组件和代码分包和suspense","lang":"en-US","frontmatter":{"date":"2023-01-04 14:33","title":"18-异步组件和代码分包和suspense","description":"异步组件 在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积 这时候就可以使用异步组件 引入方式不同 import { defineAsyncComponent } from 'vue' //专门的函数引入 const SyncVue = defineAsyncComponent(() =&gt; import('@/components/sync.vue')","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://huxzhi.github.io/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/18-%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%A0%81%E5%88%86%E5%8C%85%E5%92%8Csuspense.html"}],["meta",{"property":"og:url","content":"https://huxzhi.github.io/posts/literature-notes/xiaoman-zsVue3-vite-Ts/18-%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%A0%81%E5%88%86%E5%8C%85%E5%92%8Csuspense.html"}],["meta",{"property":"og:site_name","content":"Huxzhi's blog"}],["meta",{"property":"og:title","content":"18-异步组件和代码分包和suspense"}],["meta",{"property":"og:description","content":"异步组件 在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积 这时候就可以使用异步组件 引入方式不同 import { defineAsyncComponent } from 'vue' //专门的函数引入 const SyncVue = defineAsyncComponent(() =&gt; import('@/components/sync.vue')"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-02T04:23:32.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-04T14:33:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T04:23:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"18-异步组件和代码分包和suspense\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-04T14:33:00.000Z\\",\\"dateModified\\":\\"2023-03-02T04:23:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"引入方式不同","slug":"引入方式不同","link":"#引入方式不同","children":[]}],"git":{"createdTime":1677731012000,"updatedTime":1677731012000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.28,"words":383},"filePathRelative":"posts/literature-notes/xiaoman-zsVue3-vite-Ts/18-异步组件和代码分包和suspense.md","localizedDate":"January 4, 2023","excerpt":"<h1> 异步组件</h1>\\n<p>在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积</p>\\n<p>这时候就可以使用异步组件</p>\\n<!-- [原生 Ajax 封装 axios](../code/原生Ajax封装axios.md) -->\\n<h2> 引入方式不同</h2>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> defineAsyncComponent <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vue'</span>\\n\\n<span class=\\"token comment\\">//专门的函数引入</span>\\n<span class=\\"token keyword\\">const</span> SyncVue <span class=\\"token operator\\">=</span> <span class=\\"token function\\">defineAsyncComponent</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">import</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'@/components/sync.vue'</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{e as data};
