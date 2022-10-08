// instanceof 原理 判断目标对象的原型链上是否存在一个构造函数的prototype属性
/*
  手写思路:
  1. 参数校验: left必须是引用数据类型, right是一个构造函数 
  2. 通过Object.getPrototypeOf获取left的原型, right.prototype获取right的prototype属性
  3. 循环校验: 利用while循环语句判断left原型链上是否存在right的prototype属性
  4. 返回校验结果: Boolean类型
*/ 
const myInstanceof = (left, right) => {
  if ((left && typeof left !== 'object') || Object.prototype.toString.call(right) !== '[object Function]') return false
  let proto = Object.getPrototypeOf(left)
  const prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
