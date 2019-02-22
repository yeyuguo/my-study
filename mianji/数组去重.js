/**
 *es5 数组去重
 * 
 */
function removeRepeat_es5(ary) {
    let resultAry = [];
    let repeatAry = [];
    ary.forEach(function (d) {
        if (resultAry.indexOf(d) < 0) {
            resultAry.push(d)
        } else {
            repeatAry.push(d)
        }
    })
    return resultAry
}
// removeRepeat_es5([1,2,3,3])
console.log('removeRepeat_es5([1,2,3,3]): ', removeRepeat_es5([1, 2, 3, 3]));


/** es6 数组去重 */
function removeRepeat_es6(ary) {
    const setAry = new Set(ary)
    return Array.from(setAry)
}
// removeRepeat_es6([1,2,3,3])
console.log('removeRepeat_es6([1,2,3,3]): ', removeRepeat_es6([1, 2, 3, 3]));


/** es5数组去重，并统计元素出现次数 */
function removeRepeat_count(ary) {
    let resultAry = [];
    let repeatAry = [];
    ary.forEach((d, i) => {

    })
}
// removeRepeat_count([1,2,3,3])
console.log('removeRepeat_count([1,2,3,3]): ', removeRepeat_count([1, 2, 3, 3]));