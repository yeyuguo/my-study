# 参考文章
[AAA](www)  
[BBB](www)  

## 关键词
**Number**、**NaN**



## 为什么 0.1 + 0.2 > 0.3 
 - 问题： 0.1 + 0.2 = 0.30000000000000004
    1. 计算过程会有： 禁止转换 和 对接运算；
    2. 进制转换默认是二进制：  var a=0.1; a.toPrecision(53) // 0.10000000000000000555111512312578270211815834045410156；
    3. 进制转换结果 计算 有误差；
    4. js 把误差结果，默认展示精度长度为 16 【 result.toPrecision(16) 】 有问题??? 精度 16结果是 0.3，应该是精度> 16
    5. 精度结果是 result.toPrecision(17)  === 0.1 + 0.2 


## ~ 运算符
```js
~0 // -1
~1 // -2
~2 // -3

```


## ~~ 运算符
该运算符可以解决: 输入数字, 输出字符

```js

~~'null' // 0
~~'undefined' // 0

+'null' // NaN

~~[1] // 1
~~[1, 2] // 0
```