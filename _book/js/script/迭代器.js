const log = function (msg, ...rest) {
    const chalk = require('chalk');

    let color = rest.pop()
    try {
        console.log(chalk[color](msg), ...rest)
    } catch (err) {
        color ? console.log(msg, color, ...rest) : console.log(msg, ...rest)
    }

    // console.log(chalk[color || 'white'](msg))
    // if (!color) {
    //     return msg => console.log(chalk[color][msg])
    // } else {
    //     console.log(chalk[color][msg])
    // }
}

const fixColor = 'blue'

/**迭代器的实现 */
function makeIterator(array) {
    if (!(array instanceof Array)) {
        throw '请输入迭代数据'
    }
    let i = 0;
    let IterRes = {
        next: function () {
            let res = {
                value: i < array.length ? array[i] : undefined,
                done: i < array.length ? false : true
            }
            i++
            return res
        }
    }
    return IterRes
}

let testValue = [1, 2, 3]
// testValue = {}
let a = makeIterator(testValue)
log(a.next())
log(a.next())
log(a.next())
log(a.next())

log('测试 array of ', fixColor)

for (let b of [2, 3, 4]) {
    log(b)
}

log('返回迭代数据', fixColor)

function* gen() {
    yield*['a', 'b', 'c'];
}

let gen$next = gen()
log('gen$next: ', gen$next.next());
log('gen$next: ', gen$next.next());
log('gen$next: ', gen$next.next());
log('gen$next: ', gen$next.next());



function* gen2() {
    yield ['a', 'b', 'c'];
}

log('返回普通数据', fixColor)
let gen$next2 = gen2()
log('gen$next: ', gen$next2.next());


log('自造可迭代使用 for 循环', fixColor)
let empty = {}
empty[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
}
for (let i of empty) {
    log(i)
}
log([...empty])

log('中断 迭代器 的 yield 值', fixColor)
let dd = function* () {
    yield 1;
    yield 2;
    yield 3;
}
let d = dd()
log('d.next(): ', d.next());
log("d.return('haha '): ", d.return('haha'));
log('d.next() 会没有值: ', d.next(), 'red');

log('----------- 分割行 -----------', fixColor)

log('测试 log 函数 ', 'red')
log(1, 2, 'red')
log(1, 2, 'green')
log(1, 2)