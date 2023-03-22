import{_ as n,X as s,Y as a,a2 as e}from"./framework-c2b0d87a.js";const t={},p=e(`<h1 id="_48b-usequery-函数使用" tabindex="-1"><a class="header-anchor" href="#_48b-usequery-函数使用" aria-hidden="true">#</a> 48b-useQuery 函数使用</h1><p>useQuery 调用时 生效</p><h2 id="usequery-返回结果" tabindex="-1"><a class="header-anchor" href="#usequery-返回结果" aria-hidden="true">#</a> useQuery 返回结果</h2><h3 id="属性名介绍" tabindex="-1"><a class="header-anchor" href="#属性名介绍" aria-hidden="true">#</a> 属性名介绍</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">currentData</span><span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token comment">// 当前参数的最新数据</span>
<span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token comment">// 最新的数据</span>
<span class="token literal-property property">isError</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 布尔值，是否有错误</span>
    <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 对象，有错时才存在</span>
<span class="token literal-property property">isFetching</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 布尔值，数据是否在加载</span>
<span class="token literal-property property">isLoading</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 布尔值，数据是否第一次加载</span>
<span class="token literal-property property">isSuccess</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 布尔值，请求是否成功</span>
<span class="token literal-property property">isUninitialized</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 布尔值，请求是否还没有开始发送</span>
<span class="token literal-property property">refetch</span><span class="token operator">:</span> <span class="token function">ƒ</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 一个函数，用来重新加载数据</span>
<span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;pending&quot;</span> <span class="token comment">// 字符串，请求的状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点</h3><ul><li>一般用 <code>isFetching</code> 判断是不是加载</li><li><code>currentData</code> 当参数发生变化时，变成 <code>undefined</code>，用于等待数据返回。一般用 <code>data</code> 就好了</li></ul><h2 id="usequery-参数介绍" tabindex="-1"><a class="header-anchor" href="#usequery-参数介绍" aria-hidden="true">#</a> useQuery 参数介绍</h2><p>useQuery 可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">useGetStudentsQuery</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">pollingInterval</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 设置轮询的间隔，单位毫秒 如果为0则表示不轮询</span>
    <span class="token literal-property property">skip</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 设置是否跳过当前请求，默认false</span>
    <span class="token literal-property property">refetchOnMountOrArgChange</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 设置是否每次挂载或参数改变都重新加载数据。false正常使用缓存，true每次都重载数据；或者数字，数据缓存的时间（秒）</span>
    <span class="token literal-property property">refetchOnFocus</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否在重新获取焦点时重载数据</span>
    <span class="token literal-property property">refetchOnReconnect</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否在重新连接后重载数据</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用来指定-usequery-返回的结果" tabindex="-1"><a class="header-anchor" href="#用来指定-usequery-返回的结果" aria-hidden="true">#</a> 用来指定 useQuery 返回的结果</h3><p>在 useQuery() 中进行过滤</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">useGetStudentsQuery</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">selectFromResult</span><span class="token operator">:</span> <span class="token parameter">result</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span>data <span class="token operator">=</span> result<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>attributes<span class="token punctuation">.</span>age <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="skip-使用" tabindex="-1"><a class="header-anchor" href="#skip-使用" aria-hidden="true">#</a> skip 使用</h3><p>可以根据组件的 props 决定需不需要去发送数据请求</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token comment">// 调用钩子来加载数据</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span><span class="token literal-property property">data</span><span class="token operator">:</span>stuData<span class="token punctuation">,</span> isSuccess<span class="token punctuation">,</span> isFetching<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGetStudentByIdQuery</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>stuId<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">skip</span><span class="token operator">:</span><span class="token operator">!</span>props<span class="token punctuation">.</span>stuId<span class="token punctuation">,</span>
        <span class="token literal-property property">refetchOnMountOrArgChange</span><span class="token operator">:</span><span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重新获取焦点时重载数据" tabindex="-1"><a class="header-anchor" href="#重新获取焦点时重载数据" aria-hidden="true">#</a> 重新获取焦点时重载数据</h3><p>refetchOnFocus</p><p><code>setupListeners(store.dispatch); </code> 设置以后，将会支持 refetchOnFocus refetchOnReconnect</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>configureStore<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@reduxjs/toolkit&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> studentApi <span class="token keyword">from</span> <span class="token string">&quot;./studentApi&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>setupListeners<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@reduxjs/toolkit/query&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">reducer</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token punctuation">[</span>studentApi<span class="token punctuation">.</span>reducerPath<span class="token punctuation">]</span><span class="token operator">:</span>studentApi<span class="token punctuation">.</span>reducer
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function-variable function">middleware</span><span class="token operator">:</span><span class="token parameter">getDefaultMiddleware</span> <span class="token operator">=&gt;</span>
        <span class="token function">getDefaultMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>studentApi<span class="token punctuation">.</span>middleware<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setupListeners</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置以后，将会支持 refetchOnFocus refetchOnReconnect</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[p];function c(l,r){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","48b-useQuery函数使用.html.vue"]]);export{u as default};
