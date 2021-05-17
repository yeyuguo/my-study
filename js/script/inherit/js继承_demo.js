// 原型链继承

function Animal() {
  this.colors = ['green']
}
Animal.prototype.log = function(){
  console.log(this.colors)
}

function Dog() {}
Dog.prototype = new Animal()

var an1 = new Dog()
an1.log()
an1.colors.push('red')
an1.log()

var an2 = new Dog()
an2.log()
console.log('an2.colors: ', an2.colors);
// 缺陷原因: Dog 继承于 Animal, 共用了同一个 color 字段;


// 借用构造函数

function Animal(name) {
  // 会变成原型属性
  if(!this.colors) {
    this.colors = []
  }
  if(name){
    this.colors.push(name)
  }
  // 会变成非原型属性
  // this.colors = []
}
Animal.prototype.log = function(){
  console.log(this.colors)
}
function Dog(name) {
  // 覆盖外部的原型属性
  Animal.call(this, name)
}
Dog.prototype = new Animal()

var an1 = new Dog('an1')
an1.log()
an1.colors.push('red')
an1.log()
// !没有解决变量公用问题, 是因为 this.colors 变成了原型属性, 所以被所有实例共享成同一个
var an2 = new Dog('an2')
an2.log()

// 检测 colors 属性为 非原型属性
console.log('an1.hasOwnProperty(colors): ', an1.hasOwnProperty('colors'));


function SuperType(name){
  // 第一种, 导致 colors 变成原型链属性了
  if(!this.colors) {
    this.colors = []
  }
  // if(name) {
  //   this.colors.push(name)
  // }
  // 第二种, colors 是实例属性
  // this.colors = [];
}

function SubType(name){
  //继承了 SuperType, 覆盖外部的原型属性
  SuperType.call(this, name);
}
var prototype = new SuperType()
SubType.prototype = prototype

var instance1 = new SubType();
// instance1.colors.push("black"); 
// console.log(instance1.colors); //"red,blue,green,black"
console.log(`prototype.hasOwnProperty('colors'): `, prototype.hasOwnProperty('colors'));
console.log('SubType.prototype.hasOwnProperty(colors): ', SubType.prototype.hasOwnProperty('colors'));
console.log('instance1.hasOwnProperty(colors): ', instance1.hasOwnProperty('colors'));

var instance2 = new SubType(); 
console.log(instance2.colors); //"red,blue,green"


// 存在同名 实例属性和原型属性, 结果是实例属性覆盖原型属性
function TestProps() {
  this.a = 1
}
TestProps.prototype.a = 2
TestProps.prototype.b = []
var tp = new TestProps()
console.log('TestProps: ', tp.a);
console.log(`tp.hasOwnProperty('a'): `, tp.hasOwnProperty('a'));
console.log(`tp.hasOwnProperty('b'): `, tp.hasOwnProperty('b'));




// 寄生组合式继承

function inheritPrototype(subType, superType) {
  var newProp = Object.create(superType.prototype)
  newProp.constructor = subType
  subType.prototype = newProp
}

function Animal(name) {
  if(!this.colors) {
    this.colors = name ? [name] : []
  } else {
    this.colors.push(name)
  }
  // 和上述代码有2种结果
  // this.colors = ['green']
}
Animal.prototype.log = function(){
  console.log(this.colors)
}

function Dog(name) {
  Animal.call(this, name)
}
inheritPrototype(Dog, Animal)

var an1 = new Dog('an1')
an1.log()
an1.colors.push('red')
an1.log()

var an2 = new Dog('an2')
an2.log()