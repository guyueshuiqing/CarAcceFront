import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, message } from 'antd'
import { difference, find } from 'lodash'
import { GrantStaff } from 'components/index'
import { getAllUser, cancelGrant } from '../../services/servers'
import { getColumns } from './config'

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class Grant extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      data: [],
      visiable: false,
      grantList: [],
      userInfoItem: {},
    }
  }

  componentDidMount(){
    getAllUser().then(res=>{
      if(res && !res.flag){
        message.error(res.message && res.message)
        return
      }
      this.setState({
        data: res.data
      })
    })
  }

  changeVisi = (visiable) =>{
    this.setState({
      visiable: visiable
    })
  }

  render() { 
    const { data, visiable, grantList, userInfoItem } = this.state
    // console.log(userInfoItem,visiable)
    return ( <div >
      <Table rowKey={Math.random(100)+Math.random(100)} dataSource={data && data} columns={getColumns(this)}/>
      <GrantStaff 
        visiable={visiable} 
        grantList={grantList} 
        userInfo={userInfoItem} 
        onCancel={()=>{this.setState({visiable: false})}} 
        onOk={(checkedList)=>{
          let oldCheckedList =  grantList
          const grantStaff = []
          // 授权
          // difference(checkedList,oldCheckedList).forEach(item=>{
          //   const params = {
              
          //   }
          //   grantStaff.push(cancelGrant(params))
          // })

          const cancelGrantArr = []
          // 取消授权
          difference(oldCheckedList,checkedList).forEach(item=>{
            console.log('userInfoItem',userInfoItem)
            const params = {
              obj: {
                menuItem: item,
                username: userInfoItem.username
              }
            }
            cancelGrantArr.push(cancelGrant(params))
          })
          Promise.all(cancelGrantArr).then(res=>{
            console.log("cancelAll",res)
          })
          this.setState({
            visiable: false
          })
        }}
      />
    </div> )
  }
}
 
export default Grant