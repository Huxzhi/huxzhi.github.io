---
date: 2023-01-04 15:57
title: 原生Ajax封装axios
tag: 
  - js/ts  
  - code
updated: 2023-05-13 22:56
---


> [!NOTE] readyState 状态码
> 0 - (未初始化)还没有调用 send()方法  
> 1 - (载入)已调用 send()方法，正在发送请求  
> 2 - (载入完成) send()方法执行完成，已经接收到全部响应内容  
> 3 - (交互)正在解析响应内容  
> 4 - (完成)响应内容解析完成,可以在客户端调用了

```ts
//原生 Ajax 封装 axios

export const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url)

      xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
          JSON.parse(xhr.responseText)
          setTimeout(() => {
            resolve(JSON.parse(xhr.responseText))
          }, 2000)
        }
      }
      xhr.send(null)
    })
  }
}
```
