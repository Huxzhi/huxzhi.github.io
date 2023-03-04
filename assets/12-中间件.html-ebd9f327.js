const e=JSON.parse('{"key":"v-2d8f5d6f","path":"/code/nest-js/12-%E4%B8%AD%E9%97%B4%E4%BB%B6.html","title":"12-中间件","lang":"zh-CN","frontmatter":{"date":"2023-01-29 14:45","title":"12-中间件","description":"nestjs 中间件 中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象 中间件函数可以执行以下任务: 执行任何代码。 对请求和响应对象进行更改。 结束请求-响应周期。 调用堆栈中的下一个中间件函数。 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。 1.创建一个依赖注入中间件 要求我们实现 use 函数 返回 req res next 参数 如果不调用 next 程序将被挂起","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/nest-js/12-%E4%B8%AD%E9%97%B4%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"12-中间件"}],["meta",{"property":"og:description","content":"nestjs 中间件 中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象 中间件函数可以执行以下任务: 执行任何代码。 对请求和响应对象进行更改。 结束请求-响应周期。 调用堆栈中的下一个中间件函数。 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。 1.创建一个依赖注入中间件 要求我们实现 use 函数 返回 req res next 参数 如果不调用 next 程序将被挂起"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-03T17:02:37.000Z"}],["meta",{"property":"article:published_time","content":"2023-01-29T14:45:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-03T17:02:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12-中间件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-29T14:45:00.000Z\\",\\"dateModified\\":\\"2023-03-03T17:02:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.创建一个依赖注入中间件","slug":"_1-创建一个依赖注入中间件","link":"#_1-创建一个依赖注入中间件","children":[]},{"level":2,"title":"2.全局中间件","slug":"_2-全局中间件","link":"#_2-全局中间件","children":[]},{"level":2,"title":"3.接入第三方中间件 例如 cors 处理跨域","slug":"_3-接入第三方中间件-例如-cors-处理跨域","link":"#_3-接入第三方中间件-例如-cors-处理跨域","children":[{"level":3,"title":"方法一 启用 app.enableCors()","slug":"方法一-启用-app-enablecors","link":"#方法一-启用-app-enablecors","children":[]},{"level":3,"title":"方法二 cors 插件","slug":"方法二-cors-插件","link":"#方法二-cors-插件","children":[]}]}],"git":{"createdTime":1677862957000,"updatedTime":1677862957000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":2.01,"words":603},"filePathRelative":"code/nest-js/12-中间件.md","localizedDate":"2023年1月29日","excerpt":"<h1> nestjs 中间件</h1>\\n<p>中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象</p>\\n<p>中间件函数可以执行以下任务:</p>\\n<ul>\\n<li>执行任何代码。</li>\\n<li>对请求和响应对象进行更改。</li>\\n<li>结束请求-响应周期。</li>\\n<li>调用堆栈中的下一个中间件函数。</li>\\n<li>如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。</li>\\n</ul>\\n<h2> 1.创建一个依赖注入中间件</h2>\\n<p>要求我们实现 use 函数 返回 req res next 参数 如果不调用 next 程序将被挂起</p>","copyright":{},"autoDesc":true}');export{e as data};
