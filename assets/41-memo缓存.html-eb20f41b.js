import{_ as s,X as e,Y as t,Z as p,$ as n,a1 as o,a3 as c,a2 as l,G as i}from"./framework-c2b0d87a.js";const u={},d=l(`<h1 id="_41-memo-缓存" tabindex="-1"><a class="header-anchor" href="#_41-memo-缓存" aria-hidden="true">#</a> 41-memo 缓存</h1><p>React 组件会在两种情况下发生重新渲染。第一种，当组件自身的 state 发生变化时。第二种，当组件的父组件重新渲染时。第一种情况下的重新渲染无可厚非，state 都变了，组件自然应该重新进行渲染。但是第二种情况似乎并不是总那么的必要。</p><p>三个组件的引用关系为，A 组件是 App 的子组件、B 组件是 A 组件的子组件：App –&gt; A –&gt; B</p><p>当 App 组件发生重新渲染时，A 和 B 组件都会发生重渲染。当 A 组件重新渲染时，B 组件也会重新渲染。B 组件中没有 state，甚至连 props 都没有设置。换言之，B 组件无论如何渲染，每次渲染的结果都是相同的，虽然重渲染并不会应用到真实 DOM 上，但很显然这种渲染是完全没有必要的。</p><p>为了减少像 B 组件这样组件的渲染，React 为我们提供了一个方法<code>React.memo()</code>。</p><p>该方法是一个[[高阶函数]]，可以用来 <mark>根据组件的 props 对组件进行缓存</mark> ，当一个组件的父组件发生重新渲染，而子组件的 props 没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。</p><h2 id="react-memo" tabindex="-1"><a class="header-anchor" href="#react-memo" aria-hidden="true">#</a> React.memo()</h2><p><code>React.memo()</code> 是一个高阶组件 它接收一个组件作为参数，并且会返回一个包装过的新组件</p><p>包装过的新组件就会具有缓存功能，包装过后，只有组件的 props 发生变化后，才会触发组件的重新的渲染，否则总是返回缓存中结果</p><p>现在对上述案例中的 B 组件进行如下修改：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token function-variable function">B</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;B渲染&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">组件B</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后的代码中，并没有直接将 B 组件向外导出，而是在 B 组件外层套了一层函数 <code>React.memo()</code> ，这样一来，返回的 B 组件就增加了缓存功能，只有当 B 组件的 <code>props</code> 属性发生变化时，才会触发组件的重新渲染。</p><p><code>memo</code> 只会根据 <code>props</code> 判断是否需要重新渲染，和 <code>state</code> 和 <code>context</code> 无关，</p><p>这里有个问题，</p>`,14);function r(k,m){const a=i("RouterLink");return e(),t("div",null,[d,p("p",null,[n("父组件重新渲染，会再次执行相同的代码，会导致传递的 pros的值 也发生变化，（比如：箭头函数，功能相同，但不是同一个函数了） 解决办法： "),o(a,{to:"/code/react/React18/42-useCallback.html"},{default:c(()=>[n("42-useCallback")]),_:1})])])}const _=s(u,[["render",r],["__file","41-memo缓存.html.vue"]]);export{_ as default};
