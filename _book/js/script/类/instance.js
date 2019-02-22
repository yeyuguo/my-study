function A() { }
function B() { }

var a1 = new A()
// a1 instanceof A // true
console.log('a1 instanceof A: ', a1 instanceof A);
A.prototype = {}
var a2 = new A()
// a1 instanceof A // false
console.log('a1 instanceof A : ', a1 instanceof A);

B.prototype = A
var b1 = new B()
// b1 instanceof A // true
console.log('b1 instanceof A: ', b1 instanceof A);
// b1 instanceof B // true
console.log('b1 instanceof B: ', b1 instanceof B);