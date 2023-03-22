const t=JSON.parse('{"key":"v-bd697dba","path":"/code/react/React18/16.a-%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98.html","title":"16.a-事件委托","lang":"zh-CN","frontmatter":{"category":["react18"],"date":"2023-02-27 21:56","title":"16.a-事件委托","updated":"2023-03-20 16:36","description":"什么是事件委托？ 事件委托又称事件代理。是指将自身的事件委托给上级处理。即：子级将事件委托给父级来处理。 实现原理：是基于 Event Flow 中的事件冒泡。当子级成为事件的起源的时候，就会通过事件传播一级一级向上进行冒泡。然后父级监听到该事件后就进行相应的逻辑处理。 应用场景：主要是用在原生 js 中的 dom 的增删改。比如在一个列表中，你需要进行新增行或者删除行。又或者在一个列表中你需要获取选中的行的数据。一般的实现思路是在列表中的每个子级绑定一个方法。该方法如果是获取信息，那就可以直接获取。如果是删除，那就需要获取父级的 dom，然后调用 removeChild 方法来删除节点。这种方法，假如列表中有一万个节点，那么就会注册一万个相同的事件句柄。这显然是不合理的，并且对性能也不太友好。 针对上面频繁创建事件句柄该怎么处理呢？这个时间就用到了事件代理。如果我们把列表中的每个子节点的事件都取消。只给父级绑定一个事件。然后当子节点触发事件后，通过事件冒泡触发父级节点注册的事件，最后执行。此时无论子节点有一万个还是十万个哪怕千万个，也只创建了一个事件句柄。对性能友好。","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/16.a-%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"16.a-事件委托"}],["meta",{"property":"og:description","content":"什么是事件委托？ 事件委托又称事件代理。是指将自身的事件委托给上级处理。即：子级将事件委托给父级来处理。 实现原理：是基于 Event Flow 中的事件冒泡。当子级成为事件的起源的时候，就会通过事件传播一级一级向上进行冒泡。然后父级监听到该事件后就进行相应的逻辑处理。 应用场景：主要是用在原生 js 中的 dom 的增删改。比如在一个列表中，你需要进行新增行或者删除行。又或者在一个列表中你需要获取选中的行的数据。一般的实现思路是在列表中的每个子级绑定一个方法。该方法如果是获取信息，那就可以直接获取。如果是删除，那就需要获取父级的 dom，然后调用 removeChild 方法来删除节点。这种方法，假如列表中有一万个节点，那么就会注册一万个相同的事件句柄。这显然是不合理的，并且对性能也不太友好。 针对上面频繁创建事件句柄该怎么处理呢？这个时间就用到了事件代理。如果我们把列表中的每个子节点的事件都取消。只给父级绑定一个事件。然后当子节点触发事件后，通过事件冒泡触发父级节点注册的事件，最后执行。此时无论子节点有一万个还是十万个哪怕千万个，也只创建了一个事件句柄。对性能友好。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"16.a-事件委托"}],["meta",{"property":"article:published_time","content":"2023-02-27T21:56:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"16.a-事件委托\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"datePublished\\":\\"2023-02-27T21:56:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":1.54,"words":463},"filePathRelative":"code/react/React18/16.a-事件委托.md","localizedDate":"2023年2月27日","excerpt":"<h1> 什么是事件委托？</h1>\\n<figure><figcaption></figcaption></figure>\\n<ul>\\n<li>事件委托又称事件代理。是指将自身的事件委托给上级处理。即：子级将事件委托给父级来处理。</li>\\n<li>实现原理：是基于 <a href=\\"https://juejin.cn/post/7101667955284393992\\" title=\\"https://juejin.cn/post/7101667955284393992\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Event Flow</a> 中的事件冒泡。当子级成为事件的起源的时候，就会通过事件传播一级一级向上进行冒泡。然后父级监听到该事件后就进行相应的逻辑处理。</li>\\n<li>应用场景：主要是用在原生 js 中的 dom 的增删改。比如在一个列表中，你需要进行新增行或者删除行。又或者在一个列表中你需要获取选中的行的数据。一般的实现思路是在列表中的每个子级绑定一个方法。该方法如果是获取信息，那就可以直接获取。如果是删除，那就需要获取父级的 dom，然后调用 removeChild 方法来删除节点。这种方法，假如列表中有一万个节点，那么就会注册一万个相同的事件句柄。这显然是不合理的，并且对性能也不太友好。</li>\\n<li>针对上面频繁创建事件句柄该怎么处理呢？这个时间就用到了事件代理。如果我们把列表中的每个子节点的事件都取消。只给父级绑定一个事件。然后当子节点触发事件后，通过事件冒泡触发父级节点注册的事件，最后执行。此时无论子节点有一万个还是十万个哪怕千万个，也只创建了一个事件句柄。对性能友好。</li>\\n</ul>","copyright":{},"autoDesc":true}');export{t as data};
