import moment from "moment"
import { CarIcon } from 'components/index'
import { Tooltip, Button, message, Popconfirm } from 'antd'
import { insertDingDan,updateStatus, updateDingDanStatus, deleteDingDan, deleteShenGou,
  insertShouHuo,deleteShouHuo, insertChuKu, insertRuKu } from 'services/servers'

const shenGouStatus = {
  create: '未审核',
  passed: '已审核',
  recycle: '已转变'
}

const dingDanStatus = {
  create: '初始化',
  deLiveryDate: '交货日期已确定',
  passing: '资金正在审核',
  passed: '审核通过',
  recycle: '已转变'
}

const shouHuoStatus = {
  create: '初始化',
  recycle: '已转变'
}

const tuiHuoStatus = {
  create: '等待审核',
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

const dingDanSelect = [
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

const shenGouSelect = [
  {
    type: 'input',
    rules: [],
    key: 'applyStaff',
    label: '申请人',
  },
  {
    type: 'input',
    rules: [],
    key: 'purchaseNum',
    label: '申购单号',
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
  },{
    type: 'rangePicker',
    rules: [],
    key: 'purchaseDate',
    label: '采购限期',
  },
  // {
  //   type: 'select',
  //   rules: [],
  //   key: 'team_id',
  //   label: '默认项目',
  //   options:[]
  // },
  // {
  //   type: 'select',
  //   rules: [],
  //   key: 'article_type',
  //   label: '默认品类',
  //   options:[]
  // },
]

const shouhuoSelect = [
  {
    type: 'input',
    rules: [],
    key: 'manager',
    label: '收货人',
  },
  {
    type: 'input',
    rules: [],
    key: 'shouHuoNum',
    label: '收货单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '商品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'deLiveryDate',
    label: '收货日期',
  }
]

const tuihuoSelect = [
  {
    type: 'input',
    rules: [],
    key: 'applyStaff',
    label: '经办人',
  },
  {
    type: 'input',
    rules: [],
    key: 'tuiHuoNum',
    label: '退货单号',
  },
  {
    type: 'input',
    rules: [],
    key: 'goodsName',
    label: '商品名称',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'deLiveryDate',
    label: '收货日期',
  }
]

export const getShenGouCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  
  let shenGouCols = [{
    key: 'applyStaff',
    title: '申请人',
    dataIndex: 'applyStaff',
    colName: 'InuserName',
    fixed: 'left'
  },{
    key: 'goodsName',
    title: '商品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
    fixed: 'left'
  },{
    key: 'supplier',
    title: '供应商名称',
    dataIndex: 'supplier',
    colName: 'companyName'
  },
  {
    key: 'purchaseNum',
    title: '申购单单号',
    dataIndex: 'purchaseNum',
    // fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'goodsNum',
    title: '商品数量',
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
    key: 'createDate',
    title: '申请日期',
    dataIndex: 'createDate',
    colName: 'date',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
  },{
    key: 'purchaseDate',
    title: '限购日期',
    dataIndex: 'purchaseDate',
    colName: 'indate',
    render: (text, record) => {
      return <div>{text && moment(Number(text)).format('YYYY-MM-DD HH:mm')}</div>
    }
  },{
    key: 'auditStaff',
    title: '审核人',
    dataIndex: 'auditStaff',
    colName: 'InuserName',
  },{
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    colName: 'status',
    render: (text,record)=>{
      return <div>{text && shenGouStatus[text]}</div>
    }
  },{
    key: 'remarks',
    title: '备注',
    dataIndex: 'remarks',
    colName: 'remarks'
  },
  {
    key: 'actions',
    title: '操作',
    dataIndex: 'cz',
    fixed: 'right',
    colName: 'actions',
    width: 220,
    render: (text, record)=>{
      const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
      return (
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
          <Tooltip placement="topRight" title="查看">
            <Button type="link" style={style} onClick={()=>{
              record.purchaseDate = moment(Number(record.purchaseDate))
                _this.setState({
                  selectRow: record,
                  edit: true,
                  actionModal: 'view'
                })
                _this.changeVisiable()
            }}><CarIcon content="&#xe76d;"/></Button>
          </Tooltip>
          {
            (role !== 'staff' || (username === record.applyStaff && record.status === 'create')) && 
              <Tooltip placement="topRight" title="编辑">
                <Button type="link" style={style} onClick={()=>{
                  record.purchaseDate = moment(Number(record.purchaseDate))
                  _this.setState({
                    selectRow: record,
                    edit: false,
                    actionModal: 'edit'
                  })
                  _this.changeVisiable()
                }}><CarIcon content="&#xe74d;"/></Button>
              </Tooltip>
          }
          {
            role !== 'staff' && record.status === 'create' &&
            <Tooltip placement="topRight" title="审核">
              <Button type="link" style={style} onClick={()=>{
                record.purchaseDate = moment(Number(record.purchaseDate))
                _this.setState({
                  selectRow: record,
                  edit: true,
                  actionModal: 'audit'
                })
                _this.changeVisiable()
                }}><CarIcon content="&#xe602;"/></Button>
            </Tooltip>
          }
          {
            (role !== 'staff' || (username === record.applyStaff)) && record.status === 'passed' &&
            <Tooltip placement="topRight" title="转采购">
              <Popconfirm
                title={`确认转为采购吗`}
                onConfirm={() => {
                  const iparams = {
                    obj:record
                  }
                  const aparams = {
                    obj:{
                      purchaseNum:record.purchaseNum,
                      status: record.status,
                      action:'Trans'
                    }
                  }
                  updateStatus(aparams).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                  })
                  insertDingDan(iparams).then(res=>{
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
            <Tooltip placement="topRight" title="删除申购单">
              <Popconfirm
                title={`确认删除吗？`}
                onConfirm={() => {
                  const params = {
                    purchaseNum: record.purchaseNum
                  }
                  deleteShenGou(params).then(res=>{
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
          
          {/* <Tooltip placement="topRight" title="转pdf">
            <Button type="link" style={style}><CarIcon content="&#xe787;"/></Button>
          </Tooltip> */}
        </div>
      )
    }
  }
]

  return shenGouCols
}

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

export const getShouHuoCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }

  let shouhuoCols = [{
    key: 'shouHuoNum',
    title: '收货单号',
    dataIndex: 'shouHuoNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'dingDanNum',
    title: '订单号',
    dataIndex: 'dingDanNum',
    colName: 'orderNum'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
  },{
    key: 'supplier',
    title: '供应商名称',
    dataIndex: 'supplier',
    colName: 'companyName',
  },{
    key: 'manager',
    title: '负责人',
    dataIndex: 'manager',
    colName: 'companyName',
  },{
    key: 'goodsNum',
    title: '物品数量',
    dataIndex: 'orderNum',
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
    colName: 'inprice'
  },{
    key: 'sumPrice',
    title: '总金额',
    dataIndex: 'sumPrice',
    colName: 'price'
  },{
    key: 'deLiveryDate',
    title: '收货日期',
    dataIndex: 'deLiveryDate',
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
      return <div>{text && shouHuoStatus[text]}</div>
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
            record.status === 'create' && 
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
                  })
                  _this.changeVisiable()
              }}><CarIcon content="&#xe600;"/></Button>
            </Tooltip>
          }
          {
            record.status === 'create' && 
            <Tooltip placement="topRight" title="申请入库">
              <Popconfirm
                title={`确认申请入库？`}
                onConfirm={() => {
                  record.aidutStaff = username
                  const params = {
                    obj:record
                  }
                  console.log('params',params)
                  insertRuKu(params).then(res=>{
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
            <Tooltip placement="topRight" title="删除申购单">
              <Popconfirm
                title={`确认删除吗？`}
                onConfirm={() => {
                  const params = {
                   shouHuoNum: record.shouHuoNum
                  }
                  deleteShouHuo(params).then(res=>{
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

  return shouhuoCols
}

export const getTuiHuoCols =(_this)=>{
  const { history, cms } = _this.props
  let username = ''
  let role = ''
  if(cms.userInfo.user){
    username  = cms.userInfo.user.username || ''
    role = cms.userInfo.role.roleEn || ''
  }
  let tuihuoCols = [{
    key: 'tuiHuoNum',
    title: '退货单号',
    dataIndex: 'tuiHuoNum',
    fixed: 'left',
    colName: 'orderNum'
  },{
    key: 'goodsName',
    title: '物品名称',
    dataIndex: 'goodsName',
    colName: 'companyName',
    // fixed: 'left'
  },{
    key: 'supplier',
    title: '供销商',
    dataIndex: 'supplier',
    colName: 'companyName',
  },{
    key: 'applyStaff',
    title: '申请人',
    dataIndex: 'applyStaff',
    colName: 'userName',
  },{
    key: 'auditStaff',
    title: '审核人',
    dataIndex: 'auditStaff',
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
    colName: 'date'
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
      return <div>{text && tuiHuoStatus[text]}</div>
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
            role !== 'staff' && record.status === 'create' &&
            <Tooltip placement="topRight" title="审核">
              <Popconfirm
                title={`确认通过审核？`}
                onConfirm={() => {
                  record.action = "Audit"
                  const params = {
                    obj:record
                  }
                  console.log()
                  insertChuKu(params).then(res=>{
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
                  console.log('record',record)
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



export {
  dingDanSelect,
  shenGouSelect,
  shouhuoSelect,
  tuihuoSelect
}