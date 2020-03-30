import React, { PureComponent } from 'react'
import styles from './index.less'

class Summary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const { summaryItem } = this.props
    return (<div className={styles.mian}>
      {
        Object.keys(summaryItem).map((i,index)=>{
          return(
            <div key={index} className={styles.dataItem}>
              <span>{i}</span>
              <span>{summaryItem[i]}</span>
            </div>
          )
        })
      }
    </div>)
  }
}
 
export default Summary;