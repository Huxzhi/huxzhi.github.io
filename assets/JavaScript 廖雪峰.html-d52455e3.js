import{_ as d,X as s,Y as l,Z as i,$ as e,a1 as r,a2 as n,G as c}from"./framework-c2b0d87a.js";const v={},o=n(`<h1 id="javascript-廖雪峰" tabindex="-1"><a class="header-anchor" href="#javascript-廖雪峰" aria-hidden="true">#</a> JavaScript 廖雪峰</h1><p>目录</p><p>JavaScript简介</p><p>快速入门</p><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p>函数定义和调用</p><p>利用 <code>arguments</code>，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x &gt;= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上 <code>arguments</code> 最常用于判断传入参数的个数。你可能会看到这样的写法：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要把中间的参数 <code>b</code> 变为“可选”参数，就只能通过 <code>arguments</code> 判断，然后重新调整参数并赋值。</p><h3 id="全局作用域" tabindex="-1"><a class="header-anchor" href="#全局作用域" aria-hidden="true">#</a> 全局作用域</h3><p>不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript 默认有一个全局对象 <code>window</code>，全局作用域的变量实际上被绑定到 <code>window</code> 的一个属性：</p><p>名字空间</p><p>全局变量会绑定到 <code>window</code> 上，不同的 JavaScript 文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。</p><p>减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = &#39;myapp&#39;;
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return &#39;foo&#39;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>局部作用域</p><p>由于 JavaScript 的变量作用域实际上是函数内部，我们在 <code>for</code> 循环等语句块中是无法定义具有局部作用域的变量的：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&#39;use strict&#39;;

function foo() {
  for (var i=0; i&lt;100; i++) {
    //
  }
  i += 100; // 仍然可以引用变量i
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了解决块级作用域，ES6 引入了新的关键字 <code>let</code>，用 <code>let</code> 替代 <code>var</code> 可以申明一个块级作用域的变量：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&#39;use strict&#39;;

function foo() {
    var sum = 0;
    for (let i=0; i&lt;100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解构赋值</p><p>如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&#39;use strict&#39;;

var person = {
    name: &#39;小明&#39;,
    age: 20,
    gender: &#39;male&#39;,
    passport: &#39;G-12345678&#39;,
    school: &#39;No.4 middle school&#39;
};
var {name, age, passport} = person;

// name, age, passport分别被赋值为对应属性:
console.log(&#39;name = &#39; + name + &#39;, age = &#39; + age + &#39;, passport = &#39; + passport);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要使用的变量名和属性名不一致，可以用下面的语法获取：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>var person = {
    name: &#39;小明&#39;,
    age: 20,
    gender: &#39;male&#39;,
    passport: &#39;G-12345678&#39;,
    school: &#39;No.4 middle school&#39;
};

// 把passport属性赋值给变量id:
let {name, passport:id} = person;
name; // &#39;小明&#39;
id; // &#39;G-12345678&#39;
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// 声明变量:
var x, y;
// 解构赋值:
{x, y} = { name: &#39;小明&#39;, x: 100, y: 200};
// 语法错误: Uncaught SyntaxError: Unexpected token =

//这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。
//解决方法是用小括号括起来：

({x, y} = { name: &#39;小明&#39;, x: 100, y: 200});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h3><blockquote><p>所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。</p></blockquote><p>虽然在一个独立的函数调用中，根据是否是 strict 模式，<code>this</code> 指向 <code>undefined</code> 或 <code>window</code>，不过，我们还是可以控制 <code>this</code> 的指向的！</p><p>要指定函数的 <code>this</code> 指向哪个对象，可以用函数本身的 <code>apply</code> 方法，它接收两个参数，第一个参数就是需要绑定的 <code>this</code> 变量，第二个参数是 <code>Array</code>，表示函数本身的参数。</p><p>用 <code>apply</code> 修复 <code>getAge()</code> 调用：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: &#39;小明&#39;,
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个与 <code>apply()</code> 类似的方法是 <code>call()</code>，唯一区别是：</p><ul><li><p><code>apply()</code> 把参数打包成 <code>Array</code> 再传入；</p></li><li><p><code>call()</code> 把参数按顺序传入。</p></li></ul><p>比如调用 <code>Math.max(3,5, 4)</code>，分别用 <code>apply()</code> 和 <code>call()</code> 实现如下：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对普通函数调用，我们通常把 <code>this</code> 绑定为 <code>null</code>。</p><p>装饰器</p><p>利用 <code>apply()</code>，我们还可以动态改变函数的行为。</p><p>JavaScript 的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。</p><p>现在假定我们想统计一下代码一共调用了多少次 <code>parseInt()</code>，可以把所有的调用都找出来，然后手动加上 <code>count += 1</code>，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的 <code>parseInt()</code>：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&#39;use strict&#39;;

var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

// 测试:
parseInt(&#39;10&#39;);
parseInt(&#39;20&#39;);
parseInt(&#39;30&#39;);
console.log(&#39;count = &#39; + count); // 3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高阶函数" tabindex="-1"><a class="header-anchor" href="#高阶函数" aria-hidden="true">#</a> 高阶函数</h3><p>高阶函数英文叫 Higher-order function。那么什么是高阶函数？</p><p>JavaScript 的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。</p><p>一个最简单的高阶函数：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function add(x, y, f) {
    return f(x) + f(y);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>filter</p><p>filter 也是一个常用的操作，它用于把 <code>Array</code> 的某些元素过滤掉，然后返回剩下的元素。</p><p>和 <code>map()</code> 类似，<code>Array</code> 的 <code>filter()</code> 也接收一个函数。和 <code>map()</code> 不同的是，<code>filter()</code> 把传入的函数依次作用于每个元素，然后根据返回值是 <code>true</code> 还是 <code>false</code> 决定保留还是丢弃该元素。</p><p>回调函数</p><p><code>filter()</code> 接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示 <code>Array</code> 的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：</p><p>利用 <code>filter</code>，可以巧妙地去除 <code>Array</code> 的重复元素：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&#39;use strict&#39;;

var
    r,
    arr = [&#39;apple&#39;, &#39;strawberry&#39;, &#39;banana&#39;, &#39;pear&#39;, &#39;apple&#39;, &#39;orange&#39;, &#39;orange&#39;, &#39;strawberry&#39;];

r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去除重复元素依靠的是 <code>indexOf</code> 总是返回第一个元素的位置，后续的重复元素位置与 <code>indexOf</code> 返回的位置不相等，因此被 <code>filter</code> 滤掉了。</p><p>过滤质数</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code> return arr.filter((e,i,a)=&gt;{
      return e!=1 &amp;&amp; a.filter(x=&gt;e%x ==0).length&lt;=2
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="闭包-closure" tabindex="-1"><a class="header-anchor" href="#闭包-closure" aria-hidden="true">#</a> 闭包 Closure</h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}

//当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：

var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
调用函数f时，才真正计算求和的结果：

f(); // 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在函数 <code>lazy_sum</code> 中又定义了函数 <code>sum</code>，并且，内部函数 <code>sum</code> 可以引用外部函数 <code>lazy_sum</code> 的参数和局部变量，当 <code>lazy_sum</code> 返回函数 <code>sum</code> 时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。</p><p>请再注意一点，当我们调用 <code>lazy_sum()</code> 时，每次调用都会返回一个新的函数，即使传入相同的参数：</p><p>返回闭包时牢记的一点就是：<strong>返回函数不要引用任何循环变量，或者后续会发生变化的变量</strong>。</p><p>如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：</p>`,66),u={href:"https://segmentfault.com/a/1190000018228534",target:"_blank",rel:"noopener noreferrer"},t=n(`<h4 id="_3、闭包的概念" tabindex="-1"><a class="header-anchor" href="#_3、闭包的概念" aria-hidden="true">#</a> 3、闭包的概念</h4><p>各种专业文献的闭包定义都非常抽象，我的理解是: <code>闭包就是能够读取其他函数内部变量的函数</code>。<br> 由于在javascript中，只有函数内部的子函数才能读取局部变量，所以说，<code>闭包可以简单理解成“定义在一个函数内部的函数“</code>。<br> 所以，<code>在本质上，闭包是将函数内部和函数外部连接起来的桥梁</code>。</p><h4 id="_4、闭包的用途" tabindex="-1"><a class="header-anchor" href="#_4、闭包的用途" aria-hidden="true">#</a> 4、闭包的用途</h4><p>闭包可以用在许多地方。它的最大用处有两个，<code>一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在f1调用后被自动清除</code>。</p><p>为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。</p><blockquote><p>脑洞大开</p></blockquote><ul><li><p>只需要用函数，就可以用计算机实现运算 很久很久以前，有个叫阿隆佐·邱奇的帅哥，发现只需要用函数，就可以用计算机实现运算，而不需要 <code>0</code>、<code>1</code>、<code>2</code>、<code>3</code> 这些数字和 <code>+</code>、<code>-</code>、<code>*</code>、<code>/</code> 这些符号。</p><p>JavaScript 支持函数，所以可以用 JavaScript 用函数来写这些计算。来试试：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>zero(f)(x) = x;
one(f)(x) = f(x);
two(f)(x) = one(f)(one(f)(x)) = one(f)(f(x)) = f(f(x));
three(f)(x) = two(f)(one(f)(x)) = two(f)(f(x)) = f(f(f(x)));
...
five(f)(x) = f(f(f(f(f(x)))));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h3><p>箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连 <code>{ ... }</code> 和 <code>return</code> 都省略掉了。还有一种可以包含多条语句，这时候就不能省略 <code>{ ... }</code> 和 <code>return</code>：</p><p>this</p><p>箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的 <code>this</code> 是词法作用域，由上下文确定。</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () =&gt; new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function p(m,b){const a=c("ExternalLinkIcon");return s(),l("div",null,[o,i("p",null,[e("我对闭包的理解 "),i("a",u,[e("https://segmentfault.com/a/1190000018228534"),r(a)]),e(" ，适用于其他编程语言、")]),t])}const h=d(v,[["render",p],["__file","JavaScript 廖雪峰.html.vue"]]);export{h as default};
