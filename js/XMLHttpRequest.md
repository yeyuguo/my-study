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
> * [MDN xmlHTTPRequest 请求](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
> * [BBB](www)

## 关键词
`xmlHTTPRequest`、`关键词2`、`关键词3`、`关键词4`

关键词1： 解释
关键词2： 解释

# What 🐎

---
## 它是什么，基础概念是？
> xmlHTTPRequest 是什么

* 浏览器端向服务端发送请求，获取数据过程，不用刷新浏览器；
* 可以只更新局部的内容；

简单模拟实现
```js
function XHR({
    url,
    method,
    fn
}){
    // 建立
    const xhr = new XMLHttpRequest()
    // 设置请求参数
    xhr.open(method, url, true)
    // 设置表头
    // xhr.setRequestHeader('Accept','application/json') 默认是 * /* 
    // 设置成功回调
    xhr.onreadystatechange = function(){
        if(
            // XMLHttpRequest.DONE == 4
            xhr.readyState== XMLHttpRequest.DONE  && 
            xhr.status == 200 || xhr.status == 304
        ){
            let resText = isJson(xhr.responseText)
            fn(resText)
        }
    }
    // 开始触发
    xhr.send()
}


XHR({
    method:'GET',
    url:'https://api.github.com/users/yeyuguo/repos',
    fn:data=>{
        console.log({data})
    }
})

/*转json*/
function isJson(txt,types='Object'){
    if(typeof txt =='string'){
        try{
            return isJson(JSON.parse(txt))
        }catch{
            return {'error:':'返回内容非 json 格式'}
        }
    }
    // 具体判断是数组还是对象
    var reg = /[\w* + ('Object'||'Array'||types) + \w*]/g
    var type = Object.prototype.toString.call(txt)
    if(reg.test(type)){
        return txt
    }
}
```

## 它解决了什么问题?

> xxx 是什么
* 列出来
* 列出来


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





