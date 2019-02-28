"use strict";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 0. 乱序一个数组
function unSortAry(ary) {
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

const randomArray = unSortAry(array)
console.log('randomArray: ', randomArray);



// !后面的函数使用 randomArray 作为参数传入函数，修改的是数组地址，会影响原数组;



function swap(ary, i, j) {
    let temp = ary[i]
    ary[i] = ary[j];
    ary[j] = temp
    return ary
}



// 1. 冒泡排序
// 分为左右两个块，左边的块是排好的，使用左边末尾最大值，(循环)不断对比右边的值，只要不顺序，就互换位置；

function bubbleSort(ary) {
    ary = [...ary]
    let count = 0;
    const length = ary.length
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            count++
            if (ary[j] > ary[j + 1]) {
                let temp = ary[j + 1];
                ary[j + 1] = ary[j]
                ary[j] = temp
            }
        }
    }
    console.log(count - 1)
    return ary
}

// bubbleSort(randomArray)
console.log('bubbleSort(randomArray): ', bubbleSort(randomArray));



// 2. 选择排序
// 分为左右两个块，左边是排好的，使用左边末尾最大值，（循环）不断和右边的值对比较小值，缓存较小值的索引，然后互换；
function selectSort(ary) {
    ary = [...ary]
    let count = 0;
    // const indexLength = ary.length - 1
    const length = ary.length
    let minIndex, temp;
    for (let i = 0; i < length - 1; i++) { // 最长度为倒数第二个
        minIndex = i
        for (let j = i + 1; j < length; j++) { // 最长度为最后一个
            count++
            if (ary[i] > ary[j]) {
                minIndex = j
            }
        }
        temp = ary[i]
        ary[i] = ary[minIndex]
        ary[minIndex] = temp
    }
    console.log(count - 1)
    return ary
}


// selectSort(randomArray)
console.log('selectSort(randomArray): ', selectSort(randomArray));




// 3. 插入排序
// 以第一个元素为一个独立块，分为左右两个块，左边是排好的，（循环）右边不断插入一个值到左边，左边的块不断两两对比更换位置；


function insertSort(ary) {
    ary = [...ary]
    let count = 0;
    const length = ary.length
    for (let i = 1; i < length; i++) {
        count++
        var preIndex = i - 1;
        while (preIndex >= 0) {
            count++
            if (ary[preIndex] > ary[preIndex + 1]) {
                let temp = ary[preIndex]
                ary[preIndex] = ary[preIndex + 1]
                ary[preIndex + 1] = temp
            }
            preIndex--
        }
    }
    console.log(count - 1)
    return ary
}

// insertSort(randomArray)
console.log('insertSort(randomArray): ', insertSort(randomArray));




// 4. 快速排序

var quickSort_count = 0
function quickSort(ary) {
    // const min = Math.min.apply(null, ary)
    // const max = Math.max.apply(null, ary)
    const mid = parseInt(ary.length / 2)
    let leftAry = [];
    let rightAry = [];
    const midValue = ary[mid]
    ary.forEach(function (d) {
        quickSort_count += 1
        if (d <= midValue) {
            leftAry.push(d);
        } else {
            rightAry.push(d)
        }
    })
    if (leftAry.length < 3 || rightAry.length < 3) {
        leftAry = leftAry.sort()
        rightAry = rightAry.sort()
    } else {
        leftAry = quickSort(leftAry);
        rightAry = quickSort(rightAry);
    }

    return leftAry.concat(rightAry);
}







console.log('quickSort_count - 1: ', quickSort_count);
// quickSort(randomArray)
console.log('randomArray: ', randomArray);
console.log('quickSort(randomArray): ', quickSort(randomArray));