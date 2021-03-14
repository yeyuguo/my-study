# 参考文章
[http状态码: 不同种类 20?/30?/40?/50?](https://hit-alibaba.github.io/interview/basic/network/HTTP.html)  
[http状态码: 301、302 和 303/307的细微差别](https://zhuanlan.zhihu.com/p/60669395)   
[HTTP缓存（Cache-Control、Expires 、ETag）](https://cloud.tencent.com/developer/article/1359915)  
[MDN讲解: 访问浏览器, 浏览器发生哪些渲染过程](渲染页面：浏览器的工作原理)  
[输入url到页面展示详解](https://juejin.cn/post/6931210669991821326)

## 浏览器输入一个 url 经历的所有过程
* DNS 查询
  * 本机缓存里有的记录
  * 递归方式查询
  * 解析域名服务厂商
* 域名解析
  * 获取主机IP和端口
  * 访问IP和端口
* 访问server服务
  * 查找对应路由
  * 解析表头
    * 资源类型
    * 是否压缩
    * 请求状态
      * 20?
        * 200 正常请求
      * 30?
        * 301 永久重定向
        * 308 永久重定向 补充 301; 不能 post 变成 get
        * 302 临时重定向 - 303/307 的父集理解【部分浏览器/代理，会把post重定向改成 get请求】
        * 303 临时重定向【只接受 get 重定向】
        * 307 临时重定向【post重定向不能改成get请求】
        * 304 资源未修改，使用缓存
          * 协商缓存
          * 强缓存 
      * 40?
        * 400 客户端语法错误，不能被服务端理解
        * 401 客户端请求未经授权， 状态代码必须和WWW-Authenticate报头域同时使用
        * 403 服务端拒绝服务，响应头里会有原因说明
        * 404 服务端找不到请求资源；
      * 50?
        * 501 服务端报错
        * 503 服务端当前不能处理请求， 一段时间后可能会恢复
  * 返回静态资源/接口
* TCP 协议的传输层
* 资源到达浏览器
  * 获取html文件
    * 解析 html 内容
  * link 方式
    * preload
    * prefetch
  * script 方式
    * defer
    * async
  * 渲染html内容
    * html 节点生成 DOM
    * css 转成 CSSOM
    * DOM + CSSOM 生成渲染树
    * GPU生成布局
    * 绘制到屏幕上
  * js 解析并执行
    * 解析是什么版本的 js
    * es5/es6
    * 事件流
    * 有接口请求
  * 请求过程  
    * 简单请求和非简单请求 OPTION
    * 同源请求
      * ajax 请求
        * 200 状态
        * 30x
          * 临时重定向
            * 302 临时重定向
              * 允许各种重定向
              * 会把 POST 请求改成 GET 请求
            * 303 临时重定向
              * 会把 POST 会被改成 GET 方式
              * 浏览器重定向到 response header 里的 location url 上
              * 例如: 提交表单, 成功重定向到提示页
            * 307 临时重定向
              * 与 302 类似
              * 不让 POST 改成 GET
          * 永久重定向
            * 301 永久重定向
              * 资源被永久重定向
            * 308 永久重定向
              * 作为 301 的补充
              * POST 请求不能被改成 GET 请求
          * 临时重定向 和 永久重定向 区别
            * 永久重定向: 新网址完全继承旧网址, 旧网址排名清零
            * 临时重定向: 新网址不会有排名, 旧网址排名没影响
          * forward 和 redirect 区别
            * forward: url 不变化, 内容被被转发
            * redirect: url 变化, 内容也被转发
        * 304 资源未修改，使用缓存
          * 协商缓存(条件判断), 有大缺点 (返回头 last-modified 和 请求头 if-modified-since)  
            * 优点: 减少响应体的传输,仅仅使用表头信息网络请求, 提高效率
            * 缺点: 使用缓存文件,需要收到服务端的 304 状态,  网络因素会有风险
            * 操作过程: 举例动态页加入缓存机制: 
              * 首次进入: 设置 response header 里有 Last-modify
              * 首次后请求, reqeust header 带有 if-modified-since 字段给服务器判断
              * 如有更新, 返回 200 和最新资源
          * 强制缓存 (返回头 cache-control 和 返回头 expires )
            * expire (历史方案)
              * 与 cache-control 功能类似
              * 缺点: 浏览器时间和服务器时间差异大会有问题
            * cache-control (主流方案)ing
              * 值: max-age, 优先级大于 expire, 会覆盖 expire效果
              * 值: no-cache 
            * E-tag:
              * 作用: 检测资源内容是否改变
              * Etag(response header ) 、 if-None-match (request header) 
              * 实现: 
                * 1. 首次: 返回头 Etag: md5 加密的字符
                * 2. 下一次请求: 浏览器设置请求头 request header 的 If-None-Match 为上一次 Etag 字符
                * 3. 服务器对比最新 Etag 和 If-None-Match 值完成更新
            * **cache-control 与 E-tag 对比**
              * 首次加载: 两者一样;
              * 首次后
                * E-tag: 如果缓存, 消耗网络资源, 不返回响应体
                * cache-control: 如果缓存, 客户端浏览器不发起请求;
          * 如何实现不缓存
            * 一个是清空请求头 request header
            * 另一个是返回头 response header 使用 no-cache 表头
        * 403 请求被禁止
        * 404 资源找不到
        * 501 服务端报错
        * 503 服务端当前可能来不及处理， 一段时间后可能会恢复
    * 跨域请求
      * iframe【？可以接口吗】
      * jsonp方式请求
      * 跨域共享 cookie
        * server 在固定请求下，返回表头里返回 cookie
  * SPA 页面
    * 更新机制是什么
      * MVC / MVVM
    * diff 算法是什么
      * 遍历 vdom 并标记
      * 数据改变, 遍历新的 vdom 标记
      * 更新记录到 patch 数组
      * 更新patch成真实 dom
    * 现有的SPA有什么缺陷吗
      * webpack 的按需加载首次加载也会加载很多无用的代码;
      * 改善方式: 浏览器的 native 机制 import 解决
    * webpack 的优缺点
      * 按需加载 require.ensure
    * [ESM 机制](https://segmentfault.com/a/1190000025137845)
      * 模块记录: 根据入口文件, 生成依赖关系图
        * 入口加载: 模块文件的加载入口, 浏览器需指定 type=module
        * 加载方式: 依赖文件的提取, url 或 文件系统
        * 变成模块记录: 文件解析到内存
      * 实例化: 内存放置导出值
        * cmd 是值复制, 修改不影响全局
        * esm 是值引用, 修改会影响全局
      * 代码运行: 执行代码放置到内存
        * 模块映射对其的好处是??????
    * bundless
      * 优点: 
        * 启动快
        * 更新小和快: 只更新单个模块文件
      * 缺点: 
        * 依赖 devServer
        * 生产环境不成熟: 模块散, 导致多, 网络资源加载负担重
    * bundle
      * 优点: 
        * 生产环境, 网络资源访问效率高
      * 缺点: 
        * 开发环境,文件变更需重新打包
    * rollup
      * 配置简单
    * Parcel
      * 
    * snowpack
      * 利用浏览器 import 机制
    * vite
      * 参考 snow 实现
      * 所有 cmd 和 umd 依赖代码,转成 ESM 模式
      * 使用 esm 模式,不会进行完成的 AST 遍历
      * 使用 esbuild 提高编译的速度
    * esbuild 这么快原因
      * golang 并发性能 和 机器码
      * 减少 AST 遍历次数(3次), 内存上有优势
