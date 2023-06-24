---
date: 2023-02-21 12:29
title: 更新md文件的front matter
tag: 
  - python3  
  - code
updated: 2023-05-13 22:56
---

# 更新 md 文件的 front matter

1. 增加创建时间
2. title 为文件名

## 使用 frontmatter 库

<!-- more -->

```py
# coding: utf-8

import os
import time

import frontmatter

def update_front_matter(file):

    with open(file, 'r', encoding='utf-8') as f:
       post = frontmatter.loads(f.read())

    is_write = False
      # 获取标题

    if not post.metadata.get('title', None):
        title=file.split('/')[-1][:-3]
        post['title'] =title
        if not is_write:
            is_write = True


    if not post.metadata.get('date', None):
        # Window下 os.path(file).getctime()
        # macOS
        timeArray = time.localtime((os.stat(file).st_birthtime))
        post['date'] = time.strftime("%Y-%m-%d %H:%M", timeArray)
        if not is_write:
            is_write = True



# 递归获取提供目录下所有文件
def list_all_files(root_path, ignore_dirs=[]):
    files = []
    default_dirs = [".git", ".obsidian", ".config"]
    ignore_dirs.extend(default_dirs)

    for parent, dirs, filenames in os.walk(root_path):
        dirs[:] = [d for d in dirs if not d in ignore_dirs]
        filenames = [f for f in filenames if not f[0] == '.']
        for file in filenames:
            if file.endswith(".md"):
                files.append(os.path.join(parent, file))
    return files


if __name__ == "__main__":
    # file_path = './xwlearn/test.md'
    # update_front_matter(file_path)
    ignore_dirs = ["Resource", "Write"]
    files = list_all_files('./', ignore_dirs=ignore_dirs)

    print("current dir: ", os.path.dirname(os.path.abspath(__file__)))
    for file in files:
        print("---------------------------------------------------------------")
        print('current file: ', file)
        update_front_matter(file)
        time.sleep(1)
```

## 也可以通过 正则表达式实现

```python
import re
import datetime

# 读取文件
with open("example.md", "r") as file:
    content = file.read()

# 定义正则表达式
pattern = r"---\n(.|\n)*?(title: (?P<title>.+))?\n(date: (?P<date>.+))?\n---\n"

# 匹配 front matter
match = re.search(pattern, content)

if match:
    # 检查是否已经存在标题和创建时间
    title = match.group("title")
    date = match.group("date")

    if title is None:
        # 如果标题不存在，则添加标题
        title = "New Title"

    if date is None:
        # 如果创建时间不存在，则添加创建时间
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    else:
        # 如果创建时间已经存在，则不更新
        date = match.group("date")

    # 生成更新后的 front matter
    new_front_matter = f"---\ntitle: {title}\ndate: {date}\n---\n"

    # 将更新后的 front matter 和内容写回文件中
    with open("example.md", "w") as file:
        file.write(re.sub(pattern, new_front_matter, content))

```
