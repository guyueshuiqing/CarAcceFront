import moment from "moment"
import { CarIcon } from 'components/index'
import { Tooltip, Button, message, Popconfirm } from 'antd'
import { insertDingDan,updateStatus, updateRuKuStatus, deleteDingDan, deleteShenGou,
  insertShouHuo,updateChuKuStatus, insertChuKu } from 'services/servers'

const ruKuStatus ={
  passing: '等待审核',
  passed: '审核已通过',
  recycle: '已转变'
}
const chuKuStatus ={
  passing: '等待审核',
  passed: '审核已通过',
  recycle: '已转变'
}

// 自动获取Modal表单  参数：表columns 获取的字段
export const getSelect = (columns,arrs) =>{
  if(!arrs || arrs.length <= 0 ){
    return 
  }
  let selects = []
  arrs.forEach((item)=>{
    const colItem = columns.filter((i=>{
      return i.key === item
    }))[0]
    selects.push(colItem)
  })
  // arrs.forEach((item)=>{
  //   const colItem = columns.filter((i=>{
  //     return i.key === item
  //   }))[0]
    
  //   let select = {
  //     type: 'input',
  //     rules: [],
  //     key: colItem.key,
  //     label: colItem.title,
  //   }
  //   if(colItem.colName === 'indate'){
  //     select.type = 'datePicker'
  //   }
  //   if(colItem.colName === 'remarks'){
  //     select.type = 'textarea'
  //   }
  //   selects.push(select)
  // })

  return selects
}

export const ruKuSelect = [
  {
    type: 'input',
    rules: [],
    key: 'supplier',
    label: '供应商',
  },
  {
    type: 'input',
    rules: [],
    key: 'ruKuNum',
    label: '入库单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '商品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'createDate',
    label: '创建日期',
  }
]

export const getRuKuCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  let tuihuoCols = [{
    key: 'ruKuNum',
    title: '入库单号',
    dataIndex: 'ruKuNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'supplier',
    title: '供应商',
    dataIndex: 'supplier',
    colName: 'companyName',
    // fixed: 'left'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
    // fixed: 'left'
  },{
    key: 'aidutStaff',
    title: '审核人',
    dataIndex: 'aidutStaff',
    colName: 'userName',
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'goodsNum',
    colName: 'number'
  },{
    key: 'goodsUnit',
    title: '单位',
    dataIndex: 'goodsUnit',
    colName: 'price'
  },{
    key: 'unitPrice',
    title: '单价',
    dataIndex: 'unitPrice',
    colName: 'price'
  },{
    key: 'sumPrice',
    title: '支出总金额',
    dataIndex: 'sumPrice',
    colName: 'price'
  },{
    key: 'createDate',
    title: '创建日期',
    dataIndex: 'createDate',
    colName: 'date',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
  },{
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    colName: 'status',
    render: (text,record)=>{
      return <div>{text &&ruKuStatus[text]}</div>
    }
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: ( text, record) =>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      return (<div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            role !== 'staff' && record.status === 'passing' &&
            <Tooltip placement="topRight" title="审核">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  record.username = username
                  const params = {
                    obj:record
                  }
                  updateRuKuStatus(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('审核通过')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe602;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
      </div>)
    }
  }]

  return tuihuoCols

}

export const chuKuSelect = [
  {
    type: 'input',
    rules: [],
    key: 'aidutStaff',
    label: '审核人',
  },
  {
    type: 'input',
    rules: [],
    key: 'chuKuNum',
    label: '出库单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '商品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'createDate',
    label: '创建日期',
  }
]

export const getChuKuCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  let tuihuoCols = [{
    key: 'chuKuNum',
    title: '出库单号',
    dataIndex: 'chuKuNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
    // fixed: 'left'
  },{
    key: 'aidutStaff',
    title: '审核人',
    dataIndex: 'aidutStaff',
    colName: 'userName',
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'goodsNum',
    colName: 'number'
  },{
    key: 'goodsUnit',
    title: '单位',
    dataIndex: 'goodsUnit',
    colName: 'price'
  },{
    key: 'unitPrice',
    title: '单价',
    dataIndex: 'unitPrice',
    colName: 'price'
  },{
    key: 'sumPrice',
    title: '支出总金额',
    dataIndex: 'sumPrice',
    colName: 'price'
  },{
    key: 'createDate',
    title: '创建日期',
    dataIndex: 'createDate',
    colName: 'date',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
  },{
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    colName: 'status',
    render: (text,record)=>{
      return <div>{text && chuKuStatus[text]}</div>
    }
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: ( text, record) =>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      return (<div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            role !== 'staff' && record.status === 'passing' &&
            <Tooltip placement="topRight" title="审核">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  record.username = username
                  const params = {
                    obj:record
                  }
                  updateChuKuStatus(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('审核通过')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe602;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
          {
            record.status === 'passed' && 
            <Tooltip placement="topRight" title="申请出库">
              <Popconfirm
                title={`确认申请出库？`}
                onConfirm={() => {
                  record.action = "chuku"
                  record.aidutStaff = username
                  const params = {
                    obj:record
                  }
                  insertChuKu(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('申请以提交')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe600;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
      </div>)
    }
  }]

  return tuihuoCols

}


export const kuCunSelect = [
  {
    type: 'input',
    rules: [],
    key: 'aidutStaff',
    label: '审核人',
  },
  {
    type: 'input',
    rules: [],
    key: 'kuCunNum',
    label: '出库单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '商品名称',
  }
]

export const getKuCunCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  let tuihuoCols = [{
    key: 'kuCunNum',
    title: '库存单号',
    dataIndex: 'kuCunNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
    // fixed: 'left'
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'goodsNum',
    colName: 'number'
  },{
    key: 'goodsUnit',
    title: '单位',
    dataIndex: 'goodsUnit',
    colName: 'userName'
  },{
    key: 'unitPrice',
    title: '单价',
    dataIndex: 'unitPrice',
    colName: 'inprice'
  },{
    key: 'sumPrice',
    title: '总金额',
    dataIndex: 'sumPrice',
    colName: 'inprice'
  },{
    key: 'breakdown',
    title: '破损',
    dataIndex: 'breakdown',
    colName: 'inprice'
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: ( text, record) =>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      return (<div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            (role !== 'staff' || (username === record.applyStaff && record.status === 'create')) && 
              <Tooltip placement="topRight" title="更新单价">
                <Button type="link" style={style} onClick={()=>{
                  let selects = getSelect(getKuCunCols(_this),['unitPrice'])
                  selects[0].title = "最新单价"
                  _this.setState({
                    selectRow: record,
                    edit: false,
                    actionModal: 'eidt',
                    formCols: selects
                  },()=>{
                    _this.changeVisiable()
                  })
                  
                }}><CarIcon content="&#xe74d;"/></Button>
              </Tooltip>
          }

          <Tooltip placement="topRight" title="报损">
                <Button type="link" style={style} onClick={()=>{
                  let selects = getSelect(getKuCunCols(_this),['breakdown'])
                  selects[0].title = "提交破损数"
                  console.log('selects',selects)
                  _this.setState({
                    selectRow: record,
                    edit: false,
                    actionModal: 'break',
                    formCols: selects
                  },()=>{
                    _this.changeVisiable()
                  })
                }}><CarIcon content="&#xe600;"/></Button>
          </Tooltip>
      </div>)
    }
  }]

  return tuihuoCols

}