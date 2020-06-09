import React, { Component } from 'react'
import styles from './index.less'

class Statistic extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  isEmptyObject = (obj) => {   
    　　for (var key in obj){
    　　　　return false;//返回false，不为空对象
    　　}　　
    　　return true;//返回true，为空对象
    }

  render() { 
    const { bcStyle,vertStyle, summary } = this.props
    return ( <div className={styles.StatisticCon} style={bcStyle}>
      {
        this.isEmptyObject(summary) && <div>
          占无数据
        </div>
      }
      {
        !(this.isEmptyObject(summary)) && Object.keys(summary).map((key,ind)=>{
          return < ><div key={ind} className={styles.sumItem}>
            <div className={styles.itemContent}>
              <span>{key}</span>
              <span>{summary[key]}</span>
            </div>
          </div>
          {
            Object.keys(summary).length-1 !== ind && <div style={vertStyle} className={styles.vertDiv} ></div>
          }
          </>
        })
      }
    </div> )
  }
}
 
export default Statistic