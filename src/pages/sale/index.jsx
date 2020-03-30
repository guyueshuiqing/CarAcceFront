import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'

class Sale  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        Sale
      </div>
    )
  }
}
 
export default connect()(Sale);