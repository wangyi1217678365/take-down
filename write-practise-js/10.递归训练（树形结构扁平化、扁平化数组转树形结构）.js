/**
 * 树形结构扁平化
*/
const tree = [
  {
    "id": 1,
    "label": "一级 1",
    "children": [{
        "id": 3,
        "label": "二级 2-1",
        "children": [{
            "id": 4,
            "label": "三级 3-1-1"
        }, {
            "id": 5,
            "label": "三级 3-1-2",
            "disabled": true
        }]
    }, {
        "id": 2,
        "label": "二级 2-2",
        "disabled": true,
        "children": [{
            "id": 6,
            "label": "三级 3-2-1"
        }, {
            "id": 7,
            "label": "三级 3-2-2",
            "disabled": true
        }]
    }]
  }
]
function flatToTree (tree, flatArr) {
  tree.forEach(item => {
    if (item?.children?.length) {
      const {children, ...data} = item
      flatArr.push(data)
      flatTree(children, flatArr)
    } else {
      item.push(item)
    }
  })
  return flatArr
}
const result = flatToTree(tree, [])
console.log(result);

/**
 * 扁平化数组转树形结构
*/
const flatArr = [
  {
    id: 1,
    pid: 0
  },
  {
    id: 2,
    pid: 1
  },
  {
    id: 3,
    pid: 2
  },
  {
    id: 4,
    pid: 2
  },
  {
    id: 5,
    pid: 1
  },
  {
    id: 6,
    pid: 0
  },
  {
    id: 7,
    pid: 6
  },
  {
    id: 8,
    pid: 2
  },
  {
    id: 9,
    pid: 0
  }
]
function treeToFlat (flatArr, map, tree) {
  flatArr.forEach(item => {
    const hasPid = map.has(item.pid)
    if (hasPid) {
      if (!map.get(item.pid)?.children) map.get(item.pid).children = []
      map.get(item.pid).children.push(item)
      map.set(item.id, item)
    } else if (!hasPid && item.pid === 0) {
      tree.push(item)
      map.set(item.id, item)
    }
  })
  return tree
}
const treeList = treeToFlat(flatArr, new Map(), [])
console.log(treeList)