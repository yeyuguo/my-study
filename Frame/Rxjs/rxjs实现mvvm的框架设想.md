基于 rxjs 设计实现类似 react 的 MVVM 的开发；


## DOM 挂载
1. 可以使用 observal 添加属性 observ.DOM 在 JSX 里
2. subscirbe 执行完后，自动的挂载到 dom 真实节点
3. 


##  虚拟 DOM 的渲染对比
1. 可以使用 Rx.ReplaySubject(2) 来解决;
2. dom 算法使用开源库解决


## 触发更新
* observal.next() 在父组件函数内，传递新值触发更新
* 在 JSX 的DOM节点里，传递新的值更新；
  



## 业务处理
1. 统一使用 LINQ 来解决业务，独立存在于 不同于 DOM 渲染的地方



## 组件事件处理
1. 使用事件监听父组件；
2. 在 observal 的第一个 LINQ 之处，使用 filter 过滤事件
```js
const clicks = Rx.Observable.fromEvent(document, 'click');
const clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
clicksOnDivs.subscribe(x => console.log(x));
```
3. 事件是独立于DOM的渲染和业务处理之外的；