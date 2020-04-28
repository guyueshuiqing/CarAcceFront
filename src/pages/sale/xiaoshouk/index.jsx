import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'
import { TableCom, Header } from 'components/index.js'
import { shouhuoSelect, dataSource, shouhuoCols } from '../config'

class ShouHuo  extends Component {
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
        <Header ref={this.formRef} submitForm={this.submitForm} selectForm={shouhuoSelect} row size='small'/>
        <TableCom reqColumns={shouhuoCols} dataSource={dataSource} newDis={true}/> 
      </div>
    )
  }
}
 
export default connect()(ShouHuo);