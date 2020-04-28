import React, { Component } from 'react'
// import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'

import { TableCom, Header } from 'components/index.js'
import { dingDanSelect, dataSource, dingDanCols } from '../config'

class dingDan  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  

  submitForm = (values) => {
    console.log(values)
  }

  render() {
    return (
      <div>
        <Header submitForm={this.submitForm} selectForm={dingDanSelect} row size='small'/>
        <TableCom reqColumns={dingDanCols} dataSource={dataSource} newDis={true}/> 
      </div>
    )
  }
}
 
export default dingDan;