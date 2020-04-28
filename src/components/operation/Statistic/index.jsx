import React, { Component } from 'react'
import styles from './index.less'

class Statistic extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    const { bcStyle,vertStyle, summary } = this.props
    return ( <div className={styles.StatisticCon} style={bcStyle}>
      {
        Object.keys(summary).map((key,ind)=>{
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