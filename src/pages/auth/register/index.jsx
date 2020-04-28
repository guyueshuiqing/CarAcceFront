import React, { Component } from 'react'
import { connect } from 'dva'
import {message} from 'antd'
import { AuthFormCreate } from 'components/index'
import { setRegister } from '../../../services/servers'
import { RegisterFromData } from '../config'

class Register  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() {
    return (
      <div>
        <AuthFormCreate 
          fromData={RegisterFromData} 
          compName='register' 
          onSubmit={(values,current)=>{
            let params = {
              obj: values
            }
            setRegister(params).then(res=>{
              if(res && !res.flag){
                message.error(res.message && res.message)
                current.resetFields()
                return
              }
              message.success('注册成功')
              setTimeout(() => {
                current.resetFields()
                // window.location = '/login'
              }, 1000)
            })
              
          }} 
          onSecondButton={(current)=>{
            current.resetFields()
            window.location = '/login'
          }}
        />
      </div>)
  }
}
 
export default connect()(Register)