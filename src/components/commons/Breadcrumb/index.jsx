import React, { PureComponent } from 'react'
import {Breadcrumb} from 'antd'

import { menu } from '../../../layouts/config'
class MyBreadcrumb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  getPathNameZ = () =>{
    const pathname = window.location.pathname
    let pathSnippets = pathname && pathname.split('/').filter(i => i)
    let pathNameZ = []
    menu.forEach((item)=>{
      if(item.key === `/${pathSnippets[0]}`){
        pathNameZ.push({
          key: pathSnippets[0],
          value: item.content
        })
        if(item.children){
          item.children.forEach((child)=>{
            if(child.key === `/${pathSnippets[1]}`){
              pathNameZ.push(child.content)
              pathNameZ.push({
                key: pathSnippets[1],
                value: child.content
              })
            }
          })
        }
      }
    })
    return pathNameZ
  }

  render() {
    const pathname = this.getPathNameZ()
    return ( 
      <Breadcrumb>
        {
          pathname && pathname.map((item,ind)=>{
            return <Breadcrumb.Item key={ind}>{item.value}</Breadcrumb.Item>
          })
        }
      </Breadcrumb>
    )
  }
}
 
export default MyBreadcrumb