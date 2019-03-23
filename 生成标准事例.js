
/** 标准 */
// 创建 demo 标识
function createFlags(flag) {
    return `----- ${flag} ------> `
}
{

    // 创建 demo 标识
    function createFlags(flag) {
        return `----- ${flag} ------> `
    }

    // 创建 start 和 end 标识
    {
        const flag = ' template demo '
        const flags = createFlags(flag)
        console.log(flags + ' start: ');
        console.log(flags + ' end! ');
    }
}




/** 测试 生成标准示例 
 * 
*/

// 创建 demo 标识
function createFlags(flag) {
    return `----- ${flag} ------> `
}
var newFun = Object.create(Promise.prototype)
// newFun.hasOwnProperty('then')
console.log("newFun.hasOwnProperty('then'): ", newFun.hasOwnProperty('then'));


// Promise.prototype.then = function (fn) {
//     // this.then
//     return new Promise(resolve => {
//         resolve(fn())
//     })
// }

// Object.defineProperty(Promise.prototype,'then',{
//     get:function(){

//     },
//     set:function(value){
//         return 
//     }
// })

// 函数创建表识
function createDemo(themeName, fn) {


    const flag = themeName || 'template demo'
    const flags = createFlags(flag)
    console.log(flags + 'start:');

    // const returnFn = await new Promise((resolve, reject) => {
    //     const result = fn(...args)
    //     console.log(flags + 'end!');
    // })
    return async function (...args) {
        const result = await fn(...args)
        console.log(flags + 'end!');
        return result
    }

}



const testFn = function (n) {
    return new Promise(resolve => {
        setTimeout(() => {
            let msg = n + ' add async '
            console.log('before:', msg)
            resolve(msg)
        }, 300)
    })
}

var test = createDemo('test测试', testFn)
test('hhhh')
// .then(function (data) {
//     console.log('after data: ', data);
// })