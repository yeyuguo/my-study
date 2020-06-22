//最简易的 promise 实现；

new Promise(function(resolve, reject){
    resolve('a')
}).then(function(value){
    // todo value;
})

function promise(fn){
    var that = this
    that.value = ''
    that.status = 'pending'
    that.reason = ''
    that.onFulfilledCb = [];
    that.onRejectedCb = [];

    that.run = function(){
        if(that.status === 'pending'){
            that.status = 'fulfilled';
            that.value = value;
            that.onFulfilledCb.forEach(function(fn){
                fn(that.value)
            })
        }
    }

    var resolve = function(value){
        if(that.status === 'pending'){
            // todo 优化 setTimeout 实现
            setTimeout(function(){
                that.status = 'fulfilled';
                that.value = value;
                that.onFulfilledCb.forEach(function(fn){
                    fn(that.value)
                })
            })
        }
    }


    var reject = function(value){
        if(that.status === 'pending'){
            // todo 优化 setTimeout 实现
            setTimeout(function(){
                that.status = 'fulfilled';
                that.reason= value;
                that.onRejectedCb.forEach(function(fn){
                    fn(that.reason)
                })
            })
        }
    }

    return fn(resolve, reject);
}


promise.prototype.then = function(fn){
    var that = this;
    return new promise(function(resolve, reject){
        if(that.status === 'pending'){
            try {
                that.onFulfilledCb.push(function(value){
                    // 无返回值，不能连续调用then
                    var runResult = fn(value); // 当前 then 执行

                    if(runResult instanceof promise){
                        // 连续使用then 操作异步
                        // then 接收了一个 promise 
                        return runResult.then(function(innerValue){
                            // console.log('innerValue: ', innerValue);
                            resolve(innerValue)
                        })
                    }else{
                        //连续使用then操作同步
                        resolve(runResult);
                    }
                });
            } catch (error) {
                that.onRejectedCb.push(function(value){
                    reject(fn(value));
                });    
            }
        }
    })
}


new promise(function(resolve, reject){
    setTimeout(function(){
        resolve('test')
    },1000)
}).then(function(value1){
    // then 同步
    console.log('value1: ', value1);
    return value1
}).then( function(value2){
    // then 同步
    console.log('value2: ', value2);
    return (value2)
}).then( function(value3){
    console.log('value3: ', value3);
    // then 异步
    return new promise(function(resolve,reject){
        setTimeout(function(){
            resolve(value3) 
        }, 1000)
    })
}).then( function(value4){
    console.log('value4: ', value4);
})

