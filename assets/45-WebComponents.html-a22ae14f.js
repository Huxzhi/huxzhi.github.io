import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const p="/assets/image-2023-01-12_19-11-20-240-45-WebComponents-13ad8be4.png",e="/assets/image-2023-01-12_19-14-15-076-45-WebComponents-b80023fc.png",c="/assets/image-2023-01-12_19-14-30-850-45-WebComponents-7bf02b99.png",o={},l=t('<p>什么是 Web Components</p><p>Web Components 提供了基于原生支持的、对视图层的封装能力，可以让单个组件相关的 javaScript、css、html 模板运行在以 html 标签为界限的局部环境中，不会影响到全局，组件间也不会相互影响。</p><p>再简单来说：<strong>就是提供了我们自定义标签的能力，并且提供了标签内完整的生命周期。</strong></p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>Custom elements（自定义元素）</strong>：JavaScript API，允许定义 custom elements 及其行为，然后可以在我们的用户界面中按照需要使用它们。</p><p><strong>Shadow DOM（影子 DOM）</strong>：JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，开发者可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。</p><p><strong>HTML templates（HTML 模板）</strong>：和元素使开发者可以编写与 HTML 结构类似的组件和样式。然后它们可以作为自定义元素结构的基础被多次重用。</p><blockquote><p>京东的跨端框架 Taro 的组件部分，就是用基于 Web Components 开发的</p></blockquote><h3 id="_1-实战案例" tabindex="-1"><a class="header-anchor" href="#_1-实战案例" aria-hidden="true">#</a> 1.实战案例</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Btn</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//调用super 来建立正确的原型链继承关系</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">&#39;小满&#39;</span>
        p<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;height:200px;width:200px;border:1px solid #ccc;background:yellow&#39;</span><span class="token punctuation">)</span>
        <span class="token comment">//表示 shadow DOM 子树的根节点。</span>
        <span class="token keyword">const</span> shaDow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">mode</span><span class="token operator">:</span><span class="token string">&quot;open&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

        shaDow<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>p<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">h</span> <span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span>  document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 生命周期
     */</span>
    <span class="token comment">//当自定义元素第一次被连接到文档 DOM 时被调用。</span>
    <span class="token function">connectedCallback</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我已经插入了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//当自定义元素与文档 DOM 断开连接时被调用。</span>
    <span class="token function">disconnectedCallback</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我已经断开了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//当自定义元素被移动到新文档时被调用</span>
    <span class="token function">adoptedCallback</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我被移动了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//当自定义元素的一个属性被增加、移除或更改时被调用</span>
    <span class="token function">attributeChangedCallback</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我被改变了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;xiao-man&#39;</span><span class="token punctuation">,</span>Btn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-template-模式" tabindex="-1"><a class="header-anchor" href="#_2-template-模式" aria-hidden="true">#</a> 2.template 模式</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Btn</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//调用super 来建立正确的原型链继承关系</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;template&#39;</span><span class="token punctuation">)</span>
        template<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;div&gt;小满&lt;/div&gt;
        &lt;style&gt;
            div{
                height:200px;
                width:200px;
                background:blue;
            }
        &lt;/style&gt;
        </span><span class="token template-punctuation string">\`</span></span>
        <span class="token comment">//表示 shadow DOM 子树的根节点。</span>
        <span class="token keyword">const</span> shaDow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span> mode<span class="token operator">:</span> <span class="token string">&quot;open&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

        shaDow<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">h</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 生命周期
     */</span>
    <span class="token comment">//当自定义元素第一次被连接到文档 DOM 时被调用。</span>
    <span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我已经插入了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//当自定义元素与文档 DOM 断开连接时被调用。</span>
    <span class="token function">disconnectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我已经断开了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//当自定义元素被移动到新文档时被调用</span>
    <span class="token function">adoptedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我被移动了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//当自定义元素的一个属性被增加、移除或更改时被调用</span>
    <span class="token function">attributeChangedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我被改变了！！！嗷呜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;xiao-man&#39;</span><span class="token punctuation">,</span> Btn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>web Component<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./btn.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>xiao-man</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>xiao-man</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-如何在-vue-使用" tabindex="-1"><a class="header-anchor" href="#_3-如何在-vue-使用" aria-hidden="true">#</a> 3.如何在 Vue 使用</h3><p>defineCustomElement</p><p>告知 vue 这是一个自定义 Component 跳过组件检查</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*vite config ts 配置*/</span>
<span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   template<span class="token operator">:</span><span class="token punctuation">{</span>
     compilerOptions<span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token function-variable function">isCustomElement</span><span class="token operator">:</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token operator">=&gt;</span> tag<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;xiaoman-&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>xiaoman-btn</span> <span class="token attr-name">:title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> JSON.stringify(name) <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>xiaoman-btn</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> defineCustomElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token comment">//自定义元素模式  要开启这个模式，只需要将你的组件文件以 .ce.vue 结尾即可</span>
<span class="token keyword">import</span> customVueVue <span class="token keyword">from</span> <span class="token string">&#39;./components/custom-vue.ce.vue&#39;</span>
<span class="token keyword">const</span> Btn <span class="token operator">=</span> <span class="token function">defineCustomElement</span><span class="token punctuation">(</span>customVueVue<span class="token punctuation">)</span>
customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;xiaoman-btn&#39;</span><span class="token punctuation">,</span> Btn<span class="token punctuation">)</span>

<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>less<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>

        小满123213 {{title}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">

<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

defineProps<span class="token operator">&lt;</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span>string
<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>less<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传递参数 如果是对象需要序列化 他是作用于 标签上的</p><figure><img src="`+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',25),i=[l];function u(k,d){return s(),a("div",null,i)}const v=n(o,[["render",u],["__file","45-WebComponents.html.vue"]]);export{v as default};
