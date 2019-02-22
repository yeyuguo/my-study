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
> * [promise 原理剖析](https://segmentfault.com/a/1190000009478377)
> * [promise micro task 最好的讲解，没有之一](https://zhuanlan.zhihu.com/p/28051505)

## 关键词
`promise`、`micro`、`关键词3`、`关键词4`

关键词1： 解释
关键词2： 解释

# What 🐎

---
## 它是什么，基础概念是？
> promise 是什么

* 是为了解决 js 异步的回掉黑洞；

```js
var p = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('resolve result!!')
    },1000)
})
p.then(function(data){
    console.log({data})
})

```
实现 resolve 可以这样

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
promise 完整
```js
//优化

function _Promise(fn){
    var _value
    function resolve(value){
        _value = value 
        return function(thenFn){
            return thenFn(value)
        }
    }
    fn(resolve)
    

    this.then = function(fnThen){
        fnThen(_value)
    }
}


```



## 它解决了什么问题?

> promise解决的是什么
* promise 解决了回调地狱问题
* promise 建立了 micro task 微任务，在堆列之后、页面渲染之前执行；
* 可以配合 async 使用；
* general 实现的原理：  
    yield 对应出栈 next() 对应入栈 
* 


## 它的实现原理是什么？

> xxx 是什么

* 列出来
* 列出来


## 它的缺陷是什么？

> xxx 是什么
* 列出来



## 对于我有什么帮助？
> xxx 是什么

* 列出来
* 列出来




# How 🔨

---
## 我该如何使用它？
> xxx 如何实现？

* 列出来
* 列出来


## 它的缺点是什么？


## 有没有更好的实现方式呢？
> xxx 如何实现？

* 列出来
* 列出来




# Why  🤔
---
## 为什么需要它(为什么会有该问题)？ 
> 为什么

* 列出来
* 列出来





## 如果我不用它呢？
> 为什么

* 列出来
* 列出来



## 如果是自己来做，你会如何做呢？
> 如何实现？

* 列出来
* 列出来



## 有没有什么类似的工具或方式呢？
> 为什么

* 列出来
* 列出来


## 疑惑 🤔





