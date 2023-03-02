import{_ as p,W as e,X as o,Y as n,Z as s,a0 as t,a2 as c,y as l}from"./framework-cbb69da9.js";const i="/assets/image-2023-01-11_19-04-39-194-43-webpack构建Vue3项目-dc671fb0.png",r="/assets/image-2023-01-11_21-20-12-662-43-webpack构建Vue3项目-2fa57a14.png",u="/assets/image-2023-01-11_21-22-00-941-43-webpack构建Vue3项目-e2923f3a.png",k="/assets/image-2023-01-11_21-22-20-824-43-webpack构建Vue3项目-e3659a1a.png",d={},v=n("p",null,[n("strong",null,"为什么要手写 webpack 不用 cli （脑子有病）并不是 其实是为了加深我们对 webpack 的了解方便以后灵活运用 webpack 的技术")],-1),m={href:"https://github.com/Huxzhi",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/Huxzhi/webpack-vue-demo",target:"_blank",rel:"noopener noreferrer"},q=c('<h3 id="_1-初始化项目结构-跟-cli-结构保持一致" tabindex="-1"><a class="header-anchor" href="#_1-初始化项目结构-跟-cli-结构保持一致" aria-hidden="true">#</a> 1. 初始化项目结构（跟 cli 结构保持一致）</h3><figure><img src="'+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-安装所需要的依赖包" tabindex="-1"><a class="header-anchor" href="#_2-安装所需要的依赖包" aria-hidden="true">#</a> 2. 安装所需要的依赖包</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack-vue&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack.config.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack-dev-server&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;license&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ISC&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@vue/compiler-sfc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.38&quot;</span><span class="token punctuation">,</span> <span class="token comment">//解析vue文件</span>
        <span class="token property">&quot;clean-webpack-plugin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span><span class="token punctuation">,</span> <span class="token comment">//打包 的时候清空dist</span>
        <span class="token property">&quot;css-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^6.7.1&quot;</span><span class="token punctuation">,</span> <span class="token comment">//处理css文件</span>
        <span class="token property">&quot;friendly-errors-webpack-plugin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.7.0&quot;</span><span class="token punctuation">,</span> <span class="token comment">//美化dev</span>
        <span class="token property">&quot;html-webpack-plugin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.5.0&quot;</span><span class="token punctuation">,</span> <span class="token comment">//html 模板</span>
        <span class="token property">&quot;less&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.1.3&quot;</span><span class="token punctuation">,</span>  <span class="token comment">//处理less</span>
        <span class="token property">&quot;less-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^11.0.0&quot;</span><span class="token punctuation">,</span> <span class="token comment">//处理less文件</span>
        <span class="token property">&quot;style-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.3.1&quot;</span><span class="token punctuation">,</span> <span class="token comment">//处理style样式</span>
        <span class="token property">&quot;ts-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^9.3.1&quot;</span><span class="token punctuation">,</span> <span class="token comment">//处理ts</span>
        <span class="token property">&quot;typescript&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.8.2&quot;</span><span class="token punctuation">,</span> <span class="token comment">//ts</span>
        <span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.38&quot;</span><span class="token punctuation">,</span> <span class="token comment">//vue</span>
        <span class="token property">&quot;vue-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^17.0.0&quot;</span><span class="token punctuation">,</span> <span class="token comment">//解析vue</span>
        <span class="token property">&quot;webpack&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.74.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;webpack-cli&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.10.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;webpack-dev-server&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.10.0&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-tsc-init-生成-ts-文件-如果没有-tsc-安装-npm-install-typescript-g" tabindex="-1"><a class="header-anchor" href="#_3-tsc-init-生成-ts-文件-如果没有-tsc-安装-npm-install-typescript-g" aria-hidden="true">#</a> 3. tsc --init 生成 ts 文件 如果没有 tsc 安装 npm install typescript -g</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esnext&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esnext&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;strict&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;jsx&quot;</span><span class="token operator">:</span> <span class="token string">&quot;preserve&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;importHelpers&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;moduleResolution&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;skipLibCheck&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;esModuleInterop&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;allowSyntheticDefaultImports&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;sourceMap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;baseUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;paths&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;@/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;src/*&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;lib&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;esnext&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;dom&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;dom.iterable&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;scripthost&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;include&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;src/**/*.ts&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;src/**/*.tsx&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;src/**/*.vue&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;tests/**/*.ts&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;tests/**/*.tsx&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;exclude&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;node_modules&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置-vue-声明文件不然-ts-识别不了-vue-后缀" tabindex="-1"><a class="header-anchor" href="#_4-配置-vue-声明文件不然-ts-识别不了-vue-后缀" aria-hidden="true">#</a> 4. 配置 vue 声明文件不然 ts 识别不了 vue 后缀</h3><blockquote><p>现在不写也没事</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&quot;*.vue&quot;</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span> DefineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
    <span class="token keyword">const</span> component<span class="token operator">:</span> DefineComponent<span class="token operator">&lt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> component
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-编写-webpack-config-js" tabindex="-1"><a class="header-anchor" href="#_5-编写-webpack-config-js" aria-hidden="true">#</a> 5. 编写 webpack config  js</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> htmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> VueLoaderPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vue-loader/dist/index&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> FriendlyErrorsWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;friendly-errors-webpack-plugin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span> //配置智能提示
 */</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;development&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.ts&#39;</span><span class="token punctuation">,</span> <span class="token comment">//入口文件</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&quot;[hash].js&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//出口文件</span>
        <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//代替plugins: [new CleanWebpackPlugin(),] //打包清空dist</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//解析vue 模板</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">&quot;vue-loader&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//解析 less</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;style-loader&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;css-loader&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;less-loader&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//解析css</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;style-loader&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;css-loader&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.ts$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//解析ts</span>
                <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;ts-loader&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">configFile</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;tsconfig.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">appendTsSuffixTo</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">htmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&quot;./public/index.html&quot;</span> <span class="token comment">//html模板</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token keyword">new</span> <span class="token class-name">VueLoaderPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//解析vue</span>
        <span class="token keyword">new</span> <span class="token class-name">FriendlyErrorsWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">compilationSuccessInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">//美化样式</span>
                <span class="token literal-property property">messages</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;You application is running here http://localhost:9001&#39;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;@&quot;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./src&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 别名</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.tsx&#39;</span><span class="token punctuation">]</span> <span class="token comment">//识别后缀</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">stats</span><span class="token operator">:</span> <span class="token string">&quot;errors-only&quot;</span><span class="token punctuation">,</span> <span class="token comment">//取消提示</span>
    <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">9001</span><span class="token punctuation">,</span>
        <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token string">&quot;Vue&quot;</span> <span class="token comment">//CDN 引入</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>


module<span class="token punctuation">.</span>exports <span class="token operator">=</span> config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-看效果" tabindex="-1"><a class="header-anchor" href="#_6-看效果" aria-hidden="true">#</a> 6. 看效果</h3><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',15);function g(y,h){const a=l("ExternalLinkIcon");return e(),o("div",null,[v,n("blockquote",null,[n("p",null,[s("示例 "),n("a",m,[s("Huxzhi"),t(a)]),s("/"),n("a",b,[s("webpack-vue-demo"),t(a)])])]),q])}const x=p(d,[["render",g],["__file","43-webpack构建Vue3项目.html.vue"]]);export{x as default};
