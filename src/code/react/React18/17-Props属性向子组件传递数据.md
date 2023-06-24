---
category: react18
date: 2023-02-27 21:53
title: 17-Props属性向子组件传递数据
updated: 2023-05-13 22:56
---

在使用组件时，可以通过向组件传递参数的形式来向组件传递数据,组件的参数需要通过属性传递，可以像这样向组件中传递参数

## 在组件间，父组件可以通过 props（属性）向子组件传递数据

在函数组件中，属性就相当于是函数的参数，可以通过参数来访问
可以在函数组件的形参中定义一个 props，props 指向的是一个对象
它包含了父组件中传递的所有参数
console.log(props);

```html
<Button bgColor='red' color='white'>我是一个按钮</Button>
```

上边的案例中我们设置了两个属性，这些属性会被封装到一个对象中并作为参数传递给 Button 组件，只需要在 Button 组件中定义一个参数即可获取，通常这个参数我们会命名为 props，像这样：

```jsx
import './Button.css';
const Button = (props) => {
    return <button style={{backgroundColor:props.bgColor, color:props.color}}>{props.children}</button>;
};
​
export default Button;
```

rops.xxx 来访问外部传递进的属性，从而达到动态设置的目的。需要注意的是，标签体也可以设置为 props 的一个属性，叫做 children，可以通过 props.children 来获取标签体的内容。

## 单向数据流，无法修改

还有一点一定要记住，==props 中的属性是只读属性是无法修改的！==

## 对象数组批量加载

模拟一组从服务器中加载的数据

注意：react 会警告 列表 没有 key，将 index 设置为 key，只是消除了警告，是无效操作，对性能提升没有作用。因为 index 会因为元素位置的改变而改变。起不到 diff 的作用

一般是 传输数据需要自带一个 id 属性

```jsx
logsData.map( (item,index) => <LogItem key={index} date={item.date} desc={item.desc} time={item.time}/>);
```

将数据放入 JSX 中，结构更加简洁

```jsx
// 将数据放入JSX中
const logItemDate = logsData.map(item => <LogItem key={item.id} date={item.date} desc={item.desc} time={item.time}/>);

return <div className="logs">
    {
        logItemDate
        // logsData.map(item => <LogItem {...item}/> )
    }
</div>
```

如果 对象数据和 props 属性名一致

```jsx
logsData.map(item => <LogItem {...item}/>
```