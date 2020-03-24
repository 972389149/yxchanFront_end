import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, message  } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'
const { Search } = Input;
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { url } from './../../config/default'
import { register } from './../../redux/actions'

const Register = props => {
  const [reg_loading, reg_loading_] = useState(false);
  const [reg_visible, reg_visible_] = useState(props.modalStatus);
  useEffect(() => {
    reg_visible_(props.modalStatus);
  }, [props.modalStatus]);

  const reg_handleOk = () => {
    reg_loading_(true);
    if (!(/^1[3456789]\d{9}$/.test(formData.acntNumber))) {
      message.error('手机号格式错误!');
      formData_({
        ...formData,
        acntNumber: '',
      })
      reg_loading_(false);
      return;
    }
    if (formData.acntName.length < 3 || formData.acntName.length > 12) {
      message.error('用户名长度不符!');
      formData_({
        ...formData,
        acntName: '',
      })
      reg_loading_(false);
      return;
    }
    if (formData.acntPassword.length < 8 || formData.acntPassword.length > 16) {
      message.error('密码长度不符!');
      formData_({
        ...formData,
        acntPassword: '',
        acntPassword_: '',
      })
      reg_loading_(false);
      return;
    }
    if (formData.acntPassword !== formData.acntPassword_) {
      message.error('请确保两次输入密码一致!');
      formData_({
        ...formData,
        acntPassword_: '',
      })
      reg_loading_(false);
      return;
    }

    axios.post(`${url}acnt/register`, {
      acntNumber: formData.acntNumber,
      acntName: formData.acntName,
      acntPassword: formData.acntPassword,
    }, {
      withCredentials: true,
    })
    .then(val => {
      if (val.data.code === 1) {
        reg_loading_(false);
        props.registerIn(val.data.data);
      } else {
        message.error(val.data.msg);
        reg_loading_(false);
        formData_({})
      }
    }).catch(err => {
      message.error('服务器出错啦!!!');
      reg_loading_(false);
      formData_({})
    });
  };

  // 注册表单数据
  const [formData, formData_] = useState({});

  // 验证码
  const [code, code_] = useState({
    can: true,
    msg: '点击发送',
  })

  return (
    <React.Fragment>
      <Modal
        visible = {reg_visible}
        title = '快速注册'
        onOk = {reg_handleOk}
        onCancel = {props.modalClose}
        width = {300}
        centered = {true}
        footer = {[
          <Button key = 'back' onClick = {props.modalClose}>
            取消
          </Button>,
          <Button key = 'submit' type = 'primary' loading = {reg_loading} onClick = {reg_handleOk}>
            注册
          </Button>,
        ]}
        >
        <div className = 'input_inner_reg'>
          <Input
            allowClear
            maxLength = {11}
            value = {formData.acntNumber}
            onChange = {event => {
              formData_({
                ...formData,
                acntNumber: event.target.value,
              })
            }}
            placeholder = '手机号'
            prefix={<PhoneOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <Input
            allowClear
            maxLength = {12}
            value = {formData.acntName}
            onChange = {event => {
              formData_({
                ...formData,
                acntName: event.target.value,
              })
            }}
            placeholder = '用户名'
            prefix={<UserOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <Input.Password 
            maxLength = {16}
            placeholder = '账号密码' 
            value = {formData.acntPassword}
            onChange = {event => {
              formData_({
                ...formData,
                acntPassword: event.target.value,
              })
            }}
            prefix={<LockOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <Input.Password 
            maxLength = {16}
            placeholder = '确认账号密码' 
            value = {formData.acntPassword_}
            onChange = {event => {
              formData_({
                ...formData,
                acntPassword_: event.target.value,
              })
            }}
            prefix={<LockOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <div className = 'reg_code'>
            <Search
              maxLength = {6}
              placeholder = '验证码'
              enterButton = {code.msg}
              value = {formData.code}
              disabled = {code.can}
              onChange = {event => {
                formData_({
                  ...formData,
                  code: event.target.value,
                })
              }}
              prefix = {<MailOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
              onSearch = {
                value => {}
              }
            />
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .input_inner_reg {
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .reg_code {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
        }
      `}</style>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    acnt: state.userReducer,
  }
}
const mapActionCreators = dispatch => {
  return {
    registerIn: bindActionCreators(register, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapActionCreators
)(Register);
