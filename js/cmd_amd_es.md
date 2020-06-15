参考文档
1. [AMD 定义](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
2. [为什么需要AMD](http://requirejs.lanvige.com/docs/whyamd.html)  
3. [js module 加载进阶](http://huangxuan.me/js-module-7day/) 
4. [关于Function.prototype.toString的野生小技巧](https://leeluolee.github.io/2015/04/13/function-to-string/) 使用 commonJS 实现 define


`示例请看 js/cmd_amd_es/`


## 什么是 CMD、AMD、ES 模块加载器


### CMD
> 环境
- 在 node 端使用；

> 为什么需要它？
- 目的是把功能模块化，模块内的变量方法等都是私有的，达到解耦的目的;


> 特征  
- 同步引包；
- 缺点：  
  1. 浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题，不适用于浏览器加载机制
  2. CJS 没有依赖引用；
  3. 不能动态加载；
- 多次引入，只加载一次，除第一次，都是取的缓存数据；

> 导出： 
- `exports`  
默认不写： 返回`{}`
- `exports.xxx = xxx`
- `module.exports`  
默认不写： 返回`{}`
- `module.exports = xxx`

同时存在，`module.exports` 输出优先级大于 `exports`,


>引入： 

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

### AMD (Asynchronous Module Definition)
不是标准规范，使用需引入相应的包，如 require.js 等一些包
> 为什么需要它？   
- 解决多个 js 文件的依赖关系；
- 可以使用动态加载(使用变量)；

> 环境v
- 在 browser 端；
- 部分库支持能在 node 运行，例如 r.js (转换成 commonJS 代码为 define 代码) 

> 特征  
- 异步引包；
- 和浏览器的异步加载环境一致；

> 如何 Fuction.prototype.toString() 能实现 AMD 的方法？
```js
todo
```

>导出：
- `define('模块名xxx',['资源a','资源b'],function(xxx,a,b){})`
- 可以利用简单的 cmd 实现的  define AMD；
实现的原理：
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

> 引入：
- 通过 `require(['xxx'],function(x){})` 方式按需加载模块包；

### ES
> 环境：
- brower 使用；
- node 端使用

> 特征  
- 异步引包
- `import()` 能做按需加载等

> 导出：
- `export const a = xxx`
- `export {a,b}` 
- `export default a`    

> 引入：
- `import {a} from 'xxx'` 
- `import {a,b } from 'xxx'`
- `import a from 'xxx'`






