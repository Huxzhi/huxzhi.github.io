const e=JSON.parse('{"key":"v-87ab9728","path":"/code/react/React-demo/2-hook-demo.html","title":"2-hook-demo","lang":"zh-CN","frontmatter":{"category":["react18"],"date":"2023-03-22 19:46","title":"2-hook-demo","updated":"2023-03-22 23:49","description":"2-hook-demo 关于 React 中的钩子函数，我们已经非常熟悉了。钩子函数的功能非常的强大，而它的使用又十分简单。关于钩子函数的使用，我们只需记住两点： 钩子只能直接在 React 组件和自定义钩子中使用 钩子不能在嵌套函数或其他语句（if、switch、white、for 等）中使用 React 中自带的钩子函数 useState useEffect useContext useReducer useCallback useRef useMemo useImperativeHandle useLayoutEffect useDebugValue（18.0 新增） useDeferredValue（18.0 新增） useTransition（18.0 新增） useId（18.0 新增） useSyncExternalStore（18.0 新增） useInsertionEffect（18.0 新增）","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React-demo/2-hook-demo.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"2-hook-demo"}],["meta",{"property":"og:description","content":"2-hook-demo 关于 React 中的钩子函数，我们已经非常熟悉了。钩子函数的功能非常的强大，而它的使用又十分简单。关于钩子函数的使用，我们只需记住两点： 钩子只能直接在 React 组件和自定义钩子中使用 钩子不能在嵌套函数或其他语句（if、switch、white、for 等）中使用 React 中自带的钩子函数 useState useEffect useContext useReducer useCallback useRef useMemo useImperativeHandle useLayoutEffect useDebugValue（18.0 新增） useDeferredValue（18.0 新增） useTransition（18.0 新增） useId（18.0 新增） useSyncExternalStore（18.0 新增） useInsertionEffect（18.0 新增）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"2-hook-demo"}],["meta",{"property":"article:published_time","content":"2023-03-22T19:46:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2-hook-demo\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-03-22T19:46:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"React 中自带的钩子函数","slug":"react-中自带的钩子函数","link":"#react-中自带的钩子函数","children":[]},{"level":2,"title":"UseMemo","slug":"usememo","link":"#usememo","children":[]},{"level":2,"title":"useImperativeHandle","slug":"useimperativehandle","link":"#useimperativehandle","children":[{"level":3,"title":"React.forwardRef() 可以用来指定组件向外部暴露的 ref","slug":"react-forwardref-可以用来指定组件向外部暴露的-ref","link":"#react-forwardref-可以用来指定组件向外部暴露的-ref","children":[]},{"level":3,"title":"useImperativeHandle 减少组件对 DOM 对象的直接操作","slug":"useimperativehandle-减少组件对-dom-对象的直接操作","link":"#useimperativehandle-减少组件对-dom-对象的直接操作","children":[]}]},{"level":2,"title":"UseLayoutEffect","slug":"uselayouteffect","link":"#uselayouteffect","children":[{"level":3,"title":"uselnsertionEffect 如何解决并发渲染的问题","slug":"uselnsertioneffect-如何解决并发渲染的问题","link":"#uselnsertioneffect-如何解决并发渲染的问题","children":[]}]},{"level":2,"title":"UseDebugValue","slug":"usedebugvalue","link":"#usedebugvalue","children":[]},{"level":2,"title":"UseDeferredValue","slug":"usedeferredvalue","link":"#usedeferredvalue","children":[]},{"level":2,"title":"UseTransition","slug":"usetransition","link":"#usetransition","children":[]},{"level":2,"title":"UseId","slug":"useid","link":"#useid","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":6.23,"words":1869},"filePathRelative":"code/react/React-demo/2-hook-demo.md","localizedDate":"2023年3月22日","excerpt":"<h1> 2-hook-demo</h1>\\n<p>关于 React 中的钩子函数，我们已经非常熟悉了。钩子函数的功能非常的强大，而它的使用又十分简单。关于钩子函数的使用，我们只需记住两点：</p>\\n<ol>\\n<li><mark>钩子只能直接在 React 组件和自定义钩子中使用</mark></li>\\n<li>钩子不能在嵌套函数或其他语句（if、switch、white、for 等）中使用</li>\\n</ol>\\n<h2> React 中自带的钩子函数</h2>\\n<ol>\\n<li>useState</li>\\n<li>useEffect</li>\\n<li>useContext</li>\\n<li>useReducer</li>\\n<li>useCallback</li>\\n<li>useRef</li>\\n<li>useMemo</li>\\n<li>useImperativeHandle</li>\\n<li>useLayoutEffect</li>\\n<li>useDebugValue（18.0 新增）</li>\\n<li>useDeferredValue（18.0 新增）</li>\\n<li>useTransition（18.0 新增）</li>\\n<li>useId（18.0 新增）</li>\\n<li>useSyncExternalStore（18.0 新增）</li>\\n<li>useInsertionEffect（18.0 新增）</li>\\n</ol>","copyright":{},"autoDesc":true}');export{e as data};
