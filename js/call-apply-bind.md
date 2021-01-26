```js

var test = {
    name: 'test',
}

var obj = {
    name: 'obj',
    fn: function(){
        console.log(this.name);
        if(arguments && arguments.length){
            console.log('参数:', arguments)
        }
    }
}
obj.fn() // obj
obj.fn.call(test) // test

// es6
Function.prototype.myCall = function(func, ...arg){
    func._fn_ = this;
    func._fn_(...arg);
    delete func._fn_;
}

obj.fn.myCall(test, 'hi')


// call实现 es5
Function.prototype.myCall2 = function(){
    var args = []
    for(var i=1;i<arguments.length; i++){
        args.push( 'arguments[' + i + ']' )
    }
    console.log({args})
    var func = arguments[0]
    func._fn_ = this;
    eval('func._fn_('+eval(args)+')')
    delete func._fn_;
}

obj.fn.myCall2(test, 'call2')

// bind 实现

Function.prototype.myBind = function(func){
    var that = this;
    return function(){
        let args = []
        for(let i=0; i< arguments.length; i++){
            args.push('arguments['+i+']')
        }
        func._fn_ = that;
        let value = eval('func._fn_('+args+')');
        delete func._fn_;
        return value;
    }
}
var newFunc = obj.fn.myBind(test);
newFunc('bind test');
```