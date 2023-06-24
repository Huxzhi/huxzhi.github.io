---
date: 2023-01-28 16:34
title: 09-session
updated: 2023-05-13 22:56
---

## 引言

session 是服务器 为每个用户的浏览器创建的一个会话对象 这个 session 会记录到 浏览器的 cookie 用来区分用户

我们使用的是 nestjs 默认框架 express 他也支持 express 的插件 所以我们就可以安装 express 的 session

```
npm i express-session --save
```

需要智能提示可以装一个声明依赖

```
npm i @types/express-session -D
```

然后在 main.ts 引入 通过 app.use 注册 session
```js
import * as session from 'express-session'

app.use(session({
    //options...
}))
```
## 参数配置详解

| 参数    | 描述                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------- |
| `secret`  | 生成服务端 session 签名 可以理解为加盐                                                          |
| `name`    | 生成客户端 cookie 的名字 默认 connect.sid                                                       |
| `cookie`  | 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。 |
| `rolling` | 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)                               |

## nestjs 配置

```js
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({ secret: "XiaoMan", name: "xm.session", rolling: true, cookie: { maxAge: null } }))
  await app.listen(3000);
}
bootstrap();
```

> [!NOTE] 面试题
> axios 默认不携带 cookie
> 需要开启 axios.defaults.withCredentials = true