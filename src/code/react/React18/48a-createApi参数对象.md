---
category: react18
date: 2023-03-19 16:45
title: 48a-createApi参数对象
updated: 2023-05-13 22:56
---

# 48a-createApi 参数对象

对 RTKQ 中 createApi() 创建的 API 对象 生效

`keepUnusedDataFor:60` 设置数据缓存的时间，单位秒 默认 60s

```jsx
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
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                }
            }),
            getStudentById:build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery
} = studentApi;

export default studentApi;

```