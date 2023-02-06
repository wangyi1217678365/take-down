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