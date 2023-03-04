import{_ as n,X as s,Y as a,a2 as p}from"./framework-c2b0d87a.js";const t={},e=p(`<h1 id="demo-自动化测试" tabindex="-1"><a class="header-anchor" href="#demo-自动化测试" aria-hidden="true">#</a> demo 自动化测试</h1><p>今天介绍一个 npm 包  Puppeteer</p><p>他的功能有很多</p><ul><li>支持分布式爬取</li><li>实现了深度优先和广度优先算法</li><li>支持 csv 和 json line 格式导出</li><li>插件式的结果存储，比如支持 redis</li><li>自动插入 jquery，可以使用 jquery 语法进行结果处理</li><li>支持截图作为爬取证据</li><li>支持模拟不同的设备</li></ul><p>今天我们来实现一个 demo 自动化测试</p><p>首先需要安装一下   <code>Puppeteer</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token function">pnpm</span> <span class="token parameter variable">-g</span> //装过可以忽略
<span class="token function">pnpm</span> <span class="token function">add</span> puppeteer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>他的包很大 100MB 应为他带了 Chromium</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> puppeteer <span class="token keyword">from</span> <span class="token string">&quot;puppeteer&quot;</span>

<span class="token comment">//延迟函数</span>
<span class="token keyword">const</span> <span class="token function-variable function">sleep</span> <span class="token operator">=</span> <span class="token punctuation">(</span>time<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> j<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">r</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//通过 launch 生成一个’浏览器‘实例,</span>
    <span class="token comment">//option 中的 headless 是个布尔值，如果是 false 的话你就会看到一个浏览器从打开，到完成     //你整个任务的全过程，</span>
    <span class="token comment">//默认是 true，也就是在后台自动完成你的任务</span>
    <span class="token keyword">const</span> browser <span class="token operator">=</span> <span class="token keyword">await</span> puppeteer<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        headless<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        defaultViewport<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        args<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;--start-maximized&#39;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
     <span class="token comment">//打开一个新的标签页</span>
    <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token keyword">await</span> browser<span class="token punctuation">.</span><span class="token function">newPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token comment">//跳转到对应的页面</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span><span class="token string">&#39;https://jd.com&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//获取搜索框的元素</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#key&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//聚焦</span>
    <span class="token keyword">await</span> key<span class="token operator">?.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">//搜索东西</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span>keyboard<span class="token punctuation">.</span><span class="token function">sendCharacter</span><span class="token punctuation">(</span><span class="token string">&#39;iphone13&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//点击搜索按钮</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//延迟一秒钟</span>
    <span class="token keyword">await</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
     <span class="token comment">//等待元素加载完成</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">waitForSelector</span><span class="token punctuation">(</span><span class="token string">&#39;.gl-item&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//开始自动滚动为了截图全屏有数据</span>
    <span class="token keyword">let</span> scrollEnable<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> scrollStep<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">500</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>scrollEnable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scrollEnable <span class="token operator">=</span> <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">(</span>scrollStep<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> scrollTop<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> document<span class="token punctuation">.</span>scrollingElement<span class="token operator">?.</span>scrollTop <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">;</span>
            document<span class="token punctuation">.</span>scrollingElement<span class="token operator">!</span><span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> scrollTop <span class="token operator">+</span> scrollStep<span class="token punctuation">;</span>
            <span class="token keyword">return</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight <span class="token operator">&gt;</span> scrollTop <span class="token operator">+</span> <span class="token number">1080</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> scrollStep<span class="token punctuation">)</span>
        <span class="token comment">//防止滚动过快</span>
        <span class="token keyword">await</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
     <span class="token comment">//截图全屏</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">screenshot</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">iphone13.png</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>fullPage<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>puppeteer 截的图</p>`,10),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","05-自动化UI测试.html.vue"]]);export{r as default};
