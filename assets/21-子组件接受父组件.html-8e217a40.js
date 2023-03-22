const n=JSON.parse('{"key":"v-36af971a","path":"/code/react/React18/21-%E5%AD%90%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%8F%97%E7%88%B6%E7%BB%84%E4%BB%B6.html","title":"21-子组件接受父组件","lang":"zh-CN","frontmatter":{"category":["react18"],"date":"2023-03-08 22:40","title":"21-子组件接受父组件","updated":"2023-03-20 16:36","description":"21-子组件接受父组件 props.children 表示组件的标签体 子组件接受 父组件的 标签体 子组件接受 父组件的 class const Card = (props) =&gt; { /* * props.children 表示组件的标签体 * */ // console.log(props.children); return &lt;div className={`card ${props.className}`}&gt;{props.children}&lt;/div&gt;; }; export default Card;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/21-%E5%AD%90%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%8F%97%E7%88%B6%E7%BB%84%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"21-子组件接受父组件"}],["meta",{"property":"og:description","content":"21-子组件接受父组件 props.children 表示组件的标签体 子组件接受 父组件的 标签体 子组件接受 父组件的 class const Card = (props) =&gt; { /* * props.children 表示组件的标签体 * */ // console.log(props.children); return &lt;div className={`card ${props.className}`}&gt;{props.children}&lt;/div&gt;; }; export default Card;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-08T22:40:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"21-子组件接受父组件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-08T22:40:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"props.children 表示组件的标签体","slug":"props-children-表示组件的标签体","link":"#props-children-表示组件的标签体","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"code/react/React18/21-子组件接受父组件.md","localizedDate":"2023年3月8日","excerpt":"<h1> 21-子组件接受父组件</h1>\\n<h2> props.children 表示组件的标签体</h2>\\n<p>子组件接受 父组件的 标签体\\n子组件接受 父组件的 <code>class</code></p>\\n<div class=\\"language-jsx line-numbers-mode\\" data-ext=\\"jsx\\"><pre class=\\"language-jsx\\"><code><span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">Card</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">props</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n\\n\\n    <span class=\\"token comment\\">/*\\n    *   props.children 表示组件的标签体\\n    * */</span>\\n    <span class=\\"token comment\\">// console.log(props.children);</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">className</span><span class=\\"token script language-javascript\\"><span class=\\"token script-punctuation punctuation\\">=</span><span class=\\"token punctuation\\">{</span><span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">`</span><span class=\\"token string\\">card </span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">${</span>props<span class=\\"token punctuation\\">.</span>className<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token template-punctuation string\\">`</span></span><span class=\\"token punctuation\\">}</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">{</span>props<span class=\\"token punctuation\\">.</span>children<span class=\\"token punctuation\\">}</span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> Card<span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
