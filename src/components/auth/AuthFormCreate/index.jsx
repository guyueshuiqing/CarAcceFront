import React, { useRef } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import {Input,Form, Button} from 'antd'
// import qs from 'qs'
import { defaultformLayout, tailLayout } from '../config'
/* eslint-disable */
function AuthFormCreate(props) {
  // const { validateFields, resetFields } = this.props.form
  const ref = useRef(null)
  const { fromData, compName, onSecondButton,onSubmit } =props
  return (
    <div className={styles.LoginCon}>
      <div className={styles.loginTop}></div>
      <div className={styles.loginLogo}></div>
      <Form {...defaultformLayout} ref={ref}>
        {
          fromData.map((item,index)=>{
            return (
              <Form.Item name={item.key} label={item.label} key={index} rules={item.rules} >
                {
                  item.key === 'password' ? <Input.Password placeholder={item.rules[0].message}/> : <Input placeholder={item.rules[0].message}/>
                }
              </Form.Item>
            )
          })
        }
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={()=>{
            ('ref.current', ref.current)
            const current = ref.current
            ref.current.validateFields().then(values=>{
              // console.log(_ref)
              onSubmit(values,current)
            }).catch((err)=>{
              console.log(err)
              return 
            })
          }}>
            {compName === 'login' ? '登录' : '注册'}
          </Button>
          <Button type="primary" style={{marginLeft:'30px'}} onClick={()=>{
            onSecondButton(ref.current)
          }}>
            {compName === 'login' ? '注册' : '去登录'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect()(React.forwardRef(AuthFormCreate))