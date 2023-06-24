---
date: 2023-03-04 16:19
title: 3e-元编程Metaprogramming
updated: 2023-05-13 22:56
---

-   **元编程（英语：Metaprogramming**，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作

一段代码来理解元编程

```sh
#!/bin/bash
# metaprogram
echo '#!/bin/bash' >program
for ((I=1; I<=1024; I++)) do
    echo "echo $I" >>program
done
chmod +x program
```

这段程序每执行一次能帮我们生成一个名为 program 的文件，文件内容为 1024 行 `echo`，如果我们手动来写 1024 行代码，效率显然低效

**元编程优点**：与手工编写全部代码相比，程序员可以获得更高的工作效率，或者给与程序更大的灵活度去处理新的情形而无需重新编译