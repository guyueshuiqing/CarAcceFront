import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
// import qs from 'qs'
import mock from '../../../mock/index'

import { Summary } from 'components/index.js'

class Index  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(mock)
    return (
      <div className={styles.content}>
          {
            mock.map((item,index)=>{
              return <Summary summaryItem={item} key={index}/>
            })
          }
      </div>
    )
  }
}
 
export default connect()(Index);