# [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
> 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数，该方法会改变调用函数的 this指向
## 语法
```
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }

  console.log(new Food('cheese', 5).name);
```
## 参数
> n个参数，第一个参数为函数运行时使用的 this 值，其它参数做为函数调用的形数。如果没有参数那么this默认指向window，严格模式下this指向undefined

## 返回值
> 使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

# [apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
> 方法使用一个指定的 this 值和单独给出的一个数组的形式来为函数提供形参，该方法会改变调用函数的 this指向
## 语法
```
  const numbers = [5, 6, 2, 3, 7];
  const max = Math.max.apply(null, numbers);
  console.log(max);
  // expected output: 7
  const min = Math.min.apply(null, numbers);
  console.log(min);
```
## 参数
> 两个参数，第一个参数为函数运行时使用的 this 值，第二个参数是一个数组或类数组对象。其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。如果没有参数那么this默认指向window，严格模式下this指向undefined
## 返回值
> 使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

# [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
> 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
## 语法
```
  const module = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };

  const unboundGetX = module.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined

  const boundGetX = unboundGetX.bind(module);
  console.log(boundGetX());
  // expected output: 42
```
## 参数
> 跟call方法保持一致

## 返回值
> 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

# [手写](../knowledge-point-js/call-apply-bind.md)

# 异同点
## 相同点
三者都是用来改变函数的上下文，也就是this指向的。
## 不同点
1. bind 不会立即调用，而是返回一个改变this指向后的新函数。
2. call 立即调用，返回函数执行结果，this指向第一个参数，后面可有多个参数，并且这些都是调用函数的参数。
3. apply 立即调用，返回函数的执行结果，this指向第一个参数，第二个参数是个数组，这个数组里内容是调用函数的参数。

# 应用场景
- 需要立即调用使用call/apply
- 要传递的参数不多，则可以使用fn.call(thisObj, arg1, arg2 ...)
- 要传递的参数很多，则可以用数组将参数整理好调用fn.apply(thisObj, [arg1, arg2 ...])
- 不需要立即执行，而是想生成一个新的函数长期绑定某个函数给某个对象使用，使用const newFn = fn.bind(thisObj); newFn(arg1, arg2...)
