import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const p={},e=t(`<p><code>useEffect(() =&gt; {})</code> 只能用同步函数，可以定义一个 <code>const</code> 保存 异步函数</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span>useEffect<span class="token punctuation">,</span> useState<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> StudentList <span class="token keyword">from</span> <span class="token string">&quot;./components/StudentList&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./App.css&#39;</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>stuData<span class="token punctuation">,</span> setStuData<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>loading<span class="token punctuation">,</span> setLoading<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个state来记录错误信息</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>error<span class="token punctuation">,</span> setError<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
    *   将写死的数据替换为从接口 http://localhost:1337/api/students
    *       中加载的数据
    *
    *   组件初始化时需要向服务器发送请求来加载数据
    * */</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//设置loading为true</span>
        <span class="token function">setLoading</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 重置错误</span>
        <span class="token function">setError</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 在effect中加载数据</span>
        <span class="token comment">// fetch() 用来向服务器发送请求加载数据，是Ajax的升级版</span>
        <span class="token comment">// 它需要两个参数：1.请求地址 2.请求信息</span>
        <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:1337/api/students&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// 判断是否正常返回响应信息</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>ok<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// response表示响应信息</span>
                    <span class="token comment">// console.log(res);</span>
                    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 该方法可以将响应的json直接转换为js对象</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// 抛出一个错误</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;数据加载失败！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// 将加载到的数据设置到state中</span>
                <span class="token function">setStuData</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// 数据加载完毕设置loading为false</span>
                <span class="token function">setLoading</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// catch中的回调函数，用来统一处理错误</span>
                <span class="token comment">// catch一执行，说明上述代码出错了</span>
                <span class="token comment">// 代码运行到这里，说明没有成功加载到数据</span>
                <span class="token function">setLoading</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 设置错误状态</span>
                <span class="token function">setError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token operator">!</span>loading <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>error<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">StudentList</span></span> <span class="token attr-name">stus</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>stuData<span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token punctuation">{</span>loading <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">数据正在加载中...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token punctuation">{</span>error <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">数据加载异常！</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","44-使用await.html.vue"]]);export{k as default};
