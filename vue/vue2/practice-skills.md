# 小技巧
## 监听组件生命周期
### 监听自身
借助实例身上的事件函数，实现监听自身生命周期
```
  mounted () {
    window.addEventListener('online', this.handleOnline)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('online', this.handleOnline)
    })
  }
```
### 监听子组件
1. 方法一：注册自定义事件，子组件内部手动触发
```
  //父组件中这样写
  <rl-child
    @childMounted="handleChildMounted"
  />
  // 子组件中这样写
  mounted () {
    this.$emit('childMounted')
  }
```
2. 方法二：hook钩子函数去监听组件的声明周期
```
  //父组件中这样写
  <rl-child
    @hook:mounted="handleChildMounted"
  /> 
  // 子组件中不用写东西
  mounted () {}
  /*
    如果子组件中有 mounted 钩子，
    那么会先执行子组件再执行监听的回调函数
  */
```
---
## 减少响应式数据（优化 vue 实例化时间）
`常量数据放在响应式外层 借助 computed 依赖自定义响应数据更新 非响应式数据`
```
  // 数组中的每一项都会走 vue 的数据劫持逻辑
  <ul v-for="item in arr">
  </ul>
  data () {
    arr: []
  }
  methods: {
    getArr () {
      this.arr = [.....]
    }
  }
```
```
  // computed 依赖 arrChage 的变化进行计算
  <ul v-for="item in arrList">
  </ul>
  let arr = []
  data () {
    arrChage: false
  }
  computed: {
    arrList () {
      return ((this.arrChage) => arr)()
    }
  }
  methods: {
    getArr () {
      arr = [.....]
      this.arrChage = !this.arrChage
    }
  }
```
---
## 组件动态绑定事件、属性
```
  // 绑定事件 
  <parent v-on="{ click: goto, change: changeValue }" />
  // 等效于
  <parent @click="goto" @change="changeValue" />
  // 绑定属性
  data () {
      return {
          obj: {
              name: 'name',
              age: 18
          }
      }       
  }
  <parent v-bind="obj" />
  // 等效于
  <parent :name="name"  :age="18" />
```
---
## 初始化 data 数据
```
  Object.assign(this.$data, this.$options.data.call(this))
```
--- 
## watch 监听多个响应式数据
`借助计算属性computed`
```
  data () {
      return {
          obj: {
              name: 'name',
              age: 18
          },
          type: '8'
      }       
  }
  computed: {
      change () {
          return {
              name: this.obj.name,
              type: this.type
          }  
      }
  }
  watch: {
      change: function (val, oldVal) {
          console.log(val)  // { name: 'name', type: '8' }
      }
  }
```

