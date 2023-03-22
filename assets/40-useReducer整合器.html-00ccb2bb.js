const e=JSON.parse('{"key":"v-20e09073","path":"/code/react/React18/40-useReducer%E6%95%B4%E5%90%88%E5%99%A8.html","title":"40-useReducer整合器","lang":"zh-CN","frontmatter":{"category":["react18"],"date":"2023-03-17 10:12","title":"40-useReducer整合器","updated":"2023-03-20 16:36","description":"40-useReducer 整合器 接收一个 reducer 函数作为第一个参数，第二个参数是初始化的 state。useReducer 最终返回一个存储有当前状态值的数组和一个 dispatch 函数，该 dispatch 函数执行触发 action，带来状态的变化。 const [state, dispatch()] = useReducer(reducer:[state, action:{}] =&gt; {...}, initialArg:state, init?)","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/40-useReducer%E6%95%B4%E5%90%88%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"40-useReducer整合器"}],["meta",{"property":"og:description","content":"40-useReducer 整合器 接收一个 reducer 函数作为第一个参数，第二个参数是初始化的 state。useReducer 最终返回一个存储有当前状态值的数组和一个 dispatch 函数，该 dispatch 函数执行触发 action，带来状态的变化。 const [state, dispatch()] = useReducer(reducer:[state, action:{}] =&gt; {...}, initialArg:state, init?)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-17T10:12:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"40-useReducer整合器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-17T10:12:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"useReducer 可以让我们将 what 和 how 分开","slug":"usereducer-可以让我们将-what-和-how-分开","link":"#usereducer-可以让我们将-what-和-how-分开","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.48,"words":443},"filePathRelative":"code/react/React18/40-useReducer整合器.md","localizedDate":"2023年3月17日","excerpt":"<h1> 40-useReducer 整合器</h1>\\n<p>接收一个 reducer 函数作为第一个参数，第二个参数是初始化的 state。useReducer 最终返回一个存储有当前状态值的数组和一个 dispatch 函数，该 dispatch 函数执行触发 action，带来状态的变化。</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">[</span>state<span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">dispatch</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token function\\">useReducer</span><span class=\\"token punctuation\\">(</span>reducer<span class=\\"token operator\\">:</span><span class=\\"token punctuation\\">[</span>state<span class=\\"token punctuation\\">,</span> <span class=\\"token literal-property property\\">action</span><span class=\\"token operator\\">:</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span><span class=\\"token operator\\">...</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token literal-property property\\">initialArg</span><span class=\\"token operator\\">:</span>state<span class=\\"token punctuation\\">,</span> init<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{e as data};
