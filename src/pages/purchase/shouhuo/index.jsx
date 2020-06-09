import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import { getAllShouHuo, getOwnShouHuo, getFilterShouHuo,insertTuiHuo } from '../../../services/servers'

import { TableCom, Header } from 'components/index.js'
import { shouhuoSelect, dataSource, getShouHuoCols } from '../config'

@connect(state => ({
  cms: state.cms
}))

class ShouHuo  extends Component {
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

    getAllShouHuo().then(res=>{
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
    getFilterShouHuo(params).then(res=>{
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
    if (!values) {
      return
    }
    
    let formData = cloneDeep(values)
    const { history, cms } = this.props
    const { userInfo } = cms
    if(values.deLiveryDate){
      formData.deLiveryDate = moment(values.deLiveryDate).valueOf()
    }
      // 申请人就是本用户
    selectRow.applyStaff = userInfo.user.username
    selectRow.reason = formData.reason
    if(actionModal === 'reason'){
      const params = {
        obj: selectRow
      }
      insertTuiHuo(params).then(res=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('退货申请提交成功！')
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
      reason:'退货原因',
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
          selectForm={shouhuoSelect} 
          row 
          size='small'/>
        <TableCom 
          loading={loading}
          reqColumns={getShouHuoCols(this)} 
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
 
export default ShouHuo