---
category: react18
date: 2023-03-14 17:25
title: 37-Too-many-re-renders和React-StrictMode
updated: 2023-05-13 22:56
---

# 37-Too many re-renders

React 组件有部分逻辑都可以直接编写到组件的函数体中的，像是对数组调用 filter、map 等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。

例如，==如果直接将修改 state 的逻辑编写到了组件之中，就会导致组件不断的循环渲染，直至调用次数过多内存溢出。==

在组件每次重新渲染的时候，检查一下商品的总数量，如果数量为 0，则修改 showDetails 为 false

组件每次重新渲染，组件的函数体就会执行，

以下代码会报错 (`Too many re-renders.` )

```jsx
const ctx = useContext(CartContext);

// 添加一个state 设置结账页的显示于隐藏
const [showCheckout, setShowCheckout] = useState( initialState: false);

// 在组件每次重新渲染的时候，检查一下商品的总数量，如果数量为0，则修改showDetails为false
// 组件每次重新渲染，组件的函数体就会执行，
// 以下代码会报错(Too many re-renders. )
if(ctx.totalAmount === 0){
// 购物车已经被清空
 setShowDetails (false);
}
```

## React.StrictMode

编写React组件时，我们要极力的避免组件中出现那些会产生“副作用”的代码。同时，如果你的React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会非常“智能”的去检查你的组件中是否写有副作用的代码，当然这个智能是加了引号的，我们来看看React官网的文档是如何说明的：

Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:

-   Class component `constructor`, `render`, and `shouldComponentUpdate` methods
-   Class component static `getDerivedStateFromProps` method
-   Function component bodies
-   State updater functions (the first argument to `setState`)
-   Functions passed to `useState`, `useMemo`, or `useReducer`

上文的关键字叫做“double-invoking”即重复调用，这句话是什么意思呢？大概意思就是，React并不能自动替你发现副作用，但是它会想办法让它显现出来，从而让你发现它。那么它是怎么让你发现副作用的呢？React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，这些函数会被调用两次：

类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法  
类组件的静态方法 `getDerivedStateFromProps`  
函数组件的函数体  
参数为函数的`setState`  
参数为函数的`useState`, `useMemo`, or `useReducer`

重复的调用会使副作用更容易凸显出来，你可以尝试着在函数组件的函数体中调用一个`console.log`你会发现它会执行两次，如果你的浏览器中安装了React Developer Tools，第二次调用会显示为灰色。

如果你无法通过浏览器正常安装[React Developer Tools](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220512111133423.zip)可以通过点击这里下载。v