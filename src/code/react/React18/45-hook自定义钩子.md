---
category: react18
date: 2023-03-18 15:41
title: 45-hook自定义钩子
updated: 2023-05-08 09:06
---

# 45-hook 自定义钩子

React 中的钩子函数只能在函数组件或自定钩子中调用

当我们需要将 React 中钩子函数提取到一个公共区域时，就可以使用自定义钩子

自定义钩子其实就是一个普通函数，只是它的名字需要使用 use 开头

就是==将创建好的变量和函数 返回给调用者，就不用重复编写了==

## useFetch

```js
import {useCallback, useState} from "react";

// reqObj 用来存储请求的参数
/*
*   {
*       url 请求的地址
*       method 请求方法
*
*   }
*
* cb 回调函数，请求发送成功后执行
* */
export default function useFetch(reqObj, cb) {
    const [data, setData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/'+reqObj.url, {
                method:reqObj.method || 'get',
                headers:{
                    "Content-type":"application/json"
                },
                body:body?JSON.stringify({data:body}):null,

            });
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
                cb && cb();
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


    // 设置返回值
    return {
        loading,
        error,
        data,
        fetchData
    };
}



```

就是将创建好的变量和函数 返回给调用者

## 代码编写巧思

回调函数存在即执行，没有就忽略

```js
cb && cb();
```

Json 存在参数就放进去，不存在就忽略

```js
body:body?JSON.stringify({data:body}):null,
```