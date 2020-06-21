// 科里化函数

function curry(fn){
    var fnLen = fn.length; 
    var currentParams = [];
    function _recursion(){
        var param = Array.prototype.slice.apply(arguments);
        currentParams = [].concat(param, currentParams)
        if(currentParams.length < fnLen){
            return _recursion
        }else{
            return fn.apply(null, currentParams)
        }
    }
    return _recursion

}


function sum(a, b, c) {
    return a + b + c;
}
  
var curriedSum = curry(sum);
curriedSum(1)(2)(3);
