参考文章：
1. [repain 和 reflow](https://juejin.im/post/5a9923e9518825558251c96a)
1. [重排和重绘](https://www.cnblogs.com/cencenyue/p/7646718.html)
2. [浏览器获取属性造成 repain 和reflow的原因](https://juejin.im/post/5a9372895188257a6b06132e)  待测试该参考文章的例子
3. [visibility 和 display 区别](http://www.jsdaxue.com/archives/29.html)
4. [cssom 和 dom 合并过程 -> render tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)
5. [CSS3 动画卡顿性能优化的完美解决方案（使用 transform 和 margin 来位移 200px 的区别？）](https://www.jb51.net/article/147736.htm)
6. [todo 待认真阅读 - 如何做 css 性能检查](https://www.cnblogs.com/quincyWang/p/6932382.html)

`示例请看 css/test_repain_reflow.html `  

关键词： 
`bitmap (栅格|位图)` 、`主线程`、`合成线程`、`GPU`

## visibility 和 display 区别是什么？
> visibility ：
隐藏后，在 html 里依然占据位置；
没有株连性：父节点 也会影响子节点的显示隐藏，子节点使用 visibility: visible 解除这种情况；

> display: 
隐藏后，在html里不显示，并且不占渲染树的位置；
具有株连性：重绘父节点隐藏消失后，子节点也一样消失，无法显示
display为 none，对其他属性不影响，例如 height，width 等；对其操作也不会再引起回流和重绘；




### repain 和 reflow 是什么?
- html -> dom 、css -> cssom  =====> 两者结合成 render tree 渲染树；
- 重排是：位置、形状变化，或者是浏览器对某些属性进行访问，如 clientHeight 等属性
- 重绘是：css 对dom进行一些视觉样式的改变，如颜色，背景色等；
- 回流比重绘造成的浏览器成本高！


### DOM tree 是什么? 
1. html 所有 DOM 节点
2. 不受 css 影响

### render tree 是什么?
1. render tree = DOM + css;  
2. 显示的DOM, 它受到 css 样式影响;


### 株连性 是什么?
对具有隐藏属性的元素才有这个概念
1. 父节点的元素被改变, 会对子节点元素有影响;
2. 子节点不能摆脱父节点的属性影响;
   
### 什么元素具有株连性?
1. 株连性元素: display
2. 非株连性元素: visibility


### 引起 重绘/重排 的因素是什么?
1. 页面渲染初始化；(无法避免)
2. 添加或删除可见的DOM元素；
3. 元素位置的改变，或者使用动画；
4. 元素尺寸的改变——大小，外边距，边框；
5. 浏览器窗口尺寸的变化（resize事件发生时）；
6. 填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变；
7. 读取某些元素属性：（offsetLeft/Top/Height/Width,　clientTop/Left/Width/Height,　scrollTop/Left/Width/Height,　width/height,　getComputedStyle(),　currentStyle(IE)　)



### 为什么访问 浏览器某些属性 会造成 repain和reflow？
1. 浏览器会清空队列，防止队列里的东西对获取属性造成有影响；
   - offsetTop/Left/Width/Height
   - scrollTop/Left/Width/Height
   - clientTop/Left/Width/Height
   - getComputedStyle(), or currentStyle in IE 

2. 如果我们想要在一次reflow过后就获取元素变动过后的值,
这个时候浏览器为了获取真实的值就不得不立即flush缓存的队列





### 有什么解决 repain 和 reflow 的方法吗？
   - 浏览器自己的优化：浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。

   - 我们要注意的优化：我们要减少重绘和重排就是要减少对渲染树的操作，则我们可以合并多次的DOM和样式的修改。并减少对style样式的请求。

      1. 直接改变元素的className, 尽量减少 style 行内元素操作；

      2. display：none；先设置元素为display：none；然后进行页面布局等操作；设置完成后将元素设置为display：block；这样的话就只引发两次重绘和重排；

      3. 不要经常访问浏览器的flush队列属性；如果一定要访问，可以利用缓存。将访问的值存储起来，接下来使用就不会再引发回流；

      4. 使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；

      5. 将需要多次重排的元素，position属性设为absolute或fixed，元素脱离了文档流，它的变化不会影响到其他元素；

      6. 如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document；

      7. 使用 absolute 对复杂动画元素激活，让其脱离文档流，否则引起附近节点的 repain；



### 为什么 尽量使用 css3 提高渲染性能? 
1. 原因: GPU 可以对 css3 开启硬件加速 
2. 触发时机: css3 的 transform 和 opacity
3. 影响的渲染阶段: composite layer (合成层)



## 拆解渲染树全过程, 了解性能问题根本原因?
> 自己总结：
1. 渲染树生成：dom + cssom = render tree
2. 流式布局：自动排布，输出一个盒模型，获取每个元素的精准位置信息，
3. 绘制( 栅格化 | 位图 )：转换成浏览器的相对像素；


> chrome解释：下面简要概述了浏览器完成的步骤：
1. 处理 HTML 标记并构建 DOM 树。
2. 处理 CSS 标记并构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，以计算每个节点的几何信息。
5. 将各个节点绘制到屏幕上。

dom 图例
![images](https://user-gold-cdn.xitu.io/2018/7/30/164ead0648f012e0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

cssom 图例
![images](https://user-gold-cdn.xitu.io/2018/7/30/164ead0648e0cb9f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


render tree 过程图
![images](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=zh-cn)





# 怎么做?
## 使用 transform 和 margin 来位移 200px 的区别？
## margin 
每一个像素
> 主线程过程：  `耗时`
1. DOM  
2. CSSOM  
3. DOM + CSSOM 
4. 渲染树(render tree)  + 布局(layout [reflow] ) 
5. 绘制 (repain)   到 位图 


> 合成线程过程 `部分耗时`
1. 绘制位图到 GPU `耗时`
2. 从 GPU 内存获取位图 渲染到 屏幕；

![image](https://files.jb51.net/file_images/article/201809/201892090647500.jpg?20188209729)



## transform 
全部动画只计算一次
> 主线程 `耗时`
1. DOM
2. CSSOM
3. DOM + CSSOM 
4. 渲染树 + 布局(layout [reflow] ) 
5. 绘制 到 位图 `耗时`
`之后，每个像素计算一次`
6. 传递动画移动信息给 合成线程 `不耗时`


> 合成线程 `部分耗时`
1. 绘制位图到 GPU `耗时`
`之后，每个像素计算一次`
2. 绘制位图到屏幕


![image](https://files.jb51.net/file_images/article/201809/201892090831953.jpg?20188209936)



## 总结： 和位图有关系的，`非常耗时`
> 减少位图的信息交互，利用 GPU 存储位图信息，主线程只通知变化；

> 为什么要开启硬件加速： 
1. 提高位图传输时间: `主线程` 和 `合成线程` 的中间过程





### 为什么尽量不要用 table呢？
1. 浏览器是流式计算布局，一次遍历就完成渲染树的排布
2. 但是 table 内部需要计算多次才能计算完成；






[
    import, 
    theme:"monokai",
    lang:"html"
](html/test_repain_reflow.html)