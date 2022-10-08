// 实现new操作符的功能, 跟据一个构造函数生成它的实例化对象
/*
  手写思路
  1. 参数校验: fun必须是一个构造函数
  2. Object.create(fun.prototype): 创建一个对象, 这个对象的原型指向fun的prototype属性
  3. 改变fun中的this指向: 通过apply改变
  4. 校验返回值: 如果fun.apply(obj, args)的返回值是一个对象或者函数那么就返回它, 如果不是那么就返回生成的这个实例对象
*/
const myNew = (fun, ...args) => {
  if (typeof fun !== 'function') return 
  const obj = Object.create(fun.prototype)
  const result = fun.apply(obj, args)
  return ['[object Object]', '[object Function]'].includes(Object.prototype.toString.call(result))  || obj 
}