*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [ ] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [ ] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？

# 刘威
我想了一下我的学习过程
1.是什么
  1.1解决了什么问题
      1.1.1 为什么会有这个问题
      1.1.2 别人是怎么解决的
  1.2 对于我有什么帮助
       1.2.1 使用是否方便
       1.2.2 需要看源码不
2. 我自己该怎么解决这个问题

# 参考文章
> * [http 所有状态解释](https://github.com/CyC2018/CS-Notes/blob/master/docs/notes/HTTP.md)
> * [网页请求的整个过程，包含请求行解释](https://yq.aliyun.com/articles/609071?spm=a2c4e.11153940.bloghomeflow.159.3097291at4NovA)
> * [http1.x 相对 tcp 的缺陷（http1.x 升级到 http2.x 非常好的解释）](https://segmentfault.com/a/1190000015316332)
> * [HTTP/1.x 的连接管理（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Connection_management_in_HTTP_1.x#%E5%9F%9F%E5%90%8D%E5%88%86%E7%89%87)

> * [RPC 的原理](https://blog.csdn.net/KingCat666/article/details/78577079)
> * [如何理解HTTP协议的 “无连接，无状态” 特点？](https://blog.csdn.net/tennysonsky/article/details/44562435)
> * [socket 效率高于 http](https://www.jianshu.com/p/333bb92c2c81)
> * [面试 http](https://hit-alibaba.github.io/interview/basic/network/HTTP.html)

> * [BBB](www)

## 关键词
`http`、`RTC`、`TCP`、`cookie`、`session`、`无状态`、`无连接`

# What

---
## 它是什么，基础概念是？
> 是什么
* web网站的请求资源的状态和过程；
* 由 3个部分组成：
    1. 状态行
    2. 请求头
    3. 消息主体
* 特点  
    1. http1.0 每个资源都会建立一次TCP 的情况;  
    2. 无连接： 请求时建连接、请求完释放连接；
        解决无连接： `connection:keep-alive`
        [http1.0 与 http1.1 有区别](https://my.oschina.net/yzbty32/blog/549305)
        不浪费服务端资源，只有当需要资源时，才会去建立连接请求；
    3. 无状态： 每个请求是独立的，释放后，不再保存之前的访问记录；
        解决无状态：cookie 和 session 保存了访问的状态，是解决上述缺点的方式
    4. 有 2xx - 5xx 四类状态；
    5. http1.x 减少请求数，http2 无限制；
        在一个web服务中，一个 TCP 连接同时只能接收并返回一个请求；（TCP原理）
        **同域名下，同时只能建立 6个 TCP 连接；**（`connection:keep-alive`）
        **不同域名，可以同时发起请求**
    7. 传输数据是**流**

> http1.x 减少请求数
![imags](https://mdn.mozillademos.org/files/13727/HTTP1_x_Connections.png)

* 访问网页，有下列几个过程
    1. DNS 查询IP
    2. 建立 TCP（三次握手）
    > 请求报文
    3. 请求行 request line （包含请求方法、[URI](https://github.com/CyC2018/CS-Notes/blob/master/docs/notes/HTTP.md#uri)、HTTP版本信息）
    4. 请求头 - [首部字段](https://github.com/CyC2018/CS-Notes/blob/master/docs/notes/HTTP.md#%E8%AF%B7%E6%B1%82%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5) request header
    5. 请求头 - 请求内容 
    >响应报文
    6. 响应行(状态行) （包含HTTP版本、状态码、状态码的原因短语）
    7. 响应头 - [首部字段](https://github.com/CyC2018/CS-Notes/blob/master/docs/notes/HTTP.md#%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5) response header
    8. 响应头 - 返回内容 
    9. 解析返回内容(浏览器端)
    10. 断开 TCP（四次握手）

请求头
![image](https://github.com/CyC2018/CS-Notes/raw/master/docs/notes/pics/HTTP_RequestMessageExample.png)
响应头
![image](https://github.com/CyC2018/CS-Notes/raw/master/docs/notes/pics/HTTP_ResponseMessageExample.png)

## 它解决了什么问题?
![images](https://mdn.mozillademos.org/files/13727/HTTP1_x_Connections.png)
> http1.0
* 无状态：
    每次请求完成后，不再保存之前的请求记录；
* 无连接：
    每次请求，都需要建立一个TCP，请求完成就会关闭TCP 连接；
    缺陷：耗时
* 开发人员，不用关注数据的传输层、网络层和链路层；
> http1.1
* 长连接 
    替代 短连接
    `connection:keep-alive`
    每次请求，都需要建立在 tcp 之上，如果没有就建立；有 TCP 就复用（保持长连接）；
* 域名分批
    线程阻塞，同时间，同域名一般建立6个TCP连接；
    一个TCP连接里的多个 http 请求是按照次序发送请求的（串形的请求）
* HTTP 流水线 
    替代 长连接（串形）
    该方式，可以同时发送多个请求，并同时计算返回;
* 

> http2.x
* 并行接收请求
    一个TCP，多个请求可以同时被接收并返回，不会受数量限制；
* 表头不重复；
    头信息压缩机制
* 表头压缩；
* multiplexing 代替 HTTP流水线


### 对于我有什么帮助？
> 是什么

* 理解网站获取资源的整个实现过程；
* 理解 http1.x 到 http2.x 的原因；

## 它的实现原理是什么？

> 是什么

* http 协议是建立在以 TCP 协议方式之上的流数据传输；
* 服务端每产生一个数据，就会立即变成小块的发送给前端（TCP作用）





# How

---
## 我该如何使用它？
> 如何实现？

* 客户端请求时，设置请求头
* 服务端返回时，设置响应头


---
## 有没有更好的实现方式呢？
> 如何实现？

* rpc 协议：跨域了 传输层和应用层，更适合程序之间的沟通；
    让网络分布式多程序更加容易；
* socket 是区别于 http 协议的一种方式，应用在 服务端主动传输数据到 client 端；





# Why
---
## 为什么需要它(为什么会有该问题)？ 
> 为什么

* 它的无状态
* 它的无连接
* 它的数据完整性；

> http1.x 减少的请求数

* **http1.x缺陷**：线程阻塞，在同一时间，同一域名的请求有一定数量限制，超过限制（一般开启6个TCP请求 `connection:keep-alive`),每个 TCP 连接是按照次序发送请求的，超过数目的请求会被阻塞

---
## 如果我不用它呢？
> 为什么

* 列出来
* 列出来


---
## 如果是自己来做，你会如何做呢？
> 如何实现？

* 列出来
* 列出来


---
## 有没有什么类似的工具或方式呢？
> 为什么

* RPC 协议，解决微服务后，各个应用程序之间的联通
* HTTP 流水线






