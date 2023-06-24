---
date: 2023-03-05 14:36
title: 3c3-nginx配置https
updated: 2023-05-13 22:56
---

# nginx配置https

## 下载证书

```sh
server {

	# SSL configuration
	#
	listen 443 ssl ;
	listen [::]:443 ssl ;

  server_name huxzhi.fun ;
    
    ssl_certificate cert/9405807_huxzhi.fun.pem;
    ssl_certificate_key cert/9405807_huxzhi.fun.key;
    
    # ...

```

## 强制开启https

/etc/nginx/sites-enabled
```sh
server {
	listen 80 ;
	listen [::]:80 ;
    
    # 匹配所有域名
	server_name _;
	
	return   301 https://$host$request_uri;
	root /var/www;

	index index.html index.htm index.nginx-debian.html;
	
	location / {
		try_files $uri $uri/ =404;
	}

```