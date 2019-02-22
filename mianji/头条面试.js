

var a = {
    foo: function () {
        var _foo = function (a) {
            console.log(a);
            for (let a = 1; a < 10; a++) {
                // anything
            }
        }
        _foo(2);
    }
}
var b = {}

// a.foo() // a
var _foo = a.foo;
// _foo(); // window

a.foo(); // function 箭头函数输出 a // 


// 1

var a = {
    // this
    foo1: function () {
        console.log(this)
    },
    foo2: () => {
        console.log(this)
    },
    foo3: function () {
        function _foo() {
            console.log(this)
        }
        _foo()
    },
    // 变量
    foo4: function (n) {
        console.log(n)
        var n = 1;
    },
    foo5: function (n) {
        console.log(n)
        let n = 1;
    },
    foo6: function () {
        var _foo = function (n) {
            console.log(n);
            for (var n = 0; n < 3; n++) {
                // ...
            }
        }
        _foo(2)
    },
    foo7: function () {
        var _foo = function (n) {
            console.log(n);
            for (let n = 0; n < 3; n++) {
                // ...
            }
        }
        _foo(2)
    },
}
var b = {} // 让 foo1 的this 指向 b；
a.foo1()
a.foo2()
a.foo3()
a.foo4()
// a.foo5() // 会报错
a.foo6()
a.foo7()


// 2. promise

{
    console.log(1);
    new Promise(function (resolve, reject) {
        resolve();
        console.log(2)
    }).then(function () {
        console.log(3)
    })
    setTimeout(function () {
        console.log(4)
    })
    requestAnimationFrame(function () {
        console.log(5)
    })
    console.log(6)
}

// 3. 匹配金钱
console.log(/^(-)?\d((\,)?d{3})*(\.)?\d*/.test('-541,110.23'))

// 4. webpack 的 loader 和 plugin 的区别

// 5. object 的深拷贝，该如何实现

// 6. 递归函数有什么缺点？怎么解决？

// 7. 说说结果

var a = {
    foo: () => {
        console.log(this)
    },
}
// a.foo.call()