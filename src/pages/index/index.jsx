import React, { Component } from 'react'
import { connect } from 'dva'
import { Radio } from 'antd'
import styles from './index.less'
// import qs from 'qs'
import mock from '../../../mock/index'
// import { getUserInfo } from '../../services/servers'
import { Summary } from 'components/index.js'

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class Index  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
 
  render() {  
    return (
      <div className={styles.indexContent}>
        <div className={styles.Indextop}>
          <Radio.Group defaultValue="max" className={styles.radio}>
            <Radio.Button value="max">最大量</Radio.Button>
            <Radio.Button value="min">最小量</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles.summaryCon}>
          {
            mock.map((item,index)=>{
              return (
              <div className={styles.infoBlock} key={index}>
                <Summary summaryItem={item}/>
              </div>)
            })
          }
        </div>
      </div>
    )
  }
}
 
export default Index;