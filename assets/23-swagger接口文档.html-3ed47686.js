import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const p="/assets/image-2023-02-03_15-31-20-444-23-swagger接口文档-579983e0.png",e="/assets/image-2023-02-03_15-34-25-469-23-swagger接口文档-68fc75f9.png",o="/assets/image-2023-02-03_15-36-55-256-23-swagger接口文档-58a98ba6.png",c="/assets/image-2023-02-03_15-41-25-986-23-swagger接口文档-5b152dfe.png",i="/assets/image-2023-02-03_15-38-30-128-23-swagger接口文档-0b9c4c28.png",l="/assets/image-2023-02-03_15-45-34-003-23-swagger接口文档-366fc0cc.png",u={},r=t(`<h1 id="swagger" tabindex="-1"><a class="header-anchor" href="#swagger" aria-hidden="true">#</a> swagger</h1><p>用于提供给前端接口文档</p><p>安装命令如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span>  @nestjs/swagger swagger-ui-express
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 main.ts 注册 swagger</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">create</span><span class="token generic class-name"><span class="token operator">&lt;</span>NestExpressApplication<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&#39;小满接口文档&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token string">&#39;描述，。。。&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVersion</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> document <span class="token operator">=</span> SwaggerModule<span class="token punctuation">.</span><span class="token function">createDocument</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span>options<span class="token punctuation">)</span>
  SwaggerModule<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token string">&#39;/api-docs&#39;</span><span class="token punctuation">,</span>app<span class="token punctuation">,</span>document<span class="token punctuation">)</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-main-ts-注册-swagger" tabindex="-1"><a class="header-anchor" href="#在-main-ts-注册-swagger" aria-hidden="true">#</a> 在 main.ts 注册 swagger</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">//swagger</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">addBearerAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//添加 jwt 认证</span>
    <span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&#39;xm&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token string">&#39;small&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setVersion</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> document <span class="token operator">=</span> SwaggerModule<span class="token punctuation">.</span><span class="token function">createDocument</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  SwaggerModule<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token string">&#39;/api-docs&#39;</span><span class="token punctuation">,</span> app<span class="token punctuation">,</span> document<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="可以使用-apitags-添加分组" tabindex="-1"><a class="header-anchor" href="#可以使用-apitags-添加分组" aria-hidden="true">#</a> 可以使用 ApiTags 添加分组</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">&#39;guard&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//对接口分组</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiTags</span></span><span class="token punctuation">(</span><span class="token string">&#39;守卫接口&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">GuardController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">readonly</span> guardService<span class="token operator">:</span> GuardService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="apioperation-接口描述" tabindex="-1"><a class="header-anchor" href="#apioperation-接口描述" aria-hidden="true">#</a> ApiOperation 接口描述</h2><h2 id="apiquery-修饰-get" tabindex="-1"><a class="header-anchor" href="#apiquery-修饰-get" aria-hidden="true">#</a> ApiQuery 修饰 get</h2><h2 id="apiresponse-自定义返回信息" tabindex="-1"><a class="header-anchor" href="#apiresponse-自定义返回信息" aria-hidden="true">#</a> ApiResponse 自定义返回信息</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiOperation</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> summary<span class="token operator">:</span> <span class="token string">&#39;getApi&#39;</span><span class="token punctuation">,</span> description<span class="token operator">:</span> <span class="token string">&#39;description xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">//添加参数信息</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiQuery</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;page&#39;</span><span class="token punctuation">,</span> description<span class="token operator">:</span> <span class="token string">&#39;分页信息&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiResponse</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> status<span class="token operator">:</span> <span class="token number">403</span><span class="token punctuation">,</span> description<span class="token operator">:</span> <span class="token string">&#39;小黑子我是403&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">ReqUrl</span></span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span> url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">&#39;url&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>guardService<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="apiparam-动态参数描述" tabindex="-1"><a class="header-anchor" href="#apiparam-动态参数描述" aria-hidden="true">#</a> ApiParam 动态参数描述</h2><p>跟 <code>ApiQuery</code> 类似</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">&#39;:id&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">//描述动态参数</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiParam</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span>
    description<span class="token operator">:</span> <span class="token string">&#39; 这是一个id&#39;</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    type<span class="token operator">:</span> String<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">findOne</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span> id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>guardService<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token operator">+</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="apiproperty-定义-post" tabindex="-1"><a class="header-anchor" href="#apiproperty-定义-post" aria-hidden="true">#</a> ApiProperty 定义 Post</h2><p>一般用在 dto</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ApiProperty <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/swagger&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CreateGuardDto</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> example<span class="token operator">:</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span> <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;big&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> example<span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="apibearerauth-jwt-token" tabindex="-1"><a class="header-anchor" href="#apibearerauth-jwt-token" aria-hidden="true">#</a> ApiBearerAuth jwt token</h2><p>main.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code> <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">addBearerAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//添加 jwt 认证</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GuardController</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">&#39;guard&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//可以自动添加token，jwt</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiBearerAuth</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">GuardController</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他装饰器" tabindex="-1"><a class="header-anchor" href="#其他装饰器" aria-hidden="true">#</a> 其他装饰器</h2><p>所有可用的OpenAPI装饰器都有一个 Api 前缀,可以清楚地区分核心装饰器。以下是导出的装饰器的完整列表,以及可以应用装饰器的级别的名称。</p><figure><img src="`+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Api</span>： 用于类，标识这个类是swagger的资源
<span class="token annotation punctuation">@ApiIgnore</span>： 用于类，忽略该 <span class="token class-name">Controller</span>，指不对当前类做扫描
<span class="token annotation punctuation">@ApiOperation</span>： 用于方法，描述 <span class="token class-name">Controller</span>类中的 method接口
<span class="token annotation punctuation">@ApiParam</span>： 用于参数，单个参数描述，与 <span class="token annotation punctuation">@ApiImplicitParam</span>不同的是，他是写在参数左侧的。如（ <span class="token annotation punctuation">@ApiParam</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">,</span>value<span class="token operator">=</span><span class="token string">&quot;用户名&quot;</span><span class="token punctuation">)</span><span class="token class-name">Stringusername</span>）
<span class="token annotation punctuation">@ApiModel</span>： 用于类，表示对类进行说明，用于参数用实体类接收
<span class="token annotation punctuation">@ApiProperty</span>：用于方法，字段，表示对model属性的说明或者数据操作更改
<span class="token annotation punctuation">@ApiImplicitParam</span>： 用于方法，表示单独的请求参数
<span class="token annotation punctuation">@ApiImplicitParams</span>： 用于方法，包含多个 <span class="token annotation punctuation">@ApiImplicitParam</span>
<span class="token annotation punctuation">@ApiResponse</span>： 用于方法，描述单个出参信息
<span class="token annotation punctuation">@ApiResponses</span>： 用于方法，包含多个<span class="token annotation punctuation">@ApiResponse</span>
<span class="token annotation punctuation">@ApiError</span>： 用于方法，接口错误所返回的信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),d=[r];function k(m,v){return s(),a("div",null,d)}const b=n(u,[["render",k],["__file","23-swagger接口文档.html.vue"]]);export{b as default};
