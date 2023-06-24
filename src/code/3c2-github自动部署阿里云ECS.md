---
category: GitHub
date: 2023-03-05 14:35
icon: network
tag:
- Git
- deploy
title: 3c2-github自动部署阿里云ECS
updated: 2023-05-13 22:56
---

转载，补充个人遇到的一些问题和原文不对的内容

本文介绍如何利用 Git 和 GitHub Action，自动部署代码到服务器。

<!-- more -->



::: tip

本教程使用 Ubuntu 20.04 进行教学。

:::

## 服务器

为了能供自动部署到服务器，我们需要让服务器的网站目录成为一个 Git 仓库，这样我们可以在 GitHub Actions 中，通过向服务器对应 GitHub 仓库推送网站内容，使服务器网站获得自动更新。下面是服务器侧的部署配置

### 添加账户

为了安全，首先需要使用命令创建 Git 用户，为了安全请务必设置密码。

```sh
sudo adduser git
```

之后，查看部署目录所在组，git 用户添加到组中。

```sh
usermod -a -G <目录所在组> git
```

然后将部署目录的权限设置为 `775`，即允许同组访问。这样 git 就有权限访问部署目录。

### 添加权限

创建 `~/.ssh/` 文件夹，生成 `authorized_keys` 文件，并设置其权限为 `600`。

```sh
mkdir -p ~/.ssh/

touch ~/.ssh/authorized_keys

chmod 700 ~/.ssh/
chmod 600 ~/.ssh/authorized_keys
```

> [!NOTE]
> 如果权限不对，通过私钥访问会失败

之后将需要赋予权限的用户公钥依次粘贴至该文件，这样相关用户即可以使用对应私钥，向服务器相关仓库推送代码。

### 创建仓库

回到 `/home/git/`，创建所需的文件夹:

```sh
cd ~
mkdir <仓库名>
```

进入 <部署文件夹>，比如 `/var/www` 使用

```sh
cd <部署文件夹>
git init --separate-git-dir=/home/git/<仓库名>
```

这会将 git 库保持在 `/home/git/<仓库名>` 下，同时将工作区设置到部署文件夹中。

接下来执行:

```sh
git config --global --add safe.directory <部署文件夹>
git config receive.denyCurrentBranch ignore
```

::: note

在新版本 Git 中，考虑到安全因素，Git 会在检出时检测项目文件夹是否属于其他组成员，如果检测到会默认拒绝相关操作以防止其他用于获取到本不应该获取到的代码信息。因为部署文件夹的所有者通常不会是 git，所以我们需要标记对应的部署文件夹“安全”。

另外 Git 默认拒绝外部对当前分支的推送操作，因为这可能会覆盖或变更工作区文件。所以我们需要显式通知 Git 不要拒绝当前分支的推送操作。

:::

初始化 HEAD 

```sh
git commit --allow-empty -n -m "Initial commit."
```




## GitHub Actions

在 GitHub 一侧，我们需要通过 GitHub Action，在新代码推送时自动构建网站，并部署到 GitHub 的 gh-pages 分支。之后，GitHub Action 将该分支的变动推送服务器的对应仓库，完成网站的自动部署。

之后只需要使用 GitHub Action 通过 Git 推送到 `git@<domain>:<部署目录> gh-pages` 即可。

```yml
# 自动部署的名称
name: GitHub pages deploy

# 自动部署的条件
on:
  push:
    branches:
      - master

jobs:
  # 构建网站并部署到 GitHub Pages
  deploy-gh-pages:
    # 运行环境
    runs-on: ubuntu-latest

    # 步骤
    steps:
      # 第一步: 下载源码
      - name: Checkout
        # action 配置详见 https://github.com/actions/checkout
        uses: actions/checkout@v3
        with:
          # 如果本项目包含了子模块 (git submodules)，需要将此项设置为 true
          # submodules: true

          # 这是获取历史 commit 的深度，默认为 1，即只拉取最后一个 commit
          # 这样可以加快拉取速度
          #
          # 如果项目使用 VuePress，为了正确通过 Git 历史提交记录生成页面的最后更新时间
          # 需要设置为 0 以拉取完整的 git 历史提交
          # fetch-depth: 0

          # 如果子模块包含私有仓库，需要设置 ssh key 或 token 以保证拥有拉取相应仓库的权限
          # 您可以将 ssh-key 设置为 github 绑定公钥对应的私钥
          # 也可以新建一个具有相关仓库访问权限的 github token
          # token:

      # 缓存 node_modules 以避免重复安装
      - uses: actions/cache@v3
        id: node-modules
        with:
          # 需要缓存的路径
          path: node_modules/
          # 缓存的 key
          key: ${{ runner.os }}-node-modules-${{ hashFiles('yarn.lock') }}
          # 恢复 key
          restore-keys: |
            ${{ runner.os }}-node-modules-

      # 安装依赖
      - name: Install Deps
        # 只有没有命中缓存才会执行
        if: steps.node-modules.outputs.cache-hit != 'true'
        # 严格按照 yarn.lock 安装依赖
        run: yarn install --frozen-lockfile

      # 构建项目
      - name: Build
        # 项目的构建命令
        run: yarn run build

      # 第四步，部署
      - name: Deploy
        # action 配置详见 https://github.com/JamesIves/github-pages-deploy-action
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 部署到的分支
          branch: gh-pages
          # 需要部署的文件夹
          folder: dist

  # 部署到服务器
  deploy-server:
    runs-on: ubuntu-latest
    # 确保在部署到 GitHub Pages 之后执行
    needs: deploy-gh-pages
    steps:
      # 检出网站代码
      - name: Checkout
        uses: actions/checkout@v3
        with:
          # 检出 gh-pages 分支
          ref: gh-pages
          # 获取全部的历史提交
          fetch-depth: 0

      # 配置环境
      - name: Configuration environment
        # 写入私钥、配置 Git 用户名，写入服务器地址
        # 您需要自行将服务器的私钥写入 secrets 的 SSH_PRIVATE_KEY
        run: |
          mkdir -p ~/.ssh/
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan <your domain> >> ~/.ssh/known_hosts
          git config --global user.name 'Your Name'
          git config --global user.email 'You email'

      # 部署到服务器
      - name: Deploy
        # 使用 Git 将网站代码强制推送到远程的网站目录
        # 并使用 SSH 连接服务器进入网站目录手动切换到最新提交
        run: |
          git push -f git@<your domain>:<deploy dir> gh-pages
          ssh git@<your domain> "cd <deploy dir> && git reset --hard HEAD"
```

### 容易遇到的问题

如果失败，去看一下 action run log

第一个问题：

```sh
error: remote unpack failed: unable to create temporary object directory
```

权限不足，注意查看 部署目录的权限设置

第二个问题：

```sh
fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions
```

解决办法：

```sh
git commit --allow-empty -n -m "Initial commit."
```

运行成功后，还需去 <部署文件夹> 切换分支，此时处在 main 分支， <部署文件夹> 还是一片空白

```sh
git branch
git checkout gh-pages
```