import React, { Component } from 'react'
import { connect } from 'dva'

import { AuthFormCreate } from 'components/index'
import { RegisterFromData } from '../config'

class Register  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() {
    return (
      <div>
        <AuthFormCreate 
          fromData={RegisterFromData} 
          compName='register' 
          onSubmit={(values)=>{
            window.location = '/login'
          }}
          onSecondButton={()=>{
            window.location = '/login'
          }}
        />
      </div>)
  }
}
 
export default connect()(Register)