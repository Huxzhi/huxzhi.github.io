import{_ as e,X as n,Y as i,a2 as r}from"./framework-c2b0d87a.js";const a={},s=r(`<p>如果需要一个固定大小的不同类型值的集合，我们需要使用元组。</p><h2 id="元组就是数组的变种" tabindex="-1"><a class="header-anchor" href="#元组就是数组的变种" aria-hidden="true">#</a> 元组就是数组的变种</h2><p><strong>元组（Tuple）是固定数量的不同类型的元素的组合</strong>。</p><p>元组与集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定。元组的好处在于可以把多个元素作为一个单元传递。<mark>如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。</mark></p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>let arr:[number,string] = [1,&#39;string&#39;]

let arr2: readonly [number,boolean,string,undefined] = [1,true,&#39;sring&#39;,undefined]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当赋值或访问一个已知索引的元素时，会得到正确的类型：</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>let arr:[number,string] = [1,&#39;string&#39;]
arr[0].length //error
arr[1].length //success
 
//数字是没有length 的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="越界元素" tabindex="-1"><a class="header-anchor" href="#越界元素" aria-hidden="true">#</a> 越界元素</h2><p>对于越界的元素他的类型被限制为 联合类型（就是你在元组中定义的类型）如下图</p><h2 id="应用场景-例如定义execl返回的数据" tabindex="-1"><a class="header-anchor" href="#应用场景-例如定义execl返回的数据" aria-hidden="true">#</a> <strong>应用场景 例如定义execl返回的数据</strong></h2><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>let excel: [string, string, number, string][] = [
    [&#39;title&#39;, &#39;name&#39;, 1, &#39;123&#39;],
    [&#39;title&#39;, &#39;name&#39;, 1, &#39;123&#39;],
    [&#39;title&#39;, &#39;name&#39;, 1, &#39;123&#39;],
    [&#39;title&#39;, &#39;name&#39;, 1, &#39;123&#39;],
    [&#39;title&#39;, &#39;name&#39;, 1, &#39;123&#39;],
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d=[s];function l(t,c){return n(),i("div",null,d)}const v=e(a,[["render",l],["__file","04-元组类型.html.vue"]]);export{v as default};
