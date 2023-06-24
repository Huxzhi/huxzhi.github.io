---
category: react18
date: 2023-03-20 12:48
title: 48c-useMutation函数使用
updated: 2023-05-13 22:56
---

## build 请求的构建器 delStudent

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            delStudent:build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                      // 如果发送的get请求，需要返回一个对象来设置请求的信息
                      url:`students/${id}`,
                      method:'delete'
                    };
                }
            }),
        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});
```

### Mutation 钩子函数命名

钩子函数的命名规则 delStudent --> useDelStudentMutation

```js
export const {
    useDelStudentMutation
} = studentApi;

export default studentApi;
```


## 组件内使用


### 获取删除的钩子，useMutation的钩子返回的是一个数组
数组中有两个东西，第一个是操作的触发器，第二个是结果集

```jsx
const Student = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    // 获取删除的钩子，useMutation的钩子返回的是一个数组
    // 数组中有两个东西，第一个是操作的触发器，第二个是结果集
    const [delStudent, {isSuccess}] = useDelStudentMutation();


    const deleteHandler = () => {
        delStudent(props.stu.id);
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {(!isEdit && !isSuccess) &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>
                    </td>
                </tr>
            }

            {
                isSuccess && <tr>
                    <td colSpan="5">
                        数据已删除！
                    </td>
                </tr>
            }

            {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit}/>}
        </>

    );
};
```


## post/put 请求会自动转json

```js
addStudent:build.mutation({
    query(stu) {
        return {
            url:'students',
            method:'post',
            body:{data:stu}
        }
    }
}),
updateStudent:build.mutation({
   query(stu) {
       return {
         url:`students/${stu.id}`,
         method:'put',
         body:{data:stu.attributes}
       };
   }
}),
```