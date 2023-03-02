import{_ as n,X as s,Y as a,a3 as e}from"./framework-7bff9a9e.js";const t={},p=e(`<h2 id="绝对布局" tabindex="-1"><a class="header-anchor" href="#绝对布局" aria-hidden="true">#</a> 绝对布局</h2><p>如果父组件使用相对布局 会出现问题</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.parent</span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.dialog</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #141414<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> //改成 fixed
    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -200px<span class="token punctuation">;</span> //宽度的一半
    <span class="token property">margin-top</span><span class="token punctuation">:</span> -200px<span class="token punctuation">;</span>  //高度的一半
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="transform-translate-50" tabindex="-1"><a class="header-anchor" href="#transform-translate-50" aria-hidden="true">#</a> transform translate -50%</h2>`,5),c=[p];function i(o,l){return s(),a("div",null,c)}const u=n(t,[["render",i],["__file","dialog居中.html.vue"]]);export{u as default};
