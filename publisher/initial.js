/**
 * file desc: 发布订阅者模式 -- 简略版
 *
 * @email dreqmlv0703@gmail.com
 * @author Peter
 *
 * question： 如何一步一步实现发布订阅者模式
 * 首先要想好谁当发布者 （售楼中心）
 * 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者 (售楼处的花名册--客户名单)
 * 最后发布消息的时候，发布者会变这个缓存列表，一次出发里存放的订阅者回调函数（遍历花名册，挨个发短信）
 */

var salesOffices = {} // 定义售楼处

salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(fn) {
  // 增加订阅者
  console.log("eval:", this == salesOffices)
  this.clientList.push(fn) // 订阅的消息添加进缓存队列
}

salesOffices.trigger = function() {
  // 发布消息
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments) // arguments 是发布消息时带上的参数
  }
}

salesOffices.listen(function(price, squareMeter) {
  console.log("价格=", price)
  console.log("squareMeter=", squareMeter)
})

// salesOffices.listen(function(price, squareMeter) {
//   console.log("价格=", price)
//   console.log("squareMeter=", squareMeter)
// })

salesOffices.trigger(200000, 88)
salesOffices.trigger(300000, 110)
