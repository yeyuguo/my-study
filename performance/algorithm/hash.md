
# 参考文章
[JavaScript数据结构——字典和散列表的实现 [www] ](https://www.cnblogs.com/jaxu/p/11302315.html)  
[《JavaScript数据结构——链表的实现与应用》](www)  

## 关键词
**散列表**、**hash表**、**字典**





## 散列表是什么?
是一种由字典的key, 经过固定算法变成一个数字 index, 然后把 dictionary 里的 value 存放到数组的特殊索引上. 只要 key 不改变, 下次计算出来的 key 不会改变, 所以能直接取到对应数值;


## 为什么要用散列表?
- 旧 dictionary 的效率低, 需要遍历才能查找、拿到字典对应 value 值;
- 数组的查找、删除效率高


## 散列表是如何实现的?

```js

console.log("'abc'.charCodeAt(a): ", 'abc'.charCodeAt('a'));
console.log("'abc'.charCodeAt(a): ", 'abc'.charCodeAt('a'));
console.log("'abcd'.charCodeAt(a): ", 'abcd'.charCodeAt('a'));
console.log("'cba'.charCodeAt(a): ", 'cba'.charCodeAt('a'));

function createHashCode(key){
  let hash = 5381;
  for(let i=0; i<key.length; i++){
    hash = hash * 33 + key.charCodeAt(i);
  }
  // 为什么是 1031 的余数?  是为了解决散列hash冲突问题
  return hash % 1013; 
}

console.log(createHashCode('abc'))
console.log(createHashCode('cba'))



```

### 为什么会有固定字符在计算 hash 的公式里?
### 为什么是 1031 的余数?
### 会存在 hash 结果只一样的吗? 例如 'abc' 和 'cba'
