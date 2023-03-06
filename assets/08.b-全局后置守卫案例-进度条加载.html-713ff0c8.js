const n=JSON.parse(`{"key":"v-b3be4d5c","path":"/code/vue/vue3-router4/08.b-%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E5%AE%88%E5%8D%AB%E6%A1%88%E4%BE%8B-%E8%BF%9B%E5%BA%A6%E6%9D%A1%E5%8A%A0%E8%BD%BD.html","title":"08.b-全局后置守卫案例-进度条加载","lang":"zh-CN","frontmatter":{"category":["vue3"],"date":"2023-01-16 15:28","title":"08.b-全局后置守卫案例-进度条加载","description":"src/main.ts import { createApp, createVNode, render } from 'vue' // import './style.css' import App from './App.vue' import router from './router' import ElementUi from 'element-plus' import 'element-plus/dist/index.css' import loadingBarVue from './components/loadingBar.vue' console.log(loadingBarVue); //不能直接使用 const Vnode = createVNode(loadingBarVue) //转成虚拟Dom render(Vnode, document.body) //挂载 const app = createApp(App) const whiteList = ['/'] //全局前置守卫 router.beforeEach((to, from, next) =&gt; { Vnode.component?.exposed?.startLoading() //loadingBar let token = localStorage.getItem('token') //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面 if (whiteList.includes(to.path) || token) { //token每次都要跟后端校验一下是否过期 } }) //全局后置守卫 router.afterEach((to, from) =&gt; { Vnode.component?.exposed?.endLoading() }) app.mount('#app')","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3-router4/08.b-%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E5%AE%88%E5%8D%AB%E6%A1%88%E4%BE%8B-%E8%BF%9B%E5%BA%A6%E6%9D%A1%E5%8A%A0%E8%BD%BD.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"08.b-全局后置守卫案例-进度条加载"}],["meta",{"property":"og:description","content":"src/main.ts import { createApp, createVNode, render } from 'vue' // import './style.css' import App from './App.vue' import router from './router' import ElementUi from 'element-plus' import 'element-plus/dist/index.css' import loadingBarVue from './components/loadingBar.vue' console.log(loadingBarVue); //不能直接使用 const Vnode = createVNode(loadingBarVue) //转成虚拟Dom render(Vnode, document.body) //挂载 const app = createApp(App) const whiteList = ['/'] //全局前置守卫 router.beforeEach((to, from, next) =&gt; { Vnode.component?.exposed?.startLoading() //loadingBar let token = localStorage.getItem('token') //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面 if (whiteList.includes(to.path) || token) { //token每次都要跟后端校验一下是否过期 } }) //全局后置守卫 router.afterEach((to, from) =&gt; { Vnode.component?.exposed?.endLoading() }) app.mount('#app')"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-06T05:19:35.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-16T15:28:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-06T05:19:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"08.b-全局后置守卫案例-进度条加载\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-16T15:28:00.000Z\\",\\"dateModified\\":\\"2023-03-06T05:19:35.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"src/main.ts","slug":"src-main-ts","link":"#src-main-ts","children":[]},{"level":2,"title":"src/components/loadingBar.vue","slug":"src-components-loadingbar-vue","link":"#src-components-loadingbar-vue","children":[{"level":3,"title":"js 动画渲染补充","slug":"js-动画渲染补充","link":"#js-动画渲染补充","children":[]}]},{"level":2,"title":"src/views/Login.vue","slug":"src-views-login-vue","link":"#src-views-login-vue","children":[]}],"git":{"createdTime":1677862957000,"updatedTime":1678079975000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":2}]},"readingTime":{"minutes":1.54,"words":462},"filePathRelative":"code/vue/vue3-router4/08.b-全局后置守卫案例-进度条加载.md","localizedDate":"2023年1月16日","excerpt":"<h2> src/main.ts</h2>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> createApp<span class=\\"token punctuation\\">,</span> createVNode<span class=\\"token punctuation\\">,</span> render <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vue'</span>\\n<span class=\\"token comment\\">// import './style.css'</span>\\n<span class=\\"token keyword\\">import</span> App <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'./App.vue'</span>\\n<span class=\\"token keyword\\">import</span> router <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'./router'</span>\\n<span class=\\"token keyword\\">import</span> ElementUi <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'element-plus'</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token string\\">'element-plus/dist/index.css'</span>\\n<span class=\\"token keyword\\">import</span> loadingBarVue <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'./components/loadingBar.vue'</span>\\n\\n<span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>loadingBarVue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//不能直接使用</span>\\n<span class=\\"token keyword\\">const</span> Vnode <span class=\\"token operator\\">=</span> <span class=\\"token function\\">createVNode</span><span class=\\"token punctuation\\">(</span>loadingBarVue<span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//转成虚拟Dom</span>\\n<span class=\\"token function\\">render</span><span class=\\"token punctuation\\">(</span>Vnode<span class=\\"token punctuation\\">,</span> document<span class=\\"token punctuation\\">.</span>body<span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//挂载</span>\\n\\n\\n<span class=\\"token keyword\\">const</span> app <span class=\\"token operator\\">=</span> <span class=\\"token function\\">createApp</span><span class=\\"token punctuation\\">(</span>App<span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token keyword\\">const</span> whiteList <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token string\\">'/'</span><span class=\\"token punctuation\\">]</span>\\n\\n<span class=\\"token comment\\">//全局前置守卫</span>\\nrouter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">beforeEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>to<span class=\\"token punctuation\\">,</span> from<span class=\\"token punctuation\\">,</span> next<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n\\n  Vnode<span class=\\"token punctuation\\">.</span>component<span class=\\"token operator\\">?.</span>exposed<span class=\\"token operator\\">?.</span><span class=\\"token function\\">startLoading</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//loadingBar</span>\\n\\n  <span class=\\"token keyword\\">let</span> token <span class=\\"token operator\\">=</span> localStorage<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getItem</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'token'</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token comment\\">//白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>whiteList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">includes</span><span class=\\"token punctuation\\">(</span>to<span class=\\"token punctuation\\">.</span>path<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">||</span> token<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token comment\\">//token每次都要跟后端校验一下是否过期</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token comment\\">//全局后置守卫</span>\\nrouter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">afterEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>to<span class=\\"token punctuation\\">,</span> from<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n  Vnode<span class=\\"token punctuation\\">.</span>component<span class=\\"token operator\\">?.</span>exposed<span class=\\"token operator\\">?.</span><span class=\\"token function\\">endLoading</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n\\napp<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">mount</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'#app'</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
