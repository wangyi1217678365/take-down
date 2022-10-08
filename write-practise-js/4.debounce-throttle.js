// 防抖-节流主要用来解决高频发的事件触发
// debounce防抖实现：在一定的时间间隔内多次触发事件会重置，也就是说只有最后一次的执行是有效的。（回城机制）
function debounce (fun, wait) {
  let timer = null
  return function () {
    const _this = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
      return
    }
    timer = setTimeout(() => {
      fun.apply(_this, [...args])
    }, wait)
  }
}

// throttle节流实现：在一定的时间间隔内多次触发事件是无效，只会执行时间间隔内第一次的回调。（冷却机制）
function throttle (fun, wait) {
  let timer = null
  return function () {
    const _this = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fun.apply(_this, [...args])
        timer = null
      }, wait)
    }
  }
}