---
category: 
  - react18
  - react-router-v5
date: 2023-03-21 23:11
title: 02e-Prompt组件
updated: 2023-05-13 22:56
---

# 02e-Prompt组件



# Prompt 组件

prompt 组件可以在用户离开页面前弹出提示。二次确认

属性：

1. message 字符串/函数，设置离开前显示的提示信息
2. when 布尔值，设置是否显示提示
```jsx
const MyForm = () => {

    const [isPrompt, setIsPrompt] = useState(false);

    return (
        <div>
            <Prompt
                when={isPrompt}
                message={"将要离开页面！确认吗？"}/>
            <h2>表单</h2>
            <input
                type="text"
                onChange={e => setIsPrompt(e.target.value.trim().length !== 0)}
            />
        </div>
    );
};

export default MyForm;
```