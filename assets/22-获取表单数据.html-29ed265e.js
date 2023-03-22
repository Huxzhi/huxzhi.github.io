const a=JSON.parse('{"key":"v-1884f11e","path":"/code/react/React18/22-%E8%8E%B7%E5%8F%96%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE.html","title":"22-获取表单数据","lang":"zh-CN","frontmatter":{"date":"2023-03-09 22:00","title":"22-获取表单数据","updated":"2023-03-20 16:36","description":"获取表单数据 举例 3 种方法 通过 event 事件获取 获取到当前触发事件的对象 事件对象中保存了当前事件触发时的所有信息 event.target 执行的是触发事件的对象 (DOM 对象) const dateChangeHandler = (e) =&gt; { inputDate = e.target.value; }; return ( &lt;Card className=\\"logs-form\\"&gt; &lt;form onSubmit={formSubmitHandler}&gt; &lt;div className=\\"form-item\\"&gt; &lt;label htmlFor=\\"date\\"&gt;日期&lt;/label&gt; &lt;input onChange={dateChangeHandler} id=\\"date\\" type=\\"date\\"/&gt; &lt;/div&gt; &lt;/form&gt; &lt;/Card&gt; );","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/22-%E8%8E%B7%E5%8F%96%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"22-获取表单数据"}],["meta",{"property":"og:description","content":"获取表单数据 举例 3 种方法 通过 event 事件获取 获取到当前触发事件的对象 事件对象中保存了当前事件触发时的所有信息 event.target 执行的是触发事件的对象 (DOM 对象) const dateChangeHandler = (e) =&gt; { inputDate = e.target.value; }; return ( &lt;Card className=\\"logs-form\\"&gt; &lt;form onSubmit={formSubmitHandler}&gt; &lt;div className=\\"form-item\\"&gt; &lt;label htmlFor=\\"date\\"&gt;日期&lt;/label&gt; &lt;input onChange={dateChangeHandler} id=\\"date\\" type=\\"date\\"/&gt; &lt;/div&gt; &lt;/form&gt; &lt;/Card&gt; );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-09T22:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"22-获取表单数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-09T22:00:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"获取表单数据","slug":"获取表单数据","link":"#获取表单数据","children":[{"level":3,"title":"通过 event 事件获取","slug":"通过-event-事件获取","link":"#通过-event-事件获取","children":[]},{"level":3,"title":"useref 绑定 DOM 对象","slug":"useref-绑定-dom-对象","link":"#useref-绑定-dom-对象","children":[]},{"level":3,"title":"原生DOM 获取","slug":"原生dom-获取","link":"#原生dom-获取","children":[]}]},{"level":2,"title":"当表单提交时，汇总表单中的数据","slug":"当表单提交时-汇总表单中的数据","link":"#当表单提交时-汇总表单中的数据","children":[]},{"level":2,"title":"源代码","slug":"源代码","link":"#源代码","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":2.4,"words":720},"filePathRelative":"code/react/React18/22-获取表单数据.md","localizedDate":"2023年3月9日","excerpt":"<h2> 获取表单数据</h2>\\n<p>举例 3 种方法</p>\\n<h3> 通过 event 事件获取</h3>\\n<p>获取到当前触发事件的对象\\n事件对象中保存了当前事件触发时的所有信息 event.target 执行的是触发事件的对象 (DOM 对象)</p>\\n<div class=\\"language-jsx line-numbers-mode\\" data-ext=\\"jsx\\"><pre class=\\"language-jsx\\"><code><span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">dateChangeHandler</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">e</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    inputDate <span class=\\"token operator\\">=</span> e<span class=\\"token punctuation\\">.</span>target<span class=\\"token punctuation\\">.</span>value<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">(</span>\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Card</span></span> <span class=\\"token attr-name\\">className</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>logs-form<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n    </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>form</span> <span class=\\"token attr-name\\">onSubmit</span><span class=\\"token script language-javascript\\"><span class=\\"token script-punctuation punctuation\\">=</span><span class=\\"token punctuation\\">{</span>formSubmitHandler<span class=\\"token punctuation\\">}</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n        </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">className</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>form-item<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n            </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>label</span> <span class=\\"token attr-name\\">htmlFor</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>date<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">日期</span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>label</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n            </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>input</span> <span class=\\"token attr-name\\">onChange</span><span class=\\"token script language-javascript\\"><span class=\\"token script-punctuation punctuation\\">=</span><span class=\\"token punctuation\\">{</span>dateChangeHandler<span class=\\"token punctuation\\">}</span></span> <span class=\\"token attr-name\\">id</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>date<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">type</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>date<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">/&gt;</span></span><span class=\\"token plain-text\\">\\n        </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n        \\n    </span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>form</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token plain-text\\">\\n</span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span><span class=\\"token class-name\\">Card</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{a as data};
