---
category: react18
date: 2023-03-17 17:10
title: 42-useCallback
updated: 2023-05-13 22:56
---

# 42-useCallback

## useCallback()
- 参数：
    1. 回调函数
    2. 依赖数组
        - 当依赖数组中的变量发生变化时，回调函数才会重新创建
        - 如果不指定依赖数组，回调函数每次都会重新创建
        - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
            除了（setState）

```jsx
    const [num, setNum] = useState(1);
    const clickHandler = useCallback(() => {
        setCount(prevState => prevState + num);
        setNum(prevState => num + 1);
    }, [num]);
```