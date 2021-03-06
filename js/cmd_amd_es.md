参考文档
1. [AMD 定义](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
2. [为什么需要AMD](http://requirejs.lanvige.com/docs/whyamd.html)  
3. [js module 加载进阶](http://huangxuan.me/js-module-7day/) 
4. [关于Function.prototype.toString的野生小技巧](https://leeluolee.github.io/2015/04/13/function-to-string/) 使用 commonJS 实现 define
5. [AMD、commonJS、CMD、UMD、ESM 的好文章](https://www.jianshu.com/p/a21495ffd0c7)
6. [CMD 和 ESM 区别](https://blog.csdn.net/qq_37918241/article/details/104782049)

`示例请看 js/cmd_amd_es/`



## 模块规范是什么?
- 好处
1. 划分功能模块;
2. 封装作用域;
3. 提高功能模块的服用性, 降低系统复杂性, 减少维护成本;
4. 

## 模块规范协议有哪些?
1. CommonJS
2. AMD 和 RequireJS 协议
3. CMD 协议
4. UMD 协议
5. ESM 协议



## CMD
- 环境
  1. 在 node 端使用；

- 为什么需要它？
  3. 目的是把功能模块化，模块内的变量方法等都是私有的，达到解耦的目的;


- 特征  
  1. 同步引包；
  2. 模块输出是值拷贝, 模块内的改变, 不影响输出值;
  3. 多次引入，只加载一次，运行结果设置成缓存数据, 若要模块重新执行,需需清理缓存；
  4. 缺点：  
    1. 浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题，不适用于浏览器加载机制
    2. CJS 没有依赖引用；
    3. 不能动态加载；

- 导出： 
  1. `exports`  
  默认不写： 返回`{}`
  2. `exports.xxx = xxx`
  3. `module.exports`  
  默认不写： 返回`{}`
  4. `module.exports = xxx`

  同时存在，`module.exports` 输出优先级大于 `exports`,


- 引入： 
引入包，`xxx` 不能是变量；  

- exports 导出时
```js
// xxx.js 
exports.xxx = 'a'

// 引入文件
var cmd = require(xxx);  // cmd 是一个对象， xxx 是一个key值了
cmd.xxx
``` 
- module.exports 导出时 
```js
// xxx.js
module.exports = xxx

// 引入文件
var cmd = require(xxx); // cmd 是 导出的 xxx

```

## AMD (Asynchronous Module Definition)
不是标准规范，使用需引入相应的包，如 require.js 等一些包
- 为什么需要它？   
  1. 解决多个 js 文件的依赖关系；
  2. 可以使用动态加载(使用变量)；

- 执行环境
  1. 在 browser 端；
  2. 部分库支持能在 node 运行，例如 r.js (转换成 commonJS 代码为 define 代码) 

- 特征  
  1. `异步`引包；
  2. 和浏览器的异步加载环境一致；

- 如何 Fuction.prototype.toString() 能实现 AMD 的方法？
```js
todo
```

- 导入
  1. `define('模块名xxx',['资源a','资源b'],function(xxx,a,b){})`
  2. 可以利用简单的 cmd 实现的  define AMD；

- 实现的原理
  1. 简单的使用 fn.toString() 获取函数字符内容；
  2. 使用正则表达式 ` /\brequire\(["'](\w+)["']\)/g;` 来返回 资源包的列表
```js
define(function(require){
    /** 该处结果是，返回一个数组列表的依赖包 : ['资源a','资源b']*/
    var a = require('a');
    var b = require('b');

    /**
     * 该处返回函数，相当于 ，第一种方式的最后一个参数，是一个回调函数处理；
     */
    return function(){
        // 对 a、b 进行处理；
    }
})

// 另外一种实现：
define(function (require, exports, module) {
    var a = require('a'),
        b = require('b');

    exports.action = function () {};
});
```

- 引入：
1. 通过 `require(['xxx'],function(x){})` 方式按需加载模块包；


## AMD 和 CMD 的区别?
AMD: 依赖前置;  
CMD: 依赖就近;

```js
// AMD
define(['./a','./b'], function (a, b) {
 
    //依赖一开始就写好
    a.test();
    b.test();
});


//CMD
define(function (requie, exports, module) {
     
    //依赖可以就近书写
    var a = require('./a');
    a.test();
    ...
    //软依赖
    if (status) {
     
        var b = requie('./b');
        b.test();
    }
});
```




## ESM
- 使用环境：
  1. brower 使用；
  2. node 端使用

- 特征  
  1. 异步引包
  2. `import()` 能做按需加载等
  3. 模块输出的是值引用;
  4. import 只引入一次;
  5. 变量提升, 定义在顶部, 最先执行
  6. 只有执行才能得到代码结构

- 导出：
  1. `export const a = xxx`
  2. `export {a,b}` 
  3. `export default a`    

- 引入：
  1. `import {a} from 'xxx'` 
  2. `import {a,b } from 'xxx'`
  3. `import a from 'xxx'`








## UMD 协议
它是 CMD 和 AMD 的合并