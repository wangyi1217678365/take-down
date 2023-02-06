# [vue3](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)
![vue3生命周期](https://cdn.jsdelivr.net/gh/wangyi1217678365/yi-image-host/lifecycle.16e4c08e.png)
1. **[onBeforeMount](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforemount)**：注册一个回调函数，在组件被挂载之前被调用。
   - 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。
   - 这个钩子在服务器端渲染期间不会被调用。
2. **[onMounted](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)**：注册一个回调函数，在组件挂载完成后执行。
   - 这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在服务端渲染应用中用于确保 DOM 相关代码仅在客户端执行。
   - 组件在以下情况下被视为已挂载：
     - 其所有同步子组件都已经被挂载 (不包含异步组件或 \<Suspense> 树内的组件)。
     - 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。
   - 这个钩子在服务器端渲染期间不会被调用。
3. **[onBeforeUpdate](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeupdate)**：注册一个回调函数，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。
   - 这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
   - 这个钩子在服务器端渲染期间不会被调用。
4. **[onUpdated](https://cn.vuejs.org/api/composition-api-lifecycle.html#onupdated)**：注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
   - 父组件的更新钩子将在其子组件的更新钩子之后调用。钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。
   - 如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。
   - 这个钩子在服务器端渲染期间不会被调用。
5. **[onBeforeUnmount](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount)**：注册一个回调函数，在组件实例被卸载之前调用。
   - 当这个钩子被调用时，组件实例依然还保有全部的功能。
   - 这个钩子在服务器端渲染期间不会被调用。
6. **[onUnmounted](https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted)**：注册一个回调函数，在组件实例被卸载之后调用。
   - 一个组件在以下情况下被视为已卸载：
     - 其所有子组件都已经被卸载。
     - 所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止。
   - 可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。
   - 这个钩子在服务器端渲染期间不会被调用。
7. **[onErrorCaptured](https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted)**：注册一个回调函数，在捕获了后代组件传递的错误时调用。
---
# [声明响应式状态](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state)
## reactive
```
  import { reactive } from 'vue'
  export default {
    // `setup` 是一个专门用于组合式 API 的特殊钩子函数
    setup() {
      const state = reactive({ count: 0 })

      // 暴露 state 到模板
      return {
        state
      }
    }
  }
```
```
  <div>{{ state.count }}</div>  
```
**[为响应式对象标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-reactive)**
## 深层响应性
> 在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。你也可以直接创建一个[浅层响应式对象](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)。它们仅在顶层具有响应性，一般仅在某些特殊场景中需要。
## 响应式代理 vs 原始对象
1. reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的
2. 只有代理对象是响应式的，更改原始对象不会触发更新。
3. 为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身
## reactive的局限性
1. 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。
2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失。同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性
## ref
> reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。为此，Vue 提供了一个 ref() 方法来允许我们创建可以使用任何值类型的响应式 ref。ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象
```
  const count = ref(0)
  console.log(count) // { value: 0 }
  console.log(count.value) // 0
  count.value++
  console.log(count.value) // 1
```
1. 一个 ref 创建的响应式对象，可以响应式地替换整个原始对象
2. ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性

## ref 解包
1. 当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 .value。请注意，仅当 ref 是模板渲染上下文的顶层属性时才适用自动“解包”。例如， foo 是顶层属性，但 object.foo 不是。
2. 如果一个 ref 是文本插值（即一个 {{ }} 符号）计算的最终值，它也将被解包。
3. 当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样。如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref
4. 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。
5. 跟响应式对象不同，当 ref 作为响应式数组或像 Map 这种原生集合类型的元素被访问时，不会进行解包。

**[为ref标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-ref)**

# 数据传递

- 父传子：利用defineProps宏函数来进行声明，接收父组件传递过来的参数，它的参数和 Vue2 props 选项的值是一样的。
- 子传父：利用defineProps宏函数来进行声明，接收父组件传递过来的参数，它的参数和 Vue2 props 选项的值是一样的。

