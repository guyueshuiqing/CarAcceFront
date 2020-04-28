import { Line } from '@antv/g2plot'
import React, { Component } from 'react'

class ZheXian extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  
  componentDidMount(){
    const { title, description, color, data, formatter, seriesField } = this.props 
    const linePlot = new Line(document.getElementById('zhexian'), {
      title: {
        visible: true,
        text: title
      },
      description: {
        visible: true,
        text: description,
      },
      padding: 'auto',
      forceFit: true,
      data:data,
      xField: 'date',
      yField: 'value',
      color: color ,
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: formatter ,
        },
      },
      legend: {
        position: 'right-top',
      },
      seriesField: seriesField,
      responsive: true,
    })
    linePlot.render()
  }
  // refZ = React.createRef(null)
  render() { 
    const { width } = this.props
    return ( <div id="zhexian" style={{paddingTop: '20px',width: width ? width :'800px',height: '400px'}}></div> )
  }
}
 
export default ZheXian






