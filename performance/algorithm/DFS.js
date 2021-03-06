// 深度优先,非递归
function dfs1() {}


// 深度优先,递归
function dfs2(node, nodeList) {
  if(!node) return nodeList
  var children = node.children
  for(let i=0; i<children.length; i++){
    var item = children[i]
    nodeList.push(item)
    dfs2(item, nodeList)
  }
  return nodeList
}