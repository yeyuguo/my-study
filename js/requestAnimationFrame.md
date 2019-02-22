参考文章：  
1. [张旭鑫 requestAnimationFrame 讲解,包括一些 css 动画函数](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
2. [极限控制刷新性能 -- 非常全面的性能讲解](https://zhuanlan.zhihu.com/p/30078937)
3. [MDN requestAnimationFrame 解释](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
4. [MDN requestIdleCallback 解释](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
5. [setTimeout 引起的过度渲染解释比较好](https://segmentfault.com/a/1190000012175376)


# requestAnimationFrame



## 是什么？
* 它是在浏览器绘制下一帧画面之前，调用此方法；也就是说，`浏览器的每一帧的最后结尾时，来执行这个函数`；  
* 浏览器的帧率一般说 1000ms / 60 = `16.7 ms/次`，requestAnimationFrame `执行周期` 就是这个值
* `调用一次才会执行一次`，如果要形成连续的，需要写递归实现；
* `不在当前标签页时，不会执行`，因为不会绘制画面，所以不会执行；
* 参数： `DOMHighResTimeStamp` 是传入的参数，表示 requestAnimationFrame `被触发的时间`,`单个帧内`，通过 requestAnimationFrame 传入多个回调函数，该参数都是同一个值；

## 为什么要使用它？
* `它可以保证每一帧都能执行一次这个函数`;
* setTimeout 和 setInterval `只是保证进入队列的时间，但是不能保证执行`是在一帧内完成;
* css3 的动画不能满足全部场景，使用 requestAnimationFrame 来弥补；例如 `scrollTop 的平滑滚动效果`；

## 如果不使用它，该如何保证性能和函数执行？
* 使用 setTimeout 实现，间隔时间建议 16.7 ms；
* 使用 setTimeout `缺点`，定时器定时网队列里加入执行函数，容易造成过度绘制；

## 如何使用

```js
function print(){
    console.log('yes')
}

var cancelRAF = null;
function renderPer(){
    (function _temp(){
        print()
        cancelRAF = window.requestAnimationFrame(_temp)
    })()
}
// 取消 递归
// window.cancelAnimationFrame(cancelRAF)
```



# requestIdleCallback
## 是什么？
* 它是浏览器在 `空闲时，才会去执行` 的函数;
* 该函数的存在意义：保证浏览器的性能，函数的优先级不高；

## 如何使用

```js
function print(){
    console.log('yes')
}

var cancelRAF = null;
function renderPer(){
    (function _temp(){
        print()
        cancelRAF = window.requestIdleCallback(_temp)
    })()
}
// 取消 递归
// window.cancelIdleCallback(cancelRAF)
```





# 帧是如何实现的
* 主线程 ： `JS执行 -> 合成层 componsite` 的操作；  
* 合成线程 ： `用户交互反馈` -> `主线程操作` -> `主线程结果` -> 以 `commit 形式给 GPU` 渲染到页面；  

## 主线程的过程是什么样的？
` JS执行 -> Style计算 ->  layout布局 -> Painting 绘制 -> Composite 合成 `

## 每帧的过程

>合成线程接收信息
* 用户的交互操作；
* 进入主线程
> 进入主线程开始
* `JavaScript`：包含与视觉变化效果相关的js操作。包括并不限于：dom更新、元素样式动态改变、jQuery的animate函数等。
* `Style` ：样式计算。这个过程，浏览器根据css选择器计算哪些元素应该应用哪些规则，然后将样式规则落实到每个元素上去，确定* 每个元素具体的样式。
* `Layout` ：布局。在知道对一个元素应用哪些规则之后，浏览器即可开始计算它要占据的空间大小及其在屏幕的位置。
* `Painting` ：绘制。绘制是填充像素的过程。它涉及绘出文本、颜色、图像、边框和阴影，基本上包括元素的每个可视部分。绘制一般是在多个表面（通常称为层）上完成的。(paint和draw的区别：paint是把内容填充到页面，而draw是把页面反映到屏幕上)
* `Composite` ：合成。由于页面的各部分可能被绘制到多层，由此它们需要按正确顺序绘制到屏幕上，以便正确渲染页面。对于与另一元素重叠的元素来说，这点特别重要，因为一个错误可能使一个元素错误地出现在另一个元素的上层。

> 主线程返回结果，回到合成线程
* `commit 给 GPU`: 此处的 `合成线程` 接收 主线程的结果， 以 commit 方式传递信息给 GPU
> GPU 独立计算合成层
* `GPU 渲染画到网页上`
