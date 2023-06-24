---
date: 2023-02-02 21:27
title: 22-decorator自定义装饰器
updated: 2023-05-13 22:56
---

在 Nestjs 中我们使用了大量装饰器 decorator ，所以 Nestjs 也允许我们去自定义装饰器。

### 案例 1 自定义权限装饰器

生成装饰器

```
nest g d [name]
```

```ts
import { SetMetadata } from '@nestjs/common';

export const Role = (role: string[]) => {
    console.log(role,1)
    return SetMetadata('role', role);
}
```

### 案例 2 自定义参数装饰器返回一个 url

```ts
import { SetMetadata,createParamDecorator,ExecutionContext ,applyDecorators } from '@nestjs/common';
import type {Request} from 'express'


export const ReqUrl = createParamDecorator((data:string,ctx:ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest<Request>()
    return req.url
})
```

### 组合装饰器

可以把多个装饰器合并成一个