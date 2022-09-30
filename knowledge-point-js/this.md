# this
> this是一个js中的关键字，是当前执行上下文（global、function 或 eval）的一个属性，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值。在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）。

## this指向
### 默认绑定
> 在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。非严格模式下：this指向全局对象（window）；严格模式下：this指向undefined。
### 隐式绑定
> 函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。
```
  function sayHi(){
      console.log('Hello,', this.name);
  }
  var person = {
      name: 'YvetteLau',
      sayHi: sayHi
  }
  var name = 'Wiliam';
  person.sayHi();
  /*
    打印的结果是 Hello,YvetteLau.
    sayHi函数声明在外部，严格来说并不属于person，但是在调用sayHi时,调用位置会使用person的上下文来引用函数，隐式绑定会把函数调用中的this(即此例sayHi函数中的this)绑定到这个上下文对象（即此例中的person）
  */
```
- 注意：
  - 对象属性链中只有最后一层会影响到调用位置
  - 隐式绑定的this很容易丢失
  ```
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi
    }
    var name = 'Wiliam';
    var Hi = person.sayHi;
    Hi();
    /*
      结果是: Hello,Wiliam.
      这是为什么呢，Hi直接指向了sayHi的引用，在调用的时候，跟person没有半毛钱的关系，针对此类问题，我建议大家只需牢牢记住这个格式:XXX.fn();fn()前如果什么都没有，那么肯定不是隐式绑定。
    */
  ```
  ```
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person1 = {
        name: 'YvetteLau',
        sayHi: function(){
            setTimeout(function(){
                console.log('Hello,',this.name);
            })
        }
    }
    var person2 = {
        name: 'Christina',
        sayHi: sayHi
    }
    var name='Wiliam';
    person1.sayHi();
    setTimeout(person2.sayHi,100);
    setTimeout(function(){
        person2.sayHi();
    },200);
    /*
      Hello, Wiliam: setTimeout的回调函数中，this使用的是默认绑定，非严格模式下，执行的是全局对象
      Hello, Wiliam: setTimeout(fn,delay){ fn(); },相当于是将person2.sayHi赋值给了一个变量，最后执行了变量，这个时候，sayHi中的this显然和person2就没有关系了。
      Hello, Christina: 这是执行的是person2.sayHi()使用的是隐式绑定，因此这是this指向的是person2，跟当前的作用域没有任何关系。
    */
  ```

### 显示绑定
> 通过call,apply,bind的方式，显式的指定this所指向的对象。call,apply和bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。
```
  function sayHi(){
      console.log('Hello,', this.name);
  }
  var person = {
      name: 'YvetteLau',
      sayHi: sayHi
  }
  var name = 'Wiliam';
  var Hi = person.sayHi;
  Hi.call(person); 
  // 输出的结果为: Hello, YvetteLau. 因为使用硬绑定明确将this绑定在了person上。
```
```
  function sayHi(){
      console.log('Hello,', this.name);
  }
  var person = {
      name: 'YvetteLau',
      sayHi: sayHi
  }
  var name = 'Wiliam';
  var Hi = function(fn) {
      fn();
  }
  Hi.call(person, person.sayHi); 
  /*
    输出的结果是 Hello, Wiliam. 原因很简单，Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候，相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了，隐式绑定也丢了)，没有指定this的值，对应的是默认绑定。
  */
```
- 注意：
  - 如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。

### new绑定
> 在javaScript中，构造函数只是使用new操作符时被调用的函数，这些函数和普通的函数并没有什么不同，使用new来调用函数，会自动执行下面的操作：
1. 创建一个空对象，构造函数中的this指向这个空对象
2. 这个新对象被执行 [[原型]] 连接
3. 执行构造函数方法，属性和方法被添加到this引用的对象中
4. 如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。
```
  function _new () {
    const [constructor, ...args] = [...arguments]
    const result = Object.create(constructor)
    result.fun = constructor
    const target = result.fun()
    delete result.fun
    if (target && typeof target === "object") {
      //如果构造函数执行的结构返回的是一个对象，那么返回这个对象
      return target;
    }
    //如果构造函数返回的不是一个对象，返回创建的新对象
    return result;
  }
```

## 绑定优先级
new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

## 箭头函数
> 箭头函数是ES6中新增的，它和普通函数有一些区别，箭头函数不会创建自己的this，它只会从自己的作用域链的上一层继承 this。箭头函数的this是静态：由于js是静态词法作用域，作用域链在函数声明时就已经确定了，所以箭头函数的this指向在函数声明时就已经确定了。
```
  var obj = {
   hi: function(){
       console.log(this);
       return ()=>{
           console.log(this);
       }
   },
   sayHi: function(){
       return function() {
           console.log(this);
           return ()=>{
               console.log(this);
           }
       }
   },
   say: ()=>{
       console.log(this);
   }
  }
  let hi = obj.hi();  //输出obj对象
  hi();               //输出obj对象
  let sayHi = obj.sayHi();
  let fun1 = sayHi(); //输出window
  fun1();             //输出window
  obj.say();          //输出window
```

## 总结
1. 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
2. 函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
3. 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
4. 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
5. 如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
6. 如果是箭头函数，箭头函数从作用域链的上一层继承 this。
