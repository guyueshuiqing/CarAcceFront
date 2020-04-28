import React, { Component } from 'react'
import moment from 'moment'

import styles from './index.less'
import { Breadcrumb, Statistic, DateFilter, ZheXian, TiaoXing } from 'components/index.js'

import { summaryS, summaryZ, dataY } from '../config'

// const { RangePicker } = DatePicker

class Revenue extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dateMonth: moment().subtract(0,'month'),
      dateYear: moment().subtract(0,'year'),
    }
  }
  render() { 
    const { dateMonth, dateYear } = this.state
    return ( <div className={styles.RevenueCon}>
      <div className={styles.Breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateMonth}>
          <DateFilter dateValue={dateMonth} picker='month' dateChage={(date)=>{
            this.setState({
              dateMonth: date
            })
          }} />
        </div>
        <div className={styles.headerCon}>
            <Statistic summary={summaryS} bcStyle={{margin: '0 30px'}} />
            <Statistic summary={summaryZ}/>
        </div>
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateYear}>
          <DateFilter dateValue={dateYear} picker='year' dateChage={(date)=>{ this.setState({ dateYear: date }) }}/>
        </div>
        <div className={styles.headerCon}>
          <Statistic summary={summaryS} bcStyle={{backgroundColor: '#f2f2f2',color: '#18b6ff'}} vertStyle={{backgroundColor: '#cecece',margin: 'auto 40px'}}/>
        </div>
        <div className={styles.chartCon}>
          <div className={styles.lineChart}>
            <ZheXian title="营收折线图" description="营收折线图" data={dataY} formatter={(v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} seriesField="type" color={[ '#18b6ff', '#fc4e2a' ]}/>
          </div>
          <div className={styles.barChart}>
            <TiaoXing title="前十营收客户" color="blue" xField="收入额" yField="公司" formatter={(v) => Math.round(v / 10000) + '万'} colorField="收入额"/>
          </div>
          <div className={styles.barChart}>
            <TiaoXing title='前十支出客户' color="red" xField="收入额" yField="公司" formatter={(v) => Math.round(v / 10000) + '万'} colorField="收入额"/>
          </div>
        </div>
        
      </div>
      
    </div>)
  }
}
 
export default Revenue;