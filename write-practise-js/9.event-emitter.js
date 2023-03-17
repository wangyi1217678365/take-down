// 发布订阅模式
class EventEmitter {
  constructor () {
    this.events = {}
  }

  // 订阅
  on (type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack]
    } else {
      this.events[type].push(callBack)
    }
  }

  // 订阅一次
  once (type, callBack) {
    function fn (...args) {
      callBack(...args)
      this.off(type, fn)
    }
    this.on(type, fn)
  }

  // 通知
  emit (type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(item => {
        // 改变执行函数的 this 指向，指向实例
        item.apply(this, args)
      })
    }
  }

  // 取消订阅
  off (type, callBack) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack
    })
  }
}

// 运行示例
let ev = new EventEmitter();

const fun1 = (str) => {
  console.log(str);
}

ev.on('say', fun1);
ev.once('say', fun1)
ev.emit('say', 'visa');
ev.off('say', fun1);
console.log(ev.events)
  