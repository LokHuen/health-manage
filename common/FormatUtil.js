const util = {

}

util.formatDate = function(value, format = 'yyyy/MM/dd') {
  const date = new Date(value)
    // let format = 'yyyy/MM/dd'
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/**
 * 从URL上按参数名获取值
 */
util.getParameterByName = function(name, url) {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(url || window.location.search)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export default util
