// 1. 科里化的实现 ；



// 实现一个数组过滤非数字
// ary = [1,2,'3','f7'] 

function compose() {
    var args = Array.from(arguments)
    return function (params) {
        return args.reduce(function (p, n) {
            return p(n(params))
        })
    }
}

function removeNumStr(ary) {
    return ary.filter((d) => !Number.isNaN(d))
}

function removeOther(ary) {
    return ary.filter(d => (typeof d == 'number'))
}

var aa = compose(removeNumStr, removeOther)
// aa([1, 2, '3', 'f7'])
console.log("aa([1, 2, '3', 'f7']): ", aa([1, 2, '3', 'f7']));




// 2. arguments ；


// 3. 手写 webpack 打包 react；


// 4. alert


// 5. promise 微任务的打印
{
    setTimeout(function () {
        console.log(4)
    }, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for (var i = 0; i < 10000; i++) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function () {
        console.log(5);
    });
    console.log(3);
}