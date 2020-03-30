import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import {Input,Form, Button} from 'antd'
// import qs from 'qs'
import { defaultformLayout, tailLayout } from '../config'
/* eslint-disable */
class AuthFormCreate  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() {
    const { getFieldDecorator,validateFields, resetFields } = this.props.form
    const { fromData, compName, onSecondButton,onSubmit } = this.props
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
                onSubmit(values)
              })
            }}>
              {compName === 'login' ? '登录' : '注册'}
            </Button>
            <Button type="primary" style={{marginLeft:'30px'}} onClick={()=>{
              onSecondButton()
            }}>
              {compName === 'login' ? '注册' : '去登录'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
 
export default connect()(Form.create({ 
  onValuesChange(props,values){
    
  }
})(AuthFormCreate))