/**
 * 打印变量为对象值
 * @param {*} msg 变量值
 */
function log(msg) {
    var obj = {}
    obj[msg] = msg
    console.log(obj)
}

/**
 *输出分割线
 *
 * @param {String} msg
 */
function divide(msg) {
    // console.log(`======== ${msg || '分割线'} ========`)
    console.log(`>>>===== ${msg || '分割线'} =====<<<`)
}

module.exports = {
    log,
    divide,
}
