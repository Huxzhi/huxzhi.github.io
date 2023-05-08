const e=JSON.parse('{"key":"v-43d6e0df","path":"/code/vue/vue3/20-keep-alive%E7%BC%93%E5%AD%98%E7%BB%84%E4%BB%B6.html","title":"20-keep-alive缓存组件","lang":"zh-CN","frontmatter":{"category":["vue3"],"date":"2023-01-04 18:45","title":"20-keep-alive缓存组件","updated":"2023-05-08 09:12","description":"内置组件 keep-alive 有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。==而是希望组件可以缓存下来,维持当前的状态。==这时候就需要用到 keep-alive 组件。 切换组件时还能保存数据，提升用户体验 开启 keep-alive 生命周期的变化 初次进入时： onMounted&gt; onActivated 退出后触发 deactivated 再次进入： 只会触发 onActivated 事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/20-keep-alive%E7%BC%93%E5%AD%98%E7%BB%84%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"20-keep-alive缓存组件"}],["meta",{"property":"og:description","content":"内置组件 keep-alive 有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。==而是希望组件可以缓存下来,维持当前的状态。==这时候就需要用到 keep-alive 组件。 切换组件时还能保存数据，提升用户体验 开启 keep-alive 生命周期的变化 初次进入时： onMounted&gt; onActivated 退出后触发 deactivated 再次进入： 只会触发 onActivated 事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T02:14:57.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-04T18:45:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T02:14:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"20-keep-alive缓存组件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-04T18:45:00.000Z\\",\\"dateModified\\":\\"2023-05-08T02:14:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"内置组件 keep-alive","slug":"内置组件-keep-alive","link":"#内置组件-keep-alive","children":[{"level":3,"title":"开启 keep-alive 生命周期的变化","slug":"开启-keep-alive-生命周期的变化","link":"#开启-keep-alive-生命周期的变化","children":[]},{"level":3,"title":"include 和 exclude","slug":"include-和-exclude","link":"#include-和-exclude","children":[]},{"level":3,"title":"max","slug":"max","link":"#max","children":[]}]},{"level":2,"title":"keep-alive 源码讲解","slug":"keep-alive-源码讲解","link":"#keep-alive-源码讲解","children":[]}],"git":{"createdTime":1677862957000,"updatedTime":1683512097000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":4}]},"readingTime":{"minutes":1.59,"words":476},"filePathRelative":"code/vue/vue3/20-keep-alive缓存组件.md","localizedDate":"2023年1月4日","excerpt":"<h2> 内置组件 keep-alive</h2>\\n<p>有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。==而是希望组件可以缓存下来,维持当前的状态。==这时候就需要用到 keep-alive 组件。</p>\\n<p>切换组件时还能保存数据，提升用户体验</p>\\n<h3> 开启 keep-alive 生命周期的变化</h3>\\n<ul>\\n<li>初次进入时： onMounted&gt; onActivated</li>\\n<li>退出后触发 deactivated</li>\\n<li>再次进入：</li>\\n<li>只会触发 onActivated</li>\\n<li>事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中</li>\\n</ul>","copyright":{},"autoDesc":true}');export{e as data};
