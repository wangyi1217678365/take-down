# vue2 面试题

## data 为什么必须是一个函数？
`针对根实例而言，只会被执行一次 new Vue，组件是通过同一个构造函数创建出的实例，如果组件的 data 是一个对象那么数据会被共享。希望每个组件的数据源都是独立的，那么就需要每次调用 data 返回一个新对象`
组件注册是会通过 Vue.extend 进行选项合并（将合并后的配置项挂载到了子类的静态属性上）返回 Vue 子类，由于 vue 的缓存机制，会根据相同的组件 id 返回唯一生成的子类。这就导致了如果组件 data 是一个对象，那么相同的组件其实是同一个子类生成的，所有相同的组件共用了子类身上的配置对象，其中有一个组件修改了 data 中的值会导致其它组件也受到影响。如果 data 是一个函数，那么合并完成后会执行这个函数并重新赋值。所以组件复用，每个组件都有自己的状态互不影响。
```
  Vue.extend = function (options) {
    function Sub () {
      this.data = this.constructor.options.data
    }
    Sub.options = mergeoptions(Vue.options, options) // 将全局配置对象和组件配置对象进行合并，并挂载到子类的静态属性 options 上
    return Sub
  }
  let Child = Vue.extend({ // 模拟组件缓存
    data: {a: 1}
  })
  let c1 = new Child()
  c1.data.a = 100
  let c2 = new Child()
  console.log(c2.data.a) // 100
```