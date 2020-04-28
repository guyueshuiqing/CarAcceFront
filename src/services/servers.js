import request from '../utils/request'
// import qs from 'qs'

// let host = ''
// let hostCaster = 'https://caster2.aidigger.com'
// let apiv = '/api/v3'


// 登录
export function fetchEditorInfo(param) {
  return request(`api/user/login`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

// 获取用户信息
export function getUserInfo(param) {
  return request(`api/user/userInfo`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function setRegister(param) {
  return request(`api/user/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function getAllUser() {
  return request(`api/user/getAllUser`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
}


export function cancelGrant(param) {
  return request(`api/anth/cancelGrant`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}