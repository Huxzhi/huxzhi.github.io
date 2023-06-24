---
category: react18
date: 2023-03-13 16:59
title: 33-引入icon
updated: 2023-05-13 22:56
---

# 33-引入 icon

引入 FontAwesome

- 安装依赖
  `npm i --save @fortawesome/fontawesome-svg-core`
  `npm i --save @fortawesome/free-solid-svg-icons`
  `npm i --save @fortawesome/free-regular-svg-icons`
  `npm i --save @fortawesome/react-fontawesome@latest`
  或者 `yarn add @fortawesome/react-fontawesome@latest @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg`
- 引入组件
  ` import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";`
- 引入图标
  ` import {faPlus} from "@fortawesome/free-solid-svg-icons";`
- 使用组件
  `<FontAwesomeIcon icon={faPlus}/>`


## 使用icon


```html
<button className={classes.Add}>
    <FontAwesomeIcon icon={faPlus}/>
</button>
```