# [Event Loop](https://juejin.cn/post/6844903761949753352#comment)
> 事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

> 因为 js 是单线程运行的，在代码执行时，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行**同步代码**时，如果遇到**异步事件**，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到一个**任务队列**中等待执行。任务队列可以分为**宏任务队列**和**微任务队列**，当执行栈中的事件执行完毕后，js 引擎首先会判断微任务队列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务队列中的任务都执行完成后再去执行宏任务队列中的任务。

> Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

## 异步队列
注意：宏任务队列可以有多个，微任务队列只有一个。
### Micro-Task（微任务）队列
- 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。
### Macro-Task（宏任务）队列
- 常见的 macro-task 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。

## 过程解析
![Event Loop流程图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/10/1683863633586974~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

1. 一开始执行栈空,我们可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则（LIFO）。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。
2. 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。
3. 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。需要注意的是：当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。
4. 执行渲染操作，更新界面
5. 检查是否存在 Web worker 任务，如果有，则对其进行处理
6. 上述过程循环往复，直到两个队列都清空

总结：当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。

## [事件循环代码输出题](https://github.com/BigSharkLx/front-end-interview/blob/main/11%20offer%E6%94%B6%E5%89%B2%E6%9C%BA%E4%B9%8B%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E7%AF%87.md)