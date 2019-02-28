// 使用原型构造类




//2. 使用 Object.create 构造对象的类

var Cat = {
    name: "猫",
    say: function () {
        console.log(this.name, ":", "喵喵喵")
    }
}

var newCat = Object.create(Cat)
// newCat.name
console.log('newCat.name: ', newCat.name);
// newCat.say()
console.log('newCat.say(): ', newCat.say());


//3.  实现 Object.create
// !解释：
// 该方式，是为了让新生成的构造函数，this 指向 obj
{
    if (!Object.create) {
        Object.create = function (obj) {
            function F() { }
            F.prototype = obj
            return new F()
        }
    }
}

// 测试 实现的 Object.create

function testCreate(obj) {
    function F() { }
    F.prototype = obj
    return new F();
}

var tt = testCreate(Cat)
// tt.name
console.log('tt.name: ', tt.name);
// tt.say() 
console.log('tt.say() : ', tt.say());



//4. 为 createObject 的子类添加属性
{
    if (!Object.create) {
        Object.create = function (obj) {
            function F() { }
            F.prototype = obj
            // !已经出错，不能扩展子级属性；
            F.prototype.a = '1'
            F.prototype.b = '2'
            return new F()
        }
    }
}
var addPropCat = Object.create(Cat)
// addPropCat.name
console.log('addPropCat.name: ', addPropCat.name);
// addPropCat.a
console.log('addPropCat.a: ', addPropCat.a);


// 5. 优化 Object.create 可扩展
// 缺陷： 扩展属性，需要在子类上来扩展
console.log('------ starting: ------');

{
    function say() {
        var msg = '这是 ' + this.name + ' 输出 name 结果'
        // console.log(msg)
        return msg;
    }
    // 父亲
    function Father(name) {
        // console.log("father 执行")
        this.name = name || 'father'
    }
    Father.prototype.fatherStaticName = 'father1'
    Father.prototype.father = say
    // 子类
    function Child(name) {
        // ! 1. 优点：享有父类实例属性，传入参数可影响继承父类后的结果
        // todo 缺点：只有父类实例属性，没有父类原型属性
        // Father.call(this)
        // ! 1,2,3
        this.name = 'children'
    }
    // ! 6. 优点：继承父子类原型属性
    // todo 缺点：原型链被修改为 Father，没有继承关系，被复制原型链
    // Child.prototype = Father.prototype

    // ! 2. 优点：享有子类原型属性，享有父子类实例属性
    // todo 缺点： 没有父类原型属性, 实例属性被父类的实力属性覆盖
    // Child.prototype = Father
    // ! 3. 优点：是父子类的实例，共享父子类的原型属性
    // todo 缺点： 和 Father.call 一起使用，多调用一次，构造器不是子类
    // Child.prototype = new Father()
    // ! 4. 优点：享有父类的所有实例属性
    // todo 缺点： 具用所有的实例化后属性，但内存开销大；
    // {
    //     const father = new Father()
    //     for (let k in father) {
    //         Child.prototype[k] = father[k]
    //     }
    //     Child.prototype.name = 'children'; // todo 该执行不影响结果，可以不要
    // }
    // ! 5. 优点：是父子类的实例，共享父子类的原型属性
    // todo 缺点： 和 Father.call 一起使用，多调用一次
    // Child.prototype = new Father()
    // !深思：为什么需要重新把 constructor 更改回来
    // ! 因为 Child.prototype = ...  更改了原型链的 construtor；  child.constructor == Child // false
    // Child.prototype.construtor = Child
    // end

    Child.prototype.say = say
}

var child = new Child()
// 1，2，3 三种方式继承，下面的输出都会不一样；
// child.name
console.log('child.name: ', child.name);
// child.fatherStaticName
console.log('child.fatherStaticName: ', child.fatherStaticName);
// child.say()
console.log('child.say(): ', child.say());
// child instanceof Father
console.log('child instanceof Father: ', child instanceof Father);
// child instanceof Child
console.log('child instanceof Child: ', child instanceof Child);
// child.__proto__.__proto__ == Father.prototype
console.log('child.__proto__.__proto__ == Father.prototype: ', child.__proto__.__proto__ == Father.prototype);

// ! 2. 输出
// child.__proto__.prototype  == Father.prototype
console.log('child.__proto__.prototype  == Father.prototype: ', child.__proto__.prototype == Father.prototype);

// ! 5. 使用 constructor
// console.log('child.__proto__.construtor.name == "Child": ', child.__proto__.construtor.name == 'Child');

// child.__proto__
console.log('child.__proto__: ', child.__proto__);

var newValue = '被 Child 修改后的name属性值'
Child.prototype.fatherStaticName = newValue
// Father.prototype.name
console.log('修改 Child.prototype.name 属性后，Father.name: ', Father.prototype.fatherStaticName);
Child.__proto__.fatherStaticName = newValue
var child2 = new Child()
// child2.fatherStaticName
console.log('child2.fatherStaticName: ', child2.fatherStaticName);











// jquery 实现的类




// es6 的 class


class A {
    a() {
        console.log('1')
    }
}

class B extends A {
    b() {
        super.a()
    }
}


var bb = new B()
bb.b()



//! 如何实现函数的复制？？？？

//  组件继承里，使用 createObj 的实现更改 prototype 的指向,是为了实现函数的复制

{
    function createObj(obj) {
        function F() { }
        F.prototype = obj
        return new F()
    }


    var A = {
        name: 'A',
        b: function () { }
    }
    var B = {
        name: 'B',
        b: A.b,
    }
    // B.b == A.b
    console.log('B.b == A.b: ', B.b == A.b);


    var C = {
        name: 'C',
        b: createObj(A.b)
    }
    // A.b == C.b
    console.log('A.b == C.b: ', A.b == C.b);


    // 更改 原函数的内容
    A.b.constructor = A
    console.log('A.b.constructor.name: ', A.b.constructor.name);

    // 测试 B
    // B.b.constructor.name
    console.log('B.b.constructor.name: ', B.b.constructor.name);
    B.b.constructor = B
    console.log('B.b.constructor.name: ', B.b.constructor.name);


    // 测试 C
    // C.b.constructor.name
    console.log('C.b.constructor.name: ', C.b.constructor.name);
    C.b.constructor = C
    console.log('C.b.constructor.name: ', C.b.constructor.name);

    //! 思考 🤔 如何解决这里的更改属性，都能更改
}