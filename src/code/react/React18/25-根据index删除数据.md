---
category: react18
date: 2023-03-11 15:43
title: 25-根据index删除数据
updated: 2023-05-13 22:56
---

# 25-根据 index 删除数据

## 渲染新数组

删除当前的 item，要删除 item，其实就是要从数据的 state 移除指定的数据

```jsx
// 定义一个函数，从数据中删除一条日志
const delLogByIndex = (index) => {
    setLogsData(prevState => {
        const newLog = [...prevState];
        newLog.splice(index, 1);
        return newLog;
    });
};

return <div className="app">
    {/*引入LogsFrom*/}
    <LogsForm onSaveLog={saveLogHandler}/>
    <Logs logsData={logsData} onDelLog={delLogByIndex}/>
</div>;
```

通过 `props.onDelLog(index)` ，将 索引 作参数传递给删除函数

```jsx
// 将数据放入JSX中
const logItemData = props.logsData.map((item, index) => <LogItem
    //用了闭包 ()=>props.onDelLog(index)
    onDelLog={()=>props.onDelLog(index)}
    key={item.id}
    date={item.date}
    desc={item.desc}
    time={item.time}/>);

return <Card className="logs">
    {
        logItemData
    }
</Card>
```

直接将 ==带 index 参数的的删除函数== 作为一个闭包函数，传递给子组件，子组件调用闭包即可

## 数据为空后，显示新

判断数组是否含有数据，需要用 length 判断

```js
const arry=[] // 为true
arry.length === 0 // 为 true
```