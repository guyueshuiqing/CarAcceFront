const dingDanSelect = [
  {
    type: 'input',
    rules: [],
    key: 'supplierName',
    label: '供应商名称',
  },
  {
    type: 'input',
    rules: [],
    key: 'orderNum',
    label: '订单单号',
    // disabled: true
  },
  {
    type: 'input',
    rules: [],
    key: 'contractNum',
    label: '合同号',
  },{
    type: 'rangePicker',
    rules: [],
    key: 'createDate',
    label: '创建日期',
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
    key: 'shouhuoStaff',
    label: '收货人',
  },
  {
    type: 'input',
    rules: [],
    key: 'shouhuoNum',
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
    key: 'shouhuoDate',
    label: '收货日期',
  }
]

const tuihuoSelect = [
  {
    type: 'input',
    rules: [],
    key: 'tuihuoStaff',
    label: '经办人',
  },
  {
    type: 'input',
    rules: [],
    key: 'tuihuoNum',
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
    key: 'shouhuoDate',
    label: '收货日期',
  }
]

let dingDanCols = [{
  key: 'orderNum',
  title: '订单单号',
  dataIndex: 'orderNum',
  fixed: 'left',
  colName: 'orderNum'
},{
  key: 'clientName',
  title: '供应商名称',
  dataIndex: 'clientName',
  colName: 'companyName'
},{
  key: 'contractNum',
  title: '采购合同号',
  dataIndex: 'orderNum',
  colName: 'contractNum'
},{
  key: 'sumPrice',
  title: '总金额',
  dataIndex: 'sumPrice',
  colName: 'price'
},{
  key: 'applyPrice',
  title: '已申请付款金额',
  dataIndex: 'applyPrice',
  colName: 'price'
},{
  key: 'paidPrice',
  title: '已支付金额',
  dataIndex: 'paidPrice',
  colName: 'price'
},{
  key: 'deliveryDate',
  title: '交货日期',
  dataIndex: 'deliveryDate',
  colName: 'date'
},{
  key: 'createDate',
  title: '创建日期',
  dataIndex: 'createDate',
  colName: 'date'
},{
  key: 'status',
  title: '状态',
  dataIndex: 'status',
  colName: 'status'
},{
  key: 'actions',
  title: '操作',
  dataIndex: 'cz',
  fixed: 'right',
  colName: 'actions',
  width: 220,
}]

let shenGouCols = [{
  key: 'applyStaff',
  title: '申请人',
  dataIndex: 'applyStaff',
  colName: 'userName',
  fixed: 'left'
},{
  key: 'goods',
  title: '商品名称',
  dataIndex: 'applyStaff',
  colName: 'companyName',
  fixed: 'left'
},{
  key: 'purchaseNum',
  title: '申购单单号',
  dataIndex: 'orderNum',
  // fixed: 'left',
  colName: 'orderNum'
},{
  key: 'goodsNum',
  title: '商品数量',
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
  colName: 'price'
},{
  key: 'sumPrice',
  title: '总金额',
  dataIndex: 'sumPrice',
  colName: 'price'
},{
  key: 'createDate',
  title: '申请日期',
  dataIndex: 'createDate',
  colName: 'date'
},{
  key: 'purchaseDate',
  title: '限购日期',
  dataIndex: 'purchaseDate',
  colName: 'indate'
},{
  key: 'status',
  title: '状态',
  dataIndex: 'status',
  colName: 'status'
},{
  key: 'remarks',
  title: '备注',
  dataIndex: 'remarks',
  colName: 'remarks'
},{
  key: 'actions',
  title: '操作',
  dataIndex: 'cz',
  fixed: 'right',
  colName: 'actions',
  width: 220,
}]

let shouhuoCols = [{
  key: 'shouhuoNum',
  title: '采购收货单号',
  dataIndex: 'orderNum',
  fixed: 'left',
  colName: 'orderNum'
},{
  key: 'goods',
  title: '物品名称',
  dataIndex: 'applyStaff',
  colName: 'companyName',
  // fixed: 'left'
},{
  key: 'shouhuoStaff',
  title: '申请人',
  dataIndex: 'shouhuoStaff',
  colName: 'userName',
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
  colName: 'price'
},{
  key: 'sumPrice',
  title: '总金额',
  dataIndex: 'sumPrice',
  colName: 'price'
},{
  key: 'shouhuoDate',
  title: '收货日期',
  dataIndex: 'shouhuoDate',
  colName: 'date'
},{
  key: 'remarks',
  title: '备注',
  dataIndex: 'remarks',
  colName: 'remarks'
},{
  key: 'actions',
  title: '操作',
  dataIndex: 'cz',
  fixed: 'right',
  colName: 'actions',
  width: 220,
}]

let tuihuoCols = [{
  key: 'shouhuoNum',
  title: '采购退货单号',
  dataIndex: 'orderNum',
  fixed: 'left',
  colName: 'orderNum'
},{
  key: 'goods',
  title: '物品名称',
  dataIndex: 'applyStaff',
  colName: 'companyName',
  // fixed: 'left'
},{
  key: 'shouhuoStaff',
  title: '经办人',
  dataIndex: 'shouhuoStaff',
  colName: 'userName',
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
  colName: 'price'
},{
  key: 'sumPrice',
  title: '支出总金额',
  dataIndex: 'sumPrice',
  colName: 'price'
},{
  key: 'shouhuoDate',
  title: '出货日期',
  dataIndex: 'shouhuoDate',
  colName: 'date'
},{
  key: 'remarks',
  title: '备注',
  dataIndex: 'remarks',
  colName: 'remarks'
},{
  key: 'actions',
  title: '操作',
  dataIndex: 'cz',
  fixed: 'right',
  colName: 'actions',
  width: 220,
}]

const dataSource = [
  {
    id: '1',
    name: '胡彦斌',
    age: 32,
    address: '湖底公园1号',
    orderNum: 'XT-20200304',
    applyStaff: '就截击'
  },
  {
    id: '2',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304',
    applyStaff: '撒第三方'
  },
  {
    id: '6',
    name: '胡彦斌',
    age: 32,
    address: '湖底公园1号',
    orderNum: 'XT-20200304'
  },
  {
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  },{
    id: '7',
    name: '胡彦祖',
    age: 42,
    address: '湖底公园1号',
    orderNum: 'SS-20200304'
  }
]




export {
  dingDanSelect,
  shenGouSelect,
  shouhuoSelect,
  tuihuoSelect,
  dingDanCols,
  shenGouCols,
  shouhuoCols,
  tuihuoCols,
  dataSource
}