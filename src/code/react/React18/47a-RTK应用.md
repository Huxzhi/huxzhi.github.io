---
category: react18
date: 2023-03-19 15:10
title: 47a-RTK应用
updated: 2023-05-13 22:56
---

# 47a-RTK 使用

## 在 React 中全局使用 store

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
```

## 执行三步骤

首先要使用 `createSlice` 和 `configureStore` ，创建好资源，见 [47-Redux-Toolkit使用](47-Redux-Toolkit使用.md)

1. react-redux.`useSelector()` 用来加载 state 中的数据
   1. `const {student, school} = useSelector(state => state);`
2. 通过 react-redux.`useDispatch()` 来获取派发器对象
   1. `const dispatch = useDispatch();`
3. 获取 action 的构建器
   1. RTK 会自动创建，通过 `setName('沙和尚')` 返回

```js
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store';

const App = () => {
    // useSelector() 用来加载state中的数据
    const student = useSelector(state => state.student);
    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    // 获取action的构建器
    // RTK会自动创建，通过 setName('沙和尚') 返回

    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>
        </div>
    );
};

export default App;
```