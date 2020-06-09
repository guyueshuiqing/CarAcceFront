import React, { Component } from 'react'
import { Bar } from '@antv/g2plot'

const colors = {
  blue:[
  '#A6CBE0',
  '#A6CBE0',
  '#7CBFE6',
  '#7CBFE6',
  '#53B4ED',
  '#53B4ED',
  '#28A5ED',
  '#28A5ED',
  '#0096ED',
  '#0096ED',  
],
  red:[
    '#FCD2DA',
    '#FCD2DA',
    '#F7A3B4',
    '#F7A3B4',
    '#FC7993',
    '#FC7993',
    '#FC4E71',
    '#FC4E71',
    '#FC244F',
    '#FC244F',
  ],
  green:[
    '#D5F2E9',
    '#D5F2E9',
    '#B8F5E2',
    '#B8F5E2',
    '#85F2CF',
    '#85F2CF',
    '#4CEDBA',
    '#4CEDBA',
    '#1CE8A7',
    '#1CE8A7',
  ]
}

class TiaoXing extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentDidMount(){
    const { title,xField, yField, formatter, color, colorField,data } = this.props
    const barPlot = new Bar(this.refT, {
      title: {
        visible: true,
        text: title,
      },
      forceFit: true,
      data,
      xField: xField,
      yField: yField,
      colorField: colorField,
      color: colors[color],
      label: {
        visible: true,
        position: 'middle', // options: left / middle / right
        formatter: formatter ,
      },
    })
    
    barPlot.render()
  }

  render() { 
    return ( <div ref={ref=>this.refT=ref}></div> )
  }
}
 
export default TiaoXing
