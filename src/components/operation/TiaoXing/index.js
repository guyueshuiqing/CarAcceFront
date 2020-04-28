import React, { Component } from 'react'
import { Bar } from '@antv/g2plot'

const data = [
  { 公司: '奔驰', 收入额: 4684506.442 },
  { 公司: '昵称', 收入额: 4137415.0929999948 },
  { 公司: '哈哈是', 收入额: 2681567.469000001 },
  { 公司: '五大', 收入额: 2447301.017000004 },
  { 公司: '萨迪家乐福', 收入额: 1303124.508000002 },
  { 公司: '撒多思考', 收入额: 815039.5959999998 },
  { 公司: '埃及大部', 收入额: 815036.5959999998 },
  { 公司: 's大市口', 收入额: 815031.5959999998 },
  { 公司: '看反馈的', 收入额: 815020.5959999998 },
  { 公司: '开了房', 收入额: 815011.5959999998 },
];

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
    const { title,xField, yField, formatter, color, colorField  } = this.props
    console.log(title)
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
