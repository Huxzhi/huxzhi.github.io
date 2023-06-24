---
category: react18
date: 2023-03-22 16:36
title: 1b-使用redux保存状态信息
updated: 2023-05-13 22:56
---

# 01b-使用 redux 保存状态信息

## reduxjs/toolkit 工具

```jsx
import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLogged:false,
        token:null,
        user:null
    },
    reducers:{
        login(state, action){
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state, action){
            state.isLogged = false;
            state.token = null;
            state.user = null;
        }
    }
});

export const {
    login,
    logout} = authSlice.actions;

```