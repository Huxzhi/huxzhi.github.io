import{_ as c,X as p,Y as u,Z as s,$ as n,a1 as a,a3 as i,a2 as e,G as l}from"./framework-c2b0d87a.js";const d={},r=e(`<p>一般称为 <strong>中间件</strong> ，很重要，</p><p>前进后退，设置 权限控制在这里</p><h2 id="全局前置守卫" tabindex="-1"><a class="header-anchor" href="#全局前置守卫" aria-hidden="true">#</a> 全局前置守卫</h2><p><code>router.beforeEach</code></p><div class="language-vbscript line-numbers-mode" data-ext="vbscript"><pre class="language-vbscript"><code>router.beforeEach((to, form, next) =&gt; {
    console.log(to, form);
    next()
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个守卫方法接收三个参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>to: Route， 即将要进入的目标 路由对象；
from: Route，当前导航正要离开的路由；
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
next(&#39;/&#39;) 或者 next({ path: &#39;/&#39; }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="案例-权限判断" tabindex="-1"><a class="header-anchor" href="#案例-权限判断" aria-hidden="true">#</a> 案例 权限判断</h3>`,8),v=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> whileList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">]</span>
 
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;token&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>whileList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//另外说一下beforeEach可以定义不止一个，vue会收集你所有定义的路由钩子，所以next的作用不应该是跳转，而是使步骤进行到下一个你定义的钩子</span>
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            path<span class="token operator">:</span><span class="token string">&#39;/&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局后置守卫" tabindex="-1"><a class="header-anchor" href="#全局后置守卫" aria-hidden="true">#</a> 全局后置守卫</h2>`,2),m=e(`<p>你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 <code>next</code> 函数也不会改变导航本身：</p><div class="language-coffeescript line-numbers-mode" data-ext="coffeescript"><pre class="language-coffeescript"><code>router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span>from</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    Vnode<span class="token punctuation">.</span>component<span class="token operator">?.</span>exposed<span class="token operator">?.</span><span class="token function">endLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>loadingBar 组件</p><div class="language-vue&lt;template&gt; line-numbers-mode" data-ext="vue&lt;template&gt;"><pre class="language-vue&lt;template&gt;"><code>    &lt;div class=&quot;wraps&quot;&gt;
        &lt;div ref=&quot;bar&quot; class=&quot;bar&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
    
&lt;script setup lang=&#39;ts&#39;&gt;
import { ref, onMounted } from &#39;vue&#39;
let speed = ref&lt;number&gt;(1)
let bar = ref&lt;HTMLElement&gt;()
let timer = ref&lt;number&gt;(0)
const startLoading = () =&gt; {
    let dom = bar.value as HTMLElement;
    speed.value = 1
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value &lt; 90) {
            speed.value += 1;
            dom.style.width = speed.value + &#39;%&#39;
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1;
            window.cancelAnimationFrame(timer.value)
        }
    })
 
}
 
const endLoading = () =&gt; {
    let dom = bar.value as HTMLElement;
    setTimeout(() =&gt; {
        window.requestAnimationFrame(() =&gt; {
            speed.value = 100;
            dom.style.width = speed.value + &#39;%&#39;
        })
    }, 500)
 
}
 
 
defineExpose({
    startLoading,
    endLoading
})
&lt;/script&gt;
    
&lt;style scoped lang=&quot;less&quot;&gt;
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;
    .bar {
        height: inherit;
        width: 0;
        background: blue;
    }
}
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mian.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> loadingBar <span class="token keyword">from</span> <span class="token string">&#39;./components/loadingBar.vue&#39;</span>
<span class="token keyword">const</span> Vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>loadingBar<span class="token punctuation">)</span>
<span class="token function">render</span><span class="token punctuation">(</span>Vnode<span class="token punctuation">,</span> document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Vnode<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Vnode<span class="token punctuation">.</span>component<span class="token operator">?.</span>exposed<span class="token operator">?.</span><span class="token function">startLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Vnode<span class="token punctuation">.</span>component<span class="token operator">?.</span>exposed<span class="token operator">?.</span><span class="token function">endLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),k={href:"https://blog.csdn.net/qq1195566313/article/details/123699583",target:"_blank",rel:"noopener noreferrer"};function b(g,f){const t=l("RouterLink"),o=l("ExternalLinkIcon");return p(),u("div",null,[r,s("p",null,[n("完整案例："),a(t,{to:"/code/vue/vue3-router4/08.a-%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB%E6%A1%88%E4%BE%8B-%E7%99%BB%E9%99%86%E5%88%A4%E6%96%AD%E8%B7%AF%E7%94%B1.html"},{default:i(()=>[n("08.a-全局前置守卫案例-登陆判断路由")]),_:1})]),v,s("p",null,[n("使用场景一般可以用来做 "),a(t,{to:"/code/vue/vue3-router4/08.b-%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E5%AE%88%E5%8D%AB%E6%A1%88%E4%BE%8B-%E8%BF%9B%E5%BA%A6%E6%9D%A1%E5%8A%A0%E8%BD%BD.html"},{default:i(()=>[n("loadingBar 完整案例")]),_:1})]),m,s("blockquote",null,[s("p",null,[n("版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 本文链接："),s("a",k,[n("https://blog.csdn.net/qq1195566313/article/details/123699583"),a(o)])])])])}const E=c(d,[["render",b],["__file","08-导航守卫.html.vue"]]);export{E as default};
