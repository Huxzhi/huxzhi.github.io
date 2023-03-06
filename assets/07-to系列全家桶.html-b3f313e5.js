const t=JSON.parse(`{"key":"v-6c236cda","path":"/code/vue/vue3/07-to%E7%B3%BB%E5%88%97%E5%85%A8%E5%AE%B6%E6%A1%B6.html","title":"07-to系列全家桶","lang":"zh-CN","frontmatter":{"category":["vue3"],"date":"2023-01-01 21:36","title":"07-to系列全家桶","description":"toRef 应用场景 比如你请求拿到一个对象，但是只用其中某个属性，并且是响应式 把属性解构出来 toref 只能修改响应式对象的值 非常响应式视图毫无变化 &lt;template&gt; &lt;div&gt; &lt;button @click=\\"change\\"&gt;按钮&lt;/button&gt; {{state}} &lt;/div&gt; &lt;/template&gt; &lt;script setup lang=\\"ts\\"&gt; import { reactive, toRef } from 'vue' const obj = { foo: 1, bar: 1 } const state = toRef(obj, 'bar') // bar 转化为响应式对象 const change = () =&gt; { state.value++ console.log(obj, state); } &lt;/script&gt;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/07-to%E7%B3%BB%E5%88%97%E5%85%A8%E5%AE%B6%E6%A1%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"07-to系列全家桶"}],["meta",{"property":"og:description","content":"toRef 应用场景 比如你请求拿到一个对象，但是只用其中某个属性，并且是响应式 把属性解构出来 toref 只能修改响应式对象的值 非常响应式视图毫无变化 &lt;template&gt; &lt;div&gt; &lt;button @click=\\"change\\"&gt;按钮&lt;/button&gt; {{state}} &lt;/div&gt; &lt;/template&gt; &lt;script setup lang=\\"ts\\"&gt; import { reactive, toRef } from 'vue' const obj = { foo: 1, bar: 1 } const state = toRef(obj, 'bar') // bar 转化为响应式对象 const change = () =&gt; { state.value++ console.log(obj, state); } &lt;/script&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-06T05:19:35.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-01T21:36:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-06T05:19:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"07-to系列全家桶\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-01T21:36:00.000Z\\",\\"dateModified\\":\\"2023-03-06T05:19:35.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"toRef","slug":"toref","link":"#toref","children":[]},{"level":2,"title":"toRefs","slug":"torefs","link":"#torefs","children":[]},{"level":2,"title":"toRaw","slug":"toraw","link":"#toraw","children":[]},{"level":2,"title":"toRef 源码解析","slug":"toref-源码解析","link":"#toref-源码解析","children":[]},{"level":2,"title":"toRefs 源码解析","slug":"torefs-源码解析","link":"#torefs-源码解析","children":[]},{"level":2,"title":"toRaw 源码解析","slug":"toraw-源码解析","link":"#toraw-源码解析","children":[]}],"git":{"createdTime":1677862957000,"updatedTime":1678079975000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":2}]},"readingTime":{"minutes":2.07,"words":622},"filePathRelative":"code/vue/vue3/07-to系列全家桶.md","localizedDate":"2023年1月1日","excerpt":"<h2> toRef</h2>\\n<p>应用场景\\n比如你请求拿到一个对象，但是只用其中某个属性，并且是响应式\\n把属性解构出来</p>\\n<p><code>toref</code> 只能修改响应式对象的值 非常响应式视图毫无变化</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token operator\\">&lt;</span>template<span class=\\"token operator\\">&gt;</span>\\n   <span class=\\"token operator\\">&lt;</span>div<span class=\\"token operator\\">&gt;</span>\\n      <span class=\\"token operator\\">&lt;</span>button <span class=\\"token decorator\\"><span class=\\"token at operator\\">@</span><span class=\\"token function\\">click</span></span><span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"change\\"</span><span class=\\"token operator\\">&gt;</span>按钮<span class=\\"token operator\\">&lt;</span><span class=\\"token operator\\">/</span>button<span class=\\"token operator\\">&gt;</span>\\n      <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">{</span>state<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">}</span>\\n   <span class=\\"token operator\\">&lt;</span><span class=\\"token operator\\">/</span>div<span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token operator\\">&lt;</span><span class=\\"token operator\\">/</span>template<span class=\\"token operator\\">&gt;</span>\\n\\n<span class=\\"token operator\\">&lt;</span>script setup lang<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"ts\\"</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> reactive<span class=\\"token punctuation\\">,</span> toRef <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vue'</span>\\n\\n<span class=\\"token keyword\\">const</span> obj <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n   foo<span class=\\"token operator\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n   bar<span class=\\"token operator\\">:</span> <span class=\\"token number\\">1</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n\\n<span class=\\"token keyword\\">const</span> state <span class=\\"token operator\\">=</span> <span class=\\"token function\\">toRef</span><span class=\\"token punctuation\\">(</span>obj<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">'bar'</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token comment\\">// bar 转化为响应式对象</span>\\n\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">change</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n   state<span class=\\"token punctuation\\">.</span>value<span class=\\"token operator\\">++</span>\\n   <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>obj<span class=\\"token punctuation\\">,</span> state<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token operator\\">&lt;</span><span class=\\"token operator\\">/</span>script<span class=\\"token operator\\">&gt;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{t as data};
