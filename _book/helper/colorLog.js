/**
 * 打印信息，最后一个参数为 颜色控制
 * @param {*} msg 
 * @param  {...any} rest 
 * @example
 * log(1, 2, 'red')
 * log(1, 2, 'green')
 * log(1, 2)
 */
const chalk = require('chalk');
const log = function (msg, ...rest) {

    let color = rest.pop()
    try {
        console.log(chalk[color](msg), ...rest)
    } catch (err) {
        color ? console.log(msg, color, ...rest) : console.log(msg, ...rest)
    }
}

// log(1, 2, 'red')
// log(1, 2, 'green')
// log(1, 2)