const n=JSON.parse(`{"key":"v-0a9eaa03","path":"/code/language/typescript/%E5%B0%8F%E6%BB%A1TypeScript%E5%9F%BA%E7%A1%80%E6%95%99%E5%AD%A6/09-%E5%87%BD%E6%95%B0%E6%B3%9B%E5%9E%8B%E5%92%8C%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F.html","title":"09-函数泛型和泛型约束","lang":"zh-CN","frontmatter":{"date":"2022-12-30 21:48","title":"09-函数泛型和泛型约束","description":"泛型 在 TypeScript 是很重要的东西 例如 vue3 是用 ts 编写的 里面用到了非常多的泛型 ok:我们看一个小例子 函数泛型 我写了两个函数一个是数字类型的函数，另一个是字符串类型的函数,其实就是类型不同， 实现的功能是一样的，这时候我们就可以使用泛型来优化 泛型优化 语法为函数名字后面跟一个&lt;参数名&gt; 参数名可以随便写 例如我这儿写了 T 当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型） function Add&lt;T&gt;(a: T, b: T): Array&lt;T&gt; { return [a,b] } Add&lt;number&gt;(1,2) Add&lt;string&gt;('1','2')","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/language/typescript/%E5%B0%8F%E6%BB%A1TypeScript%E5%9F%BA%E7%A1%80%E6%95%99%E5%AD%A6/09-%E5%87%BD%E6%95%B0%E6%B3%9B%E5%9E%8B%E5%92%8C%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"09-函数泛型和泛型约束"}],["meta",{"property":"og:description","content":"泛型 在 TypeScript 是很重要的东西 例如 vue3 是用 ts 编写的 里面用到了非常多的泛型 ok:我们看一个小例子 函数泛型 我写了两个函数一个是数字类型的函数，另一个是字符串类型的函数,其实就是类型不同， 实现的功能是一样的，这时候我们就可以使用泛型来优化 泛型优化 语法为函数名字后面跟一个&lt;参数名&gt; 参数名可以随便写 例如我这儿写了 T 当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型） function Add&lt;T&gt;(a: T, b: T): Array&lt;T&gt; { return [a,b] } Add&lt;number&gt;(1,2) Add&lt;string&gt;('1','2')"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-04T10:07:31.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"09-函数泛型和泛型约束"}],["meta",{"property":"article:published_time","content":"2022-12-30T21:48:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-04T10:07:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"09-函数泛型和泛型约束\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2022-12-30T21:48:00.000Z\\",\\"dateModified\\":\\"2023-03-04T10:07:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"函数泛型","slug":"函数泛型","link":"#函数泛型","children":[]},{"level":2,"title":"泛型约束","slug":"泛型约束","link":"#泛型约束","children":[]},{"level":2,"title":"使用 keyof 约束对象","slug":"使用-keyof-约束对象","link":"#使用-keyof-约束对象","children":[]},{"level":2,"title":"泛型类","slug":"泛型类","link":"#泛型类","children":[]}],"git":{"createdTime":1677924451000,"updatedTime":1677924451000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"code/language/typescript/小满TypeScript基础教学/09-函数泛型和泛型约束.md","localizedDate":"2022年12月30日","excerpt":"<p>泛型 在 TypeScript 是很重要的东西 例如 vue3 是用 ts 编写的 里面用到了非常多的泛型</p>\\n<p>ok:我们看一个小例子</p>\\n<h2> 函数泛型</h2>\\n<p>我写了两个函数一个是数字类型的函数，另一个是字符串类型的函数,其实就是类型不同，</p>\\n<p>实现的功能是一样的，这时候我们就可以使用泛型来优化</p>\\n<p>泛型优化</p>\\n<p>语法为函数名字后面跟一个&lt;参数名&gt; 参数名可以随便写 例如我这儿写了 T</p>\\n<p>当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型）</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">Add</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span>a<span class=\\"token operator\\">:</span> <span class=\\"token constant\\">T</span><span class=\\"token punctuation\\">,</span> b<span class=\\"token operator\\">:</span> <span class=\\"token constant\\">T</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">Array</span><span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span>  <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">[</span>a<span class=\\"token punctuation\\">,</span>b<span class=\\"token punctuation\\">]</span>\\n<span class=\\"token punctuation\\">}</span>\\n \\n<span class=\\"token generic-function\\"><span class=\\"token function\\">Add</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token builtin\\">number</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token generic-function\\"><span class=\\"token function\\">Add</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token builtin\\">string</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'1'</span><span class=\\"token punctuation\\">,</span><span class=\\"token string\\">'2'</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
