import moment from "moment"
import { CarIcon } from 'components/index'
import { Tooltip, Button, message, Popconfirm } from 'antd'
import { insertDingDan,updateStatus, updateDingDanStatus, deleteDingDan, deleteShenGou,
  insertShouHuo,updateXiaoShouTStatus, updateXiaoShouDStatus, insertChuKu } from 'services/servers'


const dingDanStatus = {
  create: '初始化',
  deLiveryDate: '交货日期已确定',
  passing: '资金正在审核',
  passed: '审核通过',
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

export const dingDanSelect = [
  {
    type: 'input',
    rules: [],
    key: 'supplier',
    label: '供应商名称',
  },
  {
    type: 'input',
    rules: [],
    key: 'dingDanNum',
    label: '订单单号',
    // disabled: true
  },
  {
    type: 'rangePicker',
    rules: [],
    key: 'createDate',
    label: '创建日期',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'deLiveryDate',
    label: '交货日期',
  },
]

export const getDingDanCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  
  let dingDanCols = [{
    key: 'dingDanNum',
    title: '订单单号',
    dataIndex: 'dingDanNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'supplier',
    title: '供应商名称',
    dataIndex: 'supplier',
    colName: 'companyName'
  },{
    key: 'purchaseNum',
    title: '申购号',
    dataIndex: 'purchaseNum',
    colName: 'orderNum'
  },{
    key: 'sumPrice',
    title: '总金额',
    dataIndex: 'sumPrice',
    colName: 'inprice'
  },{
    key: 'applyPrice',
    title: '申请付款金额',
    dataIndex: 'applyPrice',
    colName: 'inprice'
  },{
    key: 'payApplyStaff',
    title: '负责人',
    dataIndex: 'payApplyStaff',
    colName: 'InuserName',
    render: (text,record)=>{
      return <div>{record.applyPrice && text || '' }</div>
    }
  },{
    key: 'paidPrice',
    title: '已支付金额',
    dataIndex: 'paidPrice',
    colName: 'inprice'
  },{
    key: 'deLiveryDate',
    title: '交货日期',
    dataIndex: 'deLiveryDate',
    colName: 'indate',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
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
      return <div>{text && dingDanStatus[text]}</div>
    }
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: (text, record)=>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      const isBefore = moment(new Date()).isBefore(moment(Number(record.deLiveryDate)).format('YYYY-MM-DD HH:mm'))
      return (
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            !record.applyPrice && record.deLiveryDate && (role !== 'staff' || username === record.payApplyStaff) && 
            <Tooltip placement="topRight" title="付款资金申请">
              <Button type="link" style={style} onClick={()=>{
                  const selects = getSelect(getDingDanCols(_this),['applyPrice'])
                  _this.setState({
                    selectRow: record,
                    edit: false,
                    actionModal: 'applyPrice',
                    formCols: selects
                  })
                  _this.changeVisiable()
              }}><CarIcon content="&#xe600;"/></Button>
            </Tooltip>
          }
          {
            !record.applyPrice &&
              <Tooltip placement="topRight" title={record.deLiveryDate ? '更新交货日期' : '确定交货日期'}>
                <Button type="link" style={style} onClick={()=>{
                    const selects = getSelect(getDingDanCols(_this),['deLiveryDate'])
                    if(record.deLiveryDate){
                      record.deLiveryDate = moment(Number(record.deLiveryDate))
                    }
                    console.log(selects)
                    _this.setState({
                      selectRow: record,
                      edit: false,
                      actionModal: record.deLiveryDate ? 'updateDate' : 'verifyDate',
                      formCols: selects
                    })
                    _this.changeVisiable()
                }}><CarIcon content="&#xe605;"/></Button>
              </Tooltip>
          }
          {
            record.applyPrice && record.status === 'passing' && role !== 'staff' && 
            <Tooltip placement="topRight" title="审核申请">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  const params = {
                    obj:record
                  }
                  updateDingDanStatus(params).then(res=>{
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
            (role !== 'staff' || username === record.payApplyStaff ) && !isBefore && record.status === 'passed' &&
            <Tooltip placement="topRight" title="转收货">
              <Popconfirm
                title={`确认收货？`}
                onConfirm={() => {
                  record.applyStaff = username
                  const params = {
                    obj:record
                  }
                  insertShouHuo(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    message.success('转换成功！')
                    _this.getTableData(_this.props)
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe729;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
          {
            role !== 'staff' && 
            <Tooltip placement="topRight" title="删除订单">
              <Popconfirm
                title={`确认删除吗？`}
                onConfirm={() => {
                  const params = {
                    dingDanNum: record.dingDanNum
                  }
                  deleteDingDan(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('删除成功！')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe655;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
        </div>)
      }
    }]
  return dingDanCols
}

export const dSelect = [
  {
    type: 'input',
    rules: [],
    key: 'dNum',
    label: '订单单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'client',
    label: '客户名称',
    // disabled: true
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '物品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'deLiveryDate',
    label: '订购期限',
  },
]

export const getDCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  
  let dingDanCols = [{
    key: 'dNum',
    title: '订单单号',
    dataIndex: 'dNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'client',
    title: '客户名称',
    dataIndex: 'client',
    colName: 'companyName'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'goodsNum',
    colName: 'number'
  },{
    key: 'goodsUnit',
    title: '单位',
    dataIndex: 'goodsUnit',
    colName: 'companyName'
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
    key: 'deLiveryDate',
    title: '订购期限',
    dataIndex: 'deLiveryDate',
    colName: 'indate',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
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
      return <div>{text && dingDanStatus[text]}</div>
    }
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: (text, record)=>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      const isBefore = moment(new Date()).isBefore(moment(Number(record.deLiveryDate)).format('YYYY-MM-DD HH:mm'))
      return (
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            record.status === 'create' && role !== 'staff' && 
            <Tooltip placement="topRight" title="审核申请">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  const params = {
                    obj:record
                  }
                  updateXiaoShouDStatus(params).then(res=>{
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
                  record.action = "xt"
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
          <Tooltip placement="topRight" title="申请退货">
            <Button type="link" style={style} onClick={()=>{
                let arr = [{
                    key: 'reason',
                    title: '退货原因',
                    dataIndex: 'reason',
                    colName: 'remarks'
                  }]
                _this.setState({
                  selectRow: record,
                  edit: false,
                  actionModal: 'reason',
                  formCols: arr
                },()=>{
                  _this.changeVisiable()
                })
                
            }}><CarIcon content="&#xe600;"/></Button>
          </Tooltip>
          {
            role !== 'staff' && 
            <Tooltip placement="topRight" title="删除">
              <Popconfirm
                title={`确认删除吗？`}
                onConfirm={() => {
                  const params = {
                    dingDanNum: record.dingDanNum
                  }
                  deleteDingDan(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('删除成功！')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe655;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
        </div>)
      }
    }]
  return dingDanCols
}

export const tSelect = [
  {
    type: 'input',
    rules: [],
    key: 'dNum',
    label: '订单单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'client',
    label: '客户名称',
    // disabled: true
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '物品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'deLiveryDate',
    label: '订购期限',
  },
]

export const getTCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  
  let dingDanCols = [{
    key: 'tNum',
    title: '订单单号',
    dataIndex: 'tNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'client',
    title: '客户名称',
    dataIndex: 'client',
    colName: 'companyName'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'goodsNum',
    colName: 'number'
  },{
    key: 'goodsUnit',
    title: '单位',
    dataIndex: 'goodsUnit',
    colName: 'companyName'
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
    key: 'createDate',
    title: '创建日期',
    dataIndex: 'createDate',
    colName: 'date',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
  },{
    key: 'reason',
    title: '退货原因',
    dataIndex: 'reason',
    colName: 'remarks'
  },{
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    colName: 'status',
    render: (text,record)=>{
      return <div>{text && dingDanStatus[text]}</div>
    }
  },{
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: (text, record)=>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      const isBefore = moment(new Date()).isBefore(moment(Number(record.deLiveryDate)).format('YYYY-MM-DD HH:mm'))
      return (
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          {
            record.status === 'passing' && role !== 'staff' && 
            <Tooltip placement="topRight" title="审核">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  const params = {
                    obj:record
                  }
                  updateXiaoShouTStatus(params).then(res=>{
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
                  record.action = "xt"
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
          {
            role !== 'staff' && 
            <Tooltip placement="topRight" title="删除">
              <Popconfirm
                title={`确认删除吗？`}
                onConfirm={() => {
                  const params = {
                    dingDanNum: record.dingDanNum
                  }
                  deleteDingDan(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                    _this.getTableData(_this.props)
                    message.success('删除成功！')
                  })
                }}
                okText="是"
                cancelText="否">
                  <Button type="link" style={style}><CarIcon content="&#xe655;"/></Button>
              </Popconfirm>
            </Tooltip>
          }
        </div>)
      }
    }]
  return dingDanCols
}