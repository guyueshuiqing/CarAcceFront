import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, message, Spin } from 'antd'
import { difference } from 'lodash'
import { GrantStaff } from 'components/index'
import { getAllUser, cancelGrant, grant } from '../../services/servers'
import { getColumns } from './config'

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class Grant extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      spinning: false,
      data: [],
      visiable: false,
      grantList: [],
      userInfoItem: {},
      radioValue: '',
    }
  }

  componentDidMount(){
    this.getAllUserInfo()
  }

  getAllUserInfo = () =>{
    this.setState({
      spinning: true
    })
    getAllUser().then(res=>{
      this.setState({
        spinning: false
      })
      if(res && !res.flag){
        message.error(res.message && res.message)
        return
      }
      this.setState({
        data: res.data,
      })
    })
  }

  changeVisi = (visiable) =>{
    this.setState({
      visiable: visiable
    })
  }

  render() { 
    const { data, visiable, grantList, userInfoItem, spinning } = this.state
    // console.log(userInfoItem,visiable)
    return ( <div >
      <Spin spinning={spinning}>
        <Table rowKey={Math.random(100)+Math.random(100)} dataSource={data && data} columns={getColumns(this)}/>
      </Spin>
      <GrantStaff 
        visiable={visiable} 
        grantList={grantList} 
        userInfo={userInfoItem} 
        onCancel={()=>{this.setState({visiable: false})}} 
        onOk={(checkedList)=>{
          let oldCheckedList =  grantList
          const grantStaff = []
          // 授权
          difference(checkedList,oldCheckedList).forEach(item=>{
            const params = {
              obj: {
                menuItem: item,
                username: userInfoItem.username
              }
            }
            grantStaff.push(grant(params))
          })
          if (grantStaff && grantStaff.length > 0) {
            Promise.all(grantStaff).then(res=>{
              message.success("授权成功！");
              this.getAllUserInfo()
            })
          }
    
          const cancelGrantArr = []
          // 取消授权
          difference(oldCheckedList,checkedList).forEach(item=>{
            const params = {
              obj: {
                menuItem: item,
                username: userInfoItem.username
              }
            }
            cancelGrantArr.push(cancelGrant(params))
          })

          if (cancelGrantArr && cancelGrantArr.length > 0) {
            Promise.all(cancelGrantArr).then(res=>{
              message.success("取消权限成功！");
              this.getAllUserInfo()
            })
          }

          this.setState({
            visiable: false
          })
        }}
      />
    </div> )
  }
}
 
export default Grant