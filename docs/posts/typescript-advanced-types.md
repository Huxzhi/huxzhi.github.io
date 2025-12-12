---
title: TypeScript 高级类型技巧与实战
tags: [typescript, javascript, types, programming]
category: 技术向
createTime: 1733497200000
draft: false
---

# TypeScript 高级类型技巧与实战

## 泛型约束（Generic Constraints）

### 基础泛型

```typescript
// 基础泛型函数
function identity<T>(arg: T): T {
  return arg
}

identity<string>('hello') // string
identity<number>(42) // number
```

### 泛型约束

```typescript
// 约束泛型必须有 length 属性
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // ✅ 现在可以访问 length
  return arg
}

logLength('hello') // ✅ string 有 length
logLength([1, 2, 3]) // ✅ array 有 length
logLength({ length: 10 }) // ✅ 符合接口
logLength(42) // ❌ number 没有 length
```

### 使用类型参数

```typescript
// 获取对象属性值
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
}

getProperty(person, 'name') // ✅ 返回 string
getProperty(person, 'age') // ✅ 返回 number
getProperty(person, 'xxx') // ❌ 类型错误
```

## 映射类型（Mapped Types）

### Partial - 所有属性可选

```typescript
interface User {
  id: number
  name: string
  email: string
  age: number
}

// 内置的 Partial 实现
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// 使用场景：更新用户信息
function updateUser(id: number, updates: Partial<User>) {
  // updates 的所有属性都是可选的
}

updateUser(1, { name: 'Bob' }) // ✅
updateUser(1, { age: 25, email: '...' }) // ✅
```

### Required - 所有属性必填

```typescript
type MyRequired<T> = {
  [P in keyof T]-?: T[P] // -? 移除可选修饰符
}

interface Config {
  host?: string
  port?: number
  timeout?: number
}

// 验证配置完整性
function validateConfig(config: Required<Config>) {
  // config 的所有属性都必须存在
  console.log(config.host, config.port, config.timeout)
}

validateConfig({ host: 'localhost', port: 3000 }) // ❌ 缺少 timeout
validateConfig({ host: 'localhost', port: 3000, timeout: 5000 }) // ✅
```

### Pick - 选择属性

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

// 只返回公开信息
type PublicUser = Pick<User, 'id' | 'name' | 'email'>

const user: PublicUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  // ❌ password 和 createdAt 不能包含
}
```

### Omit - 排除属性

```typescript
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 创建用户时不需要 id 和 createdAt
type CreateUserInput = Omit<User, 'id' | 'createdAt'>

const newUser: CreateUserInput = {
  name: 'Bob',
  email: 'bob@example.com',
  password: 'secret',
}
```

## 条件类型（Conditional Types）

### 基础条件类型

```typescript
// T extends U ? X : Y
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
type C = IsString<'hello'> // true
```

### 实战：提取返回类型

```typescript
// 内置的 ReturnType 实现
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never

function greet(): string {
  return 'Hello'
}

function sum(a: number, b: number): number {
  return a + b
}

type GreetReturn = MyReturnType<typeof greet> // string
type SumReturn = MyReturnType<typeof sum> // number
```

### 实战：提取 Promise 类型

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<Promise<number>> // number
type C = UnwrapPromise<boolean> // boolean
```

### 分布式条件类型

```typescript
type ToArray<T> = T extends any ? T[] : never

type A = ToArray<string | number>
// 等同于 string[] | number[]
// 而不是 (string | number)[]

// 实战：过滤类型
type Filter<T, U> = T extends U ? T : never

type Numbers = Filter<string | number | boolean, number> // number
type Strings = Filter<'a' | 'b' | 1 | 2, string> // 'a' | 'b'
```

## 模板字面量类型（Template Literal Types）

### 基础用法

```typescript
type Greeting = `Hello ${string}`

const g1: Greeting = 'Hello World' // ✅
const g2: Greeting = 'Hello TypeScript' // ✅
const g3: Greeting = 'Hi World' // ❌ 必须以 Hello 开头
```

### 实战：生成 CSS 属性

```typescript
type CSSProperty = 'width' | 'height' | 'margin' | 'padding'

type CSSPixelValue = `${CSSProperty}-px`
// 'width-px' | 'height-px' | 'margin-px' | 'padding-px'

type CSSPercentValue = `${CSSProperty}-%`
// 'width-%' | 'height-%' | 'margin-%' | 'padding-%'
```

### 实战：事件处理器

```typescript
type EventName = 'click' | 'focus' | 'blur' | 'change'

type EventHandler = `on${Capitalize<EventName>}`
// 'onClick' | 'onFocus' | 'onBlur' | 'onChange'

interface ButtonProps {
  onClick?: () => void
  onFocus?: () => void
  onBlur?: () => void
}
```

### 实战：生成 REST API 路径

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Resource = 'users' | 'posts' | 'comments'

type APIEndpoint = `/${Resource}` | `/${Resource}/:id`
// '/users' | '/users/:id' | '/posts' | '/posts/:id' | ...

type APIRoute = `${HTTPMethod} ${APIEndpoint}`
// 'GET /users' | 'POST /users' | 'GET /users/:id' | ...
```

## 实战：类型安全的 API 客户端

```typescript
// 定义 API 路由
interface API {
  'GET /users': {
    params: {}
    response: User[]
  }
  'GET /users/:id': {
    params: { id: string }
    response: User
  }
  'POST /users': {
    params: {}
    body: CreateUserInput
    response: User
  }
  'PUT /users/:id': {
    params: { id: string }
    body: Partial<User>
    response: User
  }
  'DELETE /users/:id': {
    params: { id: string }
    response: { success: boolean }
  }
}

// 提取方法和路径
type APIRoute = keyof API
type Method = APIRoute extends `${infer M} ${string}` ? M : never
type Path<R extends APIRoute> = R extends `${Method} ${infer P}` ? P : never

// 类型安全的 fetch 函数
async function apiFetch<R extends APIRoute>(
  route: R,
  options?: {
    params?: API[R] extends { params: infer P } ? P : never
    body?: API[R] extends { body: infer B } ? B : never
  },
): Promise<API[R] extends { response: infer Res } ? Res : never> {
  const [method, path] = route.split(' ')

  // 替换路径参数
  let url = path
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })
  }

  const response = await fetch(url, {
    method,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  return response.json()
}

// 使用：完全类型安全
const users = await apiFetch('GET /users')
// users: User[]

const user = await apiFetch('GET /users/:id', {
  params: { id: '123' },
})
// user: User

const newUser = await apiFetch('POST /users', {
  body: {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret',
  },
})
// newUser: User

// ❌ 类型错误示例
await apiFetch('GET /users/:id') // ❌ 缺少 params
await apiFetch('POST /users') // ❌ 缺少 body
await apiFetch('POST /users', {
  body: { invalidField: 'xxx' }, // ❌ body 类型不匹配
})
```

## 实战：表单验证

```typescript
type Validator<T> = {
  [K in keyof T]: (value: T[K]) => string | undefined
}

interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const validators: Validator<RegisterForm> = {
  username: (value) => {
    if (value.length < 3) return '用户名至少 3 个字符'
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return '只能包含字母、数字、下划线'
  },

  email: (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '邮箱格式不正确'
  },

  password: (value) => {
    if (value.length < 8) return '密码至少 8 个字符'
    if (!/[A-Z]/.test(value)) return '密码必须包含大写字母'
    if (!/[0-9]/.test(value)) return '密码必须包含数字'
  },

  confirmPassword: (value) => {
    // 这里需要访问其他字段，实际使用时需要传入整个表单
    // 这只是示例
    if (value.length === 0) return '请确认密码'
  },
}

function validate<T>(
  data: T,
  validators: Validator<T>,
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {}

  for (const key in validators) {
    const error = validators[key](data[key])
    if (error) {
      errors[key] = error
    }
  }

  return errors
}

// 使用
const formData: RegisterForm = {
  username: 'ab',
  email: 'invalid-email',
  password: 'weak',
  confirmPassword: '',
}

const errors = validate(formData, validators)
// errors: {
//   username: '用户名至少 3 个字符',
//   email: '邮箱格式不正确',
//   password: '密码至少 8 个字符',
//   confirmPassword: '请确认密码'
// }
```

## 总结

TypeScript 高级类型核心技巧：

1. **泛型约束**：`extends` 限制泛型范围
2. **映射类型**：`Partial`、`Required`、`Pick`、`Omit`
3. **条件类型**：`T extends U ? X : Y`，使用 `infer` 提取类型
4. **模板字面量**：动态生成字符串类型
5. **类型体操**：组合以上技巧构建复杂类型

掌握这些技巧，你就能构建出完全类型安全的 API 客户端、表单验证器等工具。
