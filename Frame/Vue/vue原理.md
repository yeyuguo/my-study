# xxx 学习指南
**先看教程，再记录  
切记不能，边看边记录**

# 参考文章
* [Vue 路由实现原理](https://zhuanlan.zhihu.com/p/37730038)
* [Vue 源码模拟实现](https://www.cnblogs.com/libin-1/p/6893712.html)
* [Vue 核心之数据劫持](https://juejin.im/entry/589ff26486b599006b3dea9b)
* [Vue 面试问题](https://mp.weixin.qq.com/s/9W7fE5IVEiY2R7RNg7liFg)  
* [vue2 的 data 为什么是函数?](https://zhuanlan.zhihu.com/p/259204617)  
* [js 引用类型 构造函数 实例 引用类型方法 对象方法 原型的概述](https://my.oschina.net/sallency/blog/552534)
* [为什么原型上的引用类型会影响实例?](https://www.cnblogs.com/fogwind/p/5750764.html)
* [vue3 响应式原理 与 vue2 响应式的对比](https://www.cnblogs.com/yf-html/p/13917215.html)
* [vue2 的 Object.defineProperty 的属性变化](https://youngzhang08.github.io/2018/07/30/%E4%B8%BA%E4%BB%80%E4%B9%88defineProperty%E4%B8%8D%E8%83%BD%E6%A3%80%E6%B5%8B%E5%88%B0%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E7%9A%84%E5%8F%98%E5%8C%96/)  


## 关键词
**vue2**、**构造函数**、**原型**、**引用类型**

`关键词1`： 解释 

## 为什么 vue 的 compose api 的 data 属性是一个函数?

简言: **组件构造函数上, 原型上 data 作为对象是引用类型, 修改会影响所有实例(组件)**

1. 根本原因: js 的构造器的原型上, 如果是一个对象, 其是引用类型;
2. 分析: 每个组件是一个构造函数;
3. data 属性作为构造函数上的原型对象, `xxx.prototype.data = {....}`
4. 影响: 该组件的实例修改 data 属性, 会影响该组件的所有实例;
5. 修复: 
   1. data 返回一个函数;
   2. vue 内部代理 `函数结果` 到 `data` 属性上; [源码: `mergeDataOrFn`]


```js
function Person() {
    this.innerName = 'test'
}
Person.prototype.str = 'str'
Person.prototype.obj = {
  a: 1
}
var p1 = new Person()
var p2 = new Person()

p1.innerName = '修改 innerrName'
p2.innerName // test

p1.str = '修改 str'
p2.str // str


// 重点: 这里的对象值在另外一个实例 p2 里被改变了, 验证了结论
p1.obj.a = 2
p2.obj.a  // 2
```



## js 为什么 原型对象 是引用类型?



### js 原型属性 和 自身(实例)属性 区别?  




## vue computed 为什么能缓存和响应式?
computed的计算属性有缓存机制，只有当其依赖的响应式数据发生变化时才会清空缓存重新计算结果

1. 其缓存机制本质是通过一个dirty属性控制的，只有dirty为true时才会重新计算结果替换缓存。
2. dirty只有当其响应式数据发送变化时才会设置为true，重新计算后会再次被设置为false




## vue2 为什么不能对数组和对象进行响应式监听?
```js
function obs(target, key, value) {
    return new Proxy(target, {
      get(target, key, receive) {
        // todo
        // const 
      }
    })

}

```


## vue3 的实现原理?