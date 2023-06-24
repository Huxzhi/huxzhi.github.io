---
category: react18
date: 2023-02-18 22:11
title: 13-虚拟DOM
updated: 2023-05-13 22:56
---

在 React 我们操作的元素被称为 React 元素，并不是真正的原生 DOM 元素，

React 通过虚拟 DOM 将 React 元素 和 原生 DOM，进行映射，虽然操作的 React 元素，但是这些操作最终都会在真实 DOM 中体现出来

## 虚拟 DOM 的好处：

1. 降低 API 复杂度
2. 解决兼容问题
3. 提升性能（减少 DOM 的不必要操作）

每当我们调用 root.render()时，页面就会发生重新渲染

React 会通过 diffing 算法，将新的元素和旧的元素进行比较
通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生的变化不予处理

```jsx
//创建一个数据
const data = ['孙悟空', '猪八戒', '沙和尚'];

// 创建列表
const list = <ul>
    {/*data.map(item => <li key={item}>{item}</li>)*/}
    {data.map((item, index) => <li key={index}>{item}</li>)}
</ul>;

// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
// 渲染元素
root.render(list);

document.getElementById('btn').onclick = function (){
    // 重新渲染页面
    //创建一个数据
    const data = ['唐僧', '孙悟空', '猪八戒', '沙和尚'];
    // 创建列表
    const list = <ul>
        {/*data.map(item => <li key={item}>{item}</li>)*/}
        {data.map((item, index) => <li key={index}>{item}</li>)}
    </ul>;
    // 渲染元素
    root.render(list);
};
```

旧数据

```
    ul
        li>孙悟空
        li>猪八戒
        li>沙和尚
```

新数据

```
    ul
        li>孙悟空
        li>猪八戒
        li>沙和尚
```

比较两次数据时，React 会先比较父元素，父元素如果不同，直接所有元素全部替换
父元素一致，在去逐个比较子元素，直到找到所有发生变化的元素为止
上例中，新旧两组数据完全一致，所以没有任何 DOM 对象被修改

## 数组中每一个元素都需要设置一个唯一 key

==当我们在 JSX 中显示数组中，数组中每一个元素都需要设置一个唯一 key，否则控制台会显示红色警告==

重新渲染页面时，React 会按照顺序依次比较对应的元素，当渲染一个列表时如果不指定 key，同样也会按照顺序进行比较，
如果列表的顺序永远不会发生变化，这么做当然没有问题，但是如果列表的顺序会发生变化，这可能会导致性能问题出现

旧数据

```
    ul
        li>孙悟空
        li>猪八戒
        li>沙和尚
```

新数据

```
    ul
        li>唐僧
        li>孙悟空
        li>猪八戒
        li>沙和尚
```

上例中，在列表的最前边插入了一个新元素，其他元素内容并没有发生变化，
但是由于新元素插入到了开始位置，其余元素的位置全都发生变化，而 React 默认是根据位置比较元素。所以 此时，所有元素都会被修改

为了解决这个问题，React 为列表设计了一个 key 属性，
key 的作用相当于 ID，只是无法在页面中查看，当设置 key 以后，再比较元素时，
就会比较相同 key 的元素，而不是按照顺序进行比较
在渲染一个列表时，通常会给列表项设置一个唯一的 key 来避免上述问题
（这个 key 在当前列表中唯一即可）

## 注意：尽量不要使用元素的 index 作为 key

1. 开发中一般会采用数据的 id 作为 key
2. ==尽量不要使用元素的 index 作为 key==  
   索引会跟着元素顺序的改变而改变，所以使用索引做 key 跟没有 key 是一样的。
   唯一的不同就是，控制台的警告没了。
   当元素的顺序不会发生变化时，用索引做 key 也没有什么问题。