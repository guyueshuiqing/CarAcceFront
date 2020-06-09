import React, { Component } from 'react'
import { Modal } from 'antd'
import {FormCreate} from 'components/index'
import moment from 'moment'

class NewFormModal extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = { 
      key: 5
    }
  }
  
  
  componentDidMount(){
    
    
  }

  componentWillReceiveProps(nextProps){
    const { selectRow } = nextProps
      setTimeout(() => {
        if(this.formRef.current && selectRow){ 
          this.formRef.current.setFieldsValue(selectRow)
        }
      });
  }

  getFormConfig = () =>{
    const columns = this.props.columns || []
    const edit = this.props.edit
    let configs = []
    const exp = [
      'status',
      'actions',
      'orderNum',
      'date',
      'price',
      'InuserName'
    ]
    columns.forEach((item)=>{
      if(exp.indexOf(item.colName) !== -1){
        
      }else{
        let config = {
          type: 'input',
          rules: [],
          key: item.key,
          label: item.title,
          edit: edit
        }
        if(item.colName === 'indate' && item.key !== 'createDate'){
          config.type = 'datePicker'
        }
        if(item.colName === 'remarks'){
          config.type = 'textarea'
        }
        configs.push(config)
      }
    })

    return configs
  }

  

  render() { 
    const { title, visible, onOk, onCancel } = this.props
    const selectForm = this.getFormConfig()
    return ( 
      <Modal
        title={ title }
        key={this.state.key}
        visible={visible}
        destroyOnClose
        onOk={()=>{
          if (this.formRef.current) {
            this.formRef.current.validateFields().then((values)=>{
              onOk(values)
            }).catch((errorInfo)=>{
              console.log(errorInfo)
            })
          }
        }}
        onCancel={()=>{
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