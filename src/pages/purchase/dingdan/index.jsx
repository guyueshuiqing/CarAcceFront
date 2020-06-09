import React, { Component } from 'react'
// import styles from './index.less'
// import qs from 'qs'
import { connect } from 'dva'
import { message } from 'antd'
import moment from 'moment'
import { cloneDeep } from 'lodash'

import { TableCom, Header } from 'components/index.js'
import { getAllDingDan, getOwnDingDan, getFilterDingDan, updateDingDanDate,updateDingDanPrice } from '../../../services/servers'
import { dingDanSelect, dataSource, getDingDanCols } from '../config'

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class dingDan  extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tableData: [],
      newVisible: false,
      edit: false,
      selectRow: {},
      actionModal: '',
      loading: true,
      formCols: []
     }
  }

  componentDidMount(){
    if(!this.props.cms.userInfo.user){
      
    } else{
      this.setState({
        loading: true
      })
      this.getTableData(this.props)
    }
    
  }
  
  componentWillReceiveProps (nextProps){
    this.setState({
      loading: true
    })
    this.getTableData(nextProps)
  }

  getTableData = (nextProps) =>{
    let cms = {}
    if(!nextProps){
      cms = this.props.cms
    } else {
      cms = nextProps.cms
    }
    if(!cms.userInfo.user){
      return []
    }
    const username  = cms.userInfo.user.username
    const role  = cms.userInfo.role.roleEn
    let data = []
    getAllDingDan().then(res=>{
      if(res && !res.flag){
        message.error(res.message && res.message)
        return
      }
      this.setState({
        tableData: res.data,
        loading:false
      })
    })
  }

  submitForm = (values) => {
    console.log('valuesvalues',values)
    let val = {}
    Object.keys(values).forEach(item=>{
      if(values[item]){
        if(item === 'createDate'){
          val.createDateStart = moment(values.createDate[0]).valueOf()
          val.createDateEnd = moment(values.createDate[1]).valueOf()
        } else if(item === 'deLiveryDate'){
          val.purchaseDateStart = moment(values.deLiveryDate[0]).valueOf()
          val.purchaseDateEnd = moment(values.deLiveryDate[1]).valueOf()
        } else {
          val[item] = values[item]
        }
        
      } 
    })
    const params = {
      obj: val
    }
    getFilterDingDan(params).then(res=>{
      if(res && !res.flag){
        message.error(res.message && res.message)
        return
      }
      this.setState({
        tableData: res.data
      })
    })
  }

  newFormSubmit = (values) =>{
    const { actionModal, selectRow } = this.state
    if (!values || actionModal === 'view') {
      return
    }
    
    let formData = cloneDeep(values)
    const { history, cms } = this.props
    const { userInfo } = cms
    if(values.deLiveryDate){
      formData.deLiveryDate = moment(values.deLiveryDate).valueOf()
    }
      // 申请人就是本用户
    formData.payApplyStaff = userInfo.user.username
    formData.dingDanNum = selectRow.dingDanNum
    if(actionModal === 'updateDate' || actionModal === 'verifyDate'){
      const params = {
        obj: formData
      }
      updateDingDanDate(params).then(res=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('日期已变更！')
      })
    }
    if(actionModal === 'applyPrice'){
      const params = {
        obj: formData
      }
      updateDingDanPrice(params).then(res=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('资金申请已提交！')
      })
    }

    this.clearSelectRow()
  }

  changeVisiable = (key) =>{
    if(key){
      this.setState({
        actionModal: 'new'
      })
    }
    this.setState({
      newVisible: !this.state.newVisible
    })
  }

  clearSelectRow = () =>{
    this.setState({
      selectRow: {},
      edit: false
    })
  }

  getTitle = () =>{
    const { actionModal } = this.state
    const allTitle = {
      view:'采购订单',
      applyPrice: '付款资金申请',
      verifyDate: '确定交货日期',
      updateDate: '更新交货日期',
      audit: '审核'
    }
    return allTitle[actionModal]
  }

  render() {

    const { tableData, newVisible, edit, selectRow, loading, formCols} = this.state
    const otherNewForm = formCols || []
    return (
      <div>
        <Header 
          submitForm={this.submitForm} 
          getTableData={this.getTableData}
          selectForm={dingDanSelect} 
          row 
          size='small'/>
        <TableCom 
          loading={loading}
          reqColumns={getDingDanCols(this)} 
          otherNewForm={otherNewForm}
          dataSource={tableData} 
          newFormSubmit={this.newFormSubmit} 
          newModalTitle={this.getTitle()}
          changeVisiable={this.changeVisiable} 
          newVisible={newVisible} 
          edit={edit} 
          selectRow={selectRow} 
          clearSelectRow={this.clearSelectRow}
          newDis/> 
      </div>
    )
  }
}
 
export default dingDan