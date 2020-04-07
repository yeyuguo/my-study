function unSortAry(ary) {
    debugger;
    const length = ary.length
    const indexLength = length - 1
    let _rArray = [];
    function randomReplace(ary, index) {
        const randomIndex = parseInt(Math.random() * 10);
        if (randomIndex < indexLength && _rArray.indexOf(randomIndex) < 0) {
            let temp = ary[randomIndex]
            ary[randomIndex] = ary[index]
            ary[index] = temp
            _rArray.push(randomIndex);
            return ary
        } else {
            return randomReplace(ary, index)
        }
    }
    for (let i = 0; i < indexLength; i++) {
        // console.log('ary, i: ', ary, i);
        ary = randomReplace(ary, i)
    }
    return ary
}
debugger
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const randomArray = unSortAry(array)
console.log('randomArray: ', randomArray);