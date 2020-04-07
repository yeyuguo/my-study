# # 前端性能优化概括  学习指南
**先看教程，再记录  
切记不能，边看边记录**

# 参考文章
> * [AAA](www)
> * [BBB](www)

## 关键词
**性能优化**、**DNS**、**link preload**、**link prefetch**、**script defer**、**script async**、**script**


前端性能分类

## 访问一个 url 经历的所有过程
* DNS 查询
  * 递归方式查询
  * 本机缓存里有的记录
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
      * 200
      * 302 缓存
        * 缓存
          * 协商缓存
          * 强缓存 
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
    * 有接口请求
  * 请求过程  
    * 同源请求
      * ajax 请求
        * 302 状态
        * 200 状态
    * 跨域请求
      * iframe【？可以接口吗】
      * jsonp方式请求
      * 跨域共享 cookie
        * server 在固定请求下，返回表头里返回 cookie
      * 
  

## 详细记录

**网络层**

**html**


**css**

**js**



