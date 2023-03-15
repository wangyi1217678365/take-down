# [模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html#raw-html)
## [js表达式](https://cn.vuejs.org/guide/essentials/template-syntax.html#using-javascript-expressions)
> Vue 实际上在所有的数据绑定中都支持完整的 JavaScript 表达式
- 在文本插值中 (双大括号)
- 在任何 Vue 指令 (以 v- 开头的特殊 attribute) attribute 的值中
- 每个绑定仅支持单一表达式，也就是一段能够被求值的 JavaScript 代码。一个简单的判断方法是是否可以合法地写在 return 后面。
- 可以在绑定的表达式中使用一个组件暴露的方法，方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用，比如改变数据或触发异步操作。
- 模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性。然而，你也可以自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。
---
# [计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
> 模板中的表达式虽然方便，但也只能用来做简单的操作。如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。推荐使用计算属性来描述依赖响应式状态的复杂逻辑。
- 不要在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。
- 从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。
- 在选项式API中如果你为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。
## 计算属性缓存 vs 方法
> 同样的函数定义为一个方法或者计算属性，两种方式在结果上是完全相同的，然而，不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要响应式依赖不改变，无论多少次访问 计算属性都会立即返回先前的计算结果，而不用重复执行函数。相比之下，方法调用总是会在重渲染发生时再次执行函数。
## 可写计算属性
> 计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建
---
# [类和样式绑定](https://cn.vuejs.org/guide/essentials/class-and-style.html)
> 数据绑定的一个常见需求场景是操纵元素的 CSS class 列表和内联样式。因为 class 和 style 都是 attribute，我们可以和其他 attribute 一样使用 v-bind 将它们和动态的字符串绑定。但是，在处理比较复杂的绑定时，通过拼接生成字符串是麻烦且易出错的。因此，Vue 专门为 class 和 style 的 v-bind 用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。
- 对于只有一个根元素的组件，当你使用了 class attribute 时，这些 class 会被添加到根元素上，并与该元素上已有的 class 合并
- 如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs 属性来实现指定
## 自动前缀
> 当你在 :style 中使用了需要浏览器特殊前缀的 CSS 属性时，Vue 会自动为他们加上相应的前缀。Vue 是在运行时检查该属性是否支持在当前浏览器中使用。如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的。
## 样式多值
> 你可以对一个样式属性提供多个 (不同前缀的) 值，数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex。
```
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
---
# [条件渲染](https://cn.vuejs.org/guide/essentials/conditional.html)
- 一个 v-else 元素必须跟在一个 v-if 或者 v-else-if 元素后面，否则它将不会被识别。
- 一个使用 v-else-if 的元素必须紧跟在一个 v-if 或一个 v-else-if 元素后面。
- 因为 v-if 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 \<template> 元素上使用 v-if，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 \<template> 元素。
## v-if vs v-show
- v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
- v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
- v-show 元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。
> v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。
---
# [列表渲染](https://cn.vuejs.org/guide/essentials/list.html)
> 我们可以使用 v-for 指令基于一个数组来渲染一个列表。v-for 指令的值需要使用 item in items 形式的特殊语法，其中 items 是源数据的数组，而 item 是迭代项的别名
- v-for 可以用来遍历一个对象，数组，整数
- 在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。
- v-for 可以直接接受一个整数值。会将该模板基于 1...n 的取值范围重复多次。
## [通过 key 管理状态](https://cn.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
> Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。
- 默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute
- 推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。
- key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。
## [key的作用](https://cn.vuejs.org/api/built-in-special-attributes.html#key)
1. Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
2. 可以用于强制替换元素/组件而不是重复使用它。
### [key-管理可复用元素](https://v2.cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)
**问题：由于Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。**
  - 表单元素复用：表单被复用，连带表单的值
  - 组件复用：组件复用导致组件不会被重新创建所以生命周期不会重新执行

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key attribute 即可
### [v-for 使用 key来维护状态](https://v2.cn.vuejs.org/v2/guide/list.html#%E7%BB%B4%E6%8A%A4%E7%8A%B6%E6%80%81)
> 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute。建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。
---
# [事件处理](https://cn.vuejs.org/guide/essentials/event-handling.html)
> 我们可以使用 v-on 指令 (简写为 @) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：v-on:click="methodName" 或 @click="handler"。

**事件处理器的值可以是**
- 内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。
- 方法事件处理器：一个指向组件上定义的方法的属性名或是路径。

## 在内联事件处理器中访问事件参数
> 有时我们需要在内联事件处理器中访问原生 DOM 事件。你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数
```
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
```
---
# [指令](https://cn.vuejs.org/guide/essentials/template-syntax.html#directives)
> 指令由 v- 作为前缀，表明它们是一些由 Vue 提供的特殊 attribute，它们将为渲染的 DOM 应用特殊的响应式行为。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。Vue 提供了许多内置指令，v-model、v-html、v-bind、v-on、v-for、v-if、v-show等。
![指令详解](https://jsdelivr.codeqihan.com/gh/wangyi1217678365/yi-image-host/directive.69c37117.png)
- 在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 XSS 漏洞。请仅在内容安全可信时再使用 v-html，并且永远不要使用用户提供的 HTML 内容。
- 如果绑定的值是 null、undefined 或者 false，那么该 attribute 将会从渲染的元素上移除。
- 可以通过不带参数的 v-bind，将一个对象绑定到元素上。可以利用这点完成父组件传入对象，子组件props访问解构的对象。

## 动态参数
同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：v-bind:[attributeName]。这里的 attributeName 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数。

**参数限制**
- 动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。

**参数语法的限制**
- 动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。如果你需要传入一个复杂的动态参数，我们推荐使用计算属性替换复杂的表达式。
- 当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写
## 修饰符：修饰符可链式调用
> 修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 .prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()：
```
  <form @submit.prevent="onSubmit">...</form>
```
### [事件修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)
- .stop：阻止事件继续传播
- .prevent：阻止默认事件
- .capture：采用事件捕获机制
- .self：只当事件源是当前元素自身时触发处理函数
- .once：事件将只会触发一次
- .passive：不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。减少了额外的监听，从而提高了性能。**使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。**
### [按键修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#key-modifiers)

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
**可以通过全局 config.keyCodes 对象自定义按键修饰符别名**

### [系统修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

- .ctrl
- .alt
- .shift
- .meta
> 注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。

- [.exact 修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)
> .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

### [鼠标按钮修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#mouse-button-modifiers)
  - .left
  - .right
  - .middle

### [v-model修饰符](https://cn.vuejs.org/guide/essentials/forms.html#modifiers)
- .lazy：在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：
- .number：如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符。
- .trim：如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符。
---
# [表单输入绑定](https://cn.vuejs.org/guide/essentials/forms.html)
> 在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手动连接值绑定和更改事件监听器可能会很麻烦，v-model 指令帮我们简化了这一步骤。v-model 可以用于各种不同类型的输入，\<textarea>、\<select> 元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合。v-model 会忽略任何表单元素上初始的 value、checked 或 selected attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。你应该在 JavaScript 中使用响应式系统来声明该初始值。
- text 和 textarea 元素使用 value property 和 input 事件。
- checkbox 和 radio 使用 checked property 和 change 事件。
- select 字段将 value 作为 prop 并将 change 作为事件。
- 可以通过使用 v-bind 来实现当前组件实例上绑定动态数据。

