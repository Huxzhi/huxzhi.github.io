const e=JSON.parse('{"key":"v-79902994","path":"/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/32-%E8%AF%A6%E8%A7%A3Scoped%E5%92%8C%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F.html","title":"32-详解Scoped和样式穿透","lang":"zh-CN","frontmatter":{"date":"2023-01-07 22:16","title":"32-详解Scoped和样式穿透","description":"主要是用于修改很多 vue 常用的组件库（ 了解 UI 库 ElementUI，AntDesigin 等 ），虽然配好了样式但是还是需要更改其他的样式 就需要用到样式穿透 scoped 的原理 vue 中的 scoped 通过在 DOM 结构以及 css 样式上加唯一不重复的标记:data-v-hash 的方式，以保证唯一（而这个工作是由过 PostCSS 转译实现的），达到样式私有化模块化的目的。","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://huxzhi.github.io/posts/literature-notes/xiaoman-zsVue3-vite-Ts/32-%E8%AF%A6%E8%A7%A3Scoped%E5%92%8C%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F.html"}],["meta",{"property":"og:url","content":"https://huxzhi.github.io/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/32-%E8%AF%A6%E8%A7%A3Scoped%E5%92%8C%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"32-详解Scoped和样式穿透"}],["meta",{"property":"og:description","content":"主要是用于修改很多 vue 常用的组件库（ 了解 UI 库 ElementUI，AntDesigin 等 ），虽然配好了样式但是还是需要更改其他的样式 就需要用到样式穿透 scoped 的原理 vue 中的 scoped 通过在 DOM 结构以及 css 样式上加唯一不重复的标记:data-v-hash 的方式，以保证唯一（而这个工作是由过 PostCSS 转译实现的），达到样式私有化模块化的目的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-03-02T04:23:32.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"32-详解Scoped和样式穿透"}],["meta",{"property":"article:published_time","content":"2023-01-07T22:16:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T04:23:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"32-详解Scoped和样式穿透\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-01-07T22:16:00.000Z\\",\\"dateModified\\":\\"2023-03-02T04:23:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":":deep()","slug":"deep","link":"#deep","children":[]},{"level":2,"title":"源码解析","slug":"源码解析","link":"#源码解析","children":[{"level":3,"title":"postCss 插件","slug":"postcss-插件","link":"#postcss-插件","children":[]}]}],"git":{"createdTime":1677731012000,"updatedTime":1677731012000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/32-详解Scoped和样式穿透.md","localizedDate":"2023年1月7日","excerpt":"<p>主要是用于修改很多 vue 常用的组件库（ <a href=\\"/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/31-%E4%BA%86%E8%A7%A3UI%E5%BA%93ElementUI%EF%BC%8CAntDesigin%E7%AD%89.html\\" target=\\"blank\\">了解 UI 库 ElementUI，AntDesigin 等</a> ），虽然配好了样式但是还是需要更改其他的样式</p>\\n<p>就需要用到样式穿透</p>\\n<h1> scoped 的原理</h1>\\n<p>vue 中的 scoped 通过在 DOM 结构以及 css 样式上加唯一不重复的标记:data-v-hash 的方式，以保证唯一（而这个工作是由过 PostCSS 转译实现的），达到样式私有化模块化的目的。</p>","copyright":{},"autoDesc":true}');export{e as data};
