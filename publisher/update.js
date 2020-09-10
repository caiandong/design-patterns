/**
 * file desc: 发布订阅者模式 -- 改进
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

// 增加订阅者
salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) {
    // 如果没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = []
  }
  this.clientList[key].push(fn) // 订阅的消息添加进缓存队列
}

// 发布消息
salesOffices.trigger = function() {
  var key = Array.prototype.shift.call(arguments) // 取出消息类型
  var fns = this.clientList[key] // 去除该类型消息对应的回调函数集合

  if (!fns || fns.length === 0) {
    // 如果没有订阅该消息则返回
    return false
  }

  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments) // arguments 是发布消息时带上的参数
  }
}

salesOffices.listen("squareMeter88", function(price) {
  console.log("价格=", price) // 输出 200000
})

salesOffices.listen("squareMeter110", function(price) {
  console.log("价格=", price) // 输出 300000
})

salesOffices.trigger("squareMeter88", 200000)
salesOffices.trigger("squareMeter110", 300000)
