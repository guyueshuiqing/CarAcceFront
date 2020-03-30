import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'

class Revenue  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        Revenue
      </div>
    )
  }
}
 
export default connect()(Revenue);