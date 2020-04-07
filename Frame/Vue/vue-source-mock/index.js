function defineRective(data, key, val){
    observe(data)
    Object.defineProperty(data, key, {
        get: function(){
            // todo 添加观察者
            return val
        },
        set: function(newVal){
            val = newVal
            // todo 触发更新, 性能不好，待优化
        }
    })
}

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

function Watcher(vm, exp, cb){
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
}
Watcher.prototype.get = function(){
    Dep.target = this;
    var value = this.vm.data[this.exp] // 该步骤会引起 Object.defineProperty 执行
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
        this.cb(this.vm, value, oldVal)
    }
}




