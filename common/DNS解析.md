*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [怎么做] 初级 |~~基础概念~~ | 为什么需要它             | 基本使用
- [为什么] 中级 | -       | 如果我不用它呢           | 有没有什么类似的工具或方式呢
- [做最好] 高级 | -       | 有没有更好的实现方式呢？ | 如果是自己来实现，你会如何做呢？


# 参考文章
> * [CND 缓存加速](https://blog.csdn.net/luoweifu/article/details/51031099)
> * [浏览器输入url发生了什么](https://segmentfault.com/a/1190000012092552)


# What

1.它是什么，做什么的？
---
> * DNS 概念： 域名是服务器的名称
> * DNS 作用： 目的是让人容易记住服务器名称，服务器之间的通信都是通过IP地址交互的 -> 分为 client 和 Server 端  
> * DNS 解析：DNS 转换成 IP 地址的过程，称为 DNS 解析

![image](http://blog.51cto.com/attachment/201203/175333937.jpg)



## DNS 查询域名IP

![image](https://note.youdao.com/yws/public/resource/4bd870de234909b2da4aafc6507475a2/xmlnote/D81DF9A4910B40AA99675B308743B0B6/51044)


从客户端到本地服务器属于递归查询  
而DNS服务器之间的交互属于迭代查询。  

- 浏览器客户端向本地DNS服务器发送一个含有域名www.cnblogs.com的DNS查询报文。
- 本地DNS服务器把查询报文转发到根DNS服务器，根DNS服务器注意到其com后缀，于是向本地DNS服务器返回comDNS服务器的IP地址。
- 本地DNS服务器再次向comDNS服务器发送查询请求，
- comDNS服务器注意到其www.cnblogs.com后缀并用负责该域名的权威DNS服务器的IP地址作为回应。
- 最后，本地DNS服务器将含有www.cnblogs.com的IP地址的响应报文发送给客户端。

# Why
1.为什么需要它？ 
---
> *  目的是为了转换 域名变成 IP


2.如果我不用它呢？
---
> * 不使用它，没办法和其他计算机交互

3.有没有什么类似的工具或方式呢？
---
> * DNS 本地 Server ：本地计算机的 DNS server
> * DNS Server：公共的 DNS 服务
> * DNS 转发器：负责转发一个 DNS 到目的 DNS 上
> * DNS 缓存器
- 阿里的缓存 
    223.5.5.5
    223.6.6.6
- 谷歌的
    8.8.8.8
    8.8.4.4
- 号称最快最安全
    1.1.1.1



# How

1.我该如何使用它？
---
> * 转发（递归）：依次向上寻找 dns server 查找域名对应IP，查到返回给 本地 dns;
    方式：加速 或 缓存
> * 不转发 (迭代)：从 root DNS服务器 ( A - M ) 依次查找，查到返回给 本地 dns;

传统的 DNS 查询请求服务
![images](http://sunlogging.com/wp-content/uploads/2016/03/normal.png)


2.有没有更好的实现方式呢？
---
> * 配置 host 文件，网址映射 IP，并解析；
> * 使用配置 dns 转发；

使用 CDN 缓存
![images](http://sunlogging.com/wp-content/uploads/2016/03/cdn.png)

3.如果是自己来做，你会如何做呢？
---
> * host 配置映射
> * dns 配置转发





