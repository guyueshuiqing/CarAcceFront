import React, { Component } from 'react'
import { connect } from 'dva'

import { AuthFormCreate } from 'components/index'
import { LoginFromData } from '../config'
class Login  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {

    return (
      <div>
        <AuthFormCreate 
          fromData={LoginFromData} 
          compName='login' 
          onSubmit={(values)=>{
            console.log(values)
            window.location = '/'
          }} 
          onSecondButton={()=>{
            window.location = '/register'
          }}
        />
      </div>
    )
  }
}
 
export default connect()(Login)