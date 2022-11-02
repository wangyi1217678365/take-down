# Promise
> 用于表示一个异步操作的最终完成（或失败）及其结果值。当 promise 被调用后，它会以处理中状态 (pending) 开始。这意味着调用的函数会继续执行，而 promise 仍处于处理中直到解决为止，从而为调用的函数提供所请求的任何数据。被创建的 promise 最终会以被解决状态 (fulfilled) 或 被拒绝状态(rejected) 结束，并在完成时调用相应的回调函数（传给 then 和 catch）。
## 用法
```
  new Promise((resolve, reject) => {
    resolve(2)
  }).then(res => {
    console.log(res)
  })
  // 2
```
## 特性
### Promise
1. 一个 Promise 必然处于以下几种状态之一：
   - 待定 (pending): 初始状态，既没有被兑现，也没有被拒绝。
   - 已成功 (fulfilled) 意味着操作成功完成。
   - 已拒绝 (rejected): 意味着操作失败。
2. Promise 的状态只会通过执行对应的回调函数才能改变，如果没有执行回调，那么 Promise 对应状态的回调函数就不会执行。
   ```
      new Promise((resolve, reject) => {

      }).then(() => {
        console.log('已成功')
      }).catch(() => {
        console.log('已失败')
      })
   ```
3. Promise 的状态在发生变化之后，就不会再发生变化。
### Promise实例对象
1. （then、catch、finally）都是微任务，它们都接收一个回调函数，只有当 Promise 的状态发生变化，回调函数才会加入微任务队列中。
2. Promise对象是可以链式调用的，由于每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用。
3. then 或 catch 返回的值不能是 promise 本身，否则会造成死循环。
#### then
1. 接受的参数如果并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会传递下面。并不会额外生成异步任务。
2. 可以通过传入第二个形参为一个回调函数来捕获 Promise 中的错误。 
3. 返回任意一个非 promise 的值，那么会将返回值包裹成一个 promise 对象，会被下一个then捕获。
   ```
      Promise.resolve().then(() => {
        return new Error('error!!!')
      }).then(res => {
        console.log("then: ", res)
      }).catch(err => {
        console.log("catch: ", err)
      })
      // "then: " "Error: error!!!"
   ```
#### [then回调函数的返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
- 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
- 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
- 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的 Promise 的接受状态回调函数的参数值。
   ```
    let p1 = Promise.resolve(1)
    // 测试用例
    let p2 = p1
        .then((value) => {
            console.log(1)
            return new Promise((resolve, reject) => {
                resolve(2)
            })
        })
        .then((value) => {
            console.log(value)
        })
    // 对比用例
    let p3 = p1
        .then((value) => {
            console.log(3)
            return 4
        })
        .then((value) => {
            console.log(value)
            return 5
        })
        .then((value) => {
            console.log(value)
        })
    // 1 3 4 5 2
    /*
      then回调如果返回一个promise的话，会单独创建一个微任务去异步执行返回的promise的then操作。
      microtask(() => {
        resolution.then((value) => {
          ReslovePromise(promise, value) 
        })
      })
    */
   ```
   [解析](https://juejin.cn/post/7055202073511460895#heading-25)

- 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的 Promise 的拒绝状态回调函数的参数值。
- 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
#### catch
1. 主要用来捕获 Promise 中的错误。
#### finally
1. 不管Promise对象最后的状态如何都会执行。
2. 方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是无法知道Promise最终的状态是resolved还是rejected的。
3. 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
### Promise原型方法
#### resolve(value)
1. 返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable（即，带有 then 方法的对象），返回的 Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。
#### all(iterable)
1. 这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。

2. 如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。

3. 一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。
   ```
    function runAsync (x) {
      const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
      return p
    }
    function runReject (x) {
      const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
      return p
    }
    Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
          .then(res => console.log(res))
          .catch(err => console.log(err))
   ```

#### race(iterable)
1. 当 iterable 参数里的任意一个子 promise 成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应处理函数，并返回该 promise 对象。其他的函数虽然还会继续执行，但是不是被捕获了。
2. all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。

#### allSettled(iterable)
1. 返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。
   
## [手写](../write-practise-js/3.promise.js)
## [测试题](https://github.com/BigSharkLx/front-end-interview/blob/main/11%20offer%E6%94%B6%E5%89%B2%E6%9C%BA%E4%B9%8B%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E7%AF%87.md)