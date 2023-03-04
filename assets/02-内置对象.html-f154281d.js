import{_ as l,X as u,Y as d,Z as n,$ as e,a1 as t,a2 as o,G as s}from"./framework-c2b0d87a.js";const m={},a={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects",title:"内置对象",target:"_blank",rel:"noopener noreferrer"},r=o(`<h2 id="ecmascript-的内置对象" tabindex="-1"><a class="header-anchor" href="#ecmascript-的内置对象" aria-hidden="true">#</a> ECMAScript 的内置对象</h2><p><strong><code>Boolean</code>、Number、<code>string</code>、<code>RegExp</code>、<code>Date</code>、<code>Error</code></strong></p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error(&quot;error!&quot;)
console.log(e)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DOM 和 BOM 的内置对象 Document、HTMLElement、Event、NodeList 等</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll(&#39;div&#39;);
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector(&#39;div&#39;) as HTMLDivElement
document.addEventListener(&#39;click&#39;, function (e: MouseEvent) {
    
});
//dom元素的映射表
interface HTMLElementTagNameMap {
    &quot;a&quot;: HTMLAnchorElement;
    &quot;abbr&quot;: HTMLElement;
    &quot;address&quot;: HTMLElement;
    &quot;applet&quot;: HTMLAppletElement;
    &quot;area&quot;: HTMLAreaElement;
    &quot;article&quot;: HTMLElement;
    &quot;aside&quot;: HTMLElement;
    &quot;audio&quot;: HTMLAudioElement;
    &quot;b&quot;: HTMLElement;
    &quot;base&quot;: HTMLBaseElement;
    &quot;bdi&quot;: HTMLElement;
    &quot;bdo&quot;: HTMLElement;
    &quot;blockquote&quot;: HTMLQuoteElement;
    &quot;body&quot;: HTMLBodyElement;
    &quot;br&quot;: HTMLBRElement;
    &quot;button&quot;: HTMLButtonElement;
    &quot;canvas&quot;: HTMLCanvasElement;
    &quot;caption&quot;: HTMLTableCaptionElement;
    &quot;cite&quot;: HTMLElement;
    &quot;code&quot;: HTMLElement;
    &quot;col&quot;: HTMLTableColElement;
    &quot;colgroup&quot;: HTMLTableColElement;
    &quot;data&quot;: HTMLDataElement;
    &quot;datalist&quot;: HTMLDataListElement;
    &quot;dd&quot;: HTMLElement;
    &quot;del&quot;: HTMLModElement;
    &quot;details&quot;: HTMLDetailsElement;
    &quot;dfn&quot;: HTMLElement;
    &quot;dialog&quot;: HTMLDialogElement;
    &quot;dir&quot;: HTMLDirectoryElement;
    &quot;div&quot;: HTMLDivElement;
    &quot;dl&quot;: HTMLDListElement;
    &quot;dt&quot;: HTMLElement;
    &quot;em&quot;: HTMLElement;
    &quot;embed&quot;: HTMLEmbedElement;
    &quot;fieldset&quot;: HTMLFieldSetElement;
    &quot;figcaption&quot;: HTMLElement;
    &quot;figure&quot;: HTMLElement;
    &quot;font&quot;: HTMLFontElement;
    &quot;footer&quot;: HTMLElement;
    &quot;form&quot;: HTMLFormElement;
    &quot;frame&quot;: HTMLFrameElement;
    &quot;frameset&quot;: HTMLFrameSetElement;
    &quot;h1&quot;: HTMLHeadingElement;
    &quot;h2&quot;: HTMLHeadingElement;
    &quot;h3&quot;: HTMLHeadingElement;
    &quot;h4&quot;: HTMLHeadingElement;
    &quot;h5&quot;: HTMLHeadingElement;
    &quot;h6&quot;: HTMLHeadingElement;
    &quot;head&quot;: HTMLHeadElement;
    &quot;header&quot;: HTMLElement;
    &quot;hgroup&quot;: HTMLElement;
    &quot;hr&quot;: HTMLHRElement;
    &quot;html&quot;: HTMLHtmlElement;
    &quot;i&quot;: HTMLElement;
    &quot;iframe&quot;: HTMLIFrameElement;
    &quot;img&quot;: HTMLImageElement;
    &quot;input&quot;: HTMLInputElement;
    &quot;ins&quot;: HTMLModElement;
    &quot;kbd&quot;: HTMLElement;
    &quot;label&quot;: HTMLLabelElement;
    &quot;legend&quot;: HTMLLegendElement;
    &quot;li&quot;: HTMLLIElement;
    &quot;link&quot;: HTMLLinkElement;
    &quot;main&quot;: HTMLElement;
    &quot;map&quot;: HTMLMapElement;
    &quot;mark&quot;: HTMLElement;
    &quot;marquee&quot;: HTMLMarqueeElement;
    &quot;menu&quot;: HTMLMenuElement;
    &quot;meta&quot;: HTMLMetaElement;
    &quot;meter&quot;: HTMLMeterElement;
    &quot;nav&quot;: HTMLElement;
    &quot;noscript&quot;: HTMLElement;
    &quot;object&quot;: HTMLObjectElement;
    &quot;ol&quot;: HTMLOListElement;
    &quot;optgroup&quot;: HTMLOptGroupElement;
    &quot;option&quot;: HTMLOptionElement;
    &quot;output&quot;: HTMLOutputElement;
    &quot;p&quot;: HTMLParagraphElement;
    &quot;param&quot;: HTMLParamElement;
    &quot;picture&quot;: HTMLPictureElement;
    &quot;pre&quot;: HTMLPreElement;
    &quot;progress&quot;: HTMLProgressElement;
    &quot;q&quot;: HTMLQuoteElement;
    &quot;rp&quot;: HTMLElement;
    &quot;rt&quot;: HTMLElement;
    &quot;ruby&quot;: HTMLElement;
    &quot;s&quot;: HTMLElement;
    &quot;samp&quot;: HTMLElement;
    &quot;script&quot;: HTMLScriptElement;
    &quot;section&quot;: HTMLElement;
    &quot;select&quot;: HTMLSelectElement;
    &quot;slot&quot;: HTMLSlotElement;
    &quot;small&quot;: HTMLElement;
    &quot;source&quot;: HTMLSourceElement;
    &quot;span&quot;: HTMLSpanElement;
    &quot;strong&quot;: HTMLElement;
    &quot;style&quot;: HTMLStyleElement;
    &quot;sub&quot;: HTMLElement;
    &quot;summary&quot;: HTMLElement;
    &quot;sup&quot;: HTMLElement;
    &quot;table&quot;: HTMLTableElement;
    &quot;tbody&quot;: HTMLTableSectionElement;
    &quot;td&quot;: HTMLTableDataCellElement;
    &quot;template&quot;: HTMLTemplateElement;
    &quot;textarea&quot;: HTMLTextAreaElement;
    &quot;tfoot&quot;: HTMLTableSectionElement;
    &quot;th&quot;: HTMLTableHeaderCellElement;
    &quot;thead&quot;: HTMLTableSectionElement;
    &quot;time&quot;: HTMLTimeElement;
    &quot;title&quot;: HTMLTitleElement;
    &quot;tr&quot;: HTMLTableRowElement;
    &quot;track&quot;: HTMLTrackElement;
    &quot;u&quot;: HTMLElement;
    &quot;ul&quot;: HTMLUListElement;
    &quot;var&quot;: HTMLElement;
    &quot;video&quot;: HTMLVideoElement;
    &quot;wbr&quot;: HTMLElement;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="定义-promise" tabindex="-1"><a class="header-anchor" href="#定义-promise" aria-hidden="true">#</a> 定义 Promise</h1><p>如果我们不指定返回的类型TS是推断不出来返回的是什么类型</p><p>函数定义返回 promise 语法规则: <code>promise &lt;T&gt;</code> 类型</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>function promise():Promise&lt;number&gt;{
   return new Promise&lt;number&gt;((resolve,reject)=&gt;{
       resolve(1)
   })
}
 
promise().then(res=&gt;{
    console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了</p>`,10),v={href:"https://github.com/Microsoft/TypeScript/tree/master/src/lib",title:"TypeScript 核心库的定义文件",target:"_blank",rel:"noopener noreferrer"};function c(q,b){const i=s("ExternalLinkIcon");return u(),d("div",null,[n("p",null,[e("JavaScript 中有很多"),n("a",a,[e("内置对象"),t(i)]),e("，它们可以直接在 TypeScript 中当做定义好了的类型。")]),r,n("p",null,[e("而他们的定义文件，则在 "),n("a",v,[e("TypeScript 核心库的定义文件"),t(i)]),e("中")])])}const E=l(m,[["render",c],["__file","02-内置对象.html.vue"]]);export{E as default};
