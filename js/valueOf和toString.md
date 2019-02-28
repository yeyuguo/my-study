# xxx 学习指南
**先看教程，再记录  
切记不能，边看边记录**

# 参考文章
> * [vlaueOf 和 toString 对比](https://www.jb51.net/article/74888.htm)
> * [MDN valueOf 讲解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
> * [BBB](www)

## 关键词
**valueOf**、**toString**、**关键词3**、**关键词4**

`关键词1`： 解释  

`关键词2`： 解释  








> **疑惑 🤔**

 What 🐎 
---
看山是山
## xxx 基础概念是什么？
> valueOf 返回真实值， toString 返回字符串

**总结列表**
* valueOf 优先数字计算, 并且不进行类型转换
* toString 是用于字符相加，对伪对象进行转换成对象


```js
var num = Number('3.0')
var value = num.valueOf() // 3
var string = num.toString() // '3'

// typeof value
console.log('typeof value: ', typeof value);
// typeof string
console.log('typeof string: ', typeof string);

// value == string // true
console.log('value == string: ', value == string);


var date = new Date()
// date.valueOf()
console.log('date.valueOf(): ', date.valueOf());
// date.toString()
console.log('date.toString(): ', date.toString());

// typeof date.valueOf() 
console.log('typeof date.valueOf() : ', typeof date.valueOf() );
// typeof date.toString()
console.log('typeof date.toString(): ', typeof date.toString());
// date.toString() == date.valueOf() // false
console.log('date.toString() == date.valueOf(): ', date.toString() == date.valueOf()); 


```

### 1. 概念 - valueOf 是什么?

#### valueOf
> 转成真实值


**总结列表**
* 默认是转成真实值,不做类型转换
* 有数字计算，首先转成数字；
* 转换 `new String()`、`new Boolean()`、`new Number()` 的返回对象变成真实值
* 函数使用 valueOf() 可以查看源码并执行
```js
var fn = function(a,b){
    return a+b
}
* 进行对比时候， xx.valueOf() 先转换成字符, 然后与另外一个对比;
// fn.valueOf()
console.log('fn.valueOf(): ', fn.valueOf());
```
* 转换 symbol 为当前值；
* 


valueOf()方法：返回指定对象的原始值。

对象|	返回值 |
---|---     | ---                   | ---
Array |		数组的元素被转换为字符串，这些字符串由逗号分隔，连接在一起。其操作与 Array.toString 和 Array.join方法相同。
Boolean	| Boolean 值。
Date |	存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
Function |		函数本身。
Number |		数字值。
Object |		对象本身。这是默认情况。
String |		字符串值。


```js

var num = Number('3.0')
// num.valueOf() + 1
console.log('num.valueOf() + 1: ', num.valueOf() + 1);

// num.toString() + 1
console.log('num.toString() + 1: ', num.toString() + 1);

var str  = '3'
// str.valueOf() + 1
console.log('str.valueOf() + 1: ', str.valueOf() + 1);

```

**实际场景使用**
```js
//数组去重复

var ary = [1,2,2,3,3,4.2,4.0]
function removeRepeat_obj(ary) {
    const _ary = [...ary]
    let obj = {}
    _ary.forEach(function (d) {
        if (!obj.hasOwnProperty(d)) {
            obj[d] = null;
        }
    })
    // return Object.keys(obj) // 数组里的内容会是字符
    return Object.keys(obj).map(d => Number(d).valueOf())
}

// removeRepeat_obj(ary)
console.log('removeRepeat_obj(ary): ', removeRepeat_obj(ary));

```

#### toString() 
> 伪对象调用该方法进行类型转换

**总结列表**
* toString() 返回的是字符类型
* number 可以转成 string
* boolean 可以转成 string
* object 可以转成 string

```js

var num = 3
// num.toString() + 1
console.log('num.toString() + 1: ', num.toString() + 1);


var bool = false
// bool.toString()+1
console.log('bool.toString()+1: ', bool.toString()+1);

var obj = {a:1}
// obj.toString() + 1
console.log('obj.toString() + 1: ', obj.toString() + 1);



var str = 'W3cplus'; 
// String(str)
console.log('String(str): ', String(str));
// typeof String(str) 
console.log('typeof String(str) : ', typeof String(str) );
// str.toString()
console.log('str.toString(): ', str.toString());
// typeof str.toString()
console.log('typeof str.toString(): ', typeof str.toString());
// new String(str)
console.log('new String(str): ', new String(str));
//! typeof new String(str) // object
console.log('typeof new String(str): ', typeof new String(str));

// (new String(str)).valueOf()
console.log('(new String(str)).valueOf(): ', (new String(str)).valueOf());
```


### 2. 价值 - 它解决了什么问题?
> valueOf 返回真实值，非字符类型的值，主要是为了获取伪对象的实例对象的真实值
```js
// (new String("3")).valueOf()
// new String("3")
console.log('new String("3"): ', new String("3"));
console.log("(new String('3')).valueOf(): ", (new String('3')).valueOf());
```

**总结列表**
* valueOf 用的少，但当需要预期值是(new String()) 时，valueOf 可以解决问题；
* valueOf 返回真实值
* valueOf 转换 new String(xx) 得到得对象值
* String 可以属性和方法


### 3. 原理 - 它的实现原理是什么？
> 自定义返回了该原型上的方法 valueOf

```js

Number.prototype.valueOf = function(){
    return parseFloat(this) + 1
}
var a = Number('3')
// a.valueOf()
console.log('a.valueOf(): ', a.valueOf());
```



**总结列表**
* 列出来
* 列出来

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

