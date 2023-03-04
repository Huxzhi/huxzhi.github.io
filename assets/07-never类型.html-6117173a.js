import{_ as n,X as s,Y as a,a2 as e}from"./framework-c2b0d87a.js";const p="/assets/Pasted-image-20221230183054-6618109f.png",t={},o=e(`<p>TypeScript 将使用 never 类型来表示不应该存在的状态(很抽象是不是)</p><blockquote><p><mark>统一规范：后来者，必须按前辈的逻辑套路强制做事，否则报错</mark> 由于任何类型都不能赋值给 <code>never</code> 类型的变量，所以 <code>switch</code> 当存在进入 <code>default</code> 分支的可能性时，TS 的类型检查会及时帮我们发现这个问题</p></blockquote><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">bbb</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">&amp;</span> <span class="token builtin">number</span>
<span class="token comment">//bbb类型推断为 never ，因为不可能有变量同时为字符串和数字类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 返回never的函数必须存在无法达到的终点</span>
 
<span class="token comment">// 因为必定抛出异常，所以 error 将不会有返回值</span>
<span class="token keyword">function</span> <span class="token function">error</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">never</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// 因为存在死循环，所以 loop 将不会有返回值</span>
<span class="token keyword">function</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">never</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="never-类型的一个应用场景" tabindex="-1"><a class="header-anchor" href="#never-类型的一个应用场景" aria-hidden="true">#</a> never 类型的一个应用场景</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span> <span class="token comment">//属性</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">All</span> <span class="token operator">=</span> <span class="token constant">A</span> <span class="token operator">|</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">handleValue</span><span class="token punctuation">(</span>val<span class="token operator">:</span> All<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;foo&#39;</span><span class="token operator">:</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;bar&#39;</span><span class="token operator">:</span>
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token comment">//兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了</span>

      <span class="token keyword">const</span> exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如新来了一个同事他新增了一个 C 接口，我们必须手动找到所有 switch 代码并处理，否则将有可能引入 BUG 。</p><p>而且这将是一个“隐蔽型”的 BUG，如果回归面不够广，很难发现此类 BUG。</p><p>那 TS 有没有办法帮助我们在类型检查阶段发现这个问题呢？</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&quot;bizz&quot;</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">All</span> <span class="token operator">=</span> <span class="token constant">A</span> <span class="token operator">|</span> <span class="token constant">B</span> <span class="token operator">|</span> <span class="token constant">C</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">handleValue</span><span class="token punctuation">(</span>val<span class="token operator">:</span> All<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">&#39;foo&#39;</span><span class="token operator">:</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">&#39;bar&#39;</span><span class="token operator">:</span>
            <span class="token keyword">break</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token comment">//兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了</span>
 
            <span class="token keyword">const</span> exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于任何类型都不能赋值给 <code>never</code> 类型的变量，所以当存在进入 <code>default</code> 分支的可能性时，TS 的类型检查会及时帮我们发现这个问题</strong></p><p><mark>统一规范：后来者，必须按前辈的逻辑套路强制做事，否则报错</mark></p>`,14),c=[o];function l(i,r){return s(),a("div",null,c)}const u=n(t,[["render",l],["__file","07-never类型.html.vue"]]);export{u as default};
