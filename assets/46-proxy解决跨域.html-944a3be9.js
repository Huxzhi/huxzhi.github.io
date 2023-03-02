import{_ as p,W as o,X as c,Y as s,Z as n,a0 as t,a2 as e,y as i}from"./framework-cbb69da9.js";const l="/assets/image-2023-01-12_20-01-35-351-46-proxy解决跨域-7d90e852.png",r="/assets/image-2023-01-12_20-01-49-827-46-proxy解决跨域-326cfee2.png",u="/assets/image-2023-01-12_20-02-05-004-46-proxy解决跨域-fabf6dca.png",d="/assets/image-2023-01-12_20-02-18-137-46-proxy解决跨域-fc129b3e.png",k={},v=s("h1",{id:"vue3-proxy-解决跨域",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vue3-proxy-解决跨域","aria-hidden":"true"},"#"),n(" Vue3 proxy 解决跨域")],-1),m=s("h2",{id:"_1-首先我们先了解一下什么是跨域",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-首先我们先了解一下什么是跨域","aria-hidden":"true"},"#"),n(" 1.首先我们先了解一下什么是跨域")],-1),g=s("p",null,"主要是出于浏览器的同源策略限制，它是浏览器最核心也最基本的安全功能。",-1),b=s("p",null,[n("当一个请求 url 的 "),s("strong",null,"协议、域名、端口"),n(" 三者之间任意一个与当前页面 url 不同即为跨域。")],-1),h={href:"https://link.juejin.cn/?target=http%3A%2F%2Fxxxx.com",title:"http://xxxx.com",target:"_blank",rel:"noopener noreferrer"},x={href:"https://link.juejin.cn/?target=https%3A%2F%2Fxxxx.com",title:"https://xxxx.com",target:"_blank",rel:"noopener noreferrer"},F=s("strong",null,"协议不同",-1),f=s("p",null,[n("例如 127.x.x.x:8001 -> 127.x.x.x:8002 存在跨域 "),s("strong",null,"端口不同")],-1),_={href:"https://link.juejin.cn/?target=http%3A%2F%2Fwww.xxxx.com",title:"http://www.xxxx.com",target:"_blank",rel:"noopener noreferrer"},y={href:"https://link.juejin.cn/?target=http%3A%2F%2Fwww.yyyy.com",title:"http://www.yyyy.com",target:"_blank",rel:"noopener noreferrer"},j=s("strong",null,"域名不同",-1),w=e(`<h2 id="_2-如何解决跨域" tabindex="-1"><a class="header-anchor" href="#_2-如何解决跨域" aria-hidden="true">#</a> 2.如何解决跨域</h2><p>jsonp 这种方式在之前很常见，他实现的基本原理是利用了 HTML 里 script 元素标签没有跨域限制 动态创建 script 标签，将 src 作为服务器地址，服务器返回一个 callback 接受返回的参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">clickButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> obj<span class="token punctuation">,</span> s
    obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;table&quot;</span><span class="token operator">:</span><span class="token string">&quot;products&quot;</span><span class="token punctuation">,</span> <span class="token string-property property">&quot;limit&quot;</span><span class="token operator">:</span><span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//添加参数</span>
    s <span class="token operator">=</span>  document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;script&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//动态创建script</span>
    s<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&quot;接口地址xxxxxxxxxxxx&quot;</span>  <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token comment">//与后端定义callback名称</span>
<span class="token keyword">function</span> <span class="token function">myFunc</span><span class="token punctuation">(</span><span class="token parameter">myObj</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
    <span class="token comment">//接受后端返回的参数</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> myObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cors 设置 CORS 允许跨域资源共享 需要后端设置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;Access-Control-Allow-Origin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://web.xxx.com&quot;</span> <span class="token comment">//可以指定地址</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;Access-Control-Allow-Origin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;*&quot;</span> <span class="token comment">//也可以使用通配符 任何地址都能访问 安全性不高</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Vite proxy 或者 node 代理 或者 webpack proxy 他们三种方式都是代理</p><p>我们先创建一个接口使用 express 简单构建一下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//创建get请求</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/xm&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span><span class="token string">&quot;请求成功&quot;</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//端口号9001</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">9001</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们使用 vite 项目的 fetch 请求一下</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">,</span>reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:9001/xm&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发现是存在跨域的,这时候我们就可以配合 vite 的代理来解决跨域 用法如下</p><p>需要在 <code>vite.config.js/ts</code> 进行配置</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  server<span class="token operator">:</span><span class="token punctuation">{</span>
     proxy<span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            target<span class="token operator">:</span><span class="token string">&quot;http://localhost:9001/&quot;</span><span class="token punctuation">,</span> <span class="token comment">//跨域地址</span>
            changeOrigin<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//支持跨域</span>
            <span class="token function-variable function">rewrite</span><span class="token operator">:</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token comment">//重写路径,替换/api</span>
        <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>fetch 替换/api 他会截取/api 替换成 target 地址</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">,</span>reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/xm&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>webpack proxy 和 node proxy 用法都类似</p><h2 id="_3-vite-proxy-原理解析" tabindex="-1"><a class="header-anchor" href="#_3-vite-proxy-原理解析" aria-hidden="true">#</a> 3.vite proxy 原理解析</h2>',21),q={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite",title:"https://github.com/vitejs/vite",target:"_blank",rel:"noopener noreferrer"},A={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite",title:"https://github.com/vitejs/vite",target:"_blank",rel:"noopener noreferrer"},S={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages",title:"https://github.com/vitejs/vite/tree/main/packages",target:"_blank",rel:"noopener noreferrer"},C={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fvite",title:"https://github.com/vitejs/vite/tree/main/packages/vite",target:"_blank",rel:"noopener noreferrer"},O={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fvite%2Fsrc",title:"https://github.com/vitejs/vite/tree/main/packages/vite/src",target:"_blank",rel:"noopener noreferrer"},N={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fvite%2Fsrc%2Fnode",title:"https://github.com/vitejs/vite/tree/main/packages/vite/src/node",target:"_blank",rel:"noopener noreferrer"},P={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fvite%2Fsrc%2Fnode%2Fserver",title:"https://github.com/vitejs/vite/tree/main/packages/vite/src/node/server",target:"_blank",rel:"noopener noreferrer"},M=s("strong",null,"index.ts",-1),V=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// proxy</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> proxy <span class="token punctuation">}</span> <span class="token operator">=</span> serverConfig
<span class="token keyword">if</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 middlewares<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">proxyMiddleware</span><span class="token punctuation">(</span>httpServer<span class="token punctuation">,</span> proxy<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),z={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a",target:"_blank",rel:"noopener noreferrer"},B={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages",target:"_blank",rel:"noopener noreferrer"},E={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages%2Fvite",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages/vite",target:"_blank",rel:"noopener noreferrer"},H={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages%2Fvite%2Fsrc",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages/vite/src",target:"_blank",rel:"noopener noreferrer"},L={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages%2Fvite%2Fsrc%2Fnode",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages/vite/src/node",target:"_blank",rel:"noopener noreferrer"},I={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages%2Fvite%2Fsrc%2Fnode%2Fserver",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages/vite/src/node/server",target:"_blank",rel:"noopener noreferrer"},T={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fd76db0cae645beaecd970d95b4819158c5dd568a%2Fpackages%2Fvite%2Fsrc%2Fnode%2Fserver%2Fmiddlewares",title:"https://github.com/vitejs/vite/tree/d76db0cae645beaecd970d95b4819158c5dd568a/packages/vite/src/node/server/middlewares",target:"_blank",rel:"noopener noreferrer"},R=s("strong",null,"proxy.ts",-1),J=e(`<p>找到 proxyMiddleware 发现他是调用了 http-proxy 这个库</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> httpProxy <span class="token keyword">from</span> <span class="token string">&#39;http-proxy&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">proxyMiddleware</span><span class="token punctuation">(</span>
    httpServer<span class="token operator">:</span> http<span class="token punctuation">.</span>Server <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    options<span class="token operator">:</span> NonNullable<span class="token operator">&lt;</span>CommonServerOptions<span class="token punctuation">[</span><span class="token string">&#39;proxy&#39;</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
    config<span class="token operator">:</span> ResolvedConfig
  <span class="token punctuation">)</span><span class="token operator">:</span> Connect<span class="token punctuation">.</span>NextHandleFunction <span class="token punctuation">{</span>
    <span class="token comment">// lazy require only when proxy is used</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> httpProxy<span class="token punctuation">.</span><span class="token function">createProxyServer</span><span class="token punctuation">(</span>opts<span class="token punctuation">)</span> <span class="token keyword">as</span> HttpProxy<span class="token punctuation">.</span>Server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),W={href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhttp-proxy",title:"https://www.npmjs.com/package/http-proxy",target:"_blank",rel:"noopener noreferrer"},X=e(`<p>http-proxy 模块用于转发 http 请求，其实现的大致原理为使用 http 或 https 模块搭建 node 代理服务器，将客户端发送的请求数据转发到目标服务器，再将响应输送到客户端</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> httpProxy <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;http-proxy&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> proxy <span class="token operator">=</span> httpProxy<span class="token punctuation">.</span><span class="token function">createProxyServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//创建一个代理服务 代理到9001</span>
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    proxy<span class="token punctuation">.</span><span class="token function">web</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">,</span><span class="token punctuation">{</span>
        target<span class="token operator">:</span><span class="token string">&quot;http://localhost:9001/xm&quot;</span><span class="token punctuation">,</span> <span class="token comment">//代理的地址</span>
        changeOrigin<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否有跨域</span>
        ws<span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">//webSocetk</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8888</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9001 服务</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//创建get请求</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/xm&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        code<span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">,</span>
        message<span class="token operator">:</span><span class="token string">&quot;请求成功&quot;</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//端口号9001</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">9001</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功代理 访问 8888 端口代理 9001 的请求</p><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',6),Y={href:"https://juejin.cn/post/7170952274045304868",target:"_blank",rel:"noopener noreferrer"};function Z(D,G){const a=i("ExternalLinkIcon");return o(),c("div",null,[v,m,g,b,s("p",null,[n("例如 "),s("a",h,[n("xxxx.com"),t(a)]),n(" -> "),s("a",x,[n("xxxx.com"),t(a)]),n(" 存在跨域 "),F]),f,s("p",null,[n("例如 "),s("a",_,[n("www.xxxx.com"),t(a)]),n(" -> "),s("a",y,[n("www.yyyy.com"),t(a)]),n(" 存在跨域 "),j]),w,s("p",null,[n("vite 源码地址"),s("a",q,[n("github.com/vitejs/vite"),t(a)])]),s("p",null,[n("源码路径 "),s("a",A,[n("vite"),t(a)]),n("/"),s("a",S,[n("packages"),t(a)]),n("/"),s("a",C,[n("vite"),t(a)]),n("/"),s("a",O,[n("src"),t(a)]),n("/"),s("a",N,[n("node"),t(a)]),n("/"),s("a",P,[n("server"),t(a)]),n("/"),M,n(" vite 源码 发现他处理 proxy 是调用了 proxyMiddleware")]),V,s("p",null,[s("a",z,[n("vite"),t(a)]),n("/"),s("a",B,[n("packages"),t(a)]),n("/"),s("a",E,[n("vite"),t(a)]),n("/"),s("a",H,[n("src"),t(a)]),n("/"),s("a",L,[n("node"),t(a)]),n("/"),s("a",I,[n("server"),t(a)]),n("/"),s("a",T,[n("middlewares"),t(a)]),n("/"),R]),J,s("p",null,[n("http-proxy npm 地址 "),s("a",W,[n("www.npmjs.com/package/htt…"),t(a)])]),X,s("p",null,[s("a",Y,[n("查看原网页: juejin.cn"),t(a)])])])}const Q=p(k,[["render",Z],["__file","46-proxy解决跨域.html.vue"]]);export{Q as default};
