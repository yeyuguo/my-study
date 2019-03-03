// 1. 第一个版本
{
    function curry(fn) {
        // arguments 伪数组转成真实数组，并取第一个之后的数组元素
        var rest_args = Array.prototype.slice.call(arguments, 1)
        return function () {
            let args = Array.prototype.slice.call(arguments)
            var newArgs = rest_args.concat(args)
            return fn.apply(this, newArgs)
        }
    }
    // // 1.
    // var newFn = curry(function (a, b) {
    //     return a + b
    // })
    // console.log('newFn(1, 2): ', newFn(1, 2));
    // // 2. 
    // var newFn = curry(function (a, b) {
    //     return a + b
    // }, 1)
    // newFn(2)
    // console.log('newFn(2): ', newFn(2));
    // // 3.
    // var newFn = curry(function (a, b) {
    //     return a + b
    // }, 1, 2)
    // // newFn()
    // console.log('newFn(): ', newFn());
}



// 2.第二个版本
{


    function sub_curry(fn) {
        var slice = Array.prototype.slice
        var rest_args = slice.call(arguments, 1)
        return function () {
            var newArgs = rest_args.concat(slice.call(arguments))
            return fn.apply(this, newArgs)
        }
    }

    function curry(fn) {
        // arguments 伪数组转成真实数组，并取第一个之后的数组元素
        var slice = Array.prototype.slice
        var fnArgsLen = fn.length
        var rest_args = slice.call(arguments, 1)
        return function () {
            var args = slice.call(arguments)
            if (args.length < fnArgsLen) {
                var newArgs = [fn].concat(args)
                sub_curry(newArgs)
                return curry.apply(this, newArgs)
            } else {
                var newArgs = rest_args.concat(args)
                return fn.apply(this, newArgs)
            }
        }
    }
    var add = function (a, b, c) {
        return a + b + c
    }

    // 1.
    var newAdd = curry(add)
    // newAdd(1,2,3)
    console.log('newAdd(1,2,3): ', newAdd(1, 2, 3));
    // newAdd(1)(2)(3)
    console.log('newAdd(1)(2)(3): ', newAdd(1)(2)(3));

    // 2.
    var newAdd = curry(add)

    // console.log('newAdd(1,2,3): ', newAdd(1, 2, 3));


}