function Find(target, array)
{
    // write code here
    for(let i=0;i<=array.length;i++){
        const lineAry = array[i]
        for(let j=0; j<=lineAry.length;j++){
            const value = lineAry[j]
            if(target === value){
                return true
            }
        }
    }
    return false
    
}
const isHave = Find(2,
[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]])
console.log(isHave)

/*
[
    [1,2,3],
    [4,5,6],
]
*/