import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const e={},p=t(`<h1 id="_01b-使用-redux-保存状态信息" tabindex="-1"><a class="header-anchor" href="#_01b-使用-redux-保存状态信息" aria-hidden="true">#</a> 01b-使用 redux 保存状态信息</h1><h2 id="reduxjs-toolkit-工具" tabindex="-1"><a class="header-anchor" href="#reduxjs-toolkit-工具" aria-hidden="true">#</a> reduxjs/toolkit 工具</h2><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>createSlice<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@reduxjs/toolkit&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> authSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;auth&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">initialState</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">isLogged</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token literal-property property">token</span><span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">reducers</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>isLogged <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            state<span class="token punctuation">.</span>token <span class="token operator">=</span> action<span class="token punctuation">.</span>payload<span class="token punctuation">.</span>token<span class="token punctuation">;</span>
            state<span class="token punctuation">.</span>user <span class="token operator">=</span> action<span class="token punctuation">.</span>payload<span class="token punctuation">.</span>user<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">logout</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>isLogged <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            state<span class="token punctuation">.</span>token <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            state<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
    login<span class="token punctuation">,</span>
    logout<span class="token punctuation">}</span> <span class="token operator">=</span> authSlice<span class="token punctuation">.</span>actions<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","1b-使用redux保存状态信息.html.vue"]]);export{r as default};
