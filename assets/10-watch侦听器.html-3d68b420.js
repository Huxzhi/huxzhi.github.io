const e=JSON.parse('{"key":"v-3efc90d8","path":"/code/vue/vue3/10-watch%E4%BE%A6%E5%90%AC%E5%99%A8.html","title":"10-watch侦听器","lang":"zh-CN","frontmatter":{"category":["vue3"],"date":"2023-01-02 17:48","title":"10-watch侦听器","updated":"2023-05-08 09:12","description":"watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用 watch第一个参数监听源 watch第二个参数回调函数cb（newVal,oldVal） watch第三个参数一个options配置项是一个对象{ immediate:true //是否立即调用一次 deep:true //是否开启深度监听 flush:\\"pre\\" //pre 组件更新之前调用 sync 同步执行 post 组件更新之后行 }","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/10-watch%E4%BE%A6%E5%90%AC%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"10-watch侦听器"}],["meta",{"property":"og:description","content":"watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用 watch第一个参数监听源 watch第二个参数回调函数cb（newVal,oldVal） watch第三个参数一个options配置项是一个对象{ immediate:true //是否立即调用一次 deep:true //是否开启深度监听 flush:\\"pre\\" //pre 组件更新之前调用 sync 同步执行 post 组件更新之后行 }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T02:14:57.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-02T17:48:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T02:14:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10-watch侦听器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-02T17:48:00.000Z\\",\\"dateModified\\":\\"2023-05-08T02:14:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"监听Ref 案例","slug":"监听ref-案例","link":"#监听ref-案例","children":[]},{"level":2,"title":"监听Reactive","slug":"监听reactive","link":"#监听reactive","children":[]}],"git":{"createdTime":1677862957000,"updatedTime":1683512097000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":4}]},"readingTime":{"minutes":0.84,"words":253},"filePathRelative":"code/vue/vue3/10-watch侦听器.md","localizedDate":"2023年1月2日","excerpt":"<p>watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用</p>\\n<ul>\\n<li>watch第一个参数监听源</li>\\n<li>watch第二个参数回调函数cb（newVal,oldVal）</li>\\n<li>watch第三个参数一个options配置项是一个对象<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token punctuation\\">{</span>\\nimmediate<span class=\\"token operator\\">:</span><span class=\\"token boolean\\">true</span> <span class=\\"token comment\\">//是否立即调用一次</span>\\ndeep<span class=\\"token operator\\">:</span><span class=\\"token boolean\\">true</span> <span class=\\"token comment\\">//是否开启深度监听</span>\\nflush<span class=\\"token operator\\">:</span><span class=\\"token string\\">\\"pre\\"</span> <span class=\\"token comment\\">//pre 组件更新之前调用 sync 同步执行 post 组件更新之后行</span>\\n\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n</ul>","copyright":{},"autoDesc":true}');export{e as data};
