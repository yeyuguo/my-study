function Stack() {
  this.dataSource = []
  this.top = 0;
}


Stack.prototype.push = function(ele){
  this.dataSource[this.top++] = ele;
}


Stack.prototype.pop = function() {
  return this.dataSource[--this.top]
}

Stack.prototype.peek = function() {
  return this.dataSource[this.top - 1]
}

Stack.prototype.length = function() {
  return this.top
}

Stack.prototype.clear = function() {
  this.dataSource = []
}


var list = new Stack()
list.push(1)
list.push(2)

console.log(list.dataSource)
