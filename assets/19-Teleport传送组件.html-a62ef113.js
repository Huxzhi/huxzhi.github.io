const t=JSON.parse('{"key":"v-73b731ac","path":"/code/vue/vue3/19-Teleport%E4%BC%A0%E9%80%81%E7%BB%84%E4%BB%B6.html","title":"19-Teleport传送组件","lang":"zh-CN","frontmatter":{"date":"2023-01-04 18:25","title":"19-Teleport传送组件","description":"Teleport Vue 3.0 新特性之一。 Teleport 是一种能够将我们的模板渲染至指定 DOM 节点，不受父级 style、v-show 等属性影响，但 data、prop 数据依旧能够共用的技术；类似于 React 的 Portal。 主要解决的问题 因为 Teleport 节点挂载在其他指定的 DOM 节点下，完全不受父级 style 样式影响 使用方法 通过 to 属性 插入指定元素位置 to=\\"body\\" 便可以将 Teleport 内容传送到指定位置 &lt;Teleport to=\\"body\\"&gt; &lt;Loading&gt;&lt;/Loading&gt; &lt;/Teleport&gt;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/19-Teleport%E4%BC%A0%E9%80%81%E7%BB%84%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"19-Teleport传送组件"}],["meta",{"property":"og:description","content":"Teleport Vue 3.0 新特性之一。 Teleport 是一种能够将我们的模板渲染至指定 DOM 节点，不受父级 style、v-show 等属性影响，但 data、prop 数据依旧能够共用的技术；类似于 React 的 Portal。 主要解决的问题 因为 Teleport 节点挂载在其他指定的 DOM 节点下，完全不受父级 style 样式影响 使用方法 通过 to 属性 插入指定元素位置 to=\\"body\\" 便可以将 Teleport 内容传送到指定位置 &lt;Teleport to=\\"body\\"&gt; &lt;Loading&gt;&lt;/Loading&gt; &lt;/Teleport&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-03T17:02:37.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"19-Teleport传送组件"}],["meta",{"property":"article:published_time","content":"2023-01-04T18:25:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-03T17:02:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19-Teleport传送组件\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-01-04T18:25:00.000Z\\",\\"dateModified\\":\\"2023-03-03T17:02:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[{"level":3,"title":"事例","slug":"事例","link":"#事例","children":[]},{"level":3,"title":"多个使用场景","slug":"多个使用场景","link":"#多个使用场景","children":[]},{"level":3,"title":"动态控制 teleport","slug":"动态控制-teleport","link":"#动态控制-teleport","children":[]},{"level":3,"title":"源码解析","slug":"源码解析","link":"#源码解析","children":[]}]}],"git":{"createdTime":1677862957000,"updatedTime":1677862957000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.94,"words":583},"filePathRelative":"code/vue/vue3/19-Teleport传送组件.md","localizedDate":"2023年1月4日","excerpt":"<p>Teleport Vue 3.0 新特性之一。</p>\\n<p>Teleport 是一种能够将我们的模板渲染至指定 DOM 节点，不受父级 style、v-show 等属性影响，但 data、prop 数据依旧能够共用的技术；类似于 React 的 Portal。</p>\\n<p>主要解决的问题 因为 Teleport 节点挂载在其他指定的 DOM 节点下，完全不受父级 style 样式影响</p>\\n<h2> 使用方法</h2>\\n<p>通过 to 属性 插入指定元素位置 to=\\"body\\" 便可以将 Teleport 内容传送到指定位置</p>\\n<div class=\\"language-vue line-numbers-mode\\" data-ext=\\"vue\\"><pre class=\\"language-vue\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Teleport</span> <span class=\\"token attr-name\\">to</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>body<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Loading</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>Loading</span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>Teleport</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{t as data};
