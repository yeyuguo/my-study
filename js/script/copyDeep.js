"use strict";

function copyDeep(obj) {
    console.log('obj: ', obj);
    let newObj = Array.isArray(obj) ? [] : {};
    for (let k in obj) {
        let _value = obj[k]
        if (obj.hasOwnProperty(k)) {
            if (_value && typeof _value == 'object') {
                newObj[k] = copyDeep(obj[k])
            } else {
                newObj[k] = obj[k]
            }
        }
        // if (typeof _value == 'object') {
        //     let _detailType = Object.prototype.toString.call(_value)
        //     if (_detailType == '[object Object]') {
        //         console.log(1)
        //         newObj[k] = copyDeep(obj[k])
        //         // newObj[k] = { ...obj[k] }
        //     } else if (_detailType == '[object Array]') {
        //         console.log(2)
        //         newObj[k] = [...obj[k]]
        //     } else {
        //         console.log(3)
        //         newObj[k] = obj[k]
        //     }
        // }
    }
    return newObj
}


var A = {
    a: 1,
    b: function () {
        return { 'bb': 1 }
    },
    c: { cc: '3' }
}

var B = copyDeep(A)
console.log('B: ', B);

A.a = 2
console.log('B: ', B);




var C = [
    { a: 1, b: 2 },
    { c: A.c }
]

var D = copyDeep(C)
console.log('D: ', D);

A.c.cc = 4
console.log('D: ', D);





// !测试 function 的复制
function createObj(obj) {
    function F() { }
    F.prototype = obj
    return new F()
}


{
    // 测试 createObj 的功能
    const A = function () {
        this.a = 1
    }
    // createObj(A)
    var aa = new A()
    console.log('aa.a: ', aa.a);
}


{
    function createObj(obj) {
        function F() { }
        F.prototype = obj
        return new F()
    }


    var A = {
        name: 'A',
        b: function () { }
    }
    var B = {
        name: 'B',
        b: A.b,
    }
    // B.b == A.b
    console.log('B.b == A.b: ', B.b == A.b);


    var C = {
        name: 'C',
        b: createObj(A.b)
    }
    // A.b == C.b
    console.log('A.b == C.b: ', A.b == C.b);
}