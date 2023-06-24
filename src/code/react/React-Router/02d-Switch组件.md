---
category: 
  - react18
  - react-router-v5
date: 2023-03-21 22:28
title: 02d-Switch组件
updated: 2023-05-13 22:56
---

# 02d-Switch 组件

## Switch 组件

Switch 组件是 Route 组件的外部容器，可以将 Route 组件放入到 Switch 组件中。放入 Switch 组件中后，匹配路径时会自动自上向下对 Route 进行匹配，如果匹配到则挂载组件，并且一个 Switch 中只会有一个 Route 被挂载。如果将 Route 组件单独使用，那么所有的路径匹配的 Route 中的组件都会被挂载。

```jsx
//App.js
function App() {
    return (
        <div className="App">
            <Menu/>
            {/*
                可以将Route统一放到一个Switch中，
                    一个Switch中只会有一个路由显示
            */}
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about">
                    <About/>
                </Route>

                <Route path="*">
                    <div>路径错误</div>
                </Route>
            </Switch>
        </div>

    );
}

export default App;

```