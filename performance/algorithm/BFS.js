// 广度优先, 非递归
function dfs1(node) {
  var stack = []
  var nodes = []
  if(!node) return nodes
  stack.push(node)
  while(stack.length) {
    var item = stack.pop()
    var children = item.children
    nodes.push(item)
    for(let i=0; i< children.length; i++){
      stack.push(children[i])
    }
  }
  return nodes
}