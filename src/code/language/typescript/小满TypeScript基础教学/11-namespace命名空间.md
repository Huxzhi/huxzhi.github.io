---
date: 2022-12-31 15:53
title: 11-namespace命名空间
updated: 2023-05-13 22:56
---

我们在工作中无法避免全局变量造成的污染，TypeScript 提供了 namespace 避免这个问题出现

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 export 暴露
- 通过 namespace 关键字定义

==TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）==

## 嵌套命名空间

```ts
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
```

## 抽离命名空间

a.ts
```ts
export namespace V {
    export const a = 1
}
```

b.ts
```ts
import {V} from '../observer/index'
 
console.log(V);  //{a:1}
```

## 简化命名空间
```ts
namespace A  {
    export namespace B {
        export const C = 1
    }
}
 
import X = A.B.C
 
console.log(X);
```

## 合并命名空间

重名的命名空间会合并