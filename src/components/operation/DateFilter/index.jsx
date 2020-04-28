import React, { Component } from 'react'
import { DatePicker, Button } from 'antd'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN'
import styles from './index.less'
class DateFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      preButton: false,
      nextButton: true
    }
  }

  dateChange = (date) => {
    const {dateChage, dateValue, picker} = this.props
    let nextButton = false
    if(dateValue.add(1,picker).startOf(picker).format() === moment().startOf(picker).format()){
      nextButton = true
    }
    this.setState({
      nextButton
    })
    dateChage(date)
  }

  disableDate=(current)=>{
    let { picker } = this.props
    return current && current >= moment().startOf(picker).add(1,picker)
  }

  changeDate = (key) =>{
    let { dateValue, dateChage, picker } = this.props
    let { preButton, nextButton} = this.state
    nextButton = false 
    if(key === 'pre' && !preButton){
      dateValue = dateValue.subtract(1,picker)
    }
    if(key === 'next' && !nextButton){
      if(dateValue >= moment().subtract(2,picker)){
        nextButton = true
        dateValue = dateValue.add(1,picker)
      }else {
        dateValue = dateValue.add(1,picker)
      }
    } 
    dateChage(dateValue)
    this.setState({
      nextButton
    })
  }

  render() { 
    const { dateValue, picker } = this.props
    const { preButton, nextButton} = this.state
    return ( <div className={styles.dateCon} key={dateValue}>
      <label>请选择{picker ==='month' ? '月' : '年' }份：</label>
      <Button type="primary" disabled={preButton} onClick={()=>{this.changeDate('pre')}} >上{picker ==='month' ? '个月' : '年' }</Button>
      <DatePicker picker={picker} onChange={this.dateChange} locale={locale} value={dateValue} disabledDate={this.disableDate} style={{margin: '0 10px'}}/>
      <Button type="primary" disabled={nextButton} onClick={()=>{this.changeDate('next')}}>下{picker ==='month' ? '个月' : '年' }</Button>
    </div> )
  }
}
 
export default DateFilter