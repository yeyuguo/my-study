
var Book = {}
// var name = ""

Object.defineProperty(Book, 'name', {
    set: function(value){
        name = value
        console.log('设置值:', value)
    },
    get: function(){
        return "《" + name + "》"
    }
})

Book.name = 'vue 权威指南'
console.log(Book.name)


