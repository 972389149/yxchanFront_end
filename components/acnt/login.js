import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, message } from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import { url } from './../../config/default'
import { login } from './../../redux/actions'

const Login = props => {

	const [loadding, loading_] = useState(false);
	const [login_visible, login_visible_] = useState(props.modalStatus);

	useEffect(() => {
		login_visible_(props.modalStatus);
	}, [props.modalStatus]);

	const [loginParams, setParams] = useState({});

	const login_handleOk = () => {
		if (!(/^1[3456789]\d{9}$/.test(loginParams.acntNumber))) {
		    message.error('手机号格式错误!');
		    return;
		}
		if (loginParams.acntPassword.length > 16 || loginParams.acntPassword.length < 8) {
		    message.error('密码格式错误!');
		    return;
		}
		loading_(true);
		axios.post(`${url}acnt/login`, loginParams, {
			withCredentials: true,
		})
		.then(val => {
			if (val.data.code === 1) {
				loading_(false);
				props.loginIn(val.data.data);
			} else {
				loading_(false);
				setParams({});
				message.error(val.data.msg);
			}
		}).catch(err => {
			message.error('服务器出错啦!!!');
			loading_(false);
			setParams({});
		});
	};

	return (
			<React.Fragment>
				<Modal
					visible = {login_visible}
					title = '快速登录'
					onOk = {login_handleOk}
					onCancel = {props.modalClose}
					width = {300}
					centered = {true}
					footer = {[
						<Button key = 'back' onClick = {props.modalClose}>
							取消
						</Button>,
						<Button key = 'submit' type = 'primary' loading = {loadding} onClick = {login_handleOk}>
							登录
						</Button>,
					]}
				>
					<div className = 'input_inner_login'>
						<Input
							allowClear
							maxLength = {11}
							placeholder = '手机号'
							prefix = {<UserOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
							value = {loginParams.acntNumber}
							onChange = {event => {
								setParams({
									...loginParams,
									acntNumber: event.target.value,
								})
							}}
						/>
						<Input.Password 
							maxLength = {16}
							placeholder = '密码' 
							prefix = {<LockOutlined style = {{color: 'rgba(0,0,0,.25)'}}/>}
							value = {loginParams.acntPassword}
							onChange = {event => {
								setParams({
									...loginParams,
									acntPassword: event.target.value,
								})
							}}
						/>
					</div>
				</Modal>
				<style jsx>{`
					.input_inner_login {
						height: 80px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
				`}</style>
			</React.Fragment>
	)
}
const mapStateToProps = state => {
	return {}
}
const mapActionCreators = dispatch => {
	return {
		loginIn: bindActionCreators(login, dispatch),
	}
}
export default connect(
	mapStateToProps,
	mapActionCreators
)(Login);
