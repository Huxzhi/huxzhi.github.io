import{_ as e,X as t,Y as i,Z as n,a1 as o,a3 as p,$ as s,a2 as c,G as r}from"./framework-c2b0d87a.js";const l="/assets/image-2023-01-28_18-56-56-120-10-Providers-81b533c6.png",u="/assets/image-2023-01-28_18-57-15-251-10-Providers-5957f47c.png",d="/assets/image-2023-01-28_18-58-21-596-10-Providers-6d8bd21b.png",v="/assets/image-2023-01-28_18-58-45-145-10-Providers-3aa8c0ad.png",k="/assets/image-2023-01-28_18-59-15-481-10-Providers-fe9ba7b5.png",m="/assets/image-2023-01-28_18-59-32-282-10-Providers-82301596.png",b="/assets/image-2023-01-28_19-00-11-140-10-Providers-fba0277c.png",g="/assets/image-2023-01-28_19-00-21-948-10-Providers-be6b62e4.png",f="/assets/image-2023-01-28_19-00-51-166-10-Providers-dec73b6e.png",_={},y=n("h1",{id:"providers",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#providers","aria-hidden":"true"},"#"),s(" Providers")],-1),h=n("p",null,[n("code",null,"Providers"),s(" 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统。 Provider 只是一个用 "),n("code",null,"@Injectable()"),s(" 装饰器注释的类。")],-1),U=c('<h2 id="_1-基本用法" tabindex="-1"><a class="header-anchor" href="#_1-基本用法" aria-hidden="true">#</a> 1.基本用法</h2><p>module 引入 service 在 providers 注入 <img src="'+l+'" alt="" loading="lazy"></p><p>在 Controller 就可以使用注入好的 service 了</p><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-service-第二种用法-自定义名称" tabindex="-1"><a class="header-anchor" href="#_2-service-第二种用法-自定义名称" aria-hidden="true">#</a> 2.service 第二种用法(自定义名称)</h2><p>第一种用法就是一个语法糖</p><p>其实他的全称是这样的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;Xiaoman&quot;</span><span class="token punctuation">,</span>
    useClass<span class="token operator">:</span> UserService
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>自定义名称之后 需要用对应的 <code>Inject</code> 取 不然会找不到的 <img src="'+v+`" alt="" loading="lazy"></p><h2 id="_3-自定义注入值" tabindex="-1"><a class="header-anchor" href="#_3-自定义注入值" aria-hidden="true">#</a> 3.自定义注入值</h2><p>通过 useValue</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;Xiaoman&quot;</span><span class="token punctuation">,</span>
    useClass<span class="token operator">:</span> UserService
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;JD&quot;</span><span class="token punctuation">,</span>
    useValue<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;TB&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PDD&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;JD&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-工厂模式" tabindex="-1"><a class="header-anchor" href="#_4-工厂模式" aria-hidden="true">#</a> 4.工厂模式</h2><p>如果服务 之间有相互的依赖 或者逻辑处理 可以使用  <code>useFactory</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService2 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service2&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserService3 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.service3&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> UserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./user.controller&#39;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>UserController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;Xiaoman&quot;</span><span class="token punctuation">,</span>
    useClass<span class="token operator">:</span> UserService
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;JD&quot;</span><span class="token punctuation">,</span>
    useValue<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;TB&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PDD&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;JD&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
    UserService2<span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    provide<span class="token operator">:</span> <span class="token string">&quot;Test&quot;</span><span class="token punctuation">,</span>
    inject<span class="token operator">:</span> <span class="token punctuation">[</span>UserService2<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function">useFactory</span><span class="token punctuation">(</span>UserService2<span class="token operator">:</span> UserService2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserService3</span><span class="token punctuation">(</span>UserService2<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_5-异步模式" tabindex="-1"><a class="header-anchor" href="#_5-异步模式" aria-hidden="true">#</a> 5.异步模式</h2><p>useFactory 返回一个 promise 或者其他异步操作</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>import { Module } from &#39;@nestjs/common&#39;;
import { UserService } from &#39;./user.service&#39;;
import { UserService2 } from &#39;./user.service2&#39;;
import { UserService3 } from &#39;./user.service3&#39;;
import { UserController } from &#39;./user.controller&#39;;

@Module({
  controllers: [UserController],
  providers: [{
    provide: &quot;Xiaoman&quot;,
    useClass: UserService
  }, {
    provide: &quot;JD&quot;,
    useValue: [&#39;TB&#39;, &#39;PDD&#39;, &#39;JD&#39;]
  },
    UserService2,
  {
    provide: &quot;Test&quot;,
    inject: [UserService2],
    useFactory(UserService2: UserService2) {
      return new UserService3(UserService2)
    }
  },
  {
    provide: &quot;sync&quot;,
    async useFactory() {
      return await  new Promise((r) =&gt; {
        setTimeout(() =&gt; {
          r(&#39;sync&#39;)
        }, 3000)
      })
    }
  }
  ]
})
export class UserModule { }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',24);function w(S,x){const a=r("RouterLink");return t(),i("div",null,[y,h,n("p",null,[o(a,{to:"/code/nest-js/10.a-%E6%B3%A8%E5%85%A5%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB.html"},{default:p(()=>[s("10.a-注入依赖关系")]),_:1})]),U])}const P=e(_,[["render",w],["__file","10-Providers.html.vue"]]);export{P as default};
