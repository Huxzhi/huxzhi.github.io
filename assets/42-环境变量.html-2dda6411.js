const e=JSON.parse('{"key":"v-aaa11c30","path":"/code/vue/vue3/42-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html","title":"42-环境变量","lang":"zh-CN","frontmatter":{"date":"2023-01-11 18:09","title":"42-环境变量","description":"环境变量 环境变量：他的主要作用就是让开发者区分不同的运行环境，来实现 兼容开发和生产 例如 npm run dev 就是开发环境 npm run build 就是生产环境等等 Vite 在一个特殊的 1mport.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量 { \\"BASE_URL\\":\\"/\\", //部署时的URL前缀 \\"MODE\\":\\"development\\", //运行模式 \\"DEV\\":true,//是否在dev环境 \\"PROD\\":false, //是否是build 环境 \\"SSR\\":false //是否是SSR 服务端渲染模式 }","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/42-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"42-环境变量"}],["meta",{"property":"og:description","content":"环境变量 环境变量：他的主要作用就是让开发者区分不同的运行环境，来实现 兼容开发和生产 例如 npm run dev 就是开发环境 npm run build 就是生产环境等等 Vite 在一个特殊的 1mport.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量 { \\"BASE_URL\\":\\"/\\", //部署时的URL前缀 \\"MODE\\":\\"development\\", //运行模式 \\"DEV\\":true,//是否在dev环境 \\"PROD\\":false, //是否是build 环境 \\"SSR\\":false //是否是SSR 服务端渲染模式 }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-03T17:02:37.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"42-环境变量"}],["meta",{"property":"article:published_time","content":"2023-01-11T18:09:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-03T17:02:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"42-环境变量\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-01-11T18:09:00.000Z\\",\\"dateModified\\":\\"2023-03-03T17:02:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"配置额外的环境变量","slug":"配置额外的环境变量","link":"#配置额外的环境变量","children":[]},{"level":3,"title":"修改启动命令","slug":"修改启动命令","link":"#修改启动命令","children":[]},{"level":3,"title":"配置智能提示","slug":"配置智能提示","link":"#配置智能提示","children":[]},{"level":3,"title":"生产环境使用","slug":"生产环境使用","link":"#生产环境使用","children":[]},{"level":3,"title":"如果想在 vite.config.ts 使用环境变量","slug":"如果想在-vite-config-ts-使用环境变量","link":"#如果想在-vite-config-ts-使用环境变量","children":[]}],"git":{"createdTime":1677862957000,"updatedTime":1677862957000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.72,"words":516},"filePathRelative":"code/vue/vue3/42-环境变量.md","localizedDate":"2023年1月11日","excerpt":"<h1> 环境变量</h1>\\n<p>环境变量：他的主要作用就是让开发者区分不同的运行环境，来实现 兼容开发和生产</p>\\n<p>例如 npm run dev 就是开发环境 npm run build 就是生产环境等等</p>\\n<p><code>Vite</code> 在一个特殊的 <code>1mport.meta.env</code> 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量</p>\\n<!-- 不能出现i​mport.meta.env  -->\\n<div class=\\"language-json line-numbers-mode\\" data-ext=\\"json\\"><pre class=\\"language-json\\"><code><span class=\\"token punctuation\\">{</span>\\n<span class=\\"token property\\">\\"BASE_URL\\"</span><span class=\\"token operator\\">:</span><span class=\\"token string\\">\\"/\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token comment\\">//部署时的URL前缀</span>\\n<span class=\\"token property\\">\\"MODE\\"</span><span class=\\"token operator\\">:</span><span class=\\"token string\\">\\"development\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token comment\\">//运行模式</span>\\n<span class=\\"token property\\">\\"DEV\\"</span><span class=\\"token operator\\">:</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">,</span><span class=\\"token comment\\">//是否在dev环境</span>\\n<span class=\\"token property\\">\\"PROD\\"</span><span class=\\"token operator\\">:</span><span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">,</span> <span class=\\"token comment\\">//是否是build 环境</span>\\n<span class=\\"token property\\">\\"SSR\\"</span><span class=\\"token operator\\">:</span><span class=\\"token boolean\\">false</span> <span class=\\"token comment\\">//是否是SSR 服务端渲染模式</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{e as data};
