import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const e={},p=t(`<h1 id="_48a-createapi-参数对象" tabindex="-1"><a class="header-anchor" href="#_48a-createapi-参数对象" aria-hidden="true">#</a> 48a-createApi 参数对象</h1><p>对 RTKQ 中 createApi() 创建的 API 对象 生效</p><p><code>keepUnusedDataFor:60</code> 设置数据缓存的时间，单位秒 默认 60s</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>createApi<span class="token punctuation">,</span> fetchBaseQuery<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@reduxjs/toolkit/dist/query/react&quot;</span><span class="token punctuation">;</span>


<span class="token comment">// 创建Api对象</span>
<span class="token comment">//createApi() 用来创建RTKQ中的API对象</span>
<span class="token comment">// RTKQ的所有功能都需要通过该对象来进行</span>
<span class="token comment">// createApi() 需要一个对象作为参数</span>
<span class="token keyword">const</span> studentApi <span class="token operator">=</span> <span class="token function">createApi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">reducerPath</span><span class="token operator">:</span> <span class="token string">&#39;studentApi&#39;</span><span class="token punctuation">,</span> <span class="token comment">// Api的标识，不能和其他的Api或reducer重复</span>
    <span class="token literal-property property">baseQuery</span><span class="token operator">:</span> <span class="token function">fetchBaseQuery</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">baseUrl</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:1337/api/&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 指定查询的基础信息，发送请求使用的工具</span>
    <span class="token function">endpoints</span><span class="token punctuation">(</span><span class="token parameter">build</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// build是请求的构建器，通过build来设置请求的相关信息</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">getStudents</span><span class="token operator">:</span>build<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 用来指定请求子路径</span>
                    <span class="token keyword">return</span> <span class="token string">&#39;students&#39;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token comment">// transformResponse 用来转换响应数据的格式</span>
                <span class="token function">transformResponse</span><span class="token punctuation">(</span><span class="token parameter">baseQueryReturnValue<span class="token punctuation">,</span> meta<span class="token punctuation">,</span> arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> baseQueryReturnValue<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">getStudentById</span><span class="token operator">:</span>build<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">//http://localhost:1337/api/students/23</span>
                    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">students/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token function">transformResponse</span><span class="token punctuation">(</span><span class="token parameter">baseQueryReturnValue<span class="token punctuation">,</span> meta<span class="token punctuation">,</span> arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> baseQueryReturnValue<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">keepUnusedDataFor</span><span class="token operator">:</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token comment">// 设置数据缓存的时间，单位秒 默认60s</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token comment">// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数</span>
<span class="token comment">// 通过这些钩子函数，可以来向服务器发送请求</span>
<span class="token comment">// 钩子函数的命名规则 getStudents --&gt; useGetStudentsQuery</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
    useGetStudentsQuery<span class="token punctuation">,</span>
    useGetStudentByIdQuery
<span class="token punctuation">}</span> <span class="token operator">=</span> studentApi<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> studentApi<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","48a-createApi参数对象.html.vue"]]);export{r as default};
