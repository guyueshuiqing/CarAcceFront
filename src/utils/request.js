import fetch from 'dva/fetch'
import { message } from 'antd'

function isJSON (input) {
  try {
    JSON.parse(input)
    return true
  } catch (error) {
    return false
  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response, true)
  } else {
    return parseJSON(response, false)
  }
}

function parseJSON (response, success) {
  return response.text().then(function (text) {
    if (isJSON(text)) {
      text = JSON.parse(text)
      if (!text.flag && text.code == '401') {
        message.warning('账号未登录或登录态失效')
        setTimeout(() => {
          window.location = '/login'
        }, 1500)
      }
    }

    if (success) {
      return Promise.resolve(text)
    } else {
      return Promise.reject(text)
    }
  })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  // fetch 默认不带 cookie，这里设置 credentials 为 include 来开启带 cookie 选项
    if (process.env.NODE_ENV !== 'production') { // eslint-disable-line
      if (!options) {
        options = { method: 'get' }
      }
      options.mode = 'cors'
      if(options.headers){
        options.headers.Authorization ='Bearer '+ window.localStorage.getItem('token')
      } else {
        options.headers ={
          Authorization: 'Bearer '+ window.localStorage.getItem('token')
        }
      }
      options = Object.assign(options, { credentials: 'include' })
    }
  return fetch(url, options)  
    .then(checkStatus)
    .then(data => {
      return data
    }).catch(err => {
      return Promise.reject(err)
    })
}
