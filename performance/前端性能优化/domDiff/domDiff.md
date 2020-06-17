*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [ ] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [ ] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？



# 参考文章
> * [官网 diff 算法简述](https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
> * [虚拟 dom 对比变换的例子](https://supnate.github.io/react-dom-diff/index.html)
> * [React虚拟DOM和Diff算法解析](https://blog.csdn.net/c_kite/article/details/80428411)
> * [如何实现一个 vdom](https://github.com/livoras/blog/issues/13)
        

# What

---
## 它是什么，基础概念是？
> 是什么

* js 对象描述真实 dom；
* dom的 增/删/改，都是 js 对象对比；
* vdom 有 diff 差异的 js 描述对象： 节点更新/位置更新
  * 节点更新： type 为 REPLACE/TEXT/PROPS
  * 位置更新： type 为 REORDER
* 

##### vdom 描述对象
```js
// 同层级下： vue 的 vdom 的 diff 描述对象【已经有变化的】
{
    type: '', // REPLACE/TEXT/PROPS/REORDER/
    node: '', // Element
    content: '', // 节点内容
    props: {},
    children: []
}
```


### 为什么需要用 vdom？
* 真实 dom，读取一些属性，或者有dom属性变化，会导致渲染树重绘或重排；
* vdom 可以把多次的变更，合并成为一次来做变更；提高了性能；

## 它解决了什么问题?

> 是什么
* vdom 可以提高浏览器性能【影响浏览器性能的三个因素之一】
* 


### 对于我有什么帮助？
> 是什么

* 了解 vdom 过程，知道为什么有 key，key 为什么必须唯一；
* 了解 vdom，可以在代码实现过程，尽量合并多次 vdom 为一次变更；
* 了解 vdom，知道什么时候该写渲染真实dom，什么时候是写 vdom 实现；


## 它的实现原理是什么？

> 是什么

* 使用深度优先遍历方式，遍历旧 vdom 和新 vdom；标记唯一标识；
* 每遍历到一个节点，比较新旧 vdom 同层级；
* 计算同层级 dom 有 vdom 差异性，使用 js 对象记录；
  * type: REPLACE/TEXT/PROPS【属性变化】 和 REORDER【位置变化】
  * 如果位置变化，可以通过唯一标记 key 来移动；
* patch：把变化的内容更新到 vdom 上；
 




# How

---
## 我该如何使用它？
> 如何实现？

* 列出来
* 列出来

---
## 有没有更好的实现方式呢？
> 如何实现？

* 列出来
* 列出来





# Why
---
## 为什么需要它(为什么会有该问题)？ 
> 为什么

* 列出来
* 列出来

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

* 列出来
* 列出来






