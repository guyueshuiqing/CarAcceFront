import React, { Component } from 'react'
import styles from './index.less'
// import qs from 'qs'
import { Button } from 'antd'
import { FormCreate, Breadcrumb } from 'components/index.js'

class Header  extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  } 

  resetForm =()=>{
    if (this.formRef.current) {
      this.formRef.current.resetFields()
    }
  }

  submitSelect = () => {
    const { submitForm } = this.props
    if (this.formRef.current) {
      this.formRef.current.validateFields().then((nameList,options)=>{
        submitForm(nameList)
      }).catch((errorInfo)=>{
        console.log(errorInfo)
      })
    }
  }

  formRef = React.createRef()

  render() { 
    const { selectForm, layout, row, size } = this.props
    return (
      <div className={styles.headerCon}>
        <div className={styles.breadcrumbCon}>
          <Breadcrumb />
        </div>
        <div className={styles.headerFilter}>
          <div className={styles.subButton}>
            <Button type="primary" shape="round" size='small' onClick={this.submitSelect}>
              查询
            </Button>
            <Button type="primary" shape="round" size='small' style={{marginLeft: '10px'}} onClick={this.resetForm}>
              重置
            </Button>
          </div>
          <div style={{ marginTop: '20px',marginLeft: '20px',marginRight: '60px'}}>
            <FormCreate 
              ref={this.formRef}
              config={selectForm}
              layout={layout}
              row={row}
              size={size}
            />
          </div>
        </div>
      </div>
    )
  }
}
 
export default Header