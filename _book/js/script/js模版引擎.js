/** JS编码实现一个render方法，使得可议这样调用： 
const year = ‘2017’; 
const month = ‘09’; 
const day = ‘21’; 
const str = render(‘year−year−{month}-${day}’)({year,month,day}); 
console.log(str)//输出2017-09-21
--------------------- 
作者：susiwen8 
来源：CSDN 
原文：https://blog.csdn.net/susiwen8/article/details/82701235 
版权声明：本文为博主原创文章，转载请附上博文链接！ */

// <% year %>

//! [marker0]
function render(str, obj) {
    str = str.replace(/ /g, '');
    const reg = /(\w|\d|\s|\_)+(?=%>)/g
    let matchAry = str.match(reg)
    return matchAry.filter(d => obj.hasOwnProperty(d)).map(d => {
        return obj[d]
    })
}

var data = {
    year: 10
}
//! [marker0]

// render("<% year %>", data)
//! [marker1]
console.log('render("<% year %>", data): ', render("<% year %>", data));
//! [marker1]