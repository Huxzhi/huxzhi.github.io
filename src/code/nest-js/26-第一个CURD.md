---
date: 2023-02-04 17:00
title: 26-第一个CURD
updated: 2023-05-13 22:56
---

来了来了他来了 我们学了这么久的第一个 `CURD`

### 前端 Vue3 ts Element ui  axios

```vue
<template>
    <div class="wraps">
        <div>
            <el-input v-model="search.keyWord" style="width:300px;"></el-input>
            <el-button @click="init" style="margin-left:10px;">搜索</el-button>
            <el-button @click="openDialog" type="primary" style="margin-left:10px;">添加</el-button>
        </div>
        <el-table border :data="tableData" style="width: 100%;margin-top: 30px;">
            <el-table-column prop="name" label="名字" />
            <el-table-column prop="desc" label="描述" />
            <el-table-column prop="id" label="id" />
            <el-table-column>
                <template #default="scope">
                    <el-button @click="edit(scope.row)">编辑</el-button>
                    <el-button @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="changeSize" style="float:right;margin-top:10px;" background layout="prev, pager, next" :total="total" />
    </div>

    <el-dialog v-model="dialogVisible" title="弹框" width="50%">
        <el-form :model="form">
            <el-form-item prop="name" label="名称">
                <el-input v-model="form.name" placeholder="名称" />
            </el-form-item>
            <el-form-item prop="desc" label="描述">
                <el-input v-model="form.desc" placeholder="描述">
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { addUser, updateUser, delUser, getList } from '@/server'
const total = ref<number>(0)
//搜索框
const search = reactive({
    keyWord: "",
    page:1,
    pageSize:10
})
//表单
const form = reactive({
    name: "",
    desc: "",
    id: 0
})
//清空数据
const resetForm = reactive({ ...form })
//表格数据
const tableData = ref([])
//弹框开关
const dialogVisible = ref<boolean>(false)
const openDialog = () => {
    dialogVisible.value = true;
    Object.assign(form, resetForm)
}
//初始化表格数据
const init = async () => {
    const list = await getList(search)
    tableData.value = list?.data ?? []
    total.value = list?.total ?? 0
}
init()
const changeSize = (page) => {
   search.page = page
   init()
}
//保存 和修改 表格数据
const save = async () => {
    if (form.id) {
        await updateUser(form)
    } else {
        await addUser(form)
    }

    close()
    init()
}
//删除表格数据
const deleteRow = async (row) => {
    await delUser({ id: row.id })
    init()
}
//获取 详情
const edit = (row: any) => {
    dialogVisible.value = true;
    Object.assign(form, row)
}
//关闭弹框
const close = () => {
    dialogVisible.value = false;
}
</script>

<style  lang='less'>
* {
    padding: 0;
    margin: 0;
}

html,
body {
    background: #ccc;
}

.wraps {

    height: 100vh;
    padding: 30px;
}
</style>
```

### axios 接口定义

```ts
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const addUser = (data) => axios.post('/user',data).then(res => res.data)

export const getList = (data) => axios.get('/user',{params:data}).then(res => res.data)

export const delUser = (data) => axios.delete(`/user/${data.id}`).then(res => res.data)

export const updateUser = (data) => axios.patch(`/user/${data.id}`,data).then(res => res.data)
```

### 后端 Nestjs

```ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query:{keyWord:string,page:number,pageSize:number}) {
    return this.userService.findAll(query);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
```

### service

1.引入  InjectRepository typeOrm  依赖注入   接受一个实体

2.引入类型  Repository 接受实体 泛型

3.Like 用于模糊查询

4.save 保存   find 查询 update 更新 delete 删除

```ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }
  create(createUserDto: CreateUserDto) {
    const data = new User()
    data.name = createUserDto.name
    data.desc = createUserDto.desc
    return this.user.save(data)
  }

  async findAll(query: { keyWord: string, page: number, pageSize: number }) {
    const data = await this.user.find({
      where: {
        name: Like(`%${query.keyWord}%`)
      },
      order: {
        id: "DESC"
      },
      skip: (query.page - 1)* query.pageSize,
      take:query.pageSize,
    })
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`)
      },
    })
    return {
      data,
      total
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.user.delete(id)
  }
}
```

### Entity

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  desc: string;
}

```

### Module

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './entities/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
```

### DTO

```ts
export class CreateUserDto {
    name:string
    desc:string}
```