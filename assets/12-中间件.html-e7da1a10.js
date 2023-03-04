import{_ as n,X as s,Y as a,a2 as p}from"./framework-c2b0d87a.js";const t={},e=p(`<h1 id="nestjs-中间件" tabindex="-1"><a class="header-anchor" href="#nestjs-中间件" aria-hidden="true">#</a> nestjs 中间件</h1><p>中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象</p><p>中间件函数可以执行以下任务:</p><ul><li>执行任何代码。</li><li>对请求和响应对象进行更改。</li><li>结束请求-响应周期。</li><li>调用堆栈中的下一个中间件函数。</li><li>如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。</li></ul><h2 id="_1-创建一个依赖注入中间件" tabindex="-1"><a class="header-anchor" href="#_1-创建一个依赖注入中间件" aria-hidden="true">#</a> 1.创建一个依赖注入中间件</h2><p>要求我们实现 use 函数 返回 req res next 参数 如果不调用 next 程序将被挂起</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>Injectable<span class="token punctuation">,</span>NestMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>Request<span class="token punctuation">,</span>Response<span class="token punctuation">,</span>NextFunction<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;express&#39;</span>


<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token keyword">implements</span> <span class="token class-name">NestMiddleware</span><span class="token punctuation">{</span>
  <span class="token function">use</span> <span class="token punctuation">(</span>req<span class="token operator">:</span>Request<span class="token punctuation">,</span>res<span class="token operator">:</span>Response<span class="token punctuation">,</span>next<span class="token operator">:</span>NextFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方法 在模块里面 实现 configure 返回一个消费者 consumer 通过 apply 注册中间件 通过 forRoutes 指定 Controller 路由</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module<span class="token punctuation">,</span>NestModule<span class="token punctuation">,</span>MiddlewareConsumer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Logger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;src/middleware&#39;</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>UserService<span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span><span class="token punctuation">[</span>UserService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token keyword">implements</span> <span class="token class-name">NestModule</span><span class="token punctuation">{</span>
  <span class="token function">configure</span> <span class="token punctuation">(</span>consumer<span class="token operator">:</span>MiddlewareConsumer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>Logger<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以指定 拦截的方法 比如拦截 GET POST 等 forRoutes 使用对象配置</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module<span class="token punctuation">,</span>NestModule<span class="token punctuation">,</span>MiddlewareConsumer<span class="token punctuation">,</span>RequestMethod <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Logger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;src/middleware&#39;</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>UserService<span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span><span class="token punctuation">[</span>UserService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token keyword">implements</span> <span class="token class-name">NestModule</span><span class="token punctuation">{</span>
  <span class="token function">configure</span> <span class="token punctuation">(</span>consumer<span class="token operator">:</span>MiddlewareConsumer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>Logger<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span>method<span class="token operator">:</span>RequestMethod<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你甚至可以直接吧 UserController 塞进去</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module<span class="token punctuation">,</span>NestModule<span class="token punctuation">,</span>MiddlewareConsumer<span class="token punctuation">,</span>RequestMethod <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Logger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;src/middleware&#39;</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>UserService<span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span><span class="token punctuation">[</span>UserService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token keyword">implements</span> <span class="token class-name">NestModule</span><span class="token punctuation">{</span>
  <span class="token function">configure</span> <span class="token punctuation">(</span>consumer<span class="token operator">:</span>MiddlewareConsumer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>Logger<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span>UserController<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-全局中间件" tabindex="-1"><a class="header-anchor" href="#_2-全局中间件" aria-hidden="true">#</a> 2.全局中间件</h2><p>注意全局中间件只能使用函数模式 案例可以做白名单拦截之类的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/core&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.module&#39;</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> whiteList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;/list&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">middleWareAll</span>  <span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">,</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>

     <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>originalUrl<span class="token punctuation">,</span><span class="token string">&#39;我收全局的&#39;</span><span class="token punctuation">)</span>

     <span class="token keyword">if</span><span class="token punctuation">(</span>whiteList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
         res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;小黑子露出鸡脚了吧&#39;</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middleWareAll<span class="token punctuation">)</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-接入第三方中间件-例如-cors-处理跨域" tabindex="-1"><a class="header-anchor" href="#_3-接入第三方中间件-例如-cors-处理跨域" aria-hidden="true">#</a> 3.接入第三方中间件 例如 cors 处理跨域</h2><h3 id="方法一-启用-app-enablecors" tabindex="-1"><a class="header-anchor" href="#方法一-启用-app-enablecors" aria-hidden="true">#</a> 方法一 启用 <code>app.enableCors()</code></h3><p>自带的 <code>app.enableCors(); //解决跨域问题</code></p><h3 id="方法二-cors-插件" tabindex="-1"><a class="header-anchor" href="#方法二-cors-插件" aria-hidden="true">#</a> 方法二 <code>cors</code> 插件</h3><p><code>npm install cors</code></p><p><code>npm install @types/cors -D</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/core&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.module&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cors <span class="token keyword">from</span> <span class="token string">&#39;cors&#39;</span>

<span class="token keyword">const</span> whiteList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;/list&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">middleWareAll</span>  <span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">,</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>

     <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>originalUrl<span class="token punctuation">,</span><span class="token string">&#39;我收全局的&#39;</span><span class="token punctuation">)</span>

     <span class="token keyword">if</span><span class="token punctuation">(</span>whiteList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>originalUrl<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
         res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>code<span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middleWareAll<span class="token punctuation">)</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","12-中间件.html.vue"]]);export{r as default};
