/*
  ajax：是一种浏览器与 Web 服务器之间进行异步数据传输（HTTP 请求）从服务器获取数据的技术。
  作用：它可以在不重新加载整个网页的情况下，通过JavaScript接受服务器传来的数据，然后操作DOM对网页的部分内容进行更新，使用Ajax最直观的'感受是向服务器获取新数据不需要刷新页面等待了。
*/
/*
  方法一: 通过XMLHttpRequest实现
  注意: 
    1. readyState返回一个整数，表示实例对象的当前状态，该属性只读。
    2. status 属性返回一个整数，表示服务器端回应的HTTP状态码。只有2XX,304的状态码，服务器返回的数据是正确的
*/
function http (url, methods, data, dataType, header) {
  const xhr = new XMLHttpRequest()
  xhr.open(url, methods, data)
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    if (this.status === 200) {
      return this.response
    } else {
      console.error('接口状态', this.status)
    }
  }
  xhr.onerror = function () {
    console.error('请求失败', this.statusText)
  }
  xhr.responseType = dataType
  xhr.setRequestHeader(header)
  xhr.send()
}