# async
> async 函数是使用async关键字声明的函数。async 函数是 AsyncFunction 构造函数的实例，并且其中允许使用 await 关键字。**async 和 await 关键字让我们可以用一种更简洁的方式写出基于 Promise 的异步行为，而无需刻意地链式调用 promise。**

> **await 表达式会暂停整个 async 函数的执行进程并出让其控制权，只有当其等待的基于 promise 的异步操作被兑现或被拒绝之后才会恢复进程。promise 的解决值会被当作该 await 表达式的返回值。**

## 语法
```
  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }

  asyncCall();
```

## 返回值
> 一个 Promise，这个 promise 要么会通过一个由 async 函数返回的值被解决，要么会通过一个从 async 函数中抛出的（或其中没有被捕获到的）异常被拒绝。

## 特性
1. async 函数一定会返回一个 promise 对象。如果一个 async 函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中。
   ```
    async function foo() {
      return 1;
    }
    ||
    function foo() {
      return Promise.resolve(1);
    }
   ```
2. async 函数的函数体可以被看作是由 0 个或者多个 await 表达式分割开来的。从第一行代码直到（并包括）第一个 await 表达式（如果有的话）都是同步运行的。这样的话，一个不含 await 表达式的 async 函数是会同步运行的。然而，如果函数体内有一个 await 表达式，async 函数就一定会异步执行。
   ```
    async function foo() {
      console.log(1)
      await 2;
    }
    ||
    function foo() {
      console.log(1)
      return Promise.resolve(2).then(() => undefined);
    }
   ``` 
3. 在 await 表达式之后的代码可以被认为是存在在链式调用的 then 回调中，多个 await 表达式都将加入链式调用的 then 回调中，返回值将作为最后一个 then 回调的返回值。


## 注意
1. await关键字只在 async 函数内有效。如果你在 async 函数体之外使用它，就会抛出语法错误 SyntaxError 。
2. async/await的目的为了简化使用基于 promise 的 API 时所需的语法。async/await 的行为就好像搭配使用了生成器和 promise。
3. async 函数可能包含 0 个或者多个 await 表达式。
4. 使用 async/await 关键字就可以在异步代码中使用普通的 try/catch 代码块。
