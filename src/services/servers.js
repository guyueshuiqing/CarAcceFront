import request from '../utils/request'
// import qs from 'qs'

// let host = ''
// let hostCaster = 'https://caster2.aidigger.com'
// let apiv = '//api/v3'


// 登录
export function fetchEditorInfo(param) {
  return request(`/api/user/login`, {
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
  return request(`/api/user/userInfo`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function setRegister(param) {
  return request(`/api/user/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function getAllUser() {
  return request(`/api/user/getAllUser`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
}

export function deleteUser(param) {
  return request(`/api/user/deleteUser/${param.username}`, {
    method: 'DELETE',
  })
}

export function updateRole(param) {
  return request(`/api/anth/updateRole`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function cancelGrant(param) {
  return request(`/api/anth/cancelGrant`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function grant(param) {
  return request(`/api/anth/grant`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}


export function getAllData(param) {
  return request(`/api/index/getAllData`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

// ========================================================== 采购管理 ===========================================
// 申购管理=================================================
export function insertShenGou(param) {
  return request('/api/purchase/insertShenGou', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllShenGou() {
  return request('/api/purchase/getAllShenGou', {
    method: 'GET',
  })
}

export function getOwnShenGou(param) {
  return request(`/api/purchase/getOwnShenGou/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterShenGou(param) {
  return request('/api/purchase/getFilterShenGou', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateShenGou(param) {
  return request('/api/purchase/updateShenGou', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateStatus(param) {
  return request('/api/purchase/updateStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteShenGou(param) {
  return request(`/api/purchase/deleteShenGou/${param.purchaseNum}`, {
    method: 'DELETE',
  })
}

// 订单管理=================================================

export function insertDingDan(param) {
  return request('/api/dingdan/insertDingDan', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllDingDan() {
  return request('/api/dingdan/getAllDingDan', {
    method: 'GET',
  })
}

export function getOwnDingDan(param) {
  return request(`/api/dingdan/getOwnDingDan/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterDingDan(param) {
  return request('/api/dingdan/getFilterDingDan', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateDingDan(param) {
  return request('/api/dingdan/updateDingDan', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateDingDanDate(param) {
  return request('/api/dingdan/updateDingDanDate', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateDingDanStatus(param) {
  return request('/api/dingdan/updateDingDanStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateDingDanPrice(param) {
  return request('/api/dingdan/updateDingDanPrice', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteDingDan(param) {
  return request(`/api/dingdan/deleteDingDan/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// 收货管理=================================================

export function insertShouHuo(param) {
  return request('/api/shouhuo/insertShouHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllShouHuo() {
  return request('/api/shouhuo/getAllShouHuo', {
    method: 'GET',
  })
}

export function getOwnShouHuo(param) {
  return request(`/api/shouhuo/getOwnShouHuo/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterShouHuo(param) {
  return request('/api/shouhuo/getFilterShouHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateShouHuo(param) {
  return request('/api/shouhuo/updateShouHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateShouHuoDate(param) {
  return request('/api/shouhuo/updateShouHuoDate', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateShouHuoStatus(param) {
  return request('/api/shouhuo/updateShouHuoStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateShouHuoPrice(param) {
  return request('/api/shouhuo/updateShouHuoPrice', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteShouHuo(param) {
  return request(`/api/shouhuo/deleteShouHuo/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// 采购退货管理=================================================

export function insertTuiHuo(param) {
  return request('/api/tuihuo/insertTuiHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllTuiHuo() {
  return request('/api/tuihuo/getAllTuiHuo', {
    method: 'GET',
  })
}

export function getOwnTuiHuo(param) {
  return request(`/api/tuihuo/getOwnTuiHuo/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterTuiHuo(param) {
  return request('/api/tuihuo/getFilterTuiHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateTuiHuo(param) {
  return request('/api/tuihuo/updateTuiHuo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateTuiHuoStatus(param) {
  return request('/api/tuihuo/updateTuiHuoStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteTuiHuo(param) {
  return request(`/api/tuihuo/deleteTuiHuo/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// ========================================================== 销售管理 ===========================================
// 出库管理=================================================
export function insertChuKu(param) {
  return request('/api/chuku/insertChuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllChuKu() {
  return request('/api/chuku/getAllChuKu', {
    method: 'GET',
  })
}

export function getOwnChuKu(param) {
  return request(`/api/chuku/getOwnChuKu/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterChuKu(param) {
  return request('/api/chuku/getFilterChuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateChuKu(param) {
  return request('/api/chuku/updateChuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateChuKuStatus(param) {
  return request('/api/chuku/updateChuKuStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteChuKu(param) {
  return request(`/api/chuku/deleteChuKu/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// 入库管理=================================================
export function insertRuKu(param) {
  return request('/api/ruku/insertRuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllRuKu() {
  return request('/api/ruku/getAllRuKu', {
    method: 'GET',
  })
}

export function getOwnRuKu(param) {
  return request(`/api/ruku/getOwnRuKu/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterRuKu(param) {
  return request('/api/ruku/getFilterRuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateRuKu(param) {
  return request('/api/ruku/updateRuKu', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateRuKuStatus(param) {
  return request('/api/ruku/updateRuKuStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteRuKu(param) {
  return request(`/api/ruku/deleteRuKu/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// 库存管理=================================================
export function insertKuCun(param) {
  return request('/api/kucun/insertKuCun', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllKuCun() {
  return request('/api/kucun/getAllKuCun', {
    method: 'GET',
  })
}

export function getOwnKuCun(param) {
  return request(`/api/kucun/getOwnKuCun/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterKuCun(param) {
  return request('/api/kucun/getFilterKuCun', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateKuCunBreak(param) {
  return request('/api/kucun/updateKuCunBreak', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateKuCunUnit(param) {
  return request('/api/kucun/updateKuCunUnit', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateKuCunStatus(param) {
  return request('/api/kucun/updateKuCunStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteKuCun(param) {
  return request(`/api/kucun/deleteKuCun/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}


// ========================================================== 销售管理 ===========================================
// 订单管理=================================================
export function insertXiaoShouD(param) {
  return request('/api/xiaoshoud/insertXiaoShouD', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllXiaoShouD() {
  return request('/api/xiaoshoud/getAllXiaoShouD', {
    method: 'GET',
  })
}

export function getOwnXiaoShouD(param) {
  return request(`/api/xiaoshoud/getOwnXiaoShouD/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterXiaoShouD(param) {
  return request('/api/xiaoshoud/getFilterXiaoShouD', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateXiaoShouD(param) {
  return request('/api/xiaoshoud/updateXiaoShouD', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateXiaoShouDStatus(param) {
  return request('/api/xiaoshoud/updateXiaoShouDStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteXiaoShouD(param) {
  return request(`/api/xiaoshoud/deleteXiaoShouD/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}

// 退货管理=================================================
export function insertXiaoShouT(param) {
  return request('/api/xiaoshout/insertXiaoShouT', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(param.obj)
  })
}

export function getAllXiaoShouT() {
  return request('/api/xiaoshout/getAllXiaoShouT', {
    method: 'GET',
  })
}

export function getOwnXiaoShouT(param) {
  return request(`/api/xiaoshout/getOwnXiaoShouT/${param.username}`, {
    method: 'GET',
  })
}

export function getFilterXiaoShouT(param) {
  return request('/api/xiaoshout/getFilterXiaoShouT', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateXiaoShouT(param) {
  return request('/api/xiaoshout/updateXiaoShouT', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function updateXiaoShouTStatus(param) {
  return request('/api/xiaoshout/updateXiaoShouTStatus', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param.obj)
  })
}

export function deleteXiaoShouT(param) {
  return request(`/api/xiaoshout/deleteXiaoShouT/${param.dingDanNum}`, {
    method: 'DELETE',
  })
}