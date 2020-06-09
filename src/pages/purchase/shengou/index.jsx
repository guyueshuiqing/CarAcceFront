import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'
// import qs from 'qs'
import { insertShenGou, getAllShenGou, getOwnShenGou, getFilterShenGou, updateShenGou, updateStatus} from '../../../services/servers'
import moment from 'moment'
import { message } from 'antd'
import { cloneDeep } from 'lodash'
import { TableCom, Header } from 'components/index.js'
import { shenGouSelect,  getShenGouCols, dingDanCols } from '../config'


@connect(state => ({
  cms: state.cms
}))

class ShenGou  extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      tableData: [],
      newVisible: false,
      edit: false,
      selectRow: {},
      actionModal: '',
      loading: true,
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
    
    getAllShenGou().then(res=>{
      if(res && !res.flag){
        message.error(res.message && res.message)
        return
      }
      this.setState({
        tableData: res.data,
        loading: false
      })
    })
    

    
  }

  submitForm = (values) => {
    let val = {}
    Object.keys(values).forEach(res=>{
      if(values[res]){
        if(res === 'createDate'){
          val.createDateStart = moment(values.createDate[0]).valueOf()
          val.createDateEnd = moment(values.createDate[1]).valueOf()
        } else if(res === 'purchaseDate'){
          val.purchaseDateStart = moment(values.purchaseDate[0]).valueOf()
          val.purchaseDateEnd = moment(values.purchaseDate[1]).valueOf()
        } else {
          val[res] = values[res]
        }
        
      } 
    })
    const params = {
      obj: val
    }
    getFilterShenGou(params).then(res=>{
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
    formData.purchaseDate = moment(values.purchaseDate).valueOf()
      // 申请人就是本用户
    formData.applyStaff = userInfo.user.username

    if(actionModal === 'edit'){
      formData.purchaseNum = selectRow.purchaseNum
      const params = {
        obj: formData
      }    
      updateShenGou(params).then(res=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('更新成功！')
      })
    } else if(actionModal === 'audit'){
      const params = {
        obj:{
          purchaseNum:selectRow.purchaseNum,
          auditStaff: userInfo.user.username,
          status: selectRow.status,
          action:'Audit'
        }
      }
      updateStatus(params).then(res=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('审核成功！')
      })
    } else if(actionModal === 'new'){
      const params = {
        obj: formData
      }
      insertShenGou(params).then((res)=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        this.getTableData(this.props)
        message.success('新建成功！')
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
      new: '新建申购单',
      view:'申购单',
      audit: '审核申购单',
      edit: '更新申购单',
      trans: '转换采购'
    }
    return allTitle[actionModal]
  }

  formRef =  React.createRef()
  render() { 
    const { tableData, newVisible, edit, selectRow, actionModal, loading} = this.state
    const otherNewForm = actionModal === 'trans' ? dingDanCols : []
    return (
      <div>
        <Header 
          ref={this.formRef} 
          submitForm={this.submitForm} 
          getTableData={this.getTableData}
          selectForm={shenGouSelect} 
          row 
          size='small'/>
        <TableCom
          loading={loading}
          reqColumns={getShenGouCols(this)}
          otherNewForm={otherNewForm}
          dataSource={tableData} 
          newFormSubmit={this.newFormSubmit} 
          newModalTitle={this.getTitle()}
          changeVisiable={this.changeVisiable} 
          newVisible={newVisible}
          edit={edit} 
          selectRow={selectRow} 
          clearSelectRow={this.clearSelectRow}
        /> 
      </div>
    )
  }
}
 
export default ShenGou