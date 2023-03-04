import{_ as e,X as o,Y as c,Z as n,$ as s,a1 as t,a2 as p,G as l}from"./framework-c2b0d87a.js";const i={},u=p(`<p>如果使用 npm init vue@latest 报错</p><p><code>error when starting dev server: Error: Cannot find module &#39;node:path&#39;</code></p><p>nodejs 升级为 16 版本就好了</p><p>开发移动端最主要的就是适配各种手机，为此我研究了一套解决方案</p><p>在之前我们用的是 rem 根据 HTML font-size 去做缩放</p><h2 id="现在有了更好用的-vw-vh" tabindex="-1"><a class="header-anchor" href="#现在有了更好用的-vw-vh" aria-hidden="true">#</a> 现在有了更好用的 vw vh</h2><ul><li><p>vw 视口的最大宽度，1vw 等于视口宽度的百分之一</p></li><li><p>vh 视口的最大高度，1vh 等于视口高度的百分之一</p><p>1.安装依赖</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> postcss-px-to-viewport <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),r={href:"https://so.csdn.net/so/search?q=vite&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},k=p(`<p>vite.config.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> fileURLToPath<span class="token punctuation">,</span> <span class="token constant">URL</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;url&#39;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>
<span class="token keyword">import</span> vueJsx <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue-jsx&#39;</span>
<span class="token keyword">import</span> postcsspxtoviewport <span class="token keyword">from</span> <span class="token string">&quot;postcss-px-to-viewport&quot;</span> <span class="token comment">//插件</span>
<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">vueJsx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    postcss<span class="token operator">:</span> <span class="token punctuation">{</span>
      plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token function">postcsspxtoviewport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          unitToConvert<span class="token operator">:</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 要转化的单位</span>
          viewportWidth<span class="token operator">:</span> <span class="token number">750</span><span class="token punctuation">,</span> <span class="token comment">// UI设计稿的宽度</span>
          unitPrecision<span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// 转换后的精度，即小数点位数</span>
          propList<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 指定转换的css属性的单位，*代表全部css属性的单位都进行转换</span>
          viewportUnit<span class="token operator">:</span> <span class="token string">&#39;vw&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 指定需要转换成的视窗单位，默认vw</span>
          fontViewportUnit<span class="token operator">:</span> <span class="token string">&#39;vw&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 指定字体需要转换成的视窗单位，默认vw</span>
          selectorBlackList<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;ignore-&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 指定不转换为视窗单位的类名，</span>
          minPixelValue<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 默认值1，小于或等于1px则不进行转换</span>
          mediaQuery<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否在媒体查询的css代码中也进行转换，默认false</span>
          replace<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否转换后直接更换属性值</span>
          landscape<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 是否处理横屏情况</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">fileURLToPath</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name"><span class="token constant">URL</span></span><span class="token punctuation">(</span><span class="token string">&#39;./src&#39;</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果你用的 vite 是 ts 他这个插件并没有提供声明文件我已经帮大家写好了声明文件（良心）</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;postcss-px-to-viewport&#39;</span> <span class="token punctuation">{</span>

    <span class="token keyword">type</span> <span class="token class-name">Options</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
        unitToConvert<span class="token operator">:</span> <span class="token string">&#39;px&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;rem&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;cm&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;em&#39;</span><span class="token punctuation">,</span>
        viewportWidth<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
        viewportHeight<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token comment">// not now used; TODO: need for different units and math for different properties</span>
        unitPrecision<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
        viewportUnit<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
        fontViewportUnit<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>  <span class="token comment">// vmin is more suitable.</span>
        selectorBlackList<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        propList<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        minPixelValue<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
        mediaQuery<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        replace<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        landscape<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        landscapeUnit<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
        landscapeWidth<span class="token operator">:</span> <span class="token builtin">number</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span>options<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Options<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入声明文件  tsconfig.app <strong>postcss-px-to-viewport.d.ts 跟 vite.ts 同级</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token string">&quot;@vue/tsconfig/tsconfig.web.json&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;include&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;env.d.ts&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/**/*&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/**/*.vue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;postcss-px-to-viewport.d.ts&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;exclude&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;src/**/__tests__/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;composite&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;baseUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;paths&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;@/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/*&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码案例" tabindex="-1"><a class="header-anchor" href="#代码案例" aria-hidden="true">#</a> 代码案例</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wraps<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>header<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>left<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>中间<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>right<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main-items<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in 100<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main-port<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>头像<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main-desc<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>小满{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>你妈妈喊你回家穿丝袜啦<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">&gt;</span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer-items<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in footer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ item.icon }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ item.text }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

type Footer<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> footer <span class="token operator">=</span> reactive<span class="token operator">&lt;</span>Footer<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;首页&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;商品&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;信息&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;我的&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>less<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&#39;@/assets/base.css&#39;</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>

<span class="token selector">html,
body,
#app</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wraps</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.header</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>

  <span class="token selector">div:nth-child(1)</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">div:nth-child(2)</span> <span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">div:nth-child(3)</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.main</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>

  <span class="token selector">&amp;-items</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">&amp;-port</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;-desc</span><span class="token punctuation">{</span>
     <span class="token property">margin-left</span><span class="token punctuation">:</span>10px<span class="token punctuation">;</span>
     <span class="token selector">div:last-child</span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span>#333<span class="token punctuation">;</span>
        <span class="token property">margin-top</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.footer</span> <span class="token punctuation">{</span>

  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 1fr 1fr 1fr 1fr<span class="token punctuation">;</span>

  <span class="token selector">&amp;-items</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>基本适配百分之 99 的屏幕</strong></p><h2 id="如何将我们的-vue-项目打包成-app-会安卓的可以跳过" tabindex="-1"><a class="header-anchor" href="#如何将我们的-vue-项目打包成-app-会安卓的可以跳过" aria-hidden="true">#</a> 如何将我们的 Vue 项目打包成 App（会安卓的可以跳过）</h2>`,10),d={href:"https://xiaoman.blog.csdn.net/article/details/125490078",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("因为"),n("a",r,[s("vite"),t(a)]),s("中已经内联了 postcss，所以并不需要额外的创建 postcss.config.js 文件")]),k,n("p",null,[n("a",d,[s("小满 Vue3 第三十六章（Vue 如何开发移动端）"),t(a)])])])}const y=e(i,[["render",v],["__file","36-Vue如何开发移动端.html.vue"]]);export{y as default};
