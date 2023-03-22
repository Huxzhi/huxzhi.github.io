import{_ as n,X as s,Y as a,a2 as t}from"./framework-c2b0d87a.js";const p={},l=t(`<p>注意事项：</p><ol><li>JSX 不是字符串，不要加引号</li><li>JSX 中 html 标签应该小写，React 组件应该大写开头</li><li>JSX 中有且只有一个根标签</li><li>JSX 的标签必须正确结束（自结束标签必须写/）</li><li>在 JSX 中可以使用{}嵌入表达式 <ul><li>有值的语句的就是表达式</li></ul></li><li>如果表达式是空值、布尔值、undefined，将不会显示</li><li>在 JSX 中，属性可以直接在标签中设置 <ul><li>注意： <ul><li>class 需要使用 className 代替</li><li>style 中必须使用对象设置 <code>style={{background:&#39;red&#39;}}</code> ，第一个{}是 表达式，第二个是 对象</li><li>onclick:()=&gt;</li></ul></li></ul></li></ol><p>由于 JSX 最终需要转换为 JS 代码执行，所以浏览器并不能正常识别 JSX，所以当我们在浏览器中直接使用 JSX 时，还必须引入 babel 来完成对代码的编译。</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> div <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
      <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;哈哈&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
      <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box1<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token string">&quot;yellowgreen&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">border</span><span class="token operator">:</span> <span class="token string">&quot;10px red solid&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="token punctuation">&gt;</span></span><span class="token plain-text">
      我是一个div
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">列表项</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text"> </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token plain-text"> </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text"> </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token number">NaN</span><span class="token punctuation">}</span><span class="token plain-text"> </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),e=[l];function c(o,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","11.a-JSX补充注意事项.html.vue"]]);export{k as default};
