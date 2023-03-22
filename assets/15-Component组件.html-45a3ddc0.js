const n=JSON.parse(`{"key":"v-274b2e6e","path":"/code/react/React18/15-Component%E7%BB%84%E4%BB%B6.html","title":"15-Component组件","lang":"zh-CN","frontmatter":{"date":"2023-02-26 20:25","title":"15-Component组件","updated":"2023-03-20 16:36","description":"15-Component组件 React 组件 在 React 中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。React 中定义组件的方式有两种：基于函数的组件 和 基于类的组件。 基于函数的组件 基于函数的组件其实就是一个会返回 JSX（React 元素）的普通的 JS 函数，你可以这样定义： import ReactDOM from \\"react-dom/client\\"; ​ // 这就是一个组件 function App(){ return &lt;h1&gt;我是一个React的组件！&lt;/h1&gt; } ​ const root = ReactDOM.createRoot(document.getElementById('root')); root.render(&lt;App/&gt;);","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/15-Component%E7%BB%84%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"15-Component组件"}],["meta",{"property":"og:description","content":"15-Component组件 React 组件 在 React 中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。React 中定义组件的方式有两种：基于函数的组件 和 基于类的组件。 基于函数的组件 基于函数的组件其实就是一个会返回 JSX（React 元素）的普通的 JS 函数，你可以这样定义： import ReactDOM from \\"react-dom/client\\"; ​ // 这就是一个组件 function App(){ return &lt;h1&gt;我是一个React的组件！&lt;/h1&gt; } ​ const root = ReactDOM.createRoot(document.getElementById('root')); root.render(&lt;App/&gt;);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-02-26T20:25:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"15-Component组件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-26T20:25:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"基于函数的组件","slug":"基于函数的组件","link":"#基于函数的组件","children":[]},{"level":2,"title":"类组件","slug":"类组件","link":"#类组件","children":[]},{"level":2,"title":"引入样式","slug":"引入样式","link":"#引入样式","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":2.1,"words":629},"filePathRelative":"code/react/React18/15-Component组件.md","localizedDate":"2023年2月26日","excerpt":"<h1> 15-Component组件</h1>\\n<h1> React 组件</h1>\\n<p>在 React 中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。React 中定义组件的方式有两种：<strong>基于函数的组件</strong> 和 <strong>基于类的组件</strong>。</p>\\n<h2> 基于函数的组件</h2>\\n<p>基于函数的组件其实就是一个会返回 JSX（React 元素）的普通的 JS 函数，你可以这样定义：</p>\\n<div class=\\"language-jsx line-numbers-mode\\" data-ext=\\"jsx\\"><pre class=\\"language-jsx\\"><code><span class=\\"token keyword\\">import</span> ReactDOM <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\\"react-dom/client\\"</span><span class=\\"token punctuation\\">;</span>\\n​\\n<span class=\\"token comment\\">// 这就是一个组件</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">App</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>h1</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">我是一个React的组件！</span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>h1</span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token punctuation\\">}</span>\\n​\\n<span class=\\"token keyword\\">const</span> root <span class=\\"token operator\\">=</span> ReactDOM<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">createRoot</span><span class=\\"token punctuation\\">(</span>document<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getElementById</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'root'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nroot<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">render</span><span class=\\"token punctuation\\">(</span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">App</span></span><span class=\\"token punctuation\\">/&gt;</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
