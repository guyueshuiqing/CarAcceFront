import React, { Component } from 'react'
import { connect } from 'dva'
import cookie from 'react-cookies'
import {message} from 'antd'

import { AuthFormCreate } from 'components/index'
import { LoginFromData } from '../config'

import { fetchEditorInfo } from '../../../services/servers'

class Login  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { dispatch } = this.props

    return (
      <div>
        <AuthFormCreate 
          fromData={LoginFromData} 
          compName='login' 
          onSubmit={(values,current)=>{
            let params ={
              obj:values
            }
            fetchEditorInfo(params).then(res=>{
              if(res && !res.flag){
                message.error(res.message && res.message)
                return
              }
              // console.log(res.data.userInfo)
              message.success('登录成功！')
              dispatch({
                type: 'cms/updateState',
                payload: {
                  key: 'userInfo',
                  val: res.data.userInfo
                }
              })
              window.localStorage.setItem('token',res.data.token)
              cookie.save('username',res.data.userInfo.user.username)
              cookie.save('role',res.data.userInfo.role.roleEn)
              window.localStorage.setItem('username',res.data.userInfo.user.username)
              setTimeout(() => {
                current.resetFields()
                const { history } = this.props
                history.push('/')
              }, 800)
            })
              
          }} 
          onSecondButton={(current)=>{
            current.resetFields()
            window.location = '/register'
          }}
        />
      </div>
    )
  }
}
 
export default connect()(Login)