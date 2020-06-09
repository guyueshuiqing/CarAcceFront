import _ from 'lodash'
import { CarIcon } from 'components/index'
import { Tooltip, Button } from 'antd'

const getAllColumns = (_this) => {
  return {
    'orderNum': {
      title: '订单类编号',
      key: 'orderNum',
      dataIndex: 'orderNum',
      width: 200,
      // fixed: 'left',
    },
    'contractNum': {
      title: '合同类编号',
      key: 'contractNum',
      dataIndex: 'contractNum',
      width: 200
    },
    'companyName': {
      title: '公司名称',
      key: 'clientName',
      dataIndex: 'clientName',
      width: 200
    },
    'date': {
      title: '日期',
      key: 'date',
      dataIndex: 'date',
      width: 200
    },
    'indate':{
      title: '日期',
      key: 'date',
      dataIndex: 'date',
      width: 200,
    },
    'userName': {
      title: '人员',
      key: 'userName',
      dataIndex: 'userName',
      width: 150
    },
    'InuserName':{
      title: '人员',
      key: 'InuserName',
      dataIndex: 'InuserName',
      width: 150
    },
    'status': {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 150
    },
    'number': {
      title: '数量',
      key: 'number',
      dataIndex: 'number',
      width: 150
    },
    'price': {
      title: '金额',
      key: 'price',
      dataIndex: 'price',
      width: 150
    },
    'inprice': {
      title: '金额',
      key: 'price',
      dataIndex: 'price',
      width: 150
    },
    'amount': {
      title: <p style={{backgroundColor: 'red'}}>哈哈哈</p>,
      key: 'amount',
      dataIndex: 'amount',
      width: 200
    },
    'remarks': {
      title: '备注',
      key: 'remarks',
      dataIndex: 'remarks',
      width: 200
    },
    'actions':{
      title: '操作',
      key: 'actions',
      width: 240,
      render: (text, record)=>{
        const style={border: 'none', backgroundColor:'#fff',marginRight: '2px' }
        return (
          <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
            <Tooltip placement="topRight" title="查看">
              <Button type="link" style={style} onClick={()=>{
                
              }}><CarIcon content="&#xe76d;"/></Button>
            </Tooltip>
            <Tooltip placement="topRight" title="编辑">
              <Button type="link" style={style}><CarIcon content="&#xe74d;"/></Button>
            </Tooltip>
            <Tooltip placement="topRight" title="审核">
              <Button type="link" style={style} onClick={()=>{
                
              }}><CarIcon content="&#xe602;"/></Button>
            </Tooltip>
            <Tooltip placement="topRight" title="转pdf">
              <Button type="link" style={style}><CarIcon content="&#xe787;"/></Button>
            </Tooltip>
          </div>
        )
      }
    }
  }

}



export const pathNameZ = {
  purchase: {
    shengou: '申购单',
    dingdan: '采购单',
    shouhuo: '采购收货单',
    tuihuo: '采购退货单',
  },
  store: {
    caigour: '采购入库单',
    xiaoshouc: '销售出库单',
    xiaoshoutr: '退货入库单',
    caigoutc: '退货出库单'
  },
  sale:{
    xiaoshoud: '销售订单',
    xiaoshouk: '销售开单',
    xiaoahout: '销售退货单'
  }
}

export const getColumns = (_this,requestColumns=[]) =>{
  const newReqCol = []
   requestColumns.forEach((rcol)=>{
     
    if(rcol.colName && rcol.colName === 'customize'){
      newReqCol.push(rcol)
    } else{
      let allColumns = getAllColumns(_this) || {}
      if(allColumns[rcol.colName]){
        let s =_.cloneDeep(allColumns[rcol.colName])
        for(let i in rcol){
          s[i] = rcol[i]
        }
        newReqCol.push(s)
      }
    }
    
  })
  return newReqCol
}