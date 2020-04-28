import React, {  PureComponent } from 'react';
import styles from './fontSize.less'

class CarFont extends PureComponent {
  render() { 
    const { content, style } = this.props
    return ( <i className={styles.iconfont} style={style} dangerouslySetInnerHTML={{__html: content}}/> );
  }
}
 
export default CarFont