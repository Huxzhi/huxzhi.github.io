const e=JSON.parse('{"key":"v-60303e99","path":"/code/react/React18/13-%E8%99%9A%E6%8B%9FDOM.html","title":"","lang":"zh-CN","frontmatter":{"date":"2023-03-20 16:35","updated":"2023-03-20 16:36","description":"在 React 我们操作的元素被称为 React 元素，并不是真正的原生 DOM 元素， React 通过虚拟 DOM 将 React 元素 和 原生 DOM，进行映射，虽然操作的 React 元素，但是这些操作最终都会在真实 DOM 中体现出来 虚拟 DOM 的好处： 降低 API 复杂度 解决兼容问题 提升性能（减少 DOM 的不必要操作） 每当我们调用 root.render()时，页面就会发生重新渲染 React 会通过 diffing 算法，将新的元素和旧的元素进行比较 通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生的变化不予处理","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/13-%E8%99%9A%E6%8B%9FDOM.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:description","content":"在 React 我们操作的元素被称为 React 元素，并不是真正的原生 DOM 元素， React 通过虚拟 DOM 将 React 元素 和 原生 DOM，进行映射，虽然操作的 React 元素，但是这些操作最终都会在真实 DOM 中体现出来 虚拟 DOM 的好处： 降低 API 复杂度 解决兼容问题 提升性能（减少 DOM 的不必要操作） 每当我们调用 root.render()时，页面就会发生重新渲染 React 会通过 diffing 算法，将新的元素和旧的元素进行比较 通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生的变化不予处理"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T16:11:07.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-20T16:35:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T16:11:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-20T16:35:00.000Z\\",\\"dateModified\\":\\"2023-03-22T16:11:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"虚拟 DOM 的好处：","slug":"虚拟-dom-的好处","link":"#虚拟-dom-的好处","children":[]},{"level":2,"title":"数组中每一个元素都需要设置一个唯一 key","slug":"数组中每一个元素都需要设置一个唯一-key","link":"#数组中每一个元素都需要设置一个唯一-key","children":[]},{"level":2,"title":"注意：尽量不要使用元素的 index 作为 key","slug":"注意-尽量不要使用元素的-index-作为-key","link":"#注意-尽量不要使用元素的-index-作为-key","children":[]}],"git":{"createdTime":1679501467000,"updatedTime":1679501467000,"contributors":[{"name":"Huxzhi","email":"huxzhi@gmail.com","commits":1}]},"readingTime":{"minutes":3.13,"words":938},"filePathRelative":"code/react/React18/13-虚拟DOM.md","localizedDate":"2023年3月20日","excerpt":"<p>在 React 我们操作的元素被称为 React 元素，并不是真正的原生 DOM 元素，</p>\\n<p>React 通过虚拟 DOM 将 React 元素 和 原生 DOM，进行映射，虽然操作的 React 元素，但是这些操作最终都会在真实 DOM 中体现出来</p>\\n<h2> 虚拟 DOM 的好处：</h2>\\n<ol>\\n<li>降低 API 复杂度</li>\\n<li>解决兼容问题</li>\\n<li>提升性能（减少 DOM 的不必要操作）</li>\\n</ol>\\n<p>每当我们调用 root.render()时，页面就会发生重新渲染</p>\\n<p>React 会通过 diffing 算法，将新的元素和旧的元素进行比较\\n通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生的变化不予处理</p>","copyright":{},"autoDesc":true}');export{e as data};
