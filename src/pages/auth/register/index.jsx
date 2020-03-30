import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import {Input,Form, Button} from 'antd'
// import qs from 'qs'
import { defaultformLayout,tailLayout } from '../config'

class Register  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() {
    const { getFieldDecorator,validateFields, resetFields } = this.props.form
    const fromData = [
      {
        key:'username', 
        label:"用户名" , 
        rules: [
          { required: true, message: '请输入用户名' },
          { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '用户名只能是4-16位字母数字下划线' }
        ]
      },
      {
        key:'password', 
        label:"密码" , 
        rules: [
          { required: true, message: '请输入密码' },
          {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: '输入的密码不符合规范(必须有数字和大小写字母)'}
        ]},
      {
        key:'email', 
        label:"邮箱" , 
        rules: [
          { required: true, message: '请输入邮箱' },
          {pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '输入的邮箱不符合规范'}
        ]
      },
      {
        key:'age', 
        label:"真实姓名",
        rules: [
          { required: true, message: '请输入真实姓名' }
        ]
      },
    ]
    return (
      <div className={styles.LoginCon}>
        <div className={styles.loginTop}></div>
        <div className={styles.loginLogo}></div>
        <Form {...defaultformLayout}>
          {
            fromData.map((item,index)=>{
              return (
                <Form.Item label={item.label} key={index}>
                  {
                    getFieldDecorator(item.key,{
                      rules: item.rules
                    })(item.key === 'password' ? <Input.Password placeholder={item.rules[0].message}/> : <Input placeholder={item.rules[0].message}/>)
                  }
                </Form.Item>
              )
            })
          }
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={()=>{
              validateFields((err,values)=>{
                if (err) {
                  return
                }
                resetFields()
                window.location = '/login'
              })
            }}>
              注册
            </Button>
            <Button type="primary" style={{marginLeft:'30px'}} onClick={()=>{
              window.location = '/login'
            }}>
              去登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
 
export default connect()(Form.create({ 
  onValuesChange(props,values){
    console.log(values)
  }
})(Register))