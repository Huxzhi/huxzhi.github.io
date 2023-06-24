---
alias: RTKQ
category: react18
date: 2023-03-19 16:44
title: 48-RTK-Query
updated: 2023-05-13 22:56
---

==RTKQ 给我们提供发送请求的方式（简单封装过的 fetch）==

使用前 需要

1. 创建 Api 切片，要配置好信息，并用 `useGetStudentsQuery()` 导出钩子函数
2. 作为 store 中的一个 reducer 使用
3. `App.js` 调用 `useGetStudentsQuery()` 它会自动向服务器发送请求加载数据，并返回一个对象。这个对象中包括了很多属性：[48b-useQuery函数使用](48b-useQuery函数使用.md)

# 48-RTK-Query

> 当数据库中的数据改变时，RTKQ 可以返回给 RTK，然后再返回给 UI 界面，用户获取及时的信息反馈

RTK 不仅帮助我们解决了 state 的问题，同时，它还为我们提供了 RTK Query 用来帮助我们处理数据加载的问题。
RTK Query 是一个强大的数据获取和缓存工具。在它的帮助下，Web 应用中的加载变得十分简单，它使我们不再需要自己编写获取数据和缓存数据的逻辑。

Web 应用中加载数据时需要处理的问题：

1.  根据不同的加载状态显示不同 UI 组件
2.  减少对相同数据重复发送请求
3.  使用乐观更新，提升用户体验（获取失败不清除原来的数据）
4.  在用户与 UI 交互时，管理缓存的生命周期

这些问题，RTKQ 都可以帮助我们处理。首先，可以直接通过 RTKQ 向服务器发送请求加载数据，并且 RTKQ 会自动对数据进行缓存，避免重复发送不必要的请求。其次，RTKQ 在发送请求时会根据请求不同的状态返回不同的值，我们可以通过这些值来监视请求发送的过程并随时中止。

## 使用

RTKQ 已经集成在了 RTK 中，如果我们已经在项目中引入了 RTK 则无需再引入其余的模块。如果你不想使用 RTKQ 给我们提供的发送请求的方式（简单封装过的 fetch），你还需要引入一下你要使用的发送请求的工具。

### 创建 Api 切片

RTKQ 中将一组相关功能统一封装到一个 Api 对象中，比如：都是学生相关操作统一封装到 StudentApi 中，关于班级的相关操作封装到 ClassApi 中。接下来，我们尝试创建一个简单的 Api，至于数据还是我们之前所熟悉的学生数据：

需要一个对象作为参数

```json
{
reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/"
}),// 指定查询的基础信息，发送请求使用的工具
endpoints(build) {
    // build是请求的构建器，通过build来设置请求的相关信息
    return {
        getStudents:build.query({
            query() {
                // 用来指定请求子路径
                return 'students';
            }
        }),
    };
}// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
}
```

Api 对象创建后，对象中会根据各种方法自动的生成对应的钩子函数,通过这些钩子函数，可以来向服务器发送请求

studentApi.js

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                }
            }),
        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery
} = studentApi;

export default studentApi;

```

上例是一个比较简单的 Api 对象的例子，我们来分析一下，首先我们需要调用`createApi()`来创建 Api 对象。这个方法在 RTK 中存在两个版本，一个位于`@reduxjs/toolkit/dist/query`下，一个位于`@reduxjs/toolkit/dist/query/react`下。react 目录下的版本会自动生成一个钩子，方便我们使用 Api。如果不要钩子，可以引入 query 下的版本，当然我不建议你这么做。

`createApi()` 需要一个配置对象作为参数，配置对象中的属性繁多，我们暂时介绍案例中用到的属性：

- reducerPath
  - 用来设置 reducer 的唯一标识，主要用来在创建 store 时指定 action 的 type 属性，如果不指定默认为 api。
- baseQuery
  - 用来设置发送请求的工具，就是你是用什么发请求，RTKQ 为我们提供了 fetchBaseQuery 作为查询工具，它对 fetch 进行了简单的封装，很方便，如果你不喜欢可以改用其他工具，这里暂时不做讨论。
- fetchBaseQuery
  - 简单封装过的 fetch 调用后会返回一个封装后的工具函数。需要一个配置对象作为参数，baseUrl 表示 Api 请求的基本路径，指定后请求将会以该路径为基本路径。配置对象中其他属性暂不讨论。
- endpoints
  - Api 对象封装了一类功能，比如学生的增删改查，我们会统一封装到一个对象中。一类功能中的每一个具体功能我们可以称它是一个端点。endpoints 用来对请求中的端点进行配置。
  - endpoints 是一个回调函数，可以用普通方法的形式指定，也可以用箭头函数。回调函数中会收到一个 build 对象，使用 build 对象对点进行映射。回调函数的返回值是一个对象，Api 对象中的所有端点都要在该对象中进行配置。

对象中属性名就是要实现的功能名，比如获取所有学生可以命名为 getStudents，根据 id 获取学生可以命名为 getStudentById。属性值要通过 build 对象创建，分两种情况：

- 查询：`build.query({})`
- 增删改：`build.mutation({})`

例如：

```js
getStudents: build.query({
    query() {
        return 'students'
    }
}),
```

先说 query，query 也需要一个配置对象作为参数（又他喵的是配置对象）。配置对象里同样有 n 多个属性，现在直说一个，query 方法。注意不要搞混两个 query，一个是 build 的 query 方法，一个是 query 方法配置对象中的属性，这个方法需要返回一个子路径，这个子路径将会和 baseUrl 拼接为一个完整的请求路径。比如：getStudets 的最终请求地址是:

`http://localhost:1337/api/` + `students` =`http://localhost:1337/api/students`

可算是介绍完了，但是注意了这个只是最基本的配置。RTKQ 功能非常强大，但是配置也比较麻烦。不过，熟了就好了。

上例中，我们创建一个 Api 对象 studentApi，并且在对象中定义了一个 getStudents 方法用来查询所有的学生信息。如果我们使用 react 下的 createApi，则其创建的 Api 对象中会自动生成钩子函数，钩子函数名字为 useXxxQuery 或 useXxxMutation，中间的 Xxx 就是方法名，查询方法的后缀为 Query，修改方法的后缀为 Mutation。所以上例中，Api 对象中会自动生成一个名为 useGetStudentsQuery 的钩子，我们可以获取并将钩子向外部暴露。

```js
export const {useGetStudentsQuery} = studentApi;
```

### 创建 Store 对象

Api 对象的使用有两种方式，一种是直接使用，一种是作为 store 中的一个 reducer 使用。store 是我们比较熟悉的，所以先从 store 入手。

```js
import {configureStore} from "@reduxjs/toolkit";
import {studentApi} from "./studentApi";

export const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware),
});
```

创建 store 并没有什么特别，只是注意需要添加一个中间件，这个中间件已自动生成了我们直接引入即可，中间件用来处理 Api 的缓存。store 创建完毕同样要设置 Provider 标签。

接下来，我们来看看如果通过 studentApi 发送请求。由于我们已经将 studentApi 中的钩子函数向外部导出了，所以我们只需通过钩子函数即可自动加载到所有的学生信息。

比如，现在在 App.js 中加载信息可以这样编写代码：

```jsx
import React from 'react';
import {useGetStudentsQuery} from './store/studentApi';

const App = () => {
    const {data, isFetching, isSuccess} = useGetStudentsQuery();

    return (
        <div>
            {isFetching && <p>数据正在加载...</p>}
            {isSuccess && data.data.map(item => <p key={item.id}>
                {item.attributes.name} --
                {item.attributes.age} --
                {item.attributes.gender} --
                {item.attributes.address}
            </p>)}
        </div>
    );
};

export default App;
```

直接调用 `useGetStudentsQuery()` 它会自动向服务器发送请求加载数据，并返回一个对象。这个对象中包括了很多属性：

1.  data – 最新返回的数据
2.  currentData – 当前的数据
3.  error – 错误信息
4.  isUninitialized – 如果为 true 则表示查询还没开始
5.  isLoading – 为 true 时，表示请求正在第一次加载
6.  isFetching 为 true 时，表示请求正在加载
7.  isSuccess 为 true 时，表示请求发送成功
8.  isError 为 true 时，表示请求有错误
9.  refetch 函数，用来重新加载数据

使用中可以根据需要，选择要获取到的属性值。写了这么多，也只写了一个 Hello World。但是，良好的开端是成功的一半，这个理解了，后边的东西也就简单了！