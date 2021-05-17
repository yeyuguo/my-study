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

// render("<% year %>", data)
console.log('render("<% year %>", data): ', render("<% year %>", data));



/** vue2 模版渲染 */
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/
  if(reg.test(template)) {
    const variableName = reg.exec(template)
    let replaceVariable = template.replace(reg, data[variableName[1]])
    return render(replaceVariable, data)
  }
  return template
}

var template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
var result = render(template, {
  name: 'ye', 
  age: 30, 
  sex: '男'
})
console.log('result: ', result);
