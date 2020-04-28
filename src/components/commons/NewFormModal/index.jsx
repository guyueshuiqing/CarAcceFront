import React, { Component } from 'react'
import { Modal } from 'antd'
import {FormCreate} from 'components/index'

// const shenGouSelect = [
//   {
//     type: 'input',
//     rules: [],
//     key: 'applyStaff',
//     label: '申请人',
//   },
//   {
//     type: 'input',
//     rules: [],
//     key: 'purchaseNum',
//     label: '申购单号',
//   },
//   {
//     type: 'input',
//     rules: [],
//     key: 'goodsName',
//     label: '商品名称',
//   },{
//     type: 'rangePicker',
//     rules: [],
//     key: 'createDate',
//     label: '创建日期',
//   },{
//     type: 'rangePicker',
//     rules: [],
//     key: 'purchaseDate',
//     label: '采购限期',
//   }
//   // {
//   //   type: 'select',
//   //   rules: [],
//   //   key: 'team_id',
//   //   label: '默认项目',
//   //   options:[]
//   // },
//   // {
//   //   type: 'select',
//   //   rules: [],
//   //   key: 'article_type',
//   //   label: '默认品类',
//   //   options:[]
//   // },
// ]
class NewFormModal extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  

  getFormConfig = () =>{
    const columns = this.props.columns || []
    let configs = []
    const exp = [
      'status',
      'actions',
      'orderNum',
      'date',
      'price'
    ]
    columns.forEach((item)=>{
      if(exp.indexOf(item.colName) !== -1){
        
      }else{
        let config = {
          type: 'input',
          rules: [],
          key: item.key,
          label: item.title,
        }
        if(item.colName === 'indate' && item.key !== 'createDate'){
          config.type = 'datePicker'
        }
        configs.push(config)
      }
    })

    return configs
  }

  formRef = React.createRef()

  render() { 
    const { title, visible, onOk, onCancel } = this.props
    const selectForm = this.getFormConfig()
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 6 },
    //     sm: { span: 6 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 16 },
    //     sm: { span: 16 },
    //   },
    // }
    return ( 
      <Modal
        title={ title }
        visible={visible}
        onOk={()=>{
          onOk()
        }}
        onCancel={()=>{
          console.log('quxiao')
          onCancel()
        }}
        okText="确认"
        cancelText="取消"
      >
        <FormCreate 
          ref={this.formRef}
          config={selectForm}
          // layoutForm={formItemLayout}
          // layout={layout}
          // row={row}
          size="middle"
        />
      </Modal>)
  }
}
 
export default NewFormModal