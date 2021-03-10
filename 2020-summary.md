参考文章
1. [面试75题集锦](https://mp.weixin.qq.com/s/0pL1fMOvl_61pQ5ossUFdA)
2. 


## 基础知识


 > #### js 的7种类型和新增类型  

所有类型： object、string、number、function、null、undefined、Boolean  
对象类型： object、array、date  
不含值类型： null、undefined

> #### == 和 === 的区别？
- == js 隐式转化，会先把类型转换成同一个， 再对比值；
- === 是严格对比值，不转换类型；

 > #### 字符最快转换成数字方式  

字符使用 +

```js
+'1' // 1
+'null' // NaN

~~'1' // 1 
~~'null' // 0

```

> #### 隐式转换的具体定义和用处？


 > #### undefined 和 null 的区别  

null 不占有空间；  
undefined 是无值的默认值；


> #### 什么是 DOM  

简单说： 访问操作 html节点的接口；  
DOM 是文档-对象-模型，是一种描述html元素的树状结构；   
可以使用 js 访问 html 的树状结构；  
是一种独立于编程语言的代码，可以被 java、js 和其他访问操作；  
javascript 调用： document.queryxxx

> #### 什么是 BOM

简单说：访问操作浏览器的接口；  
常用接口是： window、location、history、screen 等信息；   
javascript 调用： window.xxx  


> #### 事件传递【重点】  
[参考文章](https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html)  

##### 基本概念  
有事件作用于节点时，有 冒泡流【IE提出】 或 捕获【网景提出】；  
w3c 同时兼容两种事件流，早期IE浏览器只有冒泡； 

在绑定的一个事件里，只会发生其中一个事件流；

##### 事件会经历3个阶段：  
- 捕获： 从上往下，从 window 向下捕获： event.target，到达目标元素；  
- 到达目标元素： 事件已达到目标元素；  
- 冒泡： 从下往上，从当前元素向父节点不断传递；

最后还回到起点 window

##### 事件的绑定js实现【捕获/冒泡】
- onclick: 所有浏览器保持统一，只有冒泡，旧事件会被替代；  
- addEventListener: 可以自由设置 捕获 或 冒泡；缺点是早期 IE 只有冒泡；

因为根据 addEventListener 的第三个参数只能是二选一；  

**addEventListener方法具有第三个可选参数 useCapture**  
其默认值为false，事件将在 `冒泡阶段`中发生;  
如果为true，则事件将在 `捕获阶段` 中发生。


##### e.target 和 e.currentTarget 区别？
**e.target** : 目标元素；  
**e.currentTarge**: 冒泡/捕获 阶段的执行元素；

##### 委托事件是根据什么事件流实现的？

是根据冒泡，自下而上，在最上层的元素上绑定事件，统一处理；    

优点： 解决性能问题，减少绑定多个事件的大小占用的优点；


##### 目标元素执行顺序是不是按照 事件阶段 顺序？？？？？
不会严格按照 捕获 - 到达目标 - 冒泡 的顺序来处理；  
真实情况： 目标元素的执行顺序，是按照绑定的顺序处理的；【参考文章里有案例，先绑定在什么阶段就会先执行】   
真实业务里，如果一个元素绑定了两次事件，执行的顺序至关重要，需要知道这个知识点；   

##### 如何阻止冒泡？
- addEventListener: 使用 e.stopPropagation 都能阻止 捕获/冒泡；

特点： stopPropagation 在同一个元素绑定多个事件时，stopPropagation **执行后会阻止掉该元素其他绑定事**件；【**具体阻止哪些，和事件阶段绑定顺序有关系** 】


##### 如何阻止默认行为？
- return e.preventDefault    标准技术
- return e.returnValue     早期IE的
- return false 阻止对象属性的事件【onclick 绑定事件】

```js
function cancelHandler(event){
    var event=event||window.event;//兼容IE
    
    //取消事件相关的默认行为
    if(event.preventDefault)    //标准技术
        event.preventDefault();
    if(event.returnValue)    //兼容IE9之前的IE
        event.returnValue=false;
    return false;    //用于处理使用对象属性注册的处理程序
}
```




### 作用域
> 作用域分类？
* 全局作用域： 函数外，任何地方都能访问倒；
* 函数作用域： 函数内的作用域，只能函数内访问外部，相反不能； 
* 块级作用域: ES6 语法，let、const 在块级作用域`{}`内是局部的；


#### 为什么会有暂时性死区? 而 var 不会有?


var 声明
```js

var a = 1;
function A() {
    console.log(a);
    var a = 2;
    console.log(a)
}
console.log(a) // 1
A() // undefined   和 2
console.log(a)  // 1

```


let 声明
```js

var a = 1;
function A() {
    console.log(a);
    let a = 2;
    console.log(a)
}
console.log(a) // 1
A() // 报错
console.log(a) 

```

原因: 
* 进入作用域内, 第一步做初始化
* var 初始化
  * 全局时
    * 分配到 window 的对象属性下
  * var 声明提升变量
    * 未有形参
      * 被创建, 被初始化
      * 内存分配空间
      * 进行赋值 undefined
    * 有形参
      * 不影响干扰行参的使用
* esm 初始化(let、const)
  * 全局时
    * 分配到非 window 下
  * esm 规定初始化过程是执行上下文过程
  


#### call/apply/bind 的手动实现；
- 变更 this 的指向；
- 接受不同参数；

// 最基础的 call 实现
```js

var test = {
    name: 'test',
}

var obj = {
    name: 'obj',
    fn: function(){
        console.log(this.name);
        if(arguments && arguments.length){
            console.log('参数:', arguments)
        }
    }
}
obj.fn() // obj
obj.fn.call(test) // test

// es6
Function.prototype.myCall = function(func, ...arg){
    func._fn_ = this;
    func._fn_(...arg);
    delete func._fn_;
}

obj.fn.myCall(test, 'hi')


// call实现 es5
Function.prototype.myCall2 = function(){
    var args = []
    for(var i=1;i<arguments.length; i++){
        args.push( 'arguments[' + i + ']' )
    }
    console.log({args})
    var func = arguments[0]
    func._fn_ = this;
    eval('func._fn_('+eval(args)+')')
    delete func._fn_;
}

obj.fn.myCall2(test, 'call2')

// bind 实现

Function.prototype.myBind = function(func){
    var that = this;
    return function(){
        let args = []
        for(let i=0; i< arguments.length; i++){
            args.push('arguments['+i+']')
        }
        func._fn_ = that;
        let value = eval('func._fn_('+args+')');
        delete func._fn_;
        return value;
    }
}
var newFunc = obj.fn.myBind(test);
newFunc('bind test');
```





#### 理解作用域和闭包，有什么帮助？

- 理解 this 作用域范围；
- 闭包： 只会保存执行当前的作用域；
- 变更作用域（apply、call) 函数应用；
- todo 其他作用？？？？？

```js
// 理解函数作用域
var str = 'foo'
var obj = {
    str: 'bar',
    test: function(){
        console.log(this.bar)
    }
}

console.log(obj.test()) // bar
var func = obj.test
func() // foo 等价于 window.func();
// 再换个表示方式
(false || obj.test)(); // 输入什么
```

#### IIFE 对作用域有什么作用？

- 封闭函数的作用域，为每一次的闭包创建新的作用域；
- 保存执行结果；
- 性能较好（没有原型链的引用）；


```js
// 常用手法1: 创建新的作用域
var li = document.querySelectorAll('.list-group > li');
for (var i = 0, len = li.length; i < len; i++) {
   (function (currentIndex) {
      li[currentIndex].addEventListener('click', function (e) {
         console.log(currentIndex);
      })
   })(i);
}


// 常用手法2，保存当前执行结果
const graphUtility = (function () {
  function createGraph() {
     // createGraph logic here
  }
  function drawGraph() {
     // drawGraph logic here
  }
  return {
     createGraph,
     drawGraph
  }
})
```


### 异步问题
#### promise 实现方式
[参考promise文章 ](https://www.jianshu.com/p/27735abb91eb)
```js
// 最简单的实现，可能不完整
function promise(fn){
    var that = this;
    that.value = '';
    that.reason = ''
    that.status = 'pending'
    that.onFulfilledCb = [];
    that.onRejectedCb = [];

    resolve = function(value){
       if(that.status === 'pending'){
           setTimeout(function(){
               that.status = 'fulfilled'
               that.value = value;
               that.onFulfilledCb.map(fullcb => {
                   fullcb(that.value);
               })
           }, 0)
       } 
    }


    reject = function(reason){
        if(that.status === 'pending'){
            setTimeout(function(){
                that.onRejectedCb.map(rejcb => {
                    that.status = 'reject';
                    that.reason = reason;
                    rejcb(that.reason);
                })
            }, 0)
        }

    }

    fn(resolve, reject);


}



promise.prototype.then = function(onFulfilled, onRejected){
    var that = this;
    if(that.status === 'pending'){
        var promise2 = new Promise(function(resolve, reject){
            that.onFulfilledCb.push(value => {
                onFulfilled(value);
            })
            
            that.onRejectedCb.push(value => {
                onRejected(value);
            })
        })

        return promise2
    }
}
```


升级版本的promise，then 可以接收 promse
```js


function promise(fn){
    var that = this
    that.value = ''
    that.status = 'pending'
    that.fullfilledCb = []

    var resolve = function(value){
        if(that.status === 'pending'){
            setTimeout(function(){
                that.status = 'fullfiled';
                that.value = value;
                that.fullfilledCb.forEach(function(cb){
                    cb(value)
                })
            })
        }
    }
    
    fn(resolve)
}


promise.prototype.then = function(fn){
    var that = this
    if(that.status== 'pending'){
        return new promise( function(resolve,reject){
            that.fullfilledCb.push(function(value){
                var runResolve = fn(value)
                if(runResolve instanceof promise){
                    return runResolve.then(function(value2){
                        resolve(value2);
                    })
                }else{
                    resolve(runResolve)
                }
            })
        })
    }
}

new promise(function(resolve){
    setTimeout(function(){
        resolve('a')
    },1000)
}).then(function(value2){
    console.log('value2: ', value2);
    return new promise(function(resolve){
        setTimeout(function(){
            resolve(value2)
        },2000)
    })
}).then(function(value1){
    console.log('value1: ', value1);
    return value1
})

```

##### 为什么要在 then 里返回一个 promise 的实例？

- 如果返回 this,会导致每一个的 status 都是同样的







> #### babel工作原理
[babel 参考文章](https://www.jianshu.com/p/e9b94b2d52e2)  

babel 只是转义js版本，仅仅作为转义器；  
polyfill：浏览器端弥补缺失 js 新语法；
shim： 浏览/node 弥补缺失 js 新语法；

- 解析：parsing 
- 转义：transforming【重点，开发关注点】
- 生成：generating




