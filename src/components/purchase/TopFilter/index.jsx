import React, { Component } from 'react'
// import {Icon} from 'antd'
import styles from './index.less'
import { CarIcon } from 'components/index'
// import qs from 'qs'
import {pinpai} from '../../../../mock/topFilter'


class TopFilter  extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      filters: [],
      more: 'unmore',
      fold: 'unfold',
    }
  }

  addFilterCilick = (e,item) =>{
    const temp = e.target.innerHTML
    if(e.target.nodeName.toLowerCase() === 'span'){
      this.setState((prevState)=>{
        const { filters } = prevState
        filters.push({
          key: item,
          value: temp
        })
        return {
          filters
        }
      })
    }
  }

  remFiltersClick = (item) => {
    this.setState((prevState)=>{
      let { filters } = prevState
      filters = filters.filter((i)=> item !== i)
      return {
        filters
      }
    })
  }

  render() { 
    const { filters, more, fold } = this.state
    return (
      <div className={styles.TopFilterCon}>
        <section className={styles.filteredName}>
          <div className={styles.allFilters}>全部结果 :</div>
          {
            filters.map((item,ind)=>{
              return (
                <span  key={ind} className={styles.filters} onClick={()=>{this.remFiltersClick(item)}}>{item.key} : {item.value} <CarIcon content="&#xe6bc;"/></span>
              )
            })
          }
        </section>
        <section className={styles.selectCon}>
          {
            Object.keys(pinpai).map((item,ind)=>{
              return (
                <div>
                  {
                    (fold === 'unfold' || (fold === 'fold' && ind === 0)) &&
                    <div key={`${more}${fold}${ind}`} onClick={(e)=>{this.addFilterCilick(e,item)}} className={styles.selectItem}>
                      <p className={styles.selectKey}>{item} :</p>
                      <div className={styles.selectValueCon} style={{whiteSpace: more === 'unmore'? 'nowrap' : 'wrap'}}>
                        {
                          pinpai[item].map((filterName,indsec)=>{
                            return (
                              <span key={indsec} className={styles.selectValue}>{filterName}</span>
                            )
                          })
                        }
                      </div>
                      {
                        ind === 0 && <div className={styles.more} onClick={()=>{
                          this.setState((prevState)=>{
                            const more = prevState.more === 'more' ? 'unmore' : 'more'
                            return {
                              more
                            }
                          })
                        }}>
                          {
                            more === 'more' ? '收起': '更多'
                          }
                          <CarIcon style={{fontSize: '6px'}} content={more === 'more' ? '&#xe63a;' : '&#xe650;'}/>
                        </div> 
                      }
                    </div> 
                  }
                </div>
              )
            })
          }
        </section>
        {
          <section className={styles.foldCon}>
            <div onClick={()=>{
              this.setState((prevState)=>{
                const fold = prevState.fold === 'unfold' ? 'fold' : 'unfold'
                return {
                  fold
                }
              })
            }} className={styles.foldWrap}>
              <CarIcon style={{fontSize: '6px'}} content={fold === 'unfold' ? '&#xe62b;' : '&#xe60a;'}/>
            </div>
          </section>
        }
      </div>
    )
  }
}
 
export default TopFilter