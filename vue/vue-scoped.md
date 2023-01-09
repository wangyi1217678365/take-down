# [scoped（组件作用域css）](https://cn.vuejs.org/api/sfc-css-features.html#scoped-css)
> 当 \<style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素，和 Shadow DOM 中的样式封装类似。使用时有一些注意事项，不过好处是不需要任何的 polyfill。它的实现方式是通过 PostCSS 将以下内容：
```
  <style scoped>
  .example {
    color: red;
  }
  </style>

  <template>
    <div class="example">hi</div>
  </template>
```
转化为
```
  <style>
  .example[data-v-f3f3eg9] {
    color: red;
  }
  </style>

  <template>
    <div class="example" data-v-f3f3eg9>hi</div>
  </template>
```
**你可以在一个组件中同时使用有作用域和无作用域的样式：**
```
  <style>
  /* 全局样式 */
  </style>

  <style scoped>
  /* 本地样式 */
  </style>
```
**影响范围：自身组件根元素，组件内的所有原生标签，子组件根元素。都会添加ScopedId。**

**Scoped CSS 的本质是基于 HTML 和 CSS 属性选择器，即分别给 HTML 标签和 CSS 选择器添加 唯一标识；**
1. 首先 vue-loader 会解析 .vue 组件，提取出 template、script、style 对应的代码块；
2. 然后构造组件实例，在组件实例的选项上绑定 ScopedId
3. 最后对 style 的 CSS 代码进行编译转化，为每个选择器的最后一个选择器添加ScopedId属性选择器。如：.self > .child > p, 更改后选择器为 .self > .child > p[ScopedId]
   
**通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。**

## 深度选择器
> 由于style中的css会被编译转化，结合scoped的影响范围导致，在当前组件中尝试修改子组件非根元素的样式会失效。深度选择器用来解决这类问题。

### vue2
```
  <style scoped>
  .a ::v-deep.b {
    /* ... */
  }
  </style>
  ```
  上面的代码会被编译成：
  ```
  .a[data-v-f3f3eg9] .b {
    /* ... */
  }
```

### vue3
```
  <style scoped>
  .a :deep(.b) {
    /* ... */
  }
  </style>
  ```
  上面的代码会被编译成：
  ```
  .a[data-v-f3f3eg9] .b {
    /* ... */
  }
```

### 其它功能
#### 插槽选择器 (vue3)
默认情况下，作用域样式不会影响到 \<slot/> 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 :slotted 伪类以明确地将插槽内容作为选择器的目标：
```
  <style scoped>
  :slotted(div) {
    color: red;
  }
  </style>
```

#### 全局选择器 (vue3)
如果想让其中一个样式规则应用到全局，比起另外创建一个 \<style>，可以使用 :global 伪类来实现 (看下面的代码)：
```
  <style scoped>
  :global(.red) {
    color: red;
  }
  </style>
```

#### CSS中的v-bind (vue3)
单文件组件的 \<style> 标签支持使用 v-bind CSS 函数将 CSS 的值链接到动态的组件状态：
```
  <template>
    <div class="text">hello</div>
  </template>

  <script>
  export default {
    data() {
      return {
        color: 'red'
      }
    }
  }
  </script>

  <style>
  .text {
    color: v-bind(color);
  }
  </style>
```
这个语法同样也适用于 \<script setup>，且支持 JavaScript 表达式 (需要用引号包裹起来)：
```
  <script setup>
  const theme = {
    color: 'red'
  }
  </script>

  <template>
    <p>hello</p>
  </template>

  <style scoped>
  p {
    color: v-bind('theme.color');
  }
  </style>
```
实际的值会被编译成哈希化的 CSS 自定义属性，因此 CSS 本身仍然是静态的。自定义属性会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。

### CSS Modules (vue3)
一个 \<style module> 标签会被编译为 CSS Modules 并且将生成的 CSS class 作为 $style 对象暴露给组件：
```
  <template>
    <p :class="$style.red">This should be red</p>
  </template>

  <style module>
  .red {
    color: red;
  }
  </style>
```

#### 自定义注入名称
你可以通过给 module attribute 一个值来自定义注入 class 对象的属性名：
```
  <template>
    <p :class="classes.red">red</p>
  </template>

  <style module="classes">
  .red {
    color: red;
  }
  </style>
```

#### 与组合式 API 一同使用
可以通过 useCssModule API 在 setup() 和 \<script setup> 中访问注入的 class。对于使用了自定义注入名称的 \<style module> 块，useCssModule 接收一个匹配的 module attribute 值作为第一个参数：
```
  import { useCssModule } from 'vue'

  // 在 setup() 作用域中...
  // 默认情况下, 返回 <style module> 的 class
  useCssModule()

  // 具名情况下, 返回 <style module="classes"> 的 class
  useCssModule('classes')
```

