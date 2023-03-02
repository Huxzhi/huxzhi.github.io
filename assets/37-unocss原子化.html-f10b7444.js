import{_ as o,W as i,X as l,Y as n,Z as s,a0 as a,a1 as u,a2 as p,y as e}from"./framework-cbb69da9.js";const r="/assets/image-2023-01-09_18-34-02-091-37-unocss原子化-b2927fc8.png",d="/assets/image-2023-01-09_18-35-55-205-37-unocss原子化-ee5842b1.png",k="/assets/image-2023-01-09_18-36-27-867-37-unocss原子化-65a6ccda.png",g="/assets/image-2023-01-09_18-37-27-806-37-unocss原子化-a7745de4.png",m="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfUlEQVRYhe2XPW6DQBSEBys1N1gXSYGQaGm4BDKVGycXQJZoOYDlzg0XSOfKEocIUkSLRChScYJwAVJEWLBell3CjxMxFX/SfHr75i2rlGVZYkat5jRfABaAuwB44L2Mi2xQM1PVxAF2yRFRkQ4KYKk69utNA4S5BGOYA0BUpHj/+mg8uwGIi2wU80qn/MIH2CaH0cxZagDskuOk5g0AkdJ7xMHZ8LnfnA0fHnHkAbpKb6k6XGLDVLVWiLPhw1Q1uMQWhlgBYqWPivQ6F1gQlTnwU0262VoBZLp+mxyYELS5TCMrj2/P0j8kdcO6RM0/rdfrda+9oF4JWXNas29GvQBYS8BLBxdAJrO0eVxkeIpeuOnoBJDJbFu3t6VDCAAAXGJ3fugRhxs1GsJSdXGAyoCnU35BkIfcbq8ggjwUni1K/WAS5KHwBPuNWueAyFIMrZsYyqZicACZVPQR3ZzMQeQSW7iLZbVfbxr3Cu90PMVvORdgCv3NzWgB+FcA38vXupsnVO1iAAAAAElFTkSuQmCC",v="/assets/image-2023-01-09_18-38-23-959-37-unocss原子化-9bda1548.png",b={},h=n("h1",{id:"重新构想-原子化-css",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#重新构想-原子化-css","aria-hidden":"true"},"#"),s(" 重新构想 原子化 CSS")],-1),f={href:"https://zhuanlan.zhihu.com/p/425814828",title:"重新构想原子化CSS - 知乎",target:"_blank",rel:"noopener noreferrer"},x=n("h2",{id:"什么是-css-原子化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#什么是-css-原子化","aria-hidden":"true"},"#"),s(" 什么是 css 原子化？")],-1),_=n("p",null,"CSS 原子化的优缺点",-1),A=n("ol",null,[n("li",null,"减少了 css 体积，提高了 css 复用"),n("li",null,"减少起名的复杂度"),n("li",null,"增加了记忆成本 将 css 拆分为原子之后，你势必要记住一些 class 才能书写，哪怕 tailwindcss 提供了完善的工具链，你写 background，也要记住开头是 bg")],-1),y=p(`<h2 id="接入-unocss" tabindex="-1"><a class="header-anchor" href="#接入-unocss" aria-hidden="true">#</a> 接入 unocss</h2><p>tips：最好用于 vite webpack 属于阉割版功能很少</p><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> unocss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>vite.config.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> unocss <span class="token keyword">from</span> <span class="token string">&#39;unocss/vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> presetIcons<span class="token punctuation">,</span> presetAttributify<span class="token punctuation">,</span> presetUno <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;unocss&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">vueJsx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">unocss</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    presets<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">presetIcons</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">presetAttributify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">presetUno</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//一些预设</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">[</span><span class="token string">&#39;flex&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> display<span class="token operator">:</span> <span class="token string">&#39;flex&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//flex 相当于 display: &#39;flex&#39; ，全局通用</span>
      <span class="token punctuation">[</span><span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> color<span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^m-(\\d+)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">,</span> d<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> margin<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">Number</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    shortcuts<span class="token operator">:</span> <span class="token punctuation">{</span>
      cike<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;flex&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">]</span> <span class="token comment">//上面两个 缩写成 一个</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main.ts 引入</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token string">&#39;uno.css&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置静态-css" tabindex="-1"><a class="header-anchor" href="#配置静态-css" aria-hidden="true">#</a> 配置静态 css</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>rules<span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">&#39;flex&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> display<span class="token operator">:</span> <span class="token string">&quot;flex&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token comment">//全局通用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="配置动态-css-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#配置动态-css-使用正则表达式" aria-hidden="true">#</a> 配置动态 css（使用正则表达式）</h3><p><code>m-</code> 参数 <code>*10 </code> 例如 <code>m-10</code> 就是 <code>margin:100px</code></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">rules: [
  [/^m-(\\d+)$/, ([, d]) =&gt; (</span><span class="token punctuation">{</span> <span class="token selector">margin: \`$</span><span class="token punctuation">{</span><span class="token function">Number</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> * 10<span class="token punctuation">}</span>px\` <span class="token punctuation">}</span><span class="token selector">)],
  [&#39;flex&#39;,</span> <span class="token punctuation">{</span> <span class="token property">display</span><span class="token punctuation">:</span> <span class="token string">&quot;flex&quot;</span> <span class="token punctuation">}</span>]
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="shortcuts-可以自定义组合样式" tabindex="-1"><a class="header-anchor" href="#shortcuts-可以自定义组合样式" aria-hidden="true">#</a> shortcuts 可以自定义组合样式</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>  <span class="token selector">plugins: [vue(), vueJsx(), unocss(</span><span class="token punctuation">{</span>
    <span class="token selector">rules: [
      [/^m-(\\d+)$/, ([, d]) =&gt; (</span><span class="token punctuation">{</span> <span class="token selector">margin: \`$</span><span class="token punctuation">{</span><span class="token function">Number</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> * 10<span class="token punctuation">}</span>px\` <span class="token punctuation">}</span><span class="token selector">)],
      [&#39;flex&#39;,</span> <span class="token punctuation">{</span> <span class="token property">display</span><span class="token punctuation">:</span> <span class="token string">&quot;flex&quot;</span> <span class="token punctuation">}</span><span class="token selector">],
      [&#39;pink&#39;,</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> <span class="token string">&#39;pink&#39;</span> <span class="token punctuation">}</span><span class="token selector">]
    ],
    shortcuts:</span> <span class="token punctuation">{</span>
      <span class="token property">btn</span><span class="token punctuation">:</span> <span class="token string">&quot;pink flex&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>]<span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+k+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="unocss-预设" tabindex="-1"><a class="header-anchor" href="#unocss-预设" aria-hidden="true">#</a> unocss 预设</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code> <span class="token property">presets</span><span class="token punctuation">:</span>[<span class="token function">presetIcons</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">presetAttributify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">presetUno</span><span class="token punctuation">(</span><span class="token punctuation">)</span>]<span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>1.presetIcons Icon 图标 预设</p><p>图标集合安装</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>npm i -D @iconify-json/ic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23),S={href:"https://icones.js.org/",title:"icones",target:"_blank",rel:"noopener noreferrer"},w=p('<figure><img src="'+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>i-ic-baseline-backspace text-3xl bg-green-500<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>图标为： <img src="`+m+`" alt="" loading="lazy"></p><p>2.presetAttributify  属性化模式支持</p><p>属性语义化 无须 class</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">font</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>black<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>     btn<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>3.presetUno 工具类预设</p>',8),B={href:"https://github.com/unocss/unocss/tree/main/packages/preset-uno",target:"_blank",rel:"noopener noreferrer"},C=n("p",null,"例如，ml-3（Tailwind），ms-2（Bootstrap），ma4（Tachyons），mt-10px（Windi CSS）均会生效。",-1);function V(q,L){const t=e("ExternalLinkIcon"),c=e("RouterLink");return i(),l("div",null,[h,n("p",null,[n("a",f,[s("重新构想原子化 CSS - 知乎"),a(t)])]),x,_,A,n("blockquote",null,[n("p",null,[s("[!NOTE] Tailwind 也能实现这样的拓展 "),a(c,{to:"/posts/literature-notes/xiaoman-zsVue3-vite-Ts/34-Vue3%E9%9B%86%E6%88%90Tailwind-CSS.html"},{default:u(()=>[s("34-Vue3集成Tailwind CSS")]),_:1})])]),y,n("p",null,[s("首先我们去"),n("a",S,[s("icones"),a(t)]),s("官网（方便浏览和使用 iconify）浏览我们需要的 icon，比如这里我用到了 Google Material Icons 图标集里面的 baseline-add-circle 图标")]),w,n("p",null,[s("默认的 "),n("a",B,[s("@unocss/preset-uno"),a(t)]),s(" 预设（实验阶段）是一系列流行的原子化框架的 通用超集，包括了 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等。")]),C])}const I=o(b,[["render",V],["__file","37-unocss原子化.html.vue"]]);export{I as default};
