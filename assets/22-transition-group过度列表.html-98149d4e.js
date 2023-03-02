const t=JSON.parse('{"key":"v-f09b46d2","path":"/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/22-transition-group%E8%BF%87%E5%BA%A6%E5%88%97%E8%A1%A8.html","title":"22-transition-group过度列表","lang":"zh-CN","frontmatter":{"date":"2023-01-05 16:29","title":"22-transition-group过度列表","description":"1.渲染多节点 单个节点 多个节点，每次只渲染一个 那么怎么同时渲染整个列表，比如使用 v-for？在这种场景下，我们会使用 &lt;transition-group&gt; 组件。在我们深入例子之前，先了解关于这个组件的几个特点： 默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素。 过渡模式不可用，因为我们不再相互切换特有的元素。 内部元素 总是需要 提供唯一的 key attribute 值。 CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://huxzhi.github.io/posts/literature-notes/xiaoman-zsVue3-vite-Ts/22-transition-group%E8%BF%87%E5%BA%A6%E5%88%97%E8%A1%A8.html"}],["meta",{"property":"og:url","content":"https://huxzhi.github.io/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/22-transition-group%E8%BF%87%E5%BA%A6%E5%88%97%E8%A1%A8.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"22-transition-group过度列表"}],["meta",{"property":"og:description","content":"1.渲染多节点 单个节点 多个节点，每次只渲染一个 那么怎么同时渲染整个列表，比如使用 v-for？在这种场景下，我们会使用 &lt;transition-group&gt; 组件。在我们深入例子之前，先了解关于这个组件的几个特点： 默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素。 过渡模式不可用，因为我们不再相互切换特有的元素。 内部元素 总是需要 提供唯一的 key attribute 值。 CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-03-02T04:23:32.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-05T16:29:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T04:23:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"22-transition-group过度列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-05T16:29:00.000Z\\",\\"dateModified\\":\\"2023-03-02T04:23:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.渲染多节点","slug":"_1-渲染多节点","link":"#_1-渲染多节点","children":[]},{"level":2,"title":"2.列表的移动过渡","slug":"_2-列表的移动过渡","link":"#_2-列表的移动过渡","children":[]},{"level":2,"title":"3.状态过渡","slug":"_3-状态过渡","link":"#_3-状态过渡","children":[]}],"git":{"createdTime":1677731012000,"updatedTime":1677731012000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.79,"words":538},"filePathRelative":"zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/22-transition-group过度列表.md","localizedDate":"2023年1月5日","excerpt":"<h2> 1.渲染多节点</h2>\\n<ul>\\n<li>单个节点</li>\\n<li>多个节点，每次只渲染一个</li>\\n</ul>\\n<p>那么怎么同时渲染整个列表，比如使用 v-for？在这种场景下，我们会使用 <code>&lt;transition-group&gt;</code> 组件。在我们深入例子之前，先了解关于这个组件的几个特点：</p>\\n<ul>\\n<li>默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素。</li>\\n<li>过渡模式不可用，因为我们不再相互切换特有的元素。</li>\\n<li>内部元素 <strong>总是需要</strong> 提供唯一的 key attribute 值。</li>\\n<li>CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。</li>\\n</ul>","copyright":{},"autoDesc":true}');export{t as data};
