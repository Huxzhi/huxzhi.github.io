import{_ as n,W as s,X as a,a2 as t}from"./framework-cbb69da9.js";const e={},p=t(`<p>watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用</p><ul><li>watch第一个参数监听源</li><li>watch第二个参数回调函数cb（newVal,oldVal）</li><li>watch第三个参数一个options配置项是一个对象<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">{</span>
immediate<span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">//是否立即调用一次</span>
deep<span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">//是否开启深度监听</span>
flush<span class="token operator">:</span><span class="token string">&quot;pre&quot;</span> <span class="token comment">//pre 组件更新之前调用 sync 同步执行 post 组件更新之后行</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>如果是引用类型，旧值和新值是一样的</p><h2 id="监听ref-案例" tabindex="-1"><a class="header-anchor" href="#监听ref-案例" aria-hidden="true">#</a> 监听Ref 案例</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
 
<span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    nav<span class="token operator">:</span><span class="token punctuation">{</span>
        bar<span class="token operator">:</span><span class="token punctuation">{</span>
            name<span class="token operator">:</span><span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
 
<span class="token function">watch</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;新的值----&#39;</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;旧的值----&#39;</span><span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    immediate<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    deep<span class="token operator">:</span><span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监听reactive" tabindex="-1"><a class="header-anchor" href="#监听reactive" aria-hidden="true">#</a> 监听Reactive</h2><p>使用reactive监听深层对象开启和不开启deep 效果一样</p><p>案例2 监听reactive 单一值</p><p>变成 <strong>回调函数</strong> 才可以</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> watch <span class="token punctuation">,</span>reactive<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
 
<span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    name2<span class="token operator">:</span><span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
 
<span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>message<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;新的值----&#39;</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;旧的值----&#39;</span><span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","10-watch侦听器.html.vue"]]);export{r as default};
