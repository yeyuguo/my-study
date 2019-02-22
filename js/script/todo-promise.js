const helper = require('../helper/index.js')
console.log('helper: ', Object.keys(helper));

function timeDelay(msg, time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            msg = msg || 'hahah'
            helper.log(msg)
            resolve(msg)
        }, time || 0)
    })
}

// timeDelay('ehehhe', 0)



helper.divide('promise race，执行全部promise，但只传递第一个')
Promise.race([timeDelay('race_2', 10), timeDelay('race_1', 5)])
    .then(function (result) {
        helper.divide('过程输出值')
        console.log('result: ', result);
    })


// helper.divide('promise all，返回全部')
// Promise.all([timeDelay('all_2', 10), timeDelay('all_1', 5)])
//     .then(function (result) {
//         helper.divide()
//         console.log('result: ', result);
//     })




