
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

// 统计次数, 可以得到最多的那个
function countTime(names) {
  const countObj = names.reduce((pre, current) => {
    if (pre[current]) {
      pre[current] = pre[current]+1
    } else {
      pre[current] = 1
    }
    return pre
  }, {})
  const list = Object.values(countObj).sort((a,b)=>{ return a > b})
  return list
}



function countTimeAndIndex(names) {
  const result = []
  names.forEach((item, index)=>{ 
    
    result[index] = {
      count: 1
    }
  })
  
}