import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'

class Purchase  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        Purchase
      </div>
    )
  }
}
 
export default connect()(Purchase);