import React from 'react';
import styles from './index.less'
import {Form, Input, Select, DatePicker, Row, Col } from 'antd'

const { RangePicker } = DatePicker

const { Option } = Select.Option

const defaultformLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
}

const FormSelect = (type, item, size) => {
  switch (type) {
    case 'input':
      return <Input
        size={size}
        disabled={item.disabled} 
        onChange={(e) => {
          item.onChange && item.onChange(e, item)
        }}
      />
    case 'select':
      if (item.mode){
        return <Select
          mode={item.mode} 
          labelInValue
          onChange={(e) => {
            item.onChange && item.onChange(e, item)
          }}
          size={size}
        >
          {
            item.options && item.options.map((subitem, index) => {
              return <Option value={subitem.key} key={index}>{subitem.label}</Option>
            })
          }
        </Select>
      }
      return <Select
        labelInValue
        disabled={item.disabled}
        size={size}
        onChange={(e) => {
          item.onChange && item.onChange(e, item)
        }}
      >
        {
          item.options && item.options.map((subitem, index) => {
            return <Option disabled={subitem.disabled} value={subitem.key} key={index}>{subitem.label}</Option>
          })
        }
      </Select>
    case 'datePicker':
        return <DatePicker size={size}/>
    case 'rangePicker':
        return <RangePicker size={size}/>
    default:
      return <Input 
          onChange={(e) => {
            item.onChange && item.onChange(e, item)
          }}
          size={size}
        />
  }
}

function FormCreate(props, ref) {

  return <div className={styles.avatar}>
    <Form ref={ref} {...(props.layoutForm ? props.layoutForm : '')}>
      {
        props.row && <Row>
          {
            props.config && props.config.map((item, index) => {
              return <Col key={index} span={Math.floor(24/props.config.length)}>
                <Form.Item label={item.label} {...((props.layout && !props.layoutForm ) ? props.layout : defaultformLayout)} name={item.key} rules={ item.rules }>
                  {
                    FormSelect(item.type, item, props.size)
                  }
                </Form.Item>
              </Col>
            })
          }
        </Row>
      }
      {
         !props.row && props.config && props.config.map((item, index) => {
          return <Form.Item key={index} name={item.key} rules = {item.rules} label={item.label} {...(props.layout ? props.layout : defaultformLayout)}>
            {
              FormSelect(item.type, item)
            }
          </Form.Item>
        })
      }
    </Form>
    <div>
      {props.children}
    </div>
  </div>
}

// const FormFinal = Form.create({
//   onValuesChange(props,values){
//     console.log('formCreate',values)
//   }
// })(React.forwardRef(FormCreate))


export default React.forwardRef(FormCreate)