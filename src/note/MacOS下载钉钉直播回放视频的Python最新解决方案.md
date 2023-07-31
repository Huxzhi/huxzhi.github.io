---
date: 2023-07-28 19:58
updated: 2023-07-29 19:47
title: MacOS 下载钉钉直播回放视频的 Python 最新解决方案
---
原文链接： https://blog.51cto.com/u_15366127/6084937

# MacOS 下载钉钉直播回放视频的 Python 最新解决方案

### 钉钉部分

在浏览器端 点击视频, 找到直播回放, 点开, 向后拖拽一下进度条, 按 F12 进入界面查看网络请求，搜索 `m3u8` 的信息，查找 response 的内容


类似下面这样:

```sh
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:1
#EXT-X-TARGETDURATION:35
#EXTINF:33.000,
xxx/1.ts?auth_key=xxx
...
```

保存为 ​​aa.m3u8​​, 在 python 脚本的同级目录下.

### python 脚本

```python
import requests, os, re, time


def crawl(url):
    r = requests.get(url).content
    return r

# sz 表示深圳，bj 表示北京，注意修改
base_url = "https://dtliving-sz.dingtalk.com/live_hp/"


def get_url():
    url_list = []
    with open("aa.m3u8", "r") as f:
        s = f.readlines()
    for i in s:
        if re.match(r".*?ts.*?", i):
            url_list.append(base_url + i)
    return url_list


def download():
    urls = get_url()
    for i, url in enumerate(urls):
        with open(f"{i + 1}.ts", "wb") as f:
            f.write(crawl(url[:-1]))  # 去掉换行符
        print(i, "ok")
        # time.sleep(1)


# 整合文件名, 方便FFmpeg合并
def parse_filename():
    base_path = os.getcwd()
    urls = get_url()
    with open("file.txt", "w+") as f:
        for i in range(1, 1 + len(urls)):
            path = f"file '{base_path}/{i}.ts'\n"
            print(path)
            f.write(path)


if __name__ == "__main__":
    download()
    print("download finished...")
    parse_filename()
```

如果成功 会下载 一系列的 `二进制` 文件，`1.ts, 2.ts, 3.ts, ...`

错误的话，则是 `xml` 格式内容的 文件,打开会显示错误信息 。解决办法，看是不是 `base_url` 没有匹配，sz 和 bj 搞错了 

### FFmpeg 合并

```sh
ffmpeg -f concat -safe 0 -i file.txt -c copy a.mp4
```
