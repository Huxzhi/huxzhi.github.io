const n=JSON.parse(`{"key":"v-08535218","path":"/code/react/React18/48a-createApi%E5%8F%82%E6%95%B0%E5%AF%B9%E8%B1%A1.html","title":"48a-createApi参数对象","lang":"zh-CN","frontmatter":{"category":["react18"],"date":"2023-03-19 16:45","title":"48a-createApi参数对象","updated":"2023-03-20 16:36","description":"48a-createApi 参数对象 对 RTKQ 中 createApi() 创建的 API 对象 生效 keepUnusedDataFor:60 设置数据缓存的时间，单位秒 默认 60s import {createApi, fetchBaseQuery} from \\"@reduxjs/toolkit/dist/query/react\\"; // 创建Api对象 //createApi() 用来创建RTKQ中的API对象 // RTKQ的所有功能都需要通过该对象来进行 // createApi() 需要一个对象作为参数 const studentApi = createApi({ reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复 baseQuery: fetchBaseQuery({ baseUrl: \\"http://localhost:1337/api/\\" }),// 指定查询的基础信息，发送请求使用的工具 endpoints(build) { // build是请求的构建器，通过build来设置请求的相关信息 return { getStudents:build.query({ query() { // 用来指定请求子路径 return 'students'; }, // transformResponse 用来转换响应数据的格式 transformResponse(baseQueryReturnValue, meta, arg) { return baseQueryReturnValue.data; } }), getStudentById:build.query({ query(id) { //http://localhost:1337/api/students/23 return \`students/\${id}\`; }, transformResponse(baseQueryReturnValue, meta, arg) { return baseQueryReturnValue.data; }, keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s }), }; }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值 }); // Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数 // 通过这些钩子函数，可以来向服务器发送请求 // 钩子函数的命名规则 getStudents --&gt; useGetStudentsQuery export const { useGetStudentsQuery, useGetStudentByIdQuery } = studentApi; export default studentApi;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/48a-createApi%E5%8F%82%E6%95%B0%E5%AF%B9%E8%B1%A1.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"48a-createApi参数对象"}],["meta",{"property":"og:description","content":"48a-createApi 参数对象 对 RTKQ 中 createApi() 创建的 API 对象 生效 keepUnusedDataFor:60 设置数据缓存的时间，单位秒 默认 60s import {createApi, fetchBaseQuery} from \\"@reduxjs/toolkit/dist/query/react\\"; // 创建Api对象 //createApi() 用来创建RTKQ中的API对象 // RTKQ的所有功能都需要通过该对象来进行 // createApi() 需要一个对象作为参数 const studentApi = createApi({ reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复 baseQuery: fetchBaseQuery({ baseUrl: \\"http://localhost:1337/api/\\" }),// 指定查询的基础信息，发送请求使用的工具 endpoints(build) { // build是请求的构建器，通过build来设置请求的相关信息 return { getStudents:build.query({ query() { // 用来指定请求子路径 return 'students'; }, // transformResponse 用来转换响应数据的格式 transformResponse(baseQueryReturnValue, meta, arg) { return baseQueryReturnValue.data; } }), getStudentById:build.query({ query(id) { //http://localhost:1337/api/students/23 return \`students/\${id}\`; }, transformResponse(baseQueryReturnValue, meta, arg) { return baseQueryReturnValue.data; }, keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s }), }; }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值 }); // Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数 // 通过这些钩子函数，可以来向服务器发送请求 // 钩子函数的命名规则 getStudents --&gt; useGetStudentsQuery export const { useGetStudentsQuery, useGetStudentByIdQuery } = studentApi; export default studentApi;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-19T16:45:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"48a-createApi参数对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-19T16:45:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.16,"words":348},"filePathRelative":"code/react/React18/48a-createApi参数对象.md","localizedDate":"2023年3月19日","excerpt":"<h1> 48a-createApi 参数对象</h1>\\n<p>对 RTKQ 中 createApi() 创建的 API 对象 生效</p>\\n<p><code>keepUnusedDataFor:60</code> 设置数据缓存的时间，单位秒 默认 60s</p>\\n<div class=\\"language-jsx line-numbers-mode\\" data-ext=\\"jsx\\"><pre class=\\"language-jsx\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span>createApi<span class=\\"token punctuation\\">,</span> fetchBaseQuery<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\\"@reduxjs/toolkit/dist/query/react\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n\\n<span class=\\"token comment\\">// 创建Api对象</span>\\n<span class=\\"token comment\\">//createApi() 用来创建RTKQ中的API对象</span>\\n<span class=\\"token comment\\">// RTKQ的所有功能都需要通过该对象来进行</span>\\n<span class=\\"token comment\\">// createApi() 需要一个对象作为参数</span>\\n<span class=\\"token keyword\\">const</span> studentApi <span class=\\"token operator\\">=</span> <span class=\\"token function\\">createApi</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token literal-property property\\">reducerPath</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">'studentApi'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token comment\\">// Api的标识，不能和其他的Api或reducer重复</span>\\n    <span class=\\"token literal-property property\\">baseQuery</span><span class=\\"token operator\\">:</span> <span class=\\"token function\\">fetchBaseQuery</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token literal-property property\\">baseUrl</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"http://localhost:1337/api/\\"</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span><span class=\\"token comment\\">// 指定查询的基础信息，发送请求使用的工具</span>\\n    <span class=\\"token function\\">endpoints</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">build</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// build是请求的构建器，通过build来设置请求的相关信息</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token literal-property property\\">getStudents</span><span class=\\"token operator\\">:</span>build<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">query</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token function\\">query</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token comment\\">// 用来指定请求子路径</span>\\n                    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">'students'</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n                <span class=\\"token comment\\">// transformResponse 用来转换响应数据的格式</span>\\n                <span class=\\"token function\\">transformResponse</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">baseQueryReturnValue<span class=\\"token punctuation\\">,</span> meta<span class=\\"token punctuation\\">,</span> arg</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token keyword\\">return</span> baseQueryReturnValue<span class=\\"token punctuation\\">.</span>data<span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token punctuation\\">}</span>\\n            <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n            <span class=\\"token literal-property property\\">getStudentById</span><span class=\\"token operator\\">:</span>build<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">query</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token function\\">query</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">id</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token comment\\">//http://localhost:1337/api/students/23</span>\\n                    <span class=\\"token keyword\\">return</span> <span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">\`</span><span class=\\"token string\\">students/</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">\${</span>id<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token template-punctuation string\\">\`</span></span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n                <span class=\\"token function\\">transformResponse</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">baseQueryReturnValue<span class=\\"token punctuation\\">,</span> meta<span class=\\"token punctuation\\">,</span> arg</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token keyword\\">return</span> baseQueryReturnValue<span class=\\"token punctuation\\">.</span>data<span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n                <span class=\\"token literal-property property\\">keepUnusedDataFor</span><span class=\\"token operator\\">:</span><span class=\\"token number\\">60</span><span class=\\"token punctuation\\">,</span> <span class=\\"token comment\\">// 设置数据缓存的时间，单位秒 默认60s</span>\\n            <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token comment\\">// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数</span>\\n<span class=\\"token comment\\">// 通过这些钩子函数，可以来向服务器发送请求</span>\\n<span class=\\"token comment\\">// 钩子函数的命名规则 getStudents --&gt; useGetStudentsQuery</span>\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span>\\n    useGetStudentsQuery<span class=\\"token punctuation\\">,</span>\\n    useGetStudentByIdQuery\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> studentApi<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> studentApi<span class=\\"token punctuation\\">;</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}`);export{n as data};
