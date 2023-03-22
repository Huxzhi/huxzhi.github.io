import{_ as n,X as s,Y as a,a2 as e}from"./framework-c2b0d87a.js";const t={},c=e(`<h1 id="_39-useeffect-副作用" tabindex="-1"><a class="header-anchor" href="#_39-useeffect-副作用" aria-hidden="true">#</a> 39-useEffect 副作用</h1><h2 id="使用-effect" tabindex="-1"><a class="header-anchor" href="#使用-effect" aria-hidden="true">#</a> 使用 Effect</h2><p>为了解决这个问题 React 专门为我们提供了钩子函数 <code>useEffect()</code> ，Effect 的翻译过来就是副作用，专门用来处理那些不能直接写在组件内部的代码。</p><p>哪些代码 <strong>不能直接写在组件内部</strong> 呢？像是：<mark>获取数据、记录日志、检查登录、设置定时器等。简单来说，就是那些和组件渲染无关，但却有可能对组件产生副作用的代码</mark></p><p>useEffect 语法：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span>didUpdate<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>useEffect()</code> 需要一个函数作为参数，你可以这样写：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">/* 编写那些会产生副作用的代码 */</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="useeffect-中的代码是在组件渲染后才执行" tabindex="-1"><a class="header-anchor" href="#useeffect-中的代码是在组件渲染后才执行" aria-hidden="true">#</a> <code>useEffect()</code> 中的代码是在组件渲染后才执行</h3><p><mark><code>useEffect()</code> 中的回调函数会在组件每次渲染完毕之后执行</mark></p><p>这也是它和写在函数体中代码的最大的不同，函数体中的代码会在组件渲染前执行，而 <code>useEffect()</code> 中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染。</p><p>通过使用这个 Hook，我设置了 React 组件在渲染后所要执行的操作。React 会将我们传递的函数保存（我们称这个函数为 effect），并且在 DOM 更新后执行调用它。React 会确保 effect 每次运行时，DOM 都已经更新完毕。</p><h2 id="限制-effect-的执行时机" tabindex="-1"><a class="header-anchor" href="#限制-effect-的执行时机" aria-hidden="true">#</a> 限制 effect 的执行时机</h2><p>组件每次渲染 effect 都会执行，这似乎并不总那么必要。因此在<code>useEffect()</code>中我们可以限制 effect 的执行时机，在<code>useEffect()</code>中可以将一个数组作为第二个参数传递，像是这样：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">/* 编写那些会产生副作用的代码 */</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 这个函数会在下一次effect执行前调用 */</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定后，只有当依赖发生变化时，Effect 才会被触发，通常会将 Effect 中 <mark>使用的所有的局部变量都设置为依赖项</mark> 。</p><p>这样一来可以确保这些值发生变化时，会触发 Effect 的执行，像 <code>setState()</code> 是由钩子函数 <code>useState()</code> 生成的，<code>useState()</code> 会确保组件的每次渲染都会获取到相同 <code>setState()</code> 对象，所以 <code>setState()</code> 方法可以不设置到依赖中</p><p>如果依赖项设置了一个空数组，则意味 Effect 只会在组件初始化时触发一次</p><h3 id="useeffect-可以传递一个第二个参数" tabindex="-1"><a class="header-anchor" href="#useeffect-可以传递一个第二个参数" aria-hidden="true">#</a> useEffect() 可以传递一个第二个参数</h3><p>在《汉堡到家》的练习中，存在着一个 bug。当我们在购物车或结账界面减少商品的数量全部为 0 时（购物车中没有商品时）。购物车或结账页面并不能自动关闭，这里我们就可以借用 Effect 来解决问题。可以直接修改<code>Cart.js</code>直接向组件中添加如下的代码：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>totalAmount <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setShowCheckout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setShowDetails</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>ctx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，当购物车中的商品发生变化时，就会触发 useEffect，从而检查商品的总数量，如果总数量为 0 的话就会将购物车详情页和结账也直接隐藏。</p><h2 id="清除-effect-用于防抖" tabindex="-1"><a class="header-anchor" href="#清除-effect-用于防抖" aria-hidden="true">#</a> 清除 Effect ，用于防抖</h2><p>降低数据过滤的次数，提高用户体验 用户输入完了你在过滤，用户输入的过程中，不要过滤 当用户停止输入动作1秒后，我们才做查询 在开启一个定时器的同时，应该关掉上一次</p><p>组件的每次重新渲染 effect 都会执行，有一些情况里，两次 effect 执行会互相影响。比如，在 effect 中设置了一个定时器，总不能每次 effect 执行都设置一个新的定时器，所以我们需要在一个 effect 执行前，清除掉前一个 effect 所带来的影响。要实现这个功能，可以在 effect 中将一个函数作为返回值返回，像是这样：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">/* 编写那些会产生副作用的代码 */</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 这个函数会在下一次effect执行钱调用 */</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在effect的回调函数中-可以指定一个函数作为返回值" tabindex="-1"><a class="header-anchor" href="#在effect的回调函数中-可以指定一个函数作为返回值" aria-hidden="true">#</a> 在Effect的回调函数中，可以指定一个函数作为返回值</h3><p>effect 返回的函数，会在下一次 effect 执行前调用，我们可以在这个函数中清除掉前一次 effect 执行所带来的影响。</p><p>这个函数可以称其为 <mark>清理函数</mark> ，它会在下次Effect执行前调用</p><p>可以在这个函数中，做一些工作来清除上次Effect执行所带来的的影响</p><p>除了<code>Cart.js</code>以外，FilterMeals 组件也存在一个问题，首先，该组件中的表单项我们并没有使用 state，所以这个组件是一个非受控组件，虽然目前看来没什么太大的问题，但是我们还是应该处理一下，因为受控组件使用时会更加的灵活，可以适用于更多的场景。其次、该组件的主要作用是过滤汉堡的列表，当用户输入关键字时它可以根据关键字的内容对食物列表进行过滤。问题正在于此，由于每次用户输入都需要过滤，这就意味着它的过滤频率过高了。举个例子，用户要输入“汉堡”这个关键字，他需要一次输入 h-a-n-g-b-a-o 七个字母，由于每次输入都会触发一次过滤，所以在“汉堡”打出来之前，列表完全是一个空白的状态，同时无用的过滤也对应用的性能造成了一定的影响。怎么办呢？同样可以使用 Effect 来解决这个问题，修改 FilterMeals 中的代码如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token punctuation">[</span>keyword<span class="token punctuation">,</span> setKeyword<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 通过Effect来改造练习</span>
<span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>

    <span class="token comment">// 降低数据过滤的次数，提高用户体验</span>
    <span class="token comment">// 用户输入完了你在过滤，用户输入的过程中，不要过滤</span>
    <span class="token comment">// 当用户停止输入动作1秒后，我们才做查询</span>
    <span class="token comment">// 在开启一个定时器的同时，应该关掉上一次</span>
    <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Effect触发了！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        props<span class="token punctuation">.</span><span class="token function">onFilter</span><span class="token punctuation">(</span>keyword<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>keyword<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),p=[c];function o(i,u){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","39-useEffect副作用-组件渲染后执行.html.vue"]]);export{d as default};
