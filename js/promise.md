# xxx 学习指南
**先看教程，再记录  
切记不能，边看边记录**

# 参考文章
> * [promise 原理剖析](https://segmentfault.com/a/1190000009478377)
> * [promise micro task 最好的讲解，没有之一](https://zhuanlan.zhihu.com/p/28051505)
> * [promise 和 async 现象分析](https://mp.weixin.qq.com/s/TzoQ2vtghrQYeGgx-6P2yA)
> * [BBB](www)

## 关键词
**promise**、**async**、**微任务**、**宏任务**

`微任务`： 解释  

`红任务`： 解释  








> **疑惑 🤔**

 What 🐎 
---
看山是山
## xxx 基础概念是什么？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来


### 1. 概念 - xxx 是什么?
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

```js
setTimeout(function(){
    console.log('setTimeout')
},0)
var p = new Promise(function(resolve,reject){
    resolve('resolve result!!')
})
p.then(function(data){
    console.log('promise then 回调')
})

```

### 2. 价值 - 它解决了什么问题?
> 高度概括解释段落

**总结列表**

* promise 解决了回调地狱问题
* promise 建立了 micro task 微任务，在堆列之后、页面渲染之前执行；
* 可以配合 async 使用；
* general 实现的原理：  
    yield 对应出栈;  
    next() 对应入栈

### 3. 原理 - 它的实现原理是什么？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

实现 resolve 可以这样


[
    import, 
    theme:"monokai",
    lang:"javascript"
](script/promise.js)



```js
{
    var resolve = function(value){
        return function(fn){
            fn(value) // 此处 fn 就是 then 的回调函数
        }
    }
    let _thenFn = resolve(value)
    this.then = function(fn){
        _thenFn(fn)
    }
}
```

### 4. 利己 - 对于我有什么帮助？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 5. 缺陷 - 它的缺陷是什么？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来



Why 🤔
---
看山不是山

### 1. 意义 - 它存在的意义？(为什么需要它?)
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 2. 反面 - 如果不用它，会有一些什么不好方面?
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来



HOW  🔨
---
看山还是山

### 1. 操作 - 该如何使用它？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 2. 同类 - 有现成该功能的其他轮子吗?
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 3. 原理 - 看了 别人/原作者 的实现方式？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 4. 缺陷 - xxx 做法的缺点是什么？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 5. 更优 - 更好的解决办法是什么？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来

### 6. 重构 - 如果我来重写, 该如何来实现？
> 高度概括解释段落

**总结列表**
* 列出来
* 列出来







# 学习掌握概览

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [ ] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [ ] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？

