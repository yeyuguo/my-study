/**
 * 检测闭包
 *
 */
var _win = '全局'

function checkScope() {
    var _loc = '局部'
    return function () {
        alert(_loc)
    }
}