---
alias: Strapi
category: react18
date: 2023-03-22 16:44
title: 43a-Strapi-无头内容管理系统
updated: 2023-05-13 22:56
---

# 43a-Strapi-无头内容管理系统



## 简介

Strapi 是什么？官网是这么描述的“Strapi 是完全使用 JavaScript 开发的，开源无头内容管理系统”，对于第一次接触它的同学会感觉莫名其妙，“无头内容管理系统”，什么玩意？简单来说，Strapi 就是一个 API 的管理系统，通过 Strapi 我们可以直接以网页的形式去定义自己的 API、包括设置模型、权限等功能。有了 Strapi 我们无需编写代码便可开发出功能强大的 API。

## 教程

https://www.lilichao.com/index.php/2022/05/16/strapi/

## 测试

查询功能可以直接通过浏览器测试，查询 API 的路径为`/api/students`使用时还需要添加上服务器的路径即`http://localhost:1337/api/students`，直接在浏览器中访问该地址，如果 API 设置成功，应当可以看到 JSON 格式的数据。

创建需要发送 post 请求，删除需要发送 delete 请求，修改需要发送 put 请求，这些请求可以通过 postman 操作。

创建：