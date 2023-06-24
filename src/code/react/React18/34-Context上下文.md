---
category: react18
date: 2023-03-13 18:29
title: 34-Context上下文
updated: 2023-05-13 22:56
---

# 34-Context 上下文

Context 相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，这样无需通过 props 逐层传递，即可使组件访问到这些数据

==当我们通过 Context 访问数据时，他会读取离他最近的 Provider 中的数据==，如果没有 Provider，则读取 Context 中的默认数据

## 创建 context

src/store/
通过 `React.createContext()` 创建 `context`

```jsx
import React from 'react';

const TestContext = React.createContext({
    name:'孙悟空',
    age:18
});

export default TestContext;
```

## 使用方式一：回调函数

1. 引入 context
2. 使用 `Xxx.Consumer` 组件来创建元素，生产者和消费者模式

### Consumer 消费者

Consumer 的标签体需要一个回调函数
它会将 context 设置为回调函数的参数，通过参数就可以访问到 context 中存储的数据

```jsx
import React from 'react';
import TestContext from "../store/testContext";

const A = () => {
    return (
        <TestContext.Consumer>
            {(ctx)=>{
               return <div>
                   {ctx.name} - {ctx.age}
               </div>
            }}
        </TestContext.Consumer>
    );
};

export default A;

```

### Provider 生产者

`Xxx.Provider` - 表示数据的生产者，可以使用它来指定 Context 中的数据 - 通过 value 来指定 Context 中存储的数据，
这样一来，在该组件的 **所有的子组件中** 都可以通过 Context 来访问它所指定数据
==当我们通过 Context 访问数据时，他会读取离他最近的 Provider 中的数据==，如果没有 Provider，则读取 Context 中的默认数据

## 使用方式二：useContext()

1. 导入 Context
2. 使用钩子函数 useContext() 获取到 context
   useContext() 需要一个 Context 作为参数
   它会将 Context 中数据获取并作为返回值返回

```jsx
const B = () => {

    // 使用钩子函数获取Context
    const ctx = useContext(TestContext);

    return (
        <div>
            {ctx.name} -- {ctx.age}
        </div>
    );
};

export default B;
```