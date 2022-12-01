function myCall (context, ...args) {
  if (typeof this !== 'function') throw new TypeError(this + 'must be a function') // 如果this指向不是一个函数那么就报错
  const _this = context || window // 兼容 实参 this
  const fn = Symbol() // 创造唯一的key值
  _this[fn] = this // 将 函数内部的 this 也就是它自己挂载到 实参this上
  return _this[fn](...args) // 通过隐式绑定，将函数内部的 this 改变为调用函数
}

function myApply (context, args) {
  if (typeof this !== 'function') throw new TypeError(this + 'must be a function') // 如果this指向不是一个函数那么就报错
  const _this = context || window // 兼容 实参 this
  const fn = Symbol() // 创造唯一的key值
  _this[fn] = this // 将 函数内部的 this 也就是它自己挂载到 实参this上
  return _this[fn](...args) // 通过隐式绑定，将函数内部的 this 改变为调用函数
}

function myBind (context, ...args) {
  if (typeof this !== 'function') throw new TypeError(this + 'must be a function') // 如果this指向不是一个函数那么就报错
  const _this = context || window // 兼容 实参 this
  const fn = Symbol() // 创造唯一的key值
  const self = this
  const fun = function (...funArgs) {
    const allArgs = [...args, ...funArgs] // 合并myBind实参跟返回函数的实参
    if (this instanceof fun) { // 如果作为构造函数的话 构造函数中的 this 会指向实例对象，实例对象的原项链指向构造函数的原型 
      this[fn] = self 
      const result = this[fn](...allArgs) // 通过隐式绑定，改变函数内部的 this
      fun.prototype = Object.create(self.prototype) // 继承原型对象
      return (result && typeof (result === 'object' || typeof result === 'function')) ? result : this
    } else {
      _this[fn](...allArgs)
    }
  }
  return fun
}
