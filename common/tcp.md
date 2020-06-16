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
> * [网络层的各个环节](https://www.jianshu.com/p/4daec21df05d)
> * [为什么需要 TCP 的三次握手](https://www.jianshu.com/p/e7f45779008a)
> * [http1.x 为什么需要变成 http2.x](https://www.jianshu.com/p/5db20e9cc714)
> * [面试 TCP 协议](https://hit-alibaba.github.io/interview/basic/network/TCP.html)
> * [BBB](www.baidu.com)

## 关键词
`TCP`、`HTTP`、`HTTP2`、`应用层`、`网络`、`FIN`、`ACK`

`ACK`: 确认比特ACK，ACK=1时，表示接收到另外一端的信息；
`FIN`: 终止比特FIN, FIN=1时，需要释放该端的连接；

# What

![images](https://upload-images.jianshu.io/upload_images/1951625-e17737c0250a3311.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

---
## TCP 是什么，基础概念是？
> 是什么

* TCP 只需建立一次，支持应用层的 http1.x 和 http2.x 多次连接；
* TCP 位于 `传输层`，是`传输层`其中一个协议,在应用层和网络层的中间；
* TCP 是 `点对点` 传输，广播和多播不能用于 TCP；
* TCP 是 `双向传输` 数据；
* TCP 传输内容 `字节流` 构成的；
* TCP 把数据变`不同小块`的，发放给网络层传输；
* 同一时间，只能发送一个请求；
* TCP 协议，让应用层获取完整数据的信息，可以保证数据传输的`完整可靠性`，同类型的 UDP 协议不能保证数据的完整性；

![images](https://mmbiz.qpic.cn/mmbiz_png/XIibZ0YbvibkVtAnXhspnWbia3ukPyib0rC0eGqPopaUPmc9ogVIktkpKC0qMXOw0vMzaeGkXbEMicJ2WZrAAkgoyQw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 三次握手是什么？

三次握手是建立通信连接
* 第一次：client -> server（发送给 server 信息）
* 第二次：server -> client（server 发送【ACK字段】给 server 确认收到）
* 第三次：client -> server（client 发送【ACK字段】给 client 确认收到）

![images](https://note.youdao.com/yws/public/resource/d56ea05837e11dbf47311f9696c22858/xmlnote/3C254F24E58A4CEA9A9C155DBAC1ACFB/51050)

### 三次握手解决了什么问题?

* 减少 server 端资源消耗；正常情况，两次连接后，server 端已经保持了某个连接，但 client 的请求断开或延迟超时了，这种情况下，就可以避免资源继续等待连接的浪费；
* 使用三次连接，保证数据不会丢失，不会重复数据，保证数据的完整性；
* 让应用层 http 等专注于解决业务代码的编写；



## 四次握手是什么？

四次握手是断开通信连接
* 第一次：client -> server (发送关闭状态给 server，client处于等待断开)
* 第二次：server -> client (server 发送【ACK字段】给 client 确认收到，server处于等待断开)
* 第三次：server -> client (server 再发数据【FIN字段】给 client，主动断开连接)
* 第四次：client -> server (client 确认收到，再发数据【ACK】给server)

![images](https://note.youdao.com/yws/public/resource/d56ea05837e11dbf47311f9696c22858/xmlnote/1794555D96A04A178FA5DCEDA47AC373/51053)

### 四次握手解决了什么问题?

> 是什么
* TCP 同时断开client 和 server 的发送，因为只断开其中一端的传输，另外一端的传输还会一直继续发送
* 

### 疑惑 🤔
> 为什么建立只要3次，断开需要4次？

这是因为
在建立时候，**只有ACK没有FIN**，
在断开时候，ACK 和 FIN 是 **分开为两次发送**，【 server->client 过程 】



### 对于我有什么帮助？
> 是什么

* 了解该协议，可以清楚知道怎样来提高性能,例如 keep-alive 长连接设置
* 了解到 为什么需要 http1.x 到 http2.x 的底层因素


## 它的实现原理是什么？

> 是什么

* `连接` ：三次握手
* `断开` ：四次握手
* 实现过程：通过相互传递 ACK=1 来确认连接信息，当已经双向连接来回3次确认后，才可以传输数据；




# How

---
## 我该如何使用它？
> 如何实现？

* `Connection : keep-avlie` 保持长连接，提高性能；
    **只需要建立一次 TCP 连接就能进行多次 HTTP 通信**
    `PC端`：只能在一定时间内复用连接，效果明显；
    `移动端`：成效不大；
    在通用首部字符(请求头) 设置
* 由于程序是在 应用层 实现的，所以程序员不用接触实现源码，或者有更改该协议的处理；




---
## 有没有更好的实现方式呢？
> 如何实现？

* UDP 是单向的传输，性能开销小，所以速度快；
* UDP 的性能比 TCP 的好，但其数据的完整性无法保证；
* 问题在于 TCP 的两个缺点

## 它的缺点是什么？


# Why
---
## 为什么需要它(为什么会有该问题)？ 
> 为什么

* 它建立一次 TCP 连接，可以让应用层的 http 进行多次通信；
* 它相比 UDP ，可以保证数据的完整性；

---
## 如果我不用它（http1.x）呢？
> 是什么 TCP 原因，为什么不用 http1.x 

* 慢启动（slow start）
    **复用重用的效率比新建的高得多**；
* 三次握手耗时
    TCP建立连接时，三次握手有1.5个RTT（round-trip time）的延迟
* http1.x 性能不好
    http1.x 在底层 TCP 连接的复用率低下
    PC端：只能在一定时间内复用连接，效果明显；
    移动端：成效不大；

> 该如何做？
* 保持长连接
* 升级到 http2


---
## 如果是自己来做，你会如何做呢？
> 如何实现？

* 列出来
* 列出来


---
## 有没有什么类似的工具或方式呢？
> 为什么

* 目前最好的是 


所有转换过程**自闭**
![images]()



