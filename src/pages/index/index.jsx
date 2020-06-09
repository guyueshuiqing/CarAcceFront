import React, { Component } from 'react'
import { connect } from 'dva'
import { Radio, message } from 'antd'
import styles from './index.less'
// import qs from 'qs'
import mock from '../../../mock/index'

import { Summary } from 'components/index.js'
import { getAllData } from 'services/servers'

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class Index  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: [],
      max: [],
      value: 'max',
    }
  }

  componentDidMount(){
    setTimeout(() => {
      const { history, cms } = this.props
      const { userInfo } = cms
      if(userInfo.user){
        const params = {
          obj: {
            username: userInfo.user.username
          }
        }
        getAllData(params).then(res=>{
          if(res && !res.flag){
            message.error(res.message && res.message)
            return
          }
          let max = []
          let min = []
          max = res.data.max
          min = res.data.min
          this.setState({
            max,
            min
          })
        })
      }
    }, 0)
  }

  componentWillReceiveProps(nextProps){
    setTimeout(() => {
      const { history, cms } = nextProps
      const { userInfo } = cms
      if(userInfo.user){
        const params = {
          obj: {
            username: userInfo.user.username
          }
        }
        getAllData(params).then(res=>{
          if(res && !res.flag){
            message.error(res.message && res.message)
            return
          }
          let max = []
          let min = []
          max = res.data.max
          min = res.data.min
          this.setState({
            max,
            min
          })
        })
      }
    }, 0)
  }

  transData = (arr, key) =>{
    if(!arr && arr.length <= 0){
      return
    }
    let res = []
    arr.forEach((item=>{
      if(item.dingDanNum && !item.tuiHuoNum){
        res.push({
          采购单号: item.purchaseNum,
          订单总价: item.sumPrice,
          供应商: item.supplier,
          描述: key === "min" ? '订单最低价' : '最豪订单'
        })
      } else if(item.purchaseNum){
        res.push({
          商品名称: item.goodsName,
          采购总价: item.sumPrice,
          供应商: item.supplier,
          描述: key === 'min' ? '申购总价最低' : '最高申购总价'
        })
      }else if(item.tuiHuoNum){
        res.push({
          商品名称: item.goodsName,
          采购单价: item.unitPrice,
          供应商: item.supplier,
          描述: key === 'min' ? '价值最小的退货' : '价值最大的退货'
        })
      } else if(item.shouHuoNum){
        res.push({
          商品名称: item.goodsName,
          采购单价: item.sumPrice,
          供应商: item.supplier,
          描述: key === 'min' ? '价值最小的收货' : '价值最大的收货'
        })
      }
    }))

    return res
  }

  onChange = (e) =>{
    if(e){
      const { value } = this.state
      if(value === 'min'){
        this.setState({
          value:'max'
        })
      } else {
        this.setState({
          value:'min'
        })
      }
      
    }
  }
 
  render() {
    console.log(this.state.min)
    let data = []
    data = this.state.value === 'min' ? this.transData(this.state.min,'min') : this.transData(this.state.max,'max')
    console.log(data)
    return (
        <div className={styles.indexContent}>
          {
            (!data || data.length <= 0) && 
              <div className={styles.noMenu}>最近没有工作记录哦~</div>
          }
          {
            data && data.length > 0 && 
            <div className={styles.Indextop}>
              <Radio.Group defaultValue="max" value={this.state.value} onChange={this.onChange} className={styles.radio}>
                <Radio.Button value="max">最大量</Radio.Button>
                <Radio.Button value="min">最小量</Radio.Button>
              </Radio.Group>
            </div>
          }
          {
            data && data.length > 0 && 
            <div className={styles.summaryCon}>
              {
                data.map((item,index)=>{
                  return (
                  <div className={styles.infoBlock} key={index}>
                    <Summary summaryItem={item}/>
                  </div>)
                })
              }
            </div>
          }
          
        </div>
    )
  }
}
 
export default Index;