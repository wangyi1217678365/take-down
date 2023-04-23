// 实现new操作符的功能, 跟据一个构造函数生成它的实例化对象
/*
  new 操作符的特性：
  1. new 操作符只能操作非箭头函数以外的函数
  2. 会跟据构造函数创建出一个实例对象
  3. 实例对象的原型链指向这个构造函数的原型
  4. 构造函数中的this指向这个实例对象
  5. 如果构造函数没有返回对象，则返回this也就是这个实例对象
  手写思路：
  1. 参数校验: fun必须是一个构造函数
  2. Object.create(fun.prototype): 创建一个对象, 这个对象的原型指向fun的prototype属性
  3. 改变fun中的this指向: 通过apply改变
  4. 校验返回值: 如果fun.apply(obj, args)的返回值是一个对象或者函数那么就返回它, 如果不是那么就返回生成的这个实例对象
*/
const myNew = (fun, ...args) => {
  if (typeof fun !== 'function') return 
  const obj = Object.create(fun.prototype)
  const result = fun.apply(obj, args)
  return (result && (typeof result === 'object' || typeof result === 'function')) || obj 
}