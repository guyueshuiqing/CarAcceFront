import React, { Component } from 'react'
import moment from 'moment'

import styles from './index.less'
import { Breadcrumb, Statistic, DateFilter, ZheXian, TiaoXing } from 'components/index.js'

import { summaryCs4,summaryCs5,summaryCs6,summaryCss, dataC, dataShiChu,dataShiRu,dataShiSun } from '../config'
class StoreT extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dateMonth: moment().subtract(0,'month'),
      dateYear: moment().subtract(0,'year'),
      sum: summaryCs6,
      sumYear: summaryCss
    }
  }

  isEmptyObject = (obj) => {   
　　for (var key in obj){
　　　　return false;//返回false，不为空对象
　　}　　
　　return true;//返回true，为空对象
  }

  render() { 
    const { dateMonth, dateYear,sum,sumYear } = this.state
    return ( <div className={styles.storeTCon}>
      <div className={styles.Breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateMonth}>
          <DateFilter dateValue={dateMonth} picker='month' dateChage={(date)=>{
            if(date.format("YYYY-MM-DD")=== '2020-05-08'){
              this.setState({
                sum: summaryCs5
              })
            } else if(date.format("YYYY-MM-DD")=== '2020-06-08'){
              this.setState({
                sum: summaryCs6
              })
            } else if(date.format("YYYY-MM-DD")=== '2020-04-08'){
              this.setState({
                sum: summaryCs4
              })
            } else {
              this.setState({
                sum: {}
              }) 
            }
            this.setState({
              dateMonth: date
            })
          }} />
        </div>
        <div className={styles.headerCon}>
            <Statistic summary={sum}/>
            {/* <Statistic summary={summaryZ}/> */}
        </div>
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateYear}>
          <DateFilter dateValue={dateYear} picker='year' dateChage={(date)=>{ 
            if(date.format("YYYY-MM-DD")=== '2020-06-08'){
              this.setState({
                sumYear: summaryCss
              })
            }else {
              this.setState({
                sumYear: {}
              }) 
            }
            this.setState({ dateYear: date }) 
            }}/>
        </div>
        <div className={styles.headerCon}>
          <Statistic summary={sumYear} bcStyle={{backgroundColor: '#f2f2f2',color: '#18b6ff'}} vertStyle={{backgroundColor: '#cecece',margin: 'auto 40px'}}/>
        </div>
        {
          !this.isEmptyObject(sumYear) && 
          <div className={styles.chartCon}>
            <div className={styles.lineChart}>
              <ZheXian title="仓库统计折线图" width="700px" description="营收折线图" data={dataC} formatter={(v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} seriesField="type" color={[ '#18b6ff','#41c769','#fc4e2a' ]} />
            </div>
            <div className={styles.barChart}>
              <TiaoXing title='前十入库配件' color="blue" xField="入库" yField="配件" formatter={(v) => v} colorField="入库" data={dataShiRu}/>
            </div>
            <div className={styles.barChart}>
              <TiaoXing title='前十出库配件' color="green" xField="出库" yField="配件" formatter={(v) => v} colorField="出库" data={dataShiChu}/>
            </div>
            <div className={styles.barChart}>
              <TiaoXing title='前十损坏废弃配件' color="red" xField="损坏" yField="配件" formatter={(v) => v} colorField="损坏" data={dataShiSun}/>
            </div>
          </div>
        }
        
      </div>
    </div> )
  }
}
 
export default StoreT