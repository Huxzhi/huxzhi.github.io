---
date: 2023-02-21 12:29
title: 更新md文件的front matter
tag: 
  - python3  
  - code
---

# 更新md文件的front matter

1. 增加创建时间
2. title 为文件名

<!-- more -->

```py
# coding: utf-8

import os
import re
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