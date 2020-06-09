import { fetchEditorInfo, insertShenGou  } from '../services/servers'
import { cloneDeep } from 'lodash'
import { message } from 'antd'

export default {
  namespace: 'cms',
  state:{
    userInfo: {},
  },
  subscriptions: {
    setup ({ history }) {
      return history.listen(({ pathname }) => {

      })
    }
  },
  effects: {
    // 获取文章流程配置选项
    * fetchEditorInfo ({ callback }, { call, put }) {
      try {
        const loginData = yield call(fetchEditorInfo)
        yield put({
          type: 'updateState',
          payload: {
            key: 'loginData',
            val: loginData
          }
        })
        callback && callback(loginData, null)
      } catch (error) {
        callback && callback(null, error)
        message.warn(error.error)
      }
    },

    * insertShenGou ({ payload,callback }, { call, put }) {
      try {
        const res = yield call(insertShenGou, payload)
        callback && callback(res, null)
      } catch (error) {
        callback && callback(null, error)
        message.warn(error.error)
      }
    },
  },
  reducers: {
    updateData (state, { payload }) {
      return { ...state, ...payload }
    },

    updateState (state, { payload }) {
      let _state = cloneDeep(state)
      _state[payload.key] = payload.val
      return _state
    }
  }
}