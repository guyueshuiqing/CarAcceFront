import React, {  PureComponent } from 'react';
import styles from './fontSize.less'

class CarFont extends PureComponent {
  render() { 
    const { content } = this.props
    console.log(content)
    return ( <i className={styles.iconfont} dangerouslySetInnerHTML={{__html: content}}/> );
  }
}
 
export default CarFont