*学习掌握概览*

等级 | What        | Why                   | How
---|---     | ---                   | ---
- [x] 初级 [怎么做] | - [ ] 基础概念 | - [ ] 为什么需要它             | - [ ] 基本使用
- [x] 中级 [为什么] | - [ ] 类比概念 | - [ ] 如果我不用它呢           | - [ ] 有没有什么类似的工具或方式呢
- [ ] 高级 [自己的] | - [ ] 自己概念 | - [ ] 有没有更好的实现方式呢？ | - [ ] 如果是自己来实现，你会如何做呢？


# 参考文章
> * [神秘的 shadow-dom 浅析](http://www.cnblogs.com/coco1s/p/5711795.html)
> * [ shadow-dom 接口使用例子](https://aotu.io/notes/2016/06/24/Shadow-DOM/index.html)
> * [MDN-shadow-dom](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/%E5%BD%B1%E5%AD%90_DOM)

# What

---
## 它是什么，做什么的？
> 它是浏览器，为了简化和隔离 web 不同组件功能；
* 例如 vedio 的封装，对开发者，只有一个 src 设置，就有播放暂停等功能；
* vedio 可以通过 js 或者 css 设置来修改 shadow DOM 的内部属性；

```js
<p id="hostElement"></p>
<p id="shadowRoot"></p>

var shadow = document.querySelector('#hostElement').attachShadow({
    mode: 'open'
});
shadow.innerHTML = '<p>Here is some new text</p>';
shadow.innerHTML += '<style>p { color: red; }</style>';


var shadow2 = document.querySelector('#hostElement').createShadowRoot()
shadow2.innerHTML = '<p>测试是否和上一个 p 标签影响颜色</p>';
shadow2.innerHTML += '<style>p { color: blue; }</style>';

```



# How

---
## 我该如何使用它？
> 操作已有 DOM；
附加上 shadow DOM
* `domElement.attachShadow({mode:'open'})`

> 操作新建 dom；
* 通过 js 创建 DOM 节点后，然后 attachShadow 附加 shadow DOM 
```js
var shadow2 = document.createElement('p');
shadow2.setAttribute('id', 'shadowRoot')
// shadow dom 影子节点 ---- start ---
shadow2sd = shadow2.attachShadow({
    mode: 'open'
})
shadow2sd.innerHTML = '<p>测试是否和上一个 p 标签影响颜色</p>';
shadow2sd.innerHTML += '<style>p { color: blue; }</style>';
// shadow dom 影子节点 ---- end ---
document.body.appendChild(shadow2)
``` 

* 设置 attachShadow 属性 {mode:'open'}
open:这样可以从外部修改；
closed: 不能被外部修改；



> css 伪类修改样式
* 例如 : vedio 的样式修改  
```css
video::-webkit-media-controls-panel{
    display:flex!important;
    background-color: deeppink;
}
```

> 获取 shadowDOM 的根节点
```js 
dom.shadowRoot.host == dom // true
```

---
## 有没有更好的实现方式呢？
> 如何实现？

* 使用 webpack 的 css-in-js 的插件，可以实现类似这样的独立样式


---
## 如果是自己来做，你会如何做呢？
> 如何实现？

* 待了解！




# Why
---
## 为什么需要它？ 

> 防止在大型项目，css会有重叠影响；
* 同一个标签名，是独立的空间，样式不会影响；


---
## 如果我不用它呢？
> 如果不用，需 写独立的 cssem 唯一名称；

> 如果不用，需利用 webpack 的 css-loader 方式
* 利用 key-value : 把 css 的样式名(cssem) 存在 value 上， key 是根据 组件文件和名称组成的唯一 key；


---
## 有没有什么类似的工具或方式呢？
> webpack : css-loader






