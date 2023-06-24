---
category: react18
date: 2023-03-18 09:34
title: 43-fetch发送请求
updated: 2023-05-13 22:56
---

# 43-fetch 发送请求

组件初始化时需要向服务器发送请求来加载数据

fetch() 用来向服务器发送请求加载数据，是 Ajax 的升级版
它需要两个参数：1.请求地址 2.请求信息

```jsx
const App = () => {

    const [stuData, setStuData] = useState([]);

    useEffect(() => {
        // 在effect中加载数据
        fetch('http://localhost:1337/api/students')
            .then((res) => {
                return res.json();// 该方法可以将响应的json直接转换为js对象
            })
            .then(data => {
                // 将加载到的数据设置到state中
                setStuData(data.data);
            })
            .catch(() => {
            });

    }, []);

    return (
        <div className="app">
            <StudentList stus={stuData}/>
        </div>
    );
};

export default App;
```

fetch 需要两个 `then()`

`res.json()` 方法是返回一个 `promise` ，并且里面 resolve 是值，所以只能再次 `then` 才能用到这个 `.json` 返回的对象

## 处理错误

catch中的回调函数，用来统一处理错误

```jsx
import React, {useEffect, useState} from 'react';
import StudentList from "./components/StudentList";
import './App.css';


const App = () => {

    const [stuData, setStuData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    /*
    *   将写死的数据替换为从接口 http://localhost:1337/api/students
    *       中加载的数据
    *
    *   组件初始化时需要向服务器发送请求来加载数据
    * */
    useEffect(() => {
        //设置loading为true
        setLoading(true);
        // 重置错误
        setError(null);

        // 在effect中加载数据
        // fetch() 用来向服务器发送请求加载数据，是Ajax的升级版
        // 它需要两个参数：1.请求地址 2.请求信息
        fetch('http://localhost:1337/api/students')
            .then((res) => {
                // 判断是否正常返回响应信息
                if(res.ok){
                    // response表示响应信息
                    // console.log(res);
                    return res.json();// 该方法可以将响应的json直接转换为js对象
                }

                // 抛出一个错误
                throw new Error('数据加载失败！');
            })
            .then(data => {
                // 将加载到的数据设置到state中
                setStuData(data.data);

                // 数据加载完毕设置loading为false
                setLoading(false);
            })
            .catch((e) => {
                // catch中的回调函数，用来统一处理错误
                // catch一执行，说明上述代码出错了
                // 代码运行到这里，说明没有成功加载到数据
                setLoading(false);
                // 设置错误状态
                setError(e);
            });

    }, []);

    return (
        <div className="app">
            {(!loading && !error) && <StudentList stus={stuData}/>}
            {loading && <p>数据正在加载中...</p>}
            {error && <p>数据加载异常！</p>}
        </div>
    );
};

export default App;

```

## 其他类型请求

发送其他类型请求时，除了要指定请求地址外，还要传递第二个参数来设置请求的信息：

```js
fetch(resource, init)
```

init对象就是用来设置请求信息的，常用的属性有method用来设置请求方法，headers用来设置请求头，body用来设置请求体。

例子：

发送delete请求：

```js
fetch('http://localhost:1337/api/students/3',{  
        method:'delete'  
    })  
        .then(  
            res => res.json())  
        .then(  
            data => console.log(data))  
        .catch(err => console.log(err));  
};
```

发送post请求：

```js
fetch('http://localhost:1337/api/students', {  
    method: 'post',  
    headers: {  
        "Content-Type": 'application/json'  
    },  
    body: JSON.stringify({  
        data: {  
            name: '沙和尚',  
            age: 38,  
            gender: '男',  
            address: '流沙河'  
        }  
    })  
})  
    .then(  
        res => res.json())  
    .then(  
        data => console.log(data))  
    .catch(err => console.log(err));
```

发送put请求：

```js
fetch('http://localhost:1337/api/students/5', {
    method: 'put',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        data: {
            age: 48,
        }
    })
})
    .then(
        res => res.json())
    .then(
        data => console.log(data))
    .catch(err => console.log(err));
```