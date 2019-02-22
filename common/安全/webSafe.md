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
> * [(非常好的网址)csrf 真实的盗用了 gmail 的例子](https://juejin.im/post/5bc009996fb9a05d0a055192)
> * [各种安全机制解释](https://zoumiaojiang.com/article/common-web-security/)
> * [白话xss vs csrf](https://segmentfault.com/a/1190000007059639)
> * [参考知乎 :  简洁说明 xss 和 csrf](https://www.zhihu.com/question/34445731)
> * [python字符转义 - 字符-十六进制 对应表](https://blog.csdn.net/shy871265996/article/details/13016233)
> * [跨站攻击](https://hit-alibaba.github.io/interview/basic/network/HTTP.html#%E8%B7%A8%E7%AB%99%E6%94%BB%E5%87%BB)
> * [BBB](www.baidu.com)


## 关键词
`XSS`、`CSRF`、`XSRF`、`web安全`、`Referer`

`Referer`:记录了该HTTP请求的来源地址

# What

---
## 它是什么，基础概念是？
### 前提：csrf 的执行，需要经过 xss 收集到个人信息

> xss是什么
* 用户过分信任网站，网站执行了伪造者的请求接口，泄漏了用户信息；
    XSRF：利用 cookie 获取个人信息后，再 进行 csrf 的伪造操作，
    攻击者盗用用户的信息，再去做坏事（仅仅是收集信息）；

> csrf 是什么
* 网站过分信任用户，攻击者伪造用户的操作提交某些请求（已经触发了某些行为）；
    例如，伪装成用户，访问某些接口，提交敏感信息；

## 它带来了什么问题?

> xss 带来什么问题
* 用户的个人信息被盗用

> csrf 带来什么问题
* 用户执行了被攻击者伪造的操纵；



### 解决了有什么好处

> 解决 xss 有什么好处
* 增强编码方式，减少用户个人信息被盗，增强安全性；


> 解决 csrf 有什么好处
* 减少用户被伪造执行操作，防止个人损失；


## 它的实现原理是什么？

> xss 原理是什么
* 在可输入的地方，被攻击者输入并提交（注入）了某些 js 代码；
* xss 获取个人信息方式，一般是通过 restful 得到用户 cookie；

> csrf 原理是什么
* 被埋入了xss 或其他的后门操作；
* 用户的某些操作被伪造而被触发；





# How

---
## 是如何注入到前端的

1. 在可输入的地方输入信息（被注入的js代码）并提交； 
    [xss 是如何注入攻击的](https://blog.csdn.net/Ideality_hunter/article/details/80621138)


2. 攻击者可以直接通过 URL (类似：https://xx.com/xx?default=`<script>alert(document.cookie)</script>`) 注入可执行的脚本代码。

3. csrf
    诱导用户，在当前网站，访问了其他网站的页面，导致个人信息被盗用，从而继续被伪装成用户执行了操作；

> xss 被注入

![images](https://img-blog.csdn.net/20180608115526481?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0lkZWFsaXR5X2h1bnRlcg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


> csrf 被注入执行某些操作

```js
var inputA = 1
var inputB= '2&c=3'

// 被注入 执行了 csrf 
var url = `http://www.xxx.com?a=${inputA}&b=${inputB}`
// post 请求...
```



---
## 我该如何解决它？
> xss 如何解决？

解决的原则：防止被输入 可执行的js代码   

前端通过 escape 转义后，`<script>` 的特殊符号`<>` 会被转义成字符串
* 前端接收：前端接收后端数据，都需要进行(escape)转义后再渲染；
* 前端渲染：前端尽量不要用 dom api操作；
* 后端输出：后端输出给前端，都需要先转义后再给前端
* 后端接收：后端接收前端数据，都需要进行转义后再处理入库；

```js
var text = escape('<script>alert(1)</script>');
document.body.innerHTML = text 
```

> csrf 如何解决？

解决原则： 防止用户请求时，难以被伪造；
做法：添加额外的信息，让攻击者难以伪造；

* 进行(escape)转义
    前端接收后端数据，都需要进行(escape)转义后再渲染；
* 尽量使用 POST；
    使用 post 请求时，执行某些交互操作时，个人信息可以被隐藏；
* 增加验证码
    敏感接口处，添加交互操作，例如 验证码或者输入密码；
    用户可以看到互动操作，发现不知情的操作； 
* 增加 token
    增加token认证，每个请求，攻击者无法模拟用户的请求接口；
    token 具有过期时间，过期时间后，伪造者使用过期 token，无法再发送请求；
* 检测 Referer（同源策略保护）
    检测接口来源的 Referer，限制接口的网址来源；（可以被修改）
* 设置 `Samesite=Strict`，防止网页内的第三方域名网站获取到 该 cookie
```js
Set-Cookie: foo=1; Samesite=Strict // foo 不能被第三方域名访问
Set-Cookie: bar=2; Samesite=Lax // bar 可以
Set-Cookie: baz=3 
```
* CSRFTester 检测 csrf 漏洞的工具


---
## 有没有更好的实现方式呢？
> xss如何实现？

* 控制 cookie 的 `httpOnly`,限制被访问到 cookie；
* 设置 cookie 的严格模式；


>  csrf 更好的解决方法？
* 如果有点击第三方网站链接，再次提醒用户




# Why
---
## 为什么需要它(为什么会有该问题)？ 
> xss 转义（escape）解决办法的作用
* escape 转义的目的：是将一些构成 HTML 标签的元素转义，比如 <，>，空格 等，转义成 &lt;，&gt;，&nbsp; 等显示转义字符。有很多开源的工具可以协助我们做 escape 转义。
* 列出来


字符转义对应表
```js
           字符值                      URL编码值 
            空格                        %20 
              "                        %22 
              #                        %23 
             %                         %25 
             &                         %26 
              (                        %28 
             )                         %29 
            +                          %2B 
             ,                         %2C 
             /                         %2F 
             :                         %3A 
             ;                         %3B 
            <                          %3C 
            =                          %3D 
            >                          %3E 
             ?                         %3F 
            @                          %4o 
             \                         %5C 
             |                         %7C
```

python
```python

```

---
## 如果我不用它呢？
> 为什么

* 必须关注 xss 和 csrf；


---
## 如果是自己来做，你会如何做呢？
> 如何实现？

* 如果是我来做，限制第三方网站，获取当前的 cookie；



---
## 有没有什么类似的工具或方式呢？
> 为什么

* CSRFTester 检测 csrf 漏洞的工具
    登陆该工具，访问真实接口后，再修改调试接口，查找漏洞；
* 设置 `Samesite=Strict`
    兼容性不够，只有 chrome 和 firefox 兼容






