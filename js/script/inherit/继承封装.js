// 继承封装的递进过程


// 1. 原型继承
function Animal(name) {
  this.colors = ['white', 'black']
  this.name = name
}

Animal.prototype.getColor = function(){
  return this.colors
}
Animal.prototype.getName = function() {
  return this.name
}

function Dog() {}
Dog.prototype = new Animal()
// 参数无法被透传, Dog 无法把参数给 Animal 
var an1 = new Dog()
var an2 = new Dog()
//! 缺点: 原型上的属性 被实例共享
// an1.colors 和 an2.colors 是引用 Dog 上的属性 [[prototype]].getName
console.log('an1.colors === an2.colors: ', an1.colors === an2.colors); // fasle
console.log('an2.getColor === an2.getColor: ', an2.getColor === an2.getColor);
console.log('---- 结束')

// 2. 构造函数
function Animal(name) {
  this.colors = ['white', 'black']
  this.name = name
}

Animal.prototype.getColor = function(){
  return this.colors
}
Animal.prototype.getName = function() {
  return this.name
}

var an1 = new Animal()
var an2 = new Animal()
//?   优点: 1. 构造函数内的属性, 不会被共享;
console.log('an1.colors === an2.colors: ', an1.colors === an2.colors); // true
console.log('an2.getColor === an2.getColor: ', an2.getColor === an2.getColor);
console.log('---- 结束')


// 3 原型继承和构造函数继承,解决 共享和传递参数问题
function Animal(name) {
  this.colors = ['white', 'black']
  this.name = name
}