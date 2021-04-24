


# 参考文章
- [概念: 二叉树的讲解和实现 - js](https://www.imooc.com/video/15741)
- [视频: 根据中序遍历、后序遍历, 推导二叉树获取前序遍历](https://www.bilibili.com/video/BV154411W74C/?spm_id_from=333.788.recommend_more_video.-1)  
- [代码: 二叉树js实现](https://blog.csdn.net/ky1in93/article/details/88115210)  
- [js 链表](https://blog.csdn.net/weixin_43534005/article/details/88320838)  
- 


---
## 二叉树
> 二叉树是什么?
- 分类
  - 排序二叉树: 左树 < 中树 < 右树
- 遍历方式
  - 前序遍历: 根结点在左右树的前面;
  - 中序遍历: 根结点在左右树的中间;
  - 后序遍历: 根结点在左右树的后面;

> 常考点: 
- 常见题型: 前序遍历、中序遍历, 画出剩余遍历(后续遍历)
- 前序遍历、中序遍历、后续遍历的实现
- 查找最小值
- 查找最大值
- 查找某个值

### 它解决了什么问题?
- 查询快 和 移动快  
- 有序遍历查询快(logN - 二分法复杂度), 但增删值导致 n 次移动;
- 链表增删速度快(仅一次), 但查询慢;

由于上述两个缺点, 使用二叉树可以解决上述两个痛点: 查询快 和 移动快  

### 如何实现? 
> 排序二叉树  

```js

function BinaryTree() {
  this.root = null
}


BinaryTree.prototype.insert = function(data) {
  var createNode = function(data) {
    this.key = data;
    this.left = null;
    this.right = null;
  }

  var insertNode = function(parentNode, childNode) {
    if(childNode.key < parentNode.key) {
      if(!parentNode.left) {
        parentNode.left = childNode
      } else {
        insertNode(parentNode.left, childNode)
      }
    } else if(childNode.key > parentNode.key) {
      if(!parentNode.right) {
        parentNode.right = childNode
      } else {
        insertNode(parentNode.right, childNode)
      }
    }
  }

  var node = new createNode(data)
  
  if (!this.root) {
    this.root = node
  } else {
    insertNode(this.root, node)
  }

}

// 二叉树查找 - 最小值
BinaryTree.prototype.searchMin = function(nodes) {
  if(nodes) {
    var root = nodes
    while(root && root.left!==null) {
      root = root.left
    }
    return root.key
  }
}

// 二叉树查找 - 最大值
BinaryTree.prototype.searchMax = function(nodes) {
  if(nodes) {
    var root = nodes
    while( root && root.right!==null) {
      var root = nodes
    }
    return root.key
  }
}

// 二叉树查找某个值
BinaryTree.prototype.search = function(nodes, data) {
  if(nodes.key > data) {
    this.search(nodes.left, data)
  } else if(nodes.key(data)) {
    this.search(nodes.right, data)
  } else {
    return nodes
  }
}



// 生成二叉树
var nodes = [8, 3, 10, 1, 5, 14, 4, 6, 13];
var bt = new BinaryTree()
nodes.forEach(node=>{
  bt.insert(node)
})
console.log('bt.root: ', JSON.stringify(bt.root, null , 2));



// 最小追
console.log('bt.searchMin(): ', bt.searchMin(bt.root));


// 最大值
console.log('bt.searchMax(): ', bt.searchMax(bt.root));

// 搜索
console.log('bt.search(): ', bt.search(bt.root, 10));

```






## 链表

### 
> 是什么?
- 由一系列节点连续组成;
- 数据前后有关联性, 一个节点保存了上、下游节点的信息;
- 特点
  - 链首没有节点信息
  - 优点: 插入、删除复杂度低: O(1)
  - 缺点: 查询慢(线性,非顺序导致查找慢) 
- 分类
  - 单向链表: 表头为空(第一个只有下一个位置信息)
  - 双向链表: 表尾指向表头
  - 循环链表

> 为什么会有链表?
- 插入、删除速度快;
- 内存空间占用小: 可以存储任意类型;
- 弥补数组在内存、移动上的缺陷;

### 链表实现



```js

function linkList() {
  this.head = null;
  this.tail = null;
  this.length = 0;

  this.createNode = function(value) {
    this.value = value;
    this.next = null;
  }

}
linkList.prototype.append = function(value) {
  var newNode = this.createNode(value)
  if(!this.head) {
    this.head = newNode;
    this.tail = this.head
  } else {
    this.tail.next = newNode;
  }
}


linkList.prototype.insert = function(index, value) {
  if(index< 0 || index > this.length) return 
  var newNode = this.createNode(value)
  if(index === this.length) {
    this.append(value)
  }else if( index === 0 ) {
    newNode.next = this.head
    this.head = newNode
  } else {
    var currentNode = this.head;
    var curIndex = 0;
    while(curIndex < index) {
      curIndex++
      currentNode = currentNode.next
    }
    this.length++    
  }
}

linkList.prototype.log = function() {
  console.log(JSON.stringify(this.head, null, 2))
}



var ll = new linkList()
console.log('ll.head: ', ll.head);
ll.append(3)
console.log('ll.head: ', ll.head);
ll.log()





```