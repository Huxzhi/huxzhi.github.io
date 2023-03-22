import{_ as n,X as a,Y as s,a2 as t}from"./framework-c2b0d87a.js";const e={},i=t(`<h1 id="_02a-link" tabindex="-1"><a class="header-anchor" href="#_02a-link" aria-hidden="true">#</a> 02a-Link</h1><p>在使用 react router 时，一定不要使用 a 标签来创建超链接。 因为 a 标签创建的超链接，会自动向服务器发送请求重新加载页面，而我们不希望这种情况发生</p><p>可以使用 Link 组件来创建超链接 NavLink 和 Link 作用相似，只是可以指定链接激活后的样式</p><h2 id="link" tabindex="-1"><a class="header-anchor" href="#link" aria-hidden="true">#</a> Link</h2><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>主页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Link</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/about<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>关于<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="navlink" tabindex="-1"><a class="header-anchor" href="#navlink" aria-hidden="true">#</a> NavLink</h2><p>NavLink 和 Link 作用相似，只是可以指定链接激活后的样式</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>&lt;NavLink
    exact
    // activeClassName={classes.active}
    activeStyle={{ textDecoration: &quot;underline&quot; }}
    to=&quot;/&quot;&gt;
    主页
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>NavLink</span><span class="token punctuation">&gt;</span></span>

&lt;NavLink
    exact
    // activeClassName={classes.active}
    activeStyle={{ textDecoration: &quot;underline&quot; }}
    to=&quot;/about&quot;&gt;
    关于
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>NavLink</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=[i];function c(p,o){return a(),s("div",null,l)}const d=n(e,[["render",c],["__file","02a-Link.html.vue"]]);export{d as default};
