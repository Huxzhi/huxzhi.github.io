---
category: linux
date: 2023-01-17 20:41
title: 02-ubuntu防火墙
updated: 2023-05-13 22:56
---

## ubuntu防火墙的安装，开启，关闭和添加规则等操作
**操作一：查看防火墙状态**  
输入命令：sudo ufw status

```zsh
root@huxzhi:/node-server# sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
9999                       ALLOW       Anywhere                  
80                         ALLOW       Anywhere                  
9999 (v6)                  ALLOW       Anywhere (v6)             
80 (v6)                    ALLOW       Anywhere (v6)             

```
我的防火墙是开启状态，下面显示了防火墙允许通过的协议  
如果防火墙没开启会显示，状态不活动  
**操作二：安装防火墙**  
输入命令：sudo apt install ufw -y  
输入后会自动安装  
**操作三：卸载防火墙**  
输入命令：sudo apt remove ufw -y  
**操作四：启用防火墙**  
输入命令：sudo ufw enable  
启用后查看一下防火墙状态是否启用成功，方法看操作一  
**操作五：禁用防火墙**  
输入命令：sudo ufw disable  
禁用后查看一下防火墙状态是否禁用成功，方法看操作一  
**操作六：临时停用防火墙**  
输入命令：sudo systemctl stop ufw  
停用后查看一下防火墙状态是否停用成功，方法看操作一  
**操作七：添加允许通过防火墙的规则**  
例1：输入命令：sudo ufw allow 6379  
允许端口号为6379的端口访问  
例2：输入命令：sudo ufw allow 80:90/tcp  
允许80-90之间的端口访问，如80，81，82 ··· 90  
例3：输入命令：sudo ufw delete allow 22  
删除允许端口为22的规则