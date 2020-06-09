import React, { Component } from 'react'
import moment from 'moment'

import styles from './index.less'
import { Breadcrumb, Statistic, DateFilter, ZheXian, TiaoXing } from 'components/index.js'

import { summaryS4,summaryS5,summaryS6,summaryS, summaryZ, dataY, dataShiYin,dataShiZhi } from '../config'

// const { RangePicker } = DatePicker

class Revenue extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dateMonth: moment().subtract(0,'month'),
      dateYear: moment().subtract(0,'year'),
      staticData: summaryS6,
      summaryYear:  summaryS
    }
  }

  isEmptyObject = (obj) => {   
    　　for (var key in obj){
    　　　　return false;//返回false，不为空对象
    　　}　　
    　　return true;//返回true，为空对象
    }

  render() { 
    const { dateMonth, dateYear, summaryYear } = this.state
    let data = this.state.staticData
    return ( <div className={styles.RevenueCon}>
      <div className={styles.Breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateMonth}>
          <DateFilter dateValue={dateMonth} picker='month' dateChage={(date)=>{
            if(date.format("YYYY-MM-DD")=== '2020-05-08'){
              this.setState({
                staticData: summaryS5
              })
            } else if(date.format("YYYY-MM-DD")=== '2020-06-08'){
              this.setState({
                staticData: summaryS6
              })
            } else if(date.format("YYYY-MM-DD")=== '2020-04-08'){
              this.setState({
                staticData: summaryS4
              })
            } else {
              this.setState({
                staticData: {}
              }) 
            }
            this.setState({
              dateMonth: date
            })
          }} />
        </div>
        <div className={styles.headerCon}>
            <Statistic summary={data} bcStyle={{margin: '0 30px'}} />
            {/* <Statistic summary={summaryZ}/> */}
        </div>
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateYear}>
          <DateFilter dateValue={dateYear} picker='year' dateChage={(date)=>{ 
            console.log(date.format("YYYY-MM-DD"))
            if(date.format("YYYY-MM-DD")=== '2020-06-08'){
              this.setState({
                summaryYear: summaryS
              })
            }  else {
              this.setState({
                summaryYear: {}
              }) 
            }
            this.setState({ dateYear: date }) 
            }}/>
        </div>
        <div className={styles.headerCon}>
          <Statistic summary={summaryYear} bcStyle={{backgroundColor: '#f2f2f2',color: '#18b6ff'}} vertStyle={{backgroundColor: '#cecece',margin: 'auto 40px'}}/>
        </div>
        {
           !(this.isEmptyObject(summaryYear)) && 
          <div className={styles.chartCon}>
            <div className={styles.lineChart}>
              <ZheXian title="营收折线图" description="营收" data={dataY} formatter={(v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} seriesField="type" color={[ '#18b6ff', '#fc4e2a' ]}/>
            </div>
            <div className={styles.barChart}>
              <TiaoXing title="前十营收客户" color="blue" xField="收入额" yField="公司" formatter={(v) => v} colorField="收入额" data={dataShiZhi}/>
            </div>
            <div className={styles.barChart}>
              <TiaoXing title='前十支出客户' color="red" xField="收入额" yField="公司" formatter={(v) => v} colorField="收入额" data={dataShiYin}/>
            </div>
          </div>
        }
      </div>
      
    </div>)
  }
}
 
export default Revenue;