const n=JSON.parse('{"key":"v-482cf78d","path":"/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/10-%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81.html","title":"10-防抖和节流","lang":"zh-CN","frontmatter":{"date":"2023-03-25 10:50","title":"10-防抖和节流","updated":"2023-03-25 11:10","description":"10-防抖和节流 防抖 debounce ：隔一段时间才触发,如果再次时间内再次触发则重新计时 节流 throttle ：在设定之间间隔内执行一次 防抖 debounce：隔一段时间才触发,如果再次时间内再次触发则重新计时 const btn1 = document.querySelector(\\"#btn1\\"); function debounce(fn, delay) { var time = null; return function () { // fn() // 不让定时器执行 clearTimeout(time); time = setTimeout(() =&gt; { fn(); }, delay); }; } function handleBtn1() { console.log(\\"请求接口\\"); } btn1.onclick = debounce(handleBtn1, 500);","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/10-%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"10-防抖和节流"}],["meta",{"property":"og:description","content":"10-防抖和节流 防抖 debounce ：隔一段时间才触发,如果再次时间内再次触发则重新计时 节流 throttle ：在设定之间间隔内执行一次 防抖 debounce：隔一段时间才触发,如果再次时间内再次触发则重新计时 const btn1 = document.querySelector(\\"#btn1\\"); function debounce(fn, delay) { var time = null; return function () { // fn() // 不让定时器执行 clearTimeout(time); time = setTimeout(() =&gt; { fn(); }, delay); }; } function handleBtn1() { console.log(\\"请求接口\\"); } btn1.onclick = debounce(handleBtn1, 500);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T02:14:57.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-25T10:50:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T02:14:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10-防抖和节流\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-25T10:50:00.000Z\\",\\"dateModified\\":\\"2023-05-08T02:14:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"防抖 debounce：隔一段时间才触发,如果再次时间内再次触发则重新计时","slug":"防抖-debounce-隔一段时间才触发-如果再次时间内再次触发则重新计时","link":"#防抖-debounce-隔一段时间才触发-如果再次时间内再次触发则重新计时","children":[]},{"level":2,"title":"节流 throttle：在设定之间间隔内执行一次","slug":"节流-throttle-在设定之间间隔内执行一次","link":"#节流-throttle-在设定之间间隔内执行一次","children":[]}],"git":{"createdTime":1683512097000,"updatedTime":1683512097000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":0.73,"words":219},"filePathRelative":"code/front-end-interview/前端面试题/10-防抖和节流.md","localizedDate":"2023年3月25日","excerpt":"<h1> 10-防抖和节流</h1>\\n<ul>\\n<li>防抖 debounce ：隔一段时间才触发,如果再次时间内再次触发则重新计时</li>\\n<li>节流 throttle ：在设定之间间隔内执行一次</li>\\n</ul>\\n<h2> 防抖 debounce：隔一段时间才触发,如果再次时间内再次触发则重新计时</h2>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">const</span> btn1 <span class=\\"token operator\\">=</span> document<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">querySelector</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"#btn1\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">debounce</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">fn<span class=\\"token punctuation\\">,</span> delay</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">var</span> time <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// fn()</span>\\n  <span class=\\"token comment\\">// 不让定时器执行</span>\\n  <span class=\\"token function\\">clearTimeout</span><span class=\\"token punctuation\\">(</span>time<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  time <span class=\\"token operator\\">=</span> <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">fn</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> delay<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">handleBtn1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"请求接口\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\nbtn1<span class=\\"token punctuation\\">.</span>onclick <span class=\\"token operator\\">=</span> <span class=\\"token function\\">debounce</span><span class=\\"token punctuation\\">(</span>handleBtn1<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">500</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
