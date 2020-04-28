import React, { Component } from 'react'
import styles from './index.less'
import { Modal, Checkbox, Row } from 'antd'
import { cloneDeep } from 'lodash'

const CheckboxGroup = Checkbox.Group
// const Search = Input.Search

let grant = {
  purchase: '采购管理',
  store: '仓库管理',
  sale: '销售管理'
}

class GrantStaff extends Component {
  state ={ 
    search: '',
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  }

  componentWillReceiveProps(nextProps){
    let checkedList = []
    checkedList = nextProps.grantList
    this.setState({
      checkedList,
      checkAll: checkedList && nextProps.scopeAllTeams && nextProps.scopeAllTeams.length && checkedList.length === nextProps.scopeAllTeams,
      indeterminate: checkedList && checkedList.length > 0 && (nextProps.scopeAllTeams && nextProps.scopeAllTeams.length && checkedList.length !== nextProps.scopeAllTeams.length)
    })
  }

  render(){
    const { visiable, onCancel, onOk, userInfo }  = this.props
    const { checkedList }  = this.state
    const username = userInfo && userInfo.username && userInfo.username || ''
    // const teamOptions = this.getTeamOptions(scopeAllTeams, search) || []
    // const teamOptions = ['采购管理','销售管理','仓库管理']
    const teamOptions = ['purchase','store','sale']
    // const leftCheckedList = scopeAllTeams && scopeAllTeams.filter((item )=>(checkedList.indexOf(item.id)> -1 )) || []
    
    const leftCheckedList = checkedList.map((item)=>{
      return grant[item]
    })
    return (
      <Modal 
        destroyOnClose
        visible={visiable}
        title='用户菜单授权'
        okText='确认'
        cancelText='取消'
        width='fit-content'
        onCancel={()=>{
          onCancel()
          this.setState({
            search: '',
            checkedList: [],
            indeterminate: false,
            checkAll: false,
          })
        }}
        onOk={()=>{
          onOk(checkedList)
          this.setState({
            search: '',
            checkedList: [],
            indeterminate: false,
            checkAll: false,
          })
        }}
      >
        <div className={styles.titleWord}>
          <span>用户名：</span>
          <span>{username}</span>
        </div>
        <div className={styles.authorizationContent}>
          <span>已授权：</span>
          <div className={styles.authorizationLeft}>
            <div className={styles.selectedScope}>
              {
                leftCheckedList && leftCheckedList.map((item ,index )=>{
                  return <p key={index}>{item}</p>
                })
              }
            </div>
            <span>已选择{checkedList.length}个菜单项</span>
          </div>
          <div className={styles.authorizeRight}>
            <div className={styles.search}>
              <Checkbox  
                indeterminate={this.state.indeterminate}
                checked={this.state.checkAll} 
                onChange={(e)=>{
                  this.setState({
                    checkedList: e.target.checked ? teamOptions : [], // 授权该渠道给编辑部下的某个人,选项是编辑部下的人员
                    indeterminate: false,
                    checkAll: e.target.checked
                  })
                }}
              />
              <span style={{marginLeft: '5px'}}>全选</span>
              {/* <Search 
                placeholder="搜索菜单" 
                style={{ width: 200 }} 
                onSearch={search => {
                  this.setState({
                    search
                  })
                }}
              /> */}
              <span style={{marginLeft: '30px'}}>请选择授权菜单项</span>
            </div>
            <div className={styles.checkBox}>
              <CheckboxGroup
                value={checkedList} onChange={(checked) => {
                  let getCheckedList = cloneDeep(checked)
                  this.setState({
                    checkedList: getCheckedList,
                    indeterminate: getCheckedList.length > 0 && (getCheckedList.length < teamOptions.length),
                    checkAll: getCheckedList.length === teamOptions.length,
                  })
                }} 
              >
                {
                  teamOptions.map((team) => {
                    return <Row key={team}>
                      <Checkbox value={team} key={team}> {grant[team]} </Checkbox>
                    </Row>
                  })
                }
              </CheckboxGroup>
            </div>
          </div>
        </div>   
      </Modal>)
  }
}


export default GrantStaff
