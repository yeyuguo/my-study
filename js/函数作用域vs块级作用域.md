*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [ ] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [ ] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？

# 参考文章
> * [JavaScript的函数作用域和块级作用域概念理解](https://imweb.io/topic/5665683bd91952db73b41f5e)
> * [ES6 中 let 暂时性死区详解](https://segmentfault.com/a/1190000015603779)

## 关键词
`块级作用`、`块级作用域`、`函数作用域`

`暂时性死区概念`：  当程序的控制流程在新的作用域（module function 或 block 作用域）进行实例化时，在此作用域中用let/const声明的变量会先在作用域中被创建出来，但因此时还未进行词法绑定，所以是不能被访问的，如果访问就会抛出错误。因此，在这运行流程进入作用域创建变量，到变量可以被访问之间的这一段时间，就称之为暂时死区。


## 作用域分类？
* 全局作用域： 函数外，任何地方都能访问倒；
* 函数作用域： 函数内的作用域，只能函数内访问外部，相反不能； 
* 块级作用域: ES6 语法，let、const 在块级作用域`{}`内是局部的；


## 函数作用域 是什么
* 由 **函数** 封闭作用域范围;
* 函数之外，会立即被销毁, 函数外部不能访问到其函数内变量；
* 块作用域变量是包含在函数内的；

> 函数作用域用途  
* 函数外获取不到函数内部的变量值，封闭执行环境，防止污染外部环境；
* 每个函数调用时,会自动获取两个变量: this 和 arguments 参数, 执行作用域里搜索这两个参数, 只会搜索到具有该属性的活动对象为止;
```js
(function(){
    for(var i=0;i<10;i++){
        // ... 处理
    }
})()
alert(i) // 报错

```


```js
var arr = [];
for(var i = 0; i < 2; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1](); // 打印结果是异常的
```

> 根据函数的作用链，查找到只有一个变量i，打印时候，被提升覆盖过，所以打印的是2；


## 块级作用域 是什么
* 由 **花括号** 封闭作用域范围
* 花括号之外，会立即被销毁；
* 花括号之外，都不能访问到其块级变量；
* (let、const )变量不能被提升；


> 块级作用域的用途
* 让 for循环之类的块级变量，作用域限制在花括号内部，花括号之外不能被访问到；

```js
(function(){
    for(var i=0;i<10;i++){
        setTimeout(function(){
            console.log(i)
        })
    }
})()
// 输出的结果异常，是由于没有块级作用域的原因；
```


## 暂时性死区  

暂时性死区(temporal dead zone)：先使用, 后声明, 会报错;

> var 声明
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


> let 声明
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

> 为什么会有暂时性死区? 而 var 不会有的 原因: 
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
  



> es5 块级作用域问题

```js
// 块级作用域问题
function output(count) {
  for(var i=0; i<count; i++){
    setTimeout(function(){
      console.log(i)
    })
  }
  console.log('result:', i)
}
// output(3)


// 解决 es5 块级作用域问题
function output_es5(count) {
  for(var i=0; i<count; i++){
    (function(n){
      setTimeout(function(){
        console.log(n)
      })
    })(i)
  }
  console.log('result:', i)
}
// output_es5(3)

// 解决 es5 块级作用域问题
function output_es6(count) {
  for(let i=0; i<count; i++){
    setTimeout(function(){
      console.log(i)
    })
  }
}
output_es6(3)
```



## this 作用域
`高级教程三 7.2.2`
this 作用域是什么
* window 全局下: window === this;
* 作为对象函数执行: this 等于该对象;

### 案例
```js
// 匿名函数的 this 指向全局
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name; 
        };
    } 
};
```


```js
// 模拟 vue 的 methods 传递到子组件执行, this 作用域不会被改变原因??
var obj = {
    a: 1,
    methods: {
        output(){
            console.log(999)
            console.log(this.a)
        }
    }
}


var obj2 = {
    methods: {
        output(){
            obj.methods.output()
        }
    }
}
obj2.methods.output()
```





