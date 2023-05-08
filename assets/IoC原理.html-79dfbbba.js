const n=JSON.parse('{"key":"v-edc61ada","path":"/code/java-spring/IoC%E5%8E%9F%E7%90%86.html","title":"IoC原理","lang":"zh-CN","frontmatter":{"title":"IoC原理","date":"2021-09-22 22:16","updated":"2023-05-08 09:12","description":"注入配置 Spring容器还提供了一个更简单的@PropertySource来自动读取配置文件。我们只需要在@Configuration配置类上再添加一个注解： @Configuration @ComponentScan @PropertySource(\\"app.properties\\") // 表示读取classpath的app.properties public class AppConfig { @Value(\\"${app.zone:Z}\\") String zoneId; @Bean ZoneId createZoneId() { return ZoneId.of(zoneId); } }","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/java-spring/IoC%E5%8E%9F%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"IoC原理"}],["meta",{"property":"og:description","content":"注入配置 Spring容器还提供了一个更简单的@PropertySource来自动读取配置文件。我们只需要在@Configuration配置类上再添加一个注解： @Configuration @ComponentScan @PropertySource(\\"app.properties\\") // 表示读取classpath的app.properties public class AppConfig { @Value(\\"${app.zone:Z}\\") String zoneId; @Bean ZoneId createZoneId() { return ZoneId.of(zoneId); } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T02:14:57.000Z"}],["meta",{"property":"article:published_time","content":"2021-09-22T22:16:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T02:14:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IoC原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-09-22T22:16:00.000Z\\",\\"dateModified\\":\\"2023-05-08T02:14:57.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1677924451000,"updatedTime":1683512097000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":3}]},"readingTime":{"minutes":0.68,"words":205},"filePathRelative":"code/java-spring/IoC原理.md","localizedDate":"2021年9月22日","excerpt":"<h1> 注入配置</h1>\\n<p>Spring容器还提供了一个更简单的<code>@PropertySource</code>来自动读取配置文件。我们只需要在<code>@Configuration</code>配置类上再添加一个注解：</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Configuration</span>\\n<span class=\\"token annotation punctuation\\">@ComponentScan</span>\\n<span class=\\"token annotation punctuation\\">@PropertySource</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"app.properties\\"</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 表示读取classpath的app.properties</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">AppConfig</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Value</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"${app.zone:Z}\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token class-name\\">String</span> zoneId<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Bean</span>\\n    <span class=\\"token class-name\\">ZoneId</span> <span class=\\"token function\\">createZoneId</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">ZoneId</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span>zoneId<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{},"autoDesc":true}');export{n as data};
