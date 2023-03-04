import{_ as t,X as p,Y as e,Z as n,$ as s,a1 as o,a2 as i,G as c}from"./framework-c2b0d87a.js";const l={},u=n("p",null,"pinia 和 vuex 都有一个通病 页面刷新状态会丢失",-1),r=n("p",null,"我们可以写一个pinia 插件缓存他的值",-1),k=n("strong",null,"视频教程(强烈建议)",-1),d={href:"https://www.bilibili.com/video/BV1dS4y1y7vd?p=49",title:"Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili",target:"_blank",rel:"noopener noreferrer"},v=i(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> __piniaKey <span class="token operator">=</span> <span class="token string">&#39;__PINIAKEY__&#39;</span>
<span class="token comment">//定义兜底变量</span>
 
 
<span class="token keyword">type</span> <span class="token class-name">Options</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
   key<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token comment">//定义入参类型</span>
 
 
 
<span class="token comment">//将数据存在本地</span>
<span class="token keyword">const</span> setStorage <span class="token operator">=</span> <span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 
localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
 
<span class="token punctuation">}</span>
 
 
<span class="token comment">//存缓存中读取</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStorage</span> <span class="token operator">=</span> <span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 
<span class="token keyword">return</span> <span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
 
<span class="token punctuation">}</span>
 
 
<span class="token comment">//利用函数柯丽华接受用户入参</span>
<span class="token keyword">const</span> <span class="token function-variable function">piniaPlugin</span> <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> Options<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 
<span class="token comment">//将函数返回给pinia  让pinia  调用 注入 context</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>context<span class="token operator">:</span> PiniaPluginContext<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 
<span class="token keyword">const</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token operator">=</span> context<span class="token punctuation">;</span>
 
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">getStorage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>options<span class="token operator">?.</span>key <span class="token operator">??</span> __piniaKey<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>store<span class="token punctuation">.</span>$id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
 
store<span class="token punctuation">.</span><span class="token function">$subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 
<span class="token function">setStorage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>options<span class="token operator">?.</span>key <span class="token operator">??</span> __piniaKey<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>store<span class="token punctuation">.</span>$id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>$state<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
<span class="token comment">//返回值覆盖pinia 原始值</span>
<span class="token keyword">return</span> <span class="token punctuation">{</span>
 
<span class="token operator">...</span>data
 
<span class="token punctuation">}</span>
 
<span class="token punctuation">}</span>
 
<span class="token punctuation">}</span>
 
 
<span class="token comment">//初始化pinia</span>
<span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 
 
<span class="token comment">//注册pinia 插件</span>
pinia<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">piniaPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
 
key<span class="token operator">:</span> <span class="token string">&quot;pinia&quot;</span>
 
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function m(b,_){const a=c("ExternalLinkIcon");return p(),e("div",null,[u,r,n("p",null,[k,s(" "),n("a",d,[s("Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili"),o(a)])]),v])}const y=t(l,[["render",m],["__file","07-pinia插件.html.vue"]]);export{y as default};
