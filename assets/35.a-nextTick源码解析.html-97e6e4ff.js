const n=JSON.parse(`{"key":"v-55fc4e47","path":"/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/35.a-nextTick%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html","title":"35.a-nextTick源码解析","lang":"zh-CN","frontmatter":{"date":"2023-01-09 16:03","title":"35.a-nextTick源码解析","description":"vue 渲染 dom 是异步的，这会出现一个问题，修改 ref 类型的值，同时 console 输出 dom 元素值 为原来的值，需要等待下一个 tick nextTick 为了性能优化 nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。 &lt;template&gt; &lt;div ref=\\"xiaoman\\"&gt; {{ text }} &lt;/div&gt; &lt;button @click=\\"change\\"&gt;change div&lt;/button&gt; &lt;/template&gt; &lt;script setup lang='ts'&gt; import { ref,nextTick } from 'vue'; const text = ref('小满开飞机') const xiaoman = ref&lt;HTMLElement&gt;() const change = async () =&gt; { text.value = '小满不开飞机' console.log(xiaoman.value?.innerText) //小满开飞机 await nextTick(); console.log(xiaoman.value?.innerText) //小满不开飞机 } &lt;/script&gt; &lt;style scoped&gt; &lt;/style&gt;","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://huxzhi.github.io/posts/literature-notes/xiaoman-zsVue3-vite-Ts/35.a-nextTick%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html"}],["meta",{"property":"og:url","content":"https://huxzhi.github.io/zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/35.a-nextTick%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"35.a-nextTick源码解析"}],["meta",{"property":"og:description","content":"vue 渲染 dom 是异步的，这会出现一个问题，修改 ref 类型的值，同时 console 输出 dom 元素值 为原来的值，需要等待下一个 tick nextTick 为了性能优化 nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。 &lt;template&gt; &lt;div ref=\\"xiaoman\\"&gt; {{ text }} &lt;/div&gt; &lt;button @click=\\"change\\"&gt;change div&lt;/button&gt; &lt;/template&gt; &lt;script setup lang='ts'&gt; import { ref,nextTick } from 'vue'; const text = ref('小满开飞机') const xiaoman = ref&lt;HTMLElement&gt;() const change = async () =&gt; { text.value = '小满不开飞机' console.log(xiaoman.value?.innerText) //小满开飞机 await nextTick(); console.log(xiaoman.value?.innerText) //小满不开飞机 } &lt;/script&gt; &lt;style scoped&gt; &lt;/style&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-03-02T04:23:32.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-09T16:03:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-02T04:23:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"35.a-nextTick源码解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-09T16:03:00.000Z\\",\\"dateModified\\":\\"2023-03-02T04:23:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"nextTick","slug":"nexttick","link":"#nexttick","children":[]},{"level":2,"title":"面试题，小坑","slug":"面试题-小坑","link":"#面试题-小坑","children":[]},{"level":2,"title":"源码","slug":"源码","link":"#源码","children":[]}],"git":{"createdTime":1677731012000,"updatedTime":1677731012000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":3.71,"words":1113},"filePathRelative":"zh/posts/literature-notes/xiaoman-zsVue3-vite-Ts/35.a-nextTick源码解析.md","localizedDate":"2023年1月9日","excerpt":"<p>vue 渲染 dom 是异步的，这会出现一个问题，修改 ref 类型的值，同时 console 输出 dom 元素值 为原来的值，需要等待下一个 tick</p>\\n<h2> nextTick</h2>\\n<p>为了性能优化</p>\\n<p>nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。</p>\\n<div class=\\"language-vue line-numbers-mode\\" data-ext=\\"vue\\"><pre class=\\"language-vue\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n   <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">ref</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>xiaoman<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n      {{ text }}\\n   <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n   <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>button</span> <span class=\\"token attr-name\\">@click</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>change<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>change div<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>button</span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>script</span> <span class=\\"token attr-name\\">setup</span> <span class=\\"token attr-name\\">lang</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">'</span>ts<span class=\\"token punctuation\\">'</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token script\\"><span class=\\"token language-javascript\\">\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> ref<span class=\\"token punctuation\\">,</span>nextTick <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vue'</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> text <span class=\\"token operator\\">=</span> <span class=\\"token function\\">ref</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'小满开飞机'</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">const</span> xiaoman <span class=\\"token operator\\">=</span> ref<span class=\\"token operator\\">&lt;</span>HTMLElement<span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">change</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">async</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n   text<span class=\\"token punctuation\\">.</span>value <span class=\\"token operator\\">=</span> <span class=\\"token string\\">'小满不开飞机'</span>\\n   console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>xiaoman<span class=\\"token punctuation\\">.</span>value<span class=\\"token operator\\">?.</span>innerText<span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//小满开飞机</span>\\n   <span class=\\"token keyword\\">await</span> <span class=\\"token function\\">nextTick</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n   console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>xiaoman<span class=\\"token punctuation\\">.</span>value<span class=\\"token operator\\">?.</span>innerText<span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//小满不开飞机</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>script</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>style</span>  <span class=\\"token attr-name\\">scoped</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token style\\"><span class=\\"token language-css\\">\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>style</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
