const e=JSON.parse('{"key":"v-198eddd7","path":"/code/vue/vue3/29-Vue3%E5%AE%9A%E4%B9%89%E5%85%A8%E5%B1%80%E5%87%BD%E6%95%B0%E5%92%8C%E5%8F%98%E9%87%8F.html","title":"29-Vue3定义全局函数和变量","lang":"zh-CN","frontmatter":{"category":["vue3"],"date":"2023-01-07 17:10","title":"29-Vue3定义全局函数和变量","updated":"2023-05-08 09:12","description":"globalProperties 由于 Vue3 没有 Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数 Vue2 // 之前 (Vue 2.x) Vue.prototype.$http = () =&gt; {}","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/29-Vue3%E5%AE%9A%E4%B9%89%E5%85%A8%E5%B1%80%E5%87%BD%E6%95%B0%E5%92%8C%E5%8F%98%E9%87%8F.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"29-Vue3定义全局函数和变量"}],["meta",{"property":"og:description","content":"globalProperties 由于 Vue3 没有 Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数 Vue2 // 之前 (Vue 2.x) Vue.prototype.$http = () =&gt; {}"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T02:14:57.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-07T17:10:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T02:14:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"29-Vue3定义全局函数和变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-07T17:10:00.000Z\\",\\"dateModified\\":\\"2023-05-08T02:14:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"globalProperties","slug":"globalproperties","link":"#globalproperties","children":[]},{"level":2,"title":"案例 过滤器","slug":"案例-过滤器","link":"#案例-过滤器","children":[{"level":3,"title":"声明文件 不然 TS 无法正确类型 推导","slug":"声明文件-不然-ts-无法正确类型-推导","link":"#声明文件-不然-ts-无法正确类型-推导","children":[]},{"level":3,"title":"setup 读取值","slug":"setup-读取值","link":"#setup-读取值","children":[]}]}],"git":{"createdTime":1677862957000,"updatedTime":1683512097000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":4}]},"readingTime":{"minutes":0.71,"words":212},"filePathRelative":"code/vue/vue3/29-Vue3定义全局函数和变量.md","localizedDate":"2023年1月7日","excerpt":"<h2> globalProperties</h2>\\n<p>由于 Vue3 没有 Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数</p>\\n<p>Vue2</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token comment\\">// 之前 (Vue 2.x)</span>\\nVue<span class=\\"token punctuation\\">.</span>prototype<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">$http</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{e as data};
