import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'

class Store  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        Store
      </div>
    )
  }
}
 
export default connect()(Store);