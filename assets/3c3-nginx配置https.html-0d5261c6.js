import{_ as n,X as s,Y as a,a2 as e}from"./framework-c2b0d87a.js";const i={},t=e(`<h1 id="nginx配置https" tabindex="-1"><a class="header-anchor" href="#nginx配置https" aria-hidden="true">#</a> nginx配置https</h1><h2 id="下载证书" tabindex="-1"><a class="header-anchor" href="#下载证书" aria-hidden="true">#</a> 下载证书</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>

	<span class="token comment"># SSL configuration</span>
	<span class="token comment">#</span>
	listen <span class="token number">443</span> ssl <span class="token punctuation">;</span>
	listen <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:443 ssl <span class="token punctuation">;</span>

  server_name huxzhi.fun <span class="token punctuation">;</span>
    
    ssl_certificate cert/9405807_huxzhi.fun.pem<span class="token punctuation">;</span>
    ssl_certificate_key cert/9405807_huxzhi.fun.key<span class="token punctuation">;</span>
    
    <span class="token comment"># ...</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="强制开启https" tabindex="-1"><a class="header-anchor" href="#强制开启https" aria-hidden="true">#</a> 强制开启https</h2><p>/etc/nginx/sites-enabled</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
	listen <span class="token number">80</span> <span class="token punctuation">;</span>
	listen <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:80 <span class="token punctuation">;</span>
    
    <span class="token comment"># 匹配所有域名</span>
	server_name _<span class="token punctuation">;</span>
	
	<span class="token builtin class-name">return</span>   <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span><span class="token punctuation">;</span>
	root /var/www<span class="token punctuation">;</span>

	index index.html index.htm index.nginx-debian.html<span class="token punctuation">;</span>
	
	location / <span class="token punctuation">{</span>
		try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ <span class="token operator">=</span><span class="token number">404</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),l=[t];function c(p,d){return s(),a("div",null,l)}const r=n(i,[["render",c],["__file","3c3-nginx配置https.html.vue"]]);export{r as default};
