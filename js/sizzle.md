*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [ ] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [ ] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？


# 参考文章
> * [sizzle 选择器](https://segmentfault.com/a/1190000003933990)  



# jquery 源码结构
```js
(function(window, undefined) {
    var jQuery = function (selector, context) {
        return new  jQuery.fn.init(selector, context, rootjQuery);
    }
    jQuery.fn = jQuery.prototype = {...}
    jQuery.fn.init.prototype = jQuery.fn;
    // utilities method
    // Deferred 
    // support 
    // Data cache
    // queue
    // Attribute
    // Event
    // Sizzle about 2k lines
    // DOM
    // css operation
    // Ajax
    // animation
    // position account
    window.jQuery  = window.$ = jQuery;
})
```


# What

---
## 它是什么，做什么的？
> 复杂节点的查询器；

* sizzle 只搜索 $(expression);  

    expression 是一个表达式=> ex: `$('#a > .b')`; 

* 它是一个 `正则表达式匹配` 返回不同节点内容
`chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g`  
![image](https://segmentfault.com/img/bVqFzf)


# How

---
## 我该如何使用它？

> 掌握它的整体结构：
    > * 入口处: function(selector, context, result, seed) 
    > * 查找函数：Sizzle.find；
    > * 过滤函数: Sizzle.filter
    > * 块关系处理： Sizzle.selectors.relative ==== `{“+”: function() {}, “ ”:function() {}, “>”: function() {}, “~”: function() {}}`

> DOM树 `从左到右` 查找，准确度高 

> DOM树 `从右到左` 查找，查找速度快(性能好) 

> 分割解析: 解析正则表达式 



![image](https://segmentfault.com/img/bVqFzi) 
![image](https://segmentfault.com/img/bVqFzm)

---
## 有没有更好的实现方式呢？
> 如何实现？

* 列出来
* 列出来

---
## 如果是自己来做，你会如何做呢？
> 如何实现？

* 列出来
* 列出来




# Why
---
## 为什么需要它？ 
> 它的存在是为了兼容某些浏览器不能使用 document.querySelector 查找节点；

* 列出来
* 列出来

---
## 如果我不用它呢？
> 就得自己写函数来兼容查找节点，自己实现这个过滤过程；

* 列出来
* 列出来

---
## 有没有什么类似的工具或方式呢？
> 为什么

* 列出来
* 列出来





