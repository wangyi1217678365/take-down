# [vue2](https://cdn.jsdelivr.net/gh/wangyi1217678365/yi-image-host/lifecycle.png)
![vue2生命周期](https://cdn.jsdelivr.net/gh/wangyi1217678365/yi-image-host/16ca74f183827f46~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
1. **[beforeCreate](https://v2.cn.vuejs.org/v2/api/#beforeCreate)**：在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。在这个阶段data选项跟methods选项还没有初始化完毕，所以data数据不是响应式的。
2. **[created](https://v2.cn.vuejs.org/v2/api/#created)**：在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。
3. **[beforeMount](https://v2.cn.vuejs.org/v2/api/#beforeMount)**：在挂载开始之前被调用：相关的 render 函数首次被调用。这时还无法获取到$el property。注意该钩子在服务器端渲染期间不被调用。
4. **[mounted](https://v2.cn.vuejs.org/v2/api/#mounted)**：实例被挂载后调用，这时 el 被新创建的 \$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 \$el 也在文档内。注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 $nextTick
5. **[beforeUpdate](https://v2.cn.vuejs.org/v2/api/#beforeUpdate)**：在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。注意该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
6. **[updated](https://v2.cn.vuejs.org/v2/api/#updated)**：在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 $nextTick
7. **[activated](https://v2.cn.vuejs.org/v2/api/#activated)**：被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。
8. **[deactivated](https://v2.cn.vuejs.org/v2/api/#deactivated)**：被 keep-alive 缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。
9. **[beforeDestroy](https://v2.cn.vuejs.org/v2/api/#beforeDestroy)**：实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。
10. **[destroyed](https://v2.cn.vuejs.org/v2/api/#destroyed)**：实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
---
# [组件通信](https://juejin.cn/post/6999687348120190983#heading-10)
- [props](https://v2.cn.vuejs.org/v2/guide/components-props.html)（父组件通过v-bind向子组件传入响应式数据，子组件通过props选项接受并校验）
- v-on/$emit
  - [v-on](https://v2.cn.vuejs.org/v2/api/#v-on)：用在普通元素上时，只能监听原生 DOM 事件。用在组件上时，可以通过v-on向子组件注册自定义事件。
  - [$emit](https://v2.cn.vuejs.org/v2/api/#vm-emit)：子组件通过\$emit触发当前实例上的事件，可以跟v-on结合使用触发父组件注册的自定义事件
- \$attrs/$listeners
  - [$attrs](https://v2.cn.vuejs.org/v2/api/#vm-attrs)：包含了父组件中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。可以通过 v-bind="\$attrs" 传入子组件
  - [$listeners](https://v2.cn.vuejs.org/v2/api/#vm-listeners)：包含了父组件中的 (不含 .native 修饰器的) v-on 事件监听器。可以通过 v-on="\$listeners" 传入子组件
- \$child/$parent
  - [$child](https://v2.cn.vuejs.org/v2/api/#vm-children)：当前实例的直接子组件。需要注意并不保证子组件实例顺序，也不是响应式的。考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。可以通过\$child获取子组件实例对象，然后获取实例上的属性或调用方法。
  - [$parent](https://v2.cn.vuejs.org/v2/api/#vm-parent)：父实例，如果当前实例有的话。可以通过\$parent获取父组件实例对象，然后获取实例上的属性或调用方法。
- [ref](https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)：通过ref可以为当前组件任意元素赋予一个ID，通过$refs[ID]可以访问指定的元素/实例
- [.sync修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)：实现父子组件之间的双向通信，父组件通过v-bind:xxx.sync向子组件传入一个响应式数据，会自动为子组件创建一个名为update:xxx的自定义函数，子组件可以通过$emit('update:xxx')来触发这个函数来改变父组件xxx的值。
- [v-model与表单控件或组件实现双向绑定](https://v2.cn.vuejs.org/v2/api/#v-model)：
  - [与表单控件](https://v2.cn.vuejs.org/v2/guide/forms.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95)：改变绑定的响应式数据表单控件的值会随之改变，改变表单控件的值，响应式数据也会随之改变。
  - [与组件](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
- EventBus（中央事件总线）：借助vue实例的\$on，\$off，\$emit事件实现事件的发布订阅。通过创建一个外部的vue实例，在需要的组件中引入这个实例，通过调用这个实例的\$on方法为这个实例注册事件，通过调用这个实例的\$off方法传入事件名或不传参实现注销指定的事件或清除通过这个实例的\$on注册的所有事件。注意：注册的事件需要及时注销否则每次都会注册新事件。
- [vuex](https://v3.vuex.vuejs.org/zh/)：是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
- [provide/inject](https://v2.cn.vuejs.org/v2/api/#provide-inject)：这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
  - provide：应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。
  - inject：一个字符串数组，或一个对象，对象的 key 是本地的绑定名，value 是在可用的注入内容中搜索用的 key (字符串或 Symbol)，或一个对象，该对象的：from property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)；default property 是降级情况下使用的 value
  - 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
- $root：获取当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
## 父子组件通信
- props
- v-on/$emit
- \$attrs/$listeners
- \$child/$parent
- ref
- .sync
- v-model

## 兄弟组件通信
- EventBus
- vuex

## 跨层级组件通信
- provide/inject
- EventBus
- vuex
- $root
---
# 侦听器

> 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

# 计算属性 vs 侦听属性
  1. 计算属性可以从组件数据派生出新数据，最个函常见的使用方式是设置一数，返回计算之后的结果，computed和methods的差异是它具备缓存性，如果依赖项不变时不会重新计算。侦听器可以侦测某个响应式数据的变化并执行副作用，常见用法是传递一个函数，执行副作用，watch没有返回值，但可以执行异步操作等复杂逻辑。
  2. 计算属性常用场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护。侦听器常用场景是状态变化之后做一些额外的DOM操作或者异步操作。选择采用那种方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性。
  3. 使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。watch可以传递对象，设置deep、immediate等选项。

# [自定义事件修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

- [.native](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)：将原生事件绑定到组件的根元素上
  ```
    <base-input v-on:focus.native="onFocus"></base-input>
  ```
- [.async](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)：对一个 prop 进行“双向绑定”
  ```
    <text-document
      v-bind:title="doc.title"
      v-on:update:title="doc.title = $event"
    ></text-document>
    // 等价于
    <text-document v-bind:title.sync="doc.title"></text-document>
  ```
  注意：
  - 有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。
  - 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。应该使用 v-bind.sync=”对象变量”
# inheritAttrs

# component动态组件

# [slot（插槽）](https://v2.cn.vuejs.org/v2/guide/components-slots.html)

## 默认插槽

## 具名插槽

## 作用域插槽

## 动态插槽


