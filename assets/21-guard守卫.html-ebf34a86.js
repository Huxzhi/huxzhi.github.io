const e=JSON.parse('{"key":"v-18c296cf","path":"/code/nest-js/21-guard%E5%AE%88%E5%8D%AB.html","title":"21-guard守卫","lang":"zh-CN","frontmatter":{"date":"2023-02-02 18:52","title":"21-guard守卫","description":"守卫（guard） 守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。 中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。 [!tips] 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。 创建一个守卫","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/nest-js/21-guard%E5%AE%88%E5%8D%AB.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"21-guard守卫"}],["meta",{"property":"og:description","content":"守卫（guard） 守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。 中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。 [!tips] 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。 创建一个守卫"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-03T17:02:37.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"21-guard守卫"}],["meta",{"property":"article:published_time","content":"2023-02-02T18:52:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-03T17:02:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"21-guard守卫\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-02-02T18:52:00.000Z\\",\\"dateModified\\":\\"2023-03-03T17:02:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"创建一个守卫","slug":"创建一个守卫","link":"#创建一个守卫","children":[]},{"level":2,"title":"Controller 使用守卫","slug":"controller-使用守卫","link":"#controller-使用守卫","children":[{"level":3,"title":"使用 UseGuards  控制守卫","slug":"使用-useguards-控制守卫","link":"#使用-useguards-控制守卫","children":[]},{"level":3,"title":"全局守卫","slug":"全局守卫","link":"#全局守卫","children":[]},{"level":3,"title":"针对角色控制守卫","slug":"针对角色控制守卫","link":"#针对角色控制守卫","children":[]}]}],"git":{"createdTime":1677862957000,"updatedTime":1677862957000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.59,"words":478},"filePathRelative":"code/nest-js/21-guard守卫.md","localizedDate":"2023年2月2日","excerpt":"<h1> 守卫（guard）</h1>\\n<p>守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。</p>\\n<p>这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。</p>\\n<p>中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。</p>\\n<blockquote>\\n<p>[!tips]\\n守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。</p>\\n</blockquote>\\n<h2> 创建一个守卫</h2>","copyright":{},"autoDesc":true}');export{e as data};
