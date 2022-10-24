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

# [生命周期](https://v2.cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

![生命周期](https://v2.cn.vuejs.org/images/lifecycle.png)

## [beforeCreate](https://v2.cn.vuejs.org/v2/api/#beforeCreate)

> 在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。在这个阶段data选项跟methods选项还没有初始化完毕，所以data数据不是响应式的。

## [created](https://v2.cn.vuejs.org/v2/api/#created)

> 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。

## [beforeMount](https://v2.cn.vuejs.org/v2/api/#beforeMount)

> 在挂载开始之前被调用：相关的 render 函数首次被调用。这时还无法获取到$el property。注意该钩子在服务器端渲染期间不被调用。

## [mounted](https://v2.cn.vuejs.org/v2/api/#mounted)

> 实例被挂载后调用，这时 el 被新创建的 \$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 \$el 也在文档内。注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 $nextTick

## [beforeUpdate](https://v2.cn.vuejs.org/v2/api/#beforeUpdate)

> 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。注意该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。

## [updated](https://v2.cn.vuejs.org/v2/api/#updated)

> 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 $nextTick

## [activated](https://v2.cn.vuejs.org/v2/api/#activated)

> 被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。

## [deactivated](https://v2.cn.vuejs.org/v2/api/#deactivated)

> 被 keep-alive 缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。

## [beforeDestroy](https://v2.cn.vuejs.org/v2/api/#beforeDestroy)

> 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。

## [destroyed](https://v2.cn.vuejs.org/v2/api/#destroyed)

> 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

# [计算属性和侦听器](https://v2.cn.vuejs.org/v2/guide/computed.html)

> 对于模板中任何的复杂逻辑，你都应当使用计算属性。

- [计算属性 vs 方法](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95)：我们可以将同一函数定义为一个方法和一个计算属性。两种方式的最终结果是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要响应数据还没有发生改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。
- [计算属性 vs 侦听属性](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)：
  1. 计算属性可以从组件数据派生出新数据，最常见的使用方式是设置一个函数，返回计算之后的结果，computed和methods的差异是它具备缓存性，如果依赖项不变时不会重新计算。侦听器可以侦测某个响应式数据的变化并执行副作用，常见用法是传递一个函数，执行副作用，watch没有返回值，但可以执行异步操作等复杂逻辑。
  2. 计算属性常用场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护。侦听器常用场景是状态变化之后做一些额外的DOM操作或者异步操作。选择采用何用方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性。
  3. 使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。watch可以传递对象，设置deep、immediate等选项。

# [侦听器](https://v2.cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

> 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

# [v-if vs v-show](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

1. v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
2. v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
3. v-show 元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
> 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

# [避免 v-if 和 v-for 用在一起](https://v2.cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81)

> 当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级。因此哪怕我们只渲染出一部分的元素，也得在每次重渲染的时候遍历整个列表，不论过滤条件或者是列表是否发生了变化。

使用计算属性对列表进行处理：
1. 过滤后的列表只会在数组发生相关变化时才被重新运算，过滤更高效。
2. 使用 v-for 之后，我们在渲染的时候只遍历有效数据，渲染更高效。
3. 解耦渲染层的逻辑，可维护性 (对逻辑的更改和扩展) 更强。

# [key的作用](https://v2.cn.vuejs.org/v2/api/#key)

1. Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
2. 可以用于强制替换元素/组件而不是重复使用它。

## [key-管理可复用元素](https://v2.cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)
> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

- 问题：
  - 表单元素复用：导致表单被复用，连带表单的值
  - 组件复用：由于组件复用导致组件不会被重新创建所以生命周期不会重新执行

> 这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key attribute 即可

## [v-for 使用 key来维护状态](https://v2.cn.vuejs.org/v2/guide/list.html#%E7%BB%B4%E6%8A%A4%E7%8A%B6%E6%80%81)

> 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute。建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

# 修饰符
- 修饰符可链式调用
## [原生事件修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- .stop：阻止事件继续传播
- .prevent：阻止默认事件
- .capture：采用事件捕获机制
- .self：只当事件源是当前元素自身时触发处理函数
- .once：事件将只会触发一次
- .passive：不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。减少了额外的监听，从而提高了性能。

## [自定义事件修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

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

## [按键修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

```
  <input v-on:keyup.page-down="onPageDown">
```
> 处理函数只会在 $event.key 等于 PageDown 时被调用。你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。keyCode 的事件用法已经被废弃了并可能不会被最新的浏览器支持。
- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right
> 可以通过全局 config.keyCodes 对象自定义按键修饰符别名

## [系统修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

- .ctrl
- .alt
- .shift
- .meta
> 注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。

- [.exact 修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)
> .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

- [鼠标按钮修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E9%BC%A0%E6%A0%87%E6%8C%89%E9%92%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
  - .left
  - .right
  - .middle

# [v-model](https://v2.cn.vuejs.org/v2/guide/forms.html)
> 你可以用 v-model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

> v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。
## 基本用法
```
  <!-- 当选中时，`picked` 为字符串 "a" -->
  <input type="radio" v-model="picked" value="a">

  <!-- `toggle` 为 true 或 false -->
  <input type="checkbox" v-model="toggle">

  <!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
  <select v-model="selected">
    <option value="abc">ABC</option>
  </select>
```

## 修饰符
### .lazy
> 在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：
```
  <!-- 在“change”时而非“input”时更新 -->
  <input v-model.lazy="msg">
```
### .number
> 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
```
  <input v-model.number="age" type="number">
```
### .trim
> 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：
```
  <input v-model.trim="msg" />
```

## [自定义组件的 v-model](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
> 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突：
```
  Vue.component('base-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    template: `
      <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
      >
    `
  })
  <base-checkbox v-model="lovingVue"></base-checkbox>
```
> 这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 `<base-checkbox>` 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的 property 将会被更

> 注意你仍然需要在组件的 props 选项里声明 checked 这个 prop。

# inheritAttrs

# component动态组件

# [slot（插槽）](https://v2.cn.vuejs.org/v2/guide/components-slots.html)

## 默认插槽

## 具名插槽

## 作用域插槽

## 动态插槽
