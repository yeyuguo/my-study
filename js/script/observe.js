{
    // 1. 实现发布订阅

    function Observer() {
        this.fns = []
    }
    Observer.prototype = {
        sub: function (fn) {
            this.fns.push(fn)
        },
        unSub: function (fn) {
            this.fns = this.fns.filter(d => {
                return d !== fn
            })
        },
        publish: function (info) {
            this.fns.forEach(d => {
                d.call(this, info)
            })
        }
    }

    const obs = new Observer()
    const fn1 = (msg) => { console.log('fn1 事件触发:', msg) }
    const fn2 = (msg) => { console.log('fn2 事件触发:', msg) }
    obs.sub(fn1)
    obs.sub(fn2)


    // obs.publish('发布新信息 ')
    // obs.unSub(fn1)
    // obs.publish('第二次更新，只通知 fn2 ')
}



// 2. 丰富,为观察者添加独立的订阅功能

{
    // 1. 实现发布订阅

    function Observer() {
        this.fns = []
    }
    Observer.observeObj = function (obj) {
        // console.log('this.prototype: ', this.prototype);
        for (let k in this.prototype) {
            obj[k] = this.prototype[k]
        }
        obj.fns = []
    }
    Observer.prototype = {
        sub: function (fn) {
            this.fns.push(fn)
        },
        unSub: function (fn) {
            this.fns = this.fns.filter(d => {
                return d !== fn
            })
        },
        publish: function (...args) {
            this.fns.forEach(d => {
                d.apply(this, args)
            })
        },
    }
    const fn1 = function (msg) { console.log('fn1 事件触发:', msg) }
    const fn2 = function (msg1, msg2) { console.log('fn2 事件触发:', msg1, msg2) }

    const obj1 = {
        a: 1,
        b: 2
    }
    Observer.observeObj(obj1)
    obj1.sub(fn1)
    obj1.sub(fn2)
    obj1.publish('obj1 的参数')


    const obs2 = new Observer()
    obs2.sub(fn1)
    obs2.sub(fn2)
    obs2.publish('obj2 的参数1', 'obj2 的参数2')



    // obs.publish('发布新信息 ')
    // obs.unSub(fn1)
    // obs.publish('第二次更新，只通知 fn2 ')


}