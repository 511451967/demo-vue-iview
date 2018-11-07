import axios from 'axios'

let util = {}
util.title = function (obj) {
  var title = obj || '既有房屋安全信息管理系统'
  window.document.title = title
}

util.ajax = axios.create({
  baseURL: process.env.MODE_URL,
  timeout: 30000
})

/**
 * 获取 地址栏上的所有参数数据
 * @returns {{}}
 */
util.getLocationBarData = function () {
  let url = location.search
  let theRequest = {}
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      let item = strs[i].split('=')
      theRequest[item[0]] = decodeURIComponent(item[1])
    }
  }
  return theRequest
}

/**
 * 生成随机字符串
 * @param len  几位
 * @returns {string}
 */
util.cookid = function (len) {
  var rdmString = ''
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len)
}

/**
 * 生成随机数
 * @param len  几位
 * @returns {string}
 */
util.random = function (len) {
  var rdmString = ''
  for (; rdmString.length < len; rdmString += Math.random().toString().substr(2));
  return rdmString.substr(0, len)
}

/**
 * data格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
util.dateFormatting = function (date, fmt) {
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 时间戳转时间字符串
 * @param date
 * @param fmt
 * @returns {*}
 */
util.getDateStr = function (date, fmt) {
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  let newDate = new Date()
  newDate.setTime(date * 1000)
  return this.dateFormatting(newDate, fmt)
}

/**
 * 秒数 转化为  1天 10时 10分 10秒
 * @param s
 * @returns {string}
 */
util.getTimeMat = function (s) {
  let t = ''
  let hour
  let min
  let sec
  let day
  if (s > -1) {
    hour = Math.floor(s / 3600)
    min = Math.floor(s / 60) % 60
    sec = s % 60
    day = parseInt(hour / 24)
    if (day > 0) {
      hour = hour - 24 * day
      t = day + '天 ' + hour + '时'
    } else if (hour > 0) {
      t = hour + '时'
    }
    if (min > 0) {
      t += min + '分'
    }
    t += parseInt(sec) + '秒'
  }
  return t
}

/**
 * 获取树型列表
 * @param item
 * @param all
 * @param field
 * @returns {*}
 */
util.getTreeData = function (item, all, field = ['globalId', 'parent_id', 'children']) {
  for (let i in all) {
    let value = all[i]
    if (value[field[0]] === item[field[1]]) {
      value[field[2]].push(item)
    } else if (value[field[2]].length) {
      util.getTreeData(item, value[field[2]], field)
    } else {
      continue
    }
  }
  return all
}

/**
 * 删除空的 children 字段
 * @param all
 * @param field
 * @returns {Array}
 */
util.unsetTreeField = function (all = [], field = 'children') {
  for (let i in all) {
    let item = all[i]
    if (!item[field]) {
      continue
    } else if (item[field].length === 0) {
      delete item[field]
    } else {
      util.unsetTreeField(item[field], field)
    }
  }
  return all
}

/**
 * 去除前后空格
 * @param str
 * @returns {*}
 */
util.trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

util.closeGlobalLoading = function () {
  setTimeout(() => {
    window.store.dispatch('showLoading', false)
  }, 0)
}

util.openGlobalLoading = function () {
  setTimeout(() => {
    window.store.dispatch('showLoading', true)
  }, 0)
}

util.isObject = function (type) {
  return Object.prototype.toString.call(type) === '[object Object]'
}

/**
 * 创建script
 * @param url
 * @returns {Promise}
 */
util.createScript = function (url, hasCallback) {
  let scriptElement = document.createElement('script')
  document.body.appendChild(scriptElement)
  let promise = new Promise((resolve, reject) => {
    scriptElement.addEventListener('load', e => {
      util.removeScript(scriptElement)
      if (!hasCallback) {
        resolve(e)
      }
    }, false)

    scriptElement.addEventListener('error', e => {
      util.removeScript(scriptElement)
      reject(e)
    }, false)

    if (hasCallback) {
      window.____callback____ = function () {
        resolve()
        window.____callback____ = null
      }
    }
  })

  if (hasCallback) {
    url += '&callback=____callback____'
  }

  scriptElement.src = url

  return promise
}

/**
 * 移除script标签
 * @param scriptElement script dom
 */
util.removeScript = function (scriptElement) {
  document.body.removeChild(scriptElement)
}

export default util
