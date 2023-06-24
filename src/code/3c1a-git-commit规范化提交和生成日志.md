---
date: 2023-03-04 22:14
title: 3c1a-git-commit规范化提交和生成日志
updated: 2023-05-13 22:56
url: https://www.bilibili.com/video/BV193411C7XE
---

<BiliBili bvid="BV193411C7XE" />

# git commit 最佳实践 commitizen + husky + commitlint 规范化校验

- `commitizen`：使用 git cz 代替 git commit，引导用户填写规范的 commit 信息
- `husky + commitlint`：git commit 动作时，校验 commit 信息，如果不满足 commitizen 规范，无法提交

<!-- more -->

package.json

```json
"type": "module",
"scripts": {
    "prepare": "husky install",
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
```

`module` 引入方式 不支持 `module.exports` 的形式，需要把名字改成 `commitlint.config.cjs`

## Semantic commit 与 Changelog 生成

教学案例
https://github.com/zuoxiaobai/commitizen-practice-demo

Node.js 环境下可以使用:

- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)  提供  `git cz`  命令辅助创建 semantic commit。

## 根据 commit 信息生成 changelog

- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)  来快速生成更新日志

### standard-version（自动生成、打 tag）

npm run version 更新版本号会直接提交，导致且 commit 信息就是版本号，不符合 commitizen 规范。导致手动生成 log 时，会是空白。[standard-version](https://github.com/conventional-changelog/standard-version)  就很好的解决了这个问题。安装后，只需要 npm run release，就可以有 npm run version 的功能，而且提交信息是标准的 commitizen 规范，而且自动生成 changelog 自动打 tag，自动 commit。你只需要 push 即可。

需要注意的是：**CHANGELOG.md 是追加写入内容的，如果你之前没有对应的内容或删了之前的内容，会导致生成的内容较少，或者不完整。**
