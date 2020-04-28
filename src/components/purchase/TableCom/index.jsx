import React, { Component } from 'react'
import { Table, Button } from 'antd'
import styles from './index.less'
import { getColumns, pathNameZ } from './config'

import { NewFormModal } from 'components/index'

class TableCom extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      scrollY: 1200,
      newVisible: false,
    }
  }

  handleResize = (e) => {
    const scrollY = document.body.clientHeight
    if (scrollY && scrollY > 500) {
      this.setState({
        scrollY
      })
    }
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize,10) // 监听窗口大小改变
    const y = document.body.clientHeight
    if(y > 500){
      this.setState({
        scrollY: y
      })
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize',()=>{})
  }

  // 计算表格宽度设置滚动条
  getWidthAndCol = () =>{
    const reqColumns = this.props && this.props.reqColumns || []
    let width = 0
    const columns = getColumns(reqColumns)
    columns.forEach((item)=>{
      width += Number(item.width)
    })
    return {
      scrollWidth: width,
      columns: columns
    }
  }

  getNewEditName = () => {
    const pathname = window.location.pathname
    const pathSnippets = pathname && pathname.split('/').filter(i => i)
    const curPathNameZ = pathNameZ[pathSnippets[0]][pathSnippets[1]]
    return curPathNameZ
  }



  render() {
    const { dataSource, newDis } = this.props
    const { scrollY, newVisible } = this.state
    const { scrollWidth, columns } = this.getWidthAndCol()
    return (<div className={styles.tableCom}>
      <Table
        rowKey={i=>i+Math.random(100)+Math.random(100)}
        columns={columns} 
        dataSource={dataSource}
        // loading={!!loading.effects['article/getTeamArticle'] || !!loading.effects['article/getTeams']}
        scroll={{ x: scrollWidth, y: scrollY - 340 }}
        pagination={{
          total: dataSource && dataSource.length,
          // current: (query && query.page && Number(query.page)),
          pageSize: 15,
          showTotal: total => `总共 ${total} 条数据`
        }}
      />
      {
        !newDis &&  <div className={styles.tableBottom}>
          <Button type="primary" style={{position: 'absolute', left: '20px',bottom: '80px'}} onClick={()=>{
            this.setState({
              newVisible: true
            })
          }}>新建{this.getNewEditName()}</Button>
        </div>
      }
      
      <NewFormModal columns={columns} title={`新建${this.getNewEditName()}`} visible={newVisible} onOk={()=>{
        this.setState({
          newVisible: false
        })
      }} onCancel={()=>{
        this.setState({
          newVisible: false
        })
      }}/>
    </div>)
  }
}
 
export default TableCom