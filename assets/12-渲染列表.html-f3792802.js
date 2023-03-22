import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const e={},p=t(`<h2 id="if-语句" tabindex="-1"><a class="header-anchor" href="#if-语句" aria-hidden="true">#</a> if 语句</h2><p>{} 只能用来放 js 表达式，而不能放语句（if for）</p><ul><li>在语句中是可以去操作 JSX</li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">&#39;孙悟空&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> lang <span class="token operator">=</span> <span class="token string">&#39;cn&#39;</span><span class="token punctuation">;</span>


<span class="token comment">// const div = &lt;div&gt;Hello {name}&lt;/div&gt;;</span>

<span class="token keyword">let</span> div<span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>lang <span class="token operator">===</span> <span class="token string">&#39;en&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    div <span class="token operator">=</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">hello </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>lang <span class="token operator">===</span> <span class="token string">&#39;cn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    div <span class="token operator">=</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">你好 </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="渲染列表" tabindex="-1"><a class="header-anchor" href="#渲染列表" aria-hidden="true">#</a> 渲染列表</h2><p>将arr渲染为一个列表在网页中显示 jsx中会自动将数组中的元素在页面中显示 <code>const list = &lt;ul&gt;{arr}&lt;/ul&gt;;</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;孙悟空&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;猪八戒&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;沙和尚&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">/*
    &lt;ul&gt;
         &lt;li&gt;孙悟空&lt;/li&gt;
         &lt;li&gt;猪八戒&lt;/li&gt;
        ...
    &lt;/ul&gt;

    [&lt;li&gt;孙悟空&lt;/li&gt;, &lt;li&gt;猪八戒&lt;/li&gt;, &lt;li&gt;沙和尚&lt;/li&gt;]
* */</span>

<span class="token comment">// const arr = [];</span>

<span class="token comment">// 遍历data</span>
<span class="token comment">// for(let i=0; i&lt;data.length; i++){</span>
<span class="token comment">//     arr.push(&lt;li&gt;{data[i]}&lt;/li&gt;);</span>
<span class="token comment">// }</span>

<span class="token comment">// const arr = data.map(item =&gt; &lt;li&gt;{item}&lt;/li&gt;);</span>


<span class="token comment">// 将arr渲染为一个列表在网页中显示</span>
<span class="token comment">// jsx中会自动将数组中的元素在页面中显示</span>
<span class="token comment">// const list = &lt;ul&gt;{arr}&lt;/ul&gt;;</span>

<span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token operator">&lt;</span>ul<span class="token operator">&gt;</span><span class="token punctuation">{</span>data<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>li<span class="token operator">&gt;</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> root <span class="token operator">=</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),l=[p];function o(i,c){return s(),a("div",null,l)}const r=n(e,[["render",o],["__file","12-渲染列表.html.vue"]]);export{r as default};
