# JS SDK（埋点工具包）

## 多平台使用
如果需要多平台使用：跟据是否需要配置初始化信息分为两种情况。
- 需要：需要配置初始化信息，跟据配置的上报接口，公共参数等确定SDK工具包采集到的数据准确上传至指定服务器。
- 不需要：不需要配置初始化参数，一般是公司内部多个平台使用，他们的上报接口一致，但是数据上报时需要传入每个平台唯一标识，后端需要跟据这个标识来处理采集到的数据。平台标识一般需要前端加密不能明文传输。平台通过cdn拼接加密信息，SDK进行内部解密获取标识信息

## SDK工具包识别平台
> 获取引包时携带的唯一标识，包内解密获取明文标识。 

## 监控平台

### 重写事件监听（addEventListener），跟移除事件监听（removeEventListener）方法
> 因为原生移除不能删除匿名回调函数，所以通过重写实现。
```
  Element.prototype._addEventListener = Element.prototype.addEventListener;
  Element.prototype._removeEventListener = Element.prototype.removeEventListener;

  Element.prototype.addEventListener = function (type, listener, useCapture = false) {
    // declare listener
    this._addEventListener(type, listener, useCapture);

    if (!this.eventListenerList) this.eventListenerList = {};
    if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

    // add listener to  event tracking list
    this.eventListenerList[type].push({ type, listener, useCapture });
  };

  Element.prototype.removeEventListener = function (type, listener, useCapture = false) {
    // remove listener
    this._removeEventListener(type, listener, useCapture);

    if (!this.eventListenerList) this.eventListenerList = {};
    if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

    // Find the event in the list, If a listener is registered twice, one
    // with capture and one without, remove each one separately. Removal of
    // a capturing listener does not affect a non-capturing version of the
    // same listener, and vice versa.
    for (let i = 0; i < this.eventListenerList[type].length; i++) {
      if (this.eventListenerList[type][i].listener === listener && this.eventListenerList[type][i].useCapture === useCapture) {
        this.eventListenerList[type].splice(i, 1);
        break;
      }
    }
    // if no more events of the removed event type are left,remove the group
    if (this.eventListenerList[type].length == 0) delete this.eventListenerList[type];
  };

  Element.prototype.getEventListeners = function (type) {
    if (!this.eventListenerList) this.eventListenerList = {};

    // return reqested listeners type or all them
    if (type === undefined) return this.eventListenerList;
    return this.eventListenerList[type];
  }
```

### 页面路由监控（pageshow：页面加载；popstate：）

### 页面进程监控（页面加载；页面激活；页面关闭）

### 接口拦截（改写xml的send方法，统一处理参数；改写onreadystatechange，统一处理响应）

### 上报兼容

### 设计