# 选项式 API vs 组合式 API

## 选项式 API（Options API）
> 使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
```
  <script>
  export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
      return {
        count: 0
      }
    },

    // methods 是一些用来更改状态与触发更新的函数
    // 它们可以在模板中作为事件监听器绑定
    methods: {
      increment() {
        this.count++
      }
    },

    // 生命周期钩子会在组件生命周期的各个不同阶段被调用
    // 例如这个函数就会在组件挂载完成后被调用
    mounted() {
      console.log(`The initial count is ${this.count}.`)
    }
  }
  </script>

  <template>
    <button @click="increment">Count is: {{ count }}</button>
  </template>
```
## [组合式 API（Composition API）](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
> 通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 \<script setup> 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，\<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。
下面是使用了组合式 API 与 \<script setup> 改造后和上面的模板完全一样的组件：
```
  <script setup>
  import { ref, onMounted } from 'vue'

  // 响应式状态
  const count = ref(0)

  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
  })
  </script>

  <template>
    <button @click="increment">Count is: {{ count }}</button>
  </template>
```
## 为什么要有组合式 API
- **更好的逻辑复用**：组合式 API 最基本的优势是它使我们能够通过组合函数来实现更加简洁高效的逻辑复用。在选项式 API 中我们主要的逻辑复用机制是 mixins，而组合式 API 解决了 [**mixins 的所有缺陷**](https://cn.vuejs.org/guide/reusability/composables.html#comparisons-with-other-techniques)。
  - 不清晰的数据来源：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。**推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然。**
  - 命名空间冲突：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。**推荐组合式函数，你可以通过在解构变量时对变量进行重命名来避免相同的键名。**
  - 隐式的跨 mixin 交流：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。**推荐使用组合式函数，返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。**
- **组合式函数 vs 无渲染组件**：组合式函数不会产生额外的组件实例开销。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的性能开销。
  - [无渲染组件](https://cn.vuejs.org/guide/components/slots.html#scoped-slots)：一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为无渲染组件。
  - [组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)：是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。将业务逻辑以一个组合式函数的形式提取到外部文件中，并返回需要暴露的状态。
- **更灵活的代码组织**：组合式 API可以很好的将逻辑关注点相关的代码被归为了一组，无需像选项式 API那样为了一个逻辑关注点在不同的选项块间来回滚动切换。还可以利用组合式函数将这一组代码移动到一个外部文件中，不再需要为了抽象而重新组织代码，大大降低了重构成本，这在长期维护的大型项目中非常关键。
- **更好的类型推导**：组合式 API 主要利用基本的变量和函数，它们本身就是类型友好的。用组合式 API 重写的代码可以享受到完整的类型推导，不需要书写太多类型标注。大多数时候，用 TypeScript 书写的组合式 API 代码和用 JavaScript 写都差不太多！这也让许多纯 JavaScript 用户也能从 IDE 中享受到部分类型推导功能。
- **更小的生产包体积**：搭配 \<script setup> 使用组合式 API 比等价情况下的选项式 API 更高效，对代码压缩也更友好。这是由于 \<script setup> 形式书写的组件模板被编译为了一个内联函数，和 \<script setup> 中的代码位于同一作用域。不像选项式 API 需要依赖 this 上下文对象访问属性，被编译的模板可以直接访问 \<script setup> 中定义的变量，无需一个代码实例从中代理。这对代码压缩更友好，因为本地变量的名字可以被压缩，但对象的属性名则不能。