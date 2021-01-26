*学习掌握概览*


# 参考文章
> * [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
> * [BBB](www)

## 关键词
`BFC`、`关键词2`



# What 🐎

---
## 它是什么，基础概念是？
块级格式上下文， 隔离当前元素的空间，不受外部影响，也不影响外部兄弟节点的布局；

## 如何做？
包含以下属性就会激活 BFC 的效果；
> 根级元素 body
> postion: absolute/fixed; 
> float 除 none 以外的值；
> overflow 除 visible 的元素；
> display： inline-block/table-cell/flex

## 它解决了什么问题?

可以清除 内部的浮动元素的脱离文档流效果
> 浮动元素脱离文档流

可以解决 外部的浮动元素被覆盖的效果
> 可以独立内部的布局， 不受外部的影响


## 它的实现原理是什么？
它实现的原理是什么