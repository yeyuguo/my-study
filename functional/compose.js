// 组合函数【react-redux 中间件实现方式】
function A(param){console.log(1, param);return param}
function B(param){console.log(2);return param}
function C(param){console.log(3);return param}

function compose(){
    var fns = Array.prototype.slice.apply(arguments)
    // 正确
    return fns.reduce(function(a, b){
        console.log('a, b: ', a, b);
        return function(params){
            return a(b(params));
        }
    })
    // 最后一个函数执行会报错；
    // return function(params){
    //     return fns.reduce(function(a, b){
    //         return a(b(params));
    //     })
    // }
}
compose(A, B, C)(4)