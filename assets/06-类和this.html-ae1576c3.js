import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const p={},e=t(`<h1 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h1><ul><li>类是对象的模板</li><li>类决定了一个对象中有哪些属性和方法</li><li>使用 class 关键字来定义一个类</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token comment">// 可以直接在类中定义属性</span>
    name <span class="token operator">=</span> <span class="token string">&#39;孙悟空&#39;</span><span class="token punctuation">;</span>
    age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>
    <span class="token comment">// 当我们通过new创建对象时，实际上就是在调用类的构造函数</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将参数赋值给对象中的属性</span>
        <span class="token comment">// 在构造函数中，可以通过this来引用当前的对象</span>
        <span class="token comment">// 在构造函数中定义属性</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义实例方法</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我会跑！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="类的-this" tabindex="-1"><a class="header-anchor" href="#类的-this" aria-hidden="true">#</a> 类的 <code>this</code></h1><h2 id="类中的所有代码都会在严格模式下执行" tabindex="-1"><a class="header-anchor" href="#类中的所有代码都会在严格模式下执行" aria-hidden="true">#</a> 类中的所有代码都会在严格模式下执行</h2><p>严格模式下其中一个特点就是，函数的 this 不在是 window，而是 undefined</p><p>注意：</p><h2 id="在类中方法的-this-不是固定的" tabindex="-1"><a class="header-anchor" href="#在类中方法的-this-不是固定的" aria-hidden="true">#</a> 在类中方法的 this 不是固定的</h2><ul><li>以方法( <code>obj.function()</code> )形式调用时，this 就是当前的实例</li><li>以函数形式调用，this 是 undefined</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;--&gt;&#39;</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> test <span class="token operator">=</span> mc<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>

mc<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// mc</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在开发时，在有些场景下，我们希望方法中的 this 是固定的，不会因调用方式不同而改变</p><ul><li>如果遇到上述需求，可以使用箭头函数来定义类中的方法</li><li>如果类中的方法是以箭头函数定义的，则方法中的 this 恒为当前实例，不会改变</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 方法一，不优雅</span>
    <span class="token comment">// this.fn = this.fn.bind(this); //将fn方法的this绑定为当前实例</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 方法二</span>
    <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;--&gt;&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> test <span class="token operator">=</span> mc<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>

mc<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// MyClass {fn: Function}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// MyClass {fn: Function}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="类的继承" tabindex="-1"><a class="header-anchor" href="#类的继承" aria-hidden="true">#</a> 类的继承</h1><p>跟 java 一模一样</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将多个类中的重复代码提取出来</span>
<span class="token keyword">class</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;动物在叫&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 通过继承可以使得类中拥有其他类中的属性和方法</span>
<span class="token comment">// 使用extends来继承一个类，继承后就相当于将该类的代码复制到了当前类中</span>
<span class="token comment">// 当我们使用继承后，被继承的类就称为父类，继承父类的类 称为子类</span>
<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
    <span class="token comment">/*
    *   子类继承父类后，将获得父类中所有的属性和方法，
    *       也可以创建同名的属性或方法来对父类进行重写
    * */</span>
    <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;汪汪汪！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Snake</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>

    <span class="token comment">// 当在子类中重写父类构造函数时，必须在子类构造函数中第一时间调用父类构造函数，否则会报错</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> len</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 调用父类构造函数</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>len <span class="token operator">=</span> len<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;嘶嘶嘶~~&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&#39;旺财&#39;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> snake <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Snake</span><span class="token punctuation">(</span><span class="token string">&#39;长虫&#39;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log(dog.name, dog.age);</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>snake<span class="token punctuation">.</span>name<span class="token punctuation">,</span> snake<span class="token punctuation">.</span>age<span class="token punctuation">,</span> snake<span class="token punctuation">.</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// dog.sayHello();</span>
<span class="token comment">// snake.sayHello();</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="静态属性" tabindex="-1"><a class="header-anchor" href="#静态属性" aria-hidden="true">#</a> 静态属性</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
*   直接通过类调用的属性和方法被称为静态属性和静态方法
* */</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用static开头的属性是静态属性，方法是静态方法</span>
    <span class="token keyword">static</span> name <span class="token operator">=</span> <span class="token string">&#39;哈哈&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

        <span class="token comment">// 注意：静态方法this不是实例对象而是当前的类对象</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>MyClass<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
MyClass<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","06-类和this.html.vue"]]);export{d as default};
