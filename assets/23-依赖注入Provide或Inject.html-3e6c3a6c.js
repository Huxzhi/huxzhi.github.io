const e=JSON.parse('{"key":"v-3029aa6c","path":"/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/23-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5Provide%E6%88%96Inject.html","title":"23-依赖注入Provide或Inject","lang":"zh-CN","frontmatter":{"date":"2023-01-05 17:08","title":"23-依赖注入Provide或Inject","description":"Provide / Inject 通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。 官网的解释很让人疑惑，那我翻译下这几句话： provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://huxzhi.github.io/posts/literature-notes/xiaoman-zsVue3-vite-Ts/23-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5Provide%E6%88%96Inject.html"}],["meta",{"property":"og:url","content":"https://huxzhi.github.io/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/23-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5Provide%E6%88%96Inject.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"23-依赖注入Provide或Inject"}],["meta",{"property":"og:description","content":"Provide / Inject 通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。 官网的解释很让人疑惑，那我翻译下这几句话： provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-03-02T04:23:32.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"23-依赖注入Provide或Inject"}],["meta",{"property":"article:published_time","content":"2023-01-05T17:08:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T04:23:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"23-依赖注入Provide或Inject\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-01-05T17:08:00.000Z\\",\\"dateModified\\":\\"2023-03-02T04:23:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Provide / Inject","slug":"provide-inject","link":"#provide-inject","children":[]},{"level":2,"title":"看一个例子","slug":"看一个例子","link":"#看一个例子","children":[]},{"level":2,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":2,"title":"源码解析","slug":"源码解析","link":"#源码解析","children":[]}],"git":{"createdTime":1677731012000,"updatedTime":1677731012000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/23-依赖注入Provide或Inject.md","localizedDate":"2023年1月5日","excerpt":"<h2> Provide / Inject</h2>\\n<p>通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。</p>\\n<p>官网的解释很让人疑惑，那我翻译下这几句话：</p>\\n<p>provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。</p>\\n<figure><figcaption></figcaption></figure>","copyright":{},"autoDesc":true}');export{e as data};
