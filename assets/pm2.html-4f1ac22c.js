import{_ as p,X as o,Y as r,a0 as l,Z as s,$ as a,a1 as e,a3 as t,G as i}from"./framework-7bff9a9e.js";const c="data:image/png;base64,",d="data:image/png;base64,",u="data:image/png;base64,",m="data:image/png;base64,",k={},v=s("h1",{id:"pm2-node-应用进程管理器",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#pm2-node-应用进程管理器","aria-hidden":"true"},"#"),a(" PM2 Node 应用进程管理器")],-1),h=s("p",null,"pm2 是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，因为在工作中遇到服务器重启后，需要一个个去重新启动每个服务，这样不仅繁琐、效率低，而且容易遗忘开启一些服务。",-1),b=t(`<h3 id="pm2-的主要特性" tabindex="-1"><a class="header-anchor" href="#pm2-的主要特性" aria-hidden="true">#</a> PM2 的主要特性</h3><p>内建负载均衡（使用 Node cluster 集群模块） 后台运行 0 秒停机重载 具有 Ubuntu 和 CentOS 的启动脚本 停止不稳定的进程（避免无限循环） 控制台检测 提供 HTTP API 远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 )</p><h2 id="一、安装-目录" tabindex="-1"><a class="header-anchor" href="#一、安装-目录" aria-hidden="true">#</a> 一、安装 &amp; 目录</h2><p>1、运行以下命令进行全局安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> pm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、常用命令" tabindex="-1"><a class="header-anchor" href="#二、常用命令" aria-hidden="true">#</a> 二、常用命令</h2><h3 id="_1、启动命令" tabindex="-1"><a class="header-anchor" href="#_1、启动命令" aria-hidden="true">#</a> 1、启动命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ pm2 start app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动成功后，我们对应可以看到启动的服务的一些信息，如下所示： <img src="`+c+`" alt="" loading="lazy"></p><h3 id="_2、命令行参数" tabindex="-1"><a class="header-anchor" href="#_2、命令行参数" aria-hidden="true">#</a> 2、命令行参数</h3><p>我们可以在最基本的启动命令后面，添加一些参数选项，去满足我们的需求，常用的参数选项如下所示：</p><ul><li><code>--watch</code>：监听应用目录的变化，一旦发生变化，自动重启。</li><li><code>-i</code> or <code>--instance</code>：启用多少个实例，可用于负载均衡，如果 -i 0 或者 -i max，则根据当前机器核数确定实例数目。</li><li><code>--ignore-watch</code>：排除监听的目录或文件，可以是特定的文件名，也可以是正则。</li></ul><p>我们在启动命令后面加入以上的一些参数，完整的启动命令如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 start app.js <span class="token parameter variable">--watch</span> <span class="token parameter variable">-i</span> max <span class="token parameter variable">-n</span> xiaoman
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动成功后的截图如下，我们通过截图可以看到启动的应用名称变为 xiaoman，然后启动 12 个进程，说明我们在启动命令后面添加的参数已经起作用。 <img src="`+d+`" alt="" loading="lazy"></p><h3 id="_3、重启命令" tabindex="-1"><a class="header-anchor" href="#_3、重启命令" aria-hidden="true">#</a> 3、重启命令</h3><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 restart app<span class="token punctuation">.</span>js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、停止命令" tabindex="-1"><a class="header-anchor" href="#_4、停止命令" aria-hidden="true">#</a> 4、停止命令</h3><p>停止特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令停止相应的应用；</p><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 stop app_name <span class="token operator">|</span> app_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果需要停止全部的应用，则使用以下命令：</p><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 stop all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、删除命令" tabindex="-1"><a class="header-anchor" href="#_5、删除命令" aria-hidden="true">#</a> 5、删除命令</h3><p>删除特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令删除相应的应用；</p><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 delete app_name <span class="token operator">|</span> app_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果需要删除全部的应用，则使用以下命令：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>$ pm2 <span class="token keyword">delete</span> <span class="token keyword">all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、查看有哪些进程" tabindex="-1"><a class="header-anchor" href="#_6、查看有哪些进程" aria-hidden="true">#</a> 6、查看有哪些进程</h3><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、配置文件" tabindex="-1"><a class="header-anchor" href="#三、配置文件" aria-hidden="true">#</a> 三、配置文件</h2><p>如果我们使用命令行参数定义一些选项，那么每次启动进程时，都需要敲上一大堆的命令，非常繁琐；所以我们可以使用配置文件来将命令行参数进行配置，配置文件里的配置项跟命令行参数是基本一致的；</p><p>如下所示 pm2 的配置文件 pm2.json ，然后在 package.json 文件中配置启动命令 &quot;pm2&quot;: &quot;pm2 start pm2.json&quot; ，这样我们只需要运行 npm run pm2 就可以使用 pm2 启动我们的 express 项目，并且相关运行参数直接在 pm2.json 中配置好了。</p><p>相关配置项表示的意义在下面文件中都已经注释说明</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;apps&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;express_project&quot;</span><span class="token punctuation">,</span>       <span class="token comment">// 项目名</span>
        <span class="token property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app.js&quot;</span><span class="token punctuation">,</span>              <span class="token comment">// 执行文件</span>
        <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">,</span>                     <span class="token comment">// 根目录</span>
        <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>                      <span class="token comment">// 传递给脚本的参数</span>
        <span class="token property">&quot;interpreter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>               <span class="token comment">// 指定的脚本解释器</span>
        <span class="token property">&quot;interpreter_args&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>          <span class="token comment">// 传递给解释器的参数</span>
        <span class="token property">&quot;watch&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                   <span class="token comment">// 是否监听文件变动然后重启</span>
        <span class="token property">&quot;ignore_watch&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>                <span class="token comment">// 不用监听的文件</span>
            <span class="token string">&quot;node_modules&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;public&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;exec_mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cluster_mode&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 应用启动模式，支持 fork 和 cluster 模式</span>
        <span class="token property">&quot;instances&quot;</span><span class="token operator">:</span> <span class="token string">&quot;max&quot;</span><span class="token punctuation">,</span>              <span class="token comment">// 应用启动实例个数，仅在 cluster 模式有效 默认为 fork</span>
        <span class="token property">&quot;error_file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./logs/app-err.log&quot;</span><span class="token punctuation">,</span>         <span class="token comment">// 错误日志文件</span>
        <span class="token property">&quot;out_file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./logs/app-out.log&quot;</span><span class="token punctuation">,</span>           <span class="token comment">// 正常日志文件</span>
        <span class="token property">&quot;merge_logs&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                         <span class="token comment">// 设置追加日志而不是新建日志</span>
        <span class="token property">&quot;log_date_format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;YYYY-MM-DD HH:mm:ss&quot;</span><span class="token punctuation">,</span>   <span class="token comment">// 指定日志文件的时间格式</span>
        <span class="token property">&quot;min_uptime&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60s&quot;</span><span class="token punctuation">,</span>                        <span class="token comment">// 应用运行少于时间被认为是异常启动</span>
        <span class="token property">&quot;max_restarts&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>                         <span class="token comment">// 最大异常重启次数</span>
        <span class="token property">&quot;autorestart&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                        <span class="token comment">// 默认为 true, 发生异常的情况下自动重启</span>
        <span class="token property">&quot;restart_delay&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60&quot;</span>                       <span class="token comment">// 异常重启情况下，延时重启时间</span>
        <span class="token property">&quot;env&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
           <span class="token property">&quot;NODE_ENV&quot;</span><span class="token operator">:</span> <span class="token string">&quot;production&quot;</span><span class="token punctuation">,</span>                <span class="token comment">// 环境参数，当前指定为生产环境</span>
           <span class="token property">&quot;REMOTE_ADDR&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;env_dev&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;NODE_ENV&quot;</span><span class="token operator">:</span> <span class="token string">&quot;development&quot;</span><span class="token punctuation">,</span>              <span class="token comment">// 环境参数，当前指定为开发环境</span>
            <span class="token property">&quot;REMOTE_ADDR&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;env_test&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                               <span class="token comment">// 环境参数，当前指定为测试环境</span>
            <span class="token property">&quot;NODE_ENV&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;REMOTE_ADDR&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、高阶应用" tabindex="-1"><a class="header-anchor" href="#四、高阶应用" aria-hidden="true">#</a> 四、高阶应用</h2><h3 id="_1、负载均衡" tabindex="-1"><a class="header-anchor" href="#_1、负载均衡" aria-hidden="true">#</a> 1、负载均衡</h3>`,37),g={href:"https://link.juejin.cn/?target=https%3A%2F%2Fpm2.keymetrics.io%2Fdocs%2Fusage%2Fcluster-mode%2F%23automatic-load-balancing",title:"官网章节",target:"_blank",rel:"noopener noreferrer"},q=t(`<div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 start app<span class="token punctuation">.</span>js <span class="token operator">-</span>i <span class="token number">3</span> <span class="token operator">/</span><span class="token operator">/</span> 开启三个进程
$ pm2 start app<span class="token punctuation">.</span>js <span class="token operator">-</span>i max <span class="token operator">/</span><span class="token operator">/</span> 根据机器<span class="token constant">CPU</span>核数，开启对应数目的进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、日志查看" tabindex="-1"><a class="header-anchor" href="#_2、日志查看" aria-hidden="true">#</a> 2、日志查看</h3><p>我们可以通过打开日志文件查看日志外，还可以通过 pm2 logs 来查看实时日志，这点有对于线上问题排查；日志查看命令如下：</p><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>则我们可以在命令窗口实时看到日志输出</p><h3 id="_3、监控" tabindex="-1"><a class="header-anchor" href="#_3、监控" aria-hidden="true">#</a> 3、监控</h3><p>我们可以使用以下命令，查看当前通过 pm2 运行的进程的状态；</p><div class="language-crystal line-numbers-mode" data-ext="crystal"><pre class="language-crystal"><code>$ pm2 monit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>动态监控界面如下所示： <img src="`+m+'" alt="" loading="lazy"></p>',9),_={href:"https://blog.csdn.net/qq1195566313/article/details/123564779",target:"_blank",rel:"noopener noreferrer"};function y(x,f){const n=i("ExternalLinkIcon");return o(),r("div",null,[v,h,l(" more "),b,s("p",null,[a("可以使用 -i 参数配置集群数，实现负载均衡，相关命令如下，可以查看  "),s("a",g,[a("官网章节"),e(n)]),a("；")]),q,s("blockquote",null,[s("p",null,[a("版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 本文链接："),s("a",_,[a("https://blog.csdn.net/qq1195566313/article/details/123564779"),e(n)])])])])}const E=p(k,[["render",y],["__file","pm2.html.vue"]]);export{E as default};