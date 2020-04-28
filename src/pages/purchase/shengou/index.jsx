import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'
import { TableCom, Header } from 'components/index.js'
import { shenGouSelect, dataSource, shenGouCols } from '../config'

class ShenGou  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  submitForm = (values) => {
    console.log(values)
  }

  formRef =  React.createRef()
  
  render() { 
    return (
      <div>
        <Header ref={this.formRef} submitForm={this.submitForm} selectForm={shenGouSelect} row size='small'/>
        <TableCom reqColumns={shenGouCols} dataSource={dataSource}/> 
      </div>
    )
  }
}
 
export default connect()(ShenGou);