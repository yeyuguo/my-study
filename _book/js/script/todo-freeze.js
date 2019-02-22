const helper = require('../helper')
var A = {
    a: 1,
    b: {
        c: 2
    }
}

function cj(data) {
    helper.log(data)
}
var B = Object.freeze(A)
console.log('B : ', JSON.stringify(B, null, 2));