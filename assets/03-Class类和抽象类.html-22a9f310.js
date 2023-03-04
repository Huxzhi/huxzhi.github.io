import{_ as e,X as a,Y as i,a2 as s}from"./framework-c2b0d87a.js";const r="/assets/Pasted-image-20221230165352-21787d5e.png",n={},t=s(`<p>ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的“类”改写，就是下面这样。</p><blockquote><p>更像 Java 的语法</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>//定义类
class Person {
    constructor () { //构造函数
 
    }
    run () {
        
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-ts-定义类" tabindex="-1"><a class="header-anchor" href="#_1-ts-定义类" aria-hidden="true">#</a> 1. TS 定义类</h2><p>在 TypeScript 是不允许直接在 constructor 定义变量的 需要在 constructor 上面先声明 <img src="`+r+'" alt="Pasted image 20221230165352" loading="lazy"></p><p>这样引发了第二个问题你如果了定义了变量不用 也会报错 通常是给个默认值 或者 进行赋值</p><h2 id="_2-类的修饰符" tabindex="-1"><a class="header-anchor" href="#_2-类的修饰符" aria-hidden="true">#</a> 2. 类的修饰符</h2><h3 id="总共有三个-public-private-protected" tabindex="-1"><a class="header-anchor" href="#总共有三个-public-private-protected" aria-hidden="true">#</a> 总共有三个 public private protected</h3><p>公开，私有，保护</p><h3 id="static-静态属性" tabindex="-1"><a class="header-anchor" href="#static-静态属性" aria-hidden="true">#</a> static 静态属性</h3><p>静态方法只能调用静态属性</p><h2 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h2><p>跟 java 一模一样</p>',13),c=[t];function d(l,o){return a(),i("div",null,c)}const h=e(n,[["render",d],["__file","03-Class类和抽象类.html.vue"]]);export{h as default};
