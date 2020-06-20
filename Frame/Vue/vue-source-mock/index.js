function defineRective(data, key, val){
    observe(val)
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get: function(){
            // todo 添加观察者
            
            if(Dep.target){
                dep.add(Dep.target)
            }
            return val
        },
        set: function(newVal){
            val = newVal
            // todo 触发更新, 性能不好，待优化
            dep.notify();
        }
    })
}
Dep.target = null; // 恢复所有的 target

function observe(data){
    if(!data || typeof data !== 'object') return 
    Object.keys(data).forEach(function(key){
        defineRective(data, key, data[key])
    })
}


// 订阅者收集和触发
function Dep(){
    this.subs = []
}

Dep.prototype.add = function(vm){
    this.subs.push(vm)
}

Dep.prototype.notify = function(){
    this.subs.forEach(function(item){
        item.update && item.update();
    })
}


// 实现watcher
function Watcher(vm, exp, callback){
    this.vm = vm;
    this.exp = exp;
    this.callback = callback;
    this.value = this.get();
}
Watcher.prototype.get = function(){
    Dep.target = this;
    // 绑定 watcher 到 响应式 get 里；
    var value = this.vm.data[this.exp] // 该步骤会引起 Object.defineProperty 执行
    Dep.target = null;
    return value
}

Watcher.prototype.update = function(){
    this.run();
}
Watcher.prototype.run = function(){
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if(value !== oldVal){
        this.value = value;
        this.callback.call(this.vm, value, oldVal)
    }
}


// 合并所有
function SelfVue(data, el, exp){
    this.data = data;
    // 代理 data 属性
    // todo 不能理解
    Object.keys(data).forEach(key=>{
        this.proxyKey(key)
    })
    observe(data)
    el.innerHTML = this.data[exp];
    new Watcher(this, exp, function(val, oldVal){
        el.innerHTML = val
    })
    return this;
}


SelfVue.prototype.proxyKey = function(key){
    var that = this
    Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get: function(){
            return that.data[key]
        },
        set: function(val){
            console.log('val: ', val);
            that.data[key] = val
        }
    })
}




function CompileElement(el){
    

}