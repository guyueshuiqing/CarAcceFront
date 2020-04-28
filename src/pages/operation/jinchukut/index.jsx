import React, { Component } from 'react'
import moment from 'moment'

import styles from './index.less'
import { Breadcrumb, Statistic, DateFilter, ZheXian, TiaoXing } from 'components/index.js'

import { summaryCs, dataC } from '../config'
class StoreT extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dateMonth: moment().subtract(0,'month'),
      dateYear: moment().subtract(0,'year'),
    }
  }
  render() { 
    const { dateMonth, dateYear } = this.state
    return ( <div className={styles.storeTCon}>
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
            <Statistic summary={summaryCs}/>
            {/* <Statistic summary={summaryZ}/> */}
        </div>
      </div>
      <div className={styles.yearChart}>
        <div className={styles.dateYear}>
          <DateFilter dateValue={dateYear} picker='year' dateChage={(date)=>{ this.setState({ dateYear: date }) }}/>
        </div>
        <div className={styles.headerCon}>
          <Statistic summary={summaryCs} bcStyle={{backgroundColor: '#f2f2f2',color: '#18b6ff'}} vertStyle={{backgroundColor: '#cecece',margin: 'auto 40px'}}/>
        </div>
        <div className={styles.chartCon}>
          <div className={styles.lineChart}>
            <ZheXian title="仓库统计折线图" width="700px" description="营收折线图" data={dataC} formatter={(v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} seriesField="type" color={[ '#18b6ff','#41c769','#fc4e2a' ]}/>
          </div>
          <div className={styles.barChart}>
            <TiaoXing title='前十入库配件' color="blue" xField="收入额" yField="公司" formatter={(v) => Math.round(v / 10000) + '万'} colorField="收入额"/>
          </div>
          <div className={styles.barChart}>
            <TiaoXing title='前十出库配件' color="green" xField="收入额" yField="公司" formatter={(v) => Math.round(v / 10000) + '万'} colorField="收入额"/>
          </div>
          <div className={styles.barChart}>
            <TiaoXing title='前十损坏废弃配件' color="red" xField="收入额" yField="公司" formatter={(v) => Math.round(v / 10000) + '万'} colorField="收入额"/>
          </div>
        </div>
      </div>
    </div> )
  }
}
 
export default StoreT