---
date: 2023-03-26 09:48
updated: 2023-05-13 22:56
---
```js
 //1+2+3
 function add(num1, num2){
     let num = num1 + num2
     if(num2 + 1 > 100){
         return num
     }else{
         return add(num, num2 + 1)
     }
}
 let sum = add(1, 2)
```