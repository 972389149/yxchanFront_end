import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Input, Button, message, Upload } from 'antd'
import {
  HomeOutlined,
  PlusCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { bindActionCreators } from 'redux'
const { TextArea } = Input

import Style from './Setting.module.scss'
import { FetchPost } from './../../../tools'
import { url } from './../../../config/default'
import AcntMessage from './../../../components/hooks/acntMessage'
import Community from './../../../components/hooks/community'
import Hookheader from './../../../components/contain/hookheader'
import Createarticle from './../../../components/hooks/createarticle'
import { reset } from './../../../redux/actions'
import Authorized from './../../../components/hooks/authorized'

const Setting = props => {

  /* 图片转换base64在线显示 */
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('您只能上传 JPG/PNG 格式文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const [loading, loading_] = useState(false);
  const [img, img_] = useState('');
  const  handleChange = info => {
    if (info.file.status === 'uploading') {
      loading_(true);
      return;
    }
    if (info.file.status === 'done') {
      props.reSet({
        acntAvatar: info.file.response.data.acntAvatar,
      });
      getBase64(info.file.originFileObj, imageUrl => {
          img_(imageUrl);
          loading_(false);
        }
      );
    }
  };
  const uploadButton = (
    <div>
      {
        loading &&
        <LoadingOutlined />
      }
      {
        !loading &&
        <PlusCircleOutlined />
      }
      <div className = 'ant-upload-text'>上传头像</div>
    </div>
  );

  const [inputValue, inputValue_] = useState({}) 
  useEffect(() => {
    if (props.acnt.status === 1) {
      inputValue_({
        acntName: props.acnt.data.acntName,
        acntAddress: props.acnt.data.acntAddress,
        acntBlog: props.acnt.data.acntBlog,
        acntGithub: props.acnt.data.acntGithub,
        acntSignature: props.acnt.data.acntSignature,
      })
    }
  }, [props.acnt])

  const [comfirmLoading, comfirmLoading_] = useState(false);
  // 保存设置
  const save = () => {
    comfirmLoading_(true);
    FetchPost(`acnt/configSave`, inputValue, false, '')
    .then(val => {
      message.success(val.msg);
      props.reSet(val.data);
      setTimeout(() => {
        comfirmLoading_(false);
      }, 1000)
    })
    .catch(err => {
      message.error('服务器异常!');
      setTimeout(() => {
        comfirmLoading_(false);
      }, 1000)
    });
  }

  const [passLoading, passLoading_] = useState(false);
  const [password, password_] = useState({
    oldPassword: '',
    newPassword: '',
  })
  const [passwordAgain, passwordAgain_] = useState('');
  // 修改密码
  const changePass = () => {
    passLoading_(true);
    if (password.oldPassword === '' || password.newPassword === '' || passwordAgain === '') {
      message.error('请先完成填写再提交!');
      setTimeout(() => {
        passLoading_(false);
      }, 1000)
      return;
    }
    if (password.oldPassword.length > 16 || password.oldPassword.length < 8) {
      message.error('当前密码长度不符!');
      setTimeout(() => {
        passLoading_(false);
        password_({
          ...password,
          oldPassword: '',
        })
      }, 1000)
      return;
    }
    if (password.newPassword.length > 16 || password.newPassword.length < 8) {
      message.error('新密码长度不符!');
      setTimeout(() => {
        password_({
          ...password,
          newPassword: '',
        })
        passLoading_(false);
      }, 1000)
      return;
    }
    if (password.oldPassword === password.newPassword) {
      message.error('新密码与当前密码一致!');
      setTimeout(() => {
        passLoading_(false);
        passwordAgain_('');
        password_({
          oldPassword: '',
          newPassword: '',
        })
      }, 1000)
      return;
    }
    if (passwordAgain !== password.newPassword) {
      message.error('两次输入密码不一致!');
      setTimeout(() => {
        passLoading_(false);
        passwordAgain_('');
      }, 1000)
      return;
    }
    FetchPost(`acnt/setPassword`, password, false)
    .then(val => {
      message.success(val.msg);
      setTimeout(() => {
        passLoading_(false);
        passwordAgain_('');
        password_({
          oldPassword: '',
          newPassword: '',
        })
      }, 1000)
    })
    .catch(err => {
      message.error('服务器异常!');
      setTimeout(() => {
        passLoading_(false);
        passwordAgain_('');
        password_({
          oldPassword: '',
          newPassword: '',
        })
      }, 1000)
    });
  }

  if (props.acnt.status !== 1) {
    return (
      <Authorized />
    )
  }

  return (
    <div className = {Style.setting_inner}>
      <section className = {Style.setting_info_1}>
        <section className = {Style.setting_part_1}>
            <div className = {Style.part_1_title}>
              <Breadcrumb>
                <Breadcrumb.Item href = '/'>
                  <HomeOutlined />
                  <span>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>设置</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <ul className = {Style.info_1_input}>
              <li>
                <p>用户名</p>
                <Input 
                  value = {inputValue.acntName} 
                  onChange = {event => {
                    inputValue_({
                      ...inputValue,
                      acntName: event.target.value,
                    })
                  }}
                  maxLength = {12}
                  allowClear 
                />
              </li>
              <li>
                <p>头像</p>
                <div className = {Style.avatar_upload}>
                  <Upload
                    name = 'avatar'
                    action = {`${url}acnt/uploadAvatar`}
                    withCredentials = {true}
                    multiple = {true}
                    listType = 'picture-card'
                    className = 'avatar-uploader'
                    showUploadList = {false}
                    supportServerRender = { true }
                    beforeUpload = {beforeUpload}
                    onChange = {handleChange}
                  >
                    {img ? <img src = {img} alt = 'avatar' style = {{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </div>
              </li>
              <li>
                <p>所在地</p>
                <Input 
                  value = {inputValue.acntAddress} 
                  onChange = {event => {
                    inputValue_({
                      ...inputValue,
                      acntAddress: event.target.value,
                    })
                  }}
                  maxLength = {30}
                  allowClear 
                />
              </li>
              <li>
                <p>个人站点</p>
                <Input 
                  value = {inputValue.acntBlog}
                  onChange = {event => {
                    inputValue_({
                      ...inputValue,
                      acntBlog: event.target.value,
                    })
                  }} 
                  maxLength = {30}
                  allowClear 
                />
              </li>
              <li>
                <p>Github</p>
                <Input 
                  value = {inputValue.acntGithub}
                  onChange = {event => {
                    inputValue_({
                      ...inputValue,
                      acntGithub: event.target.value,
                    })
                  }} 
                  maxLength = {30}
                  allowClear 
                />
              </li>
              <li>
                <p>个性签名</p>
                <TextArea 
                  value = {inputValue.acntSignature} 
                  onChange = {event => {
                    inputValue_({
                      ...inputValue,
                      acntSignature: event.target.value,
                    })
                  }} 
                  maxLength = {50}
                  placeholder = '这个家伙真的很懒，什么都没留下~' 
                />
              </li>
            </ul>
            <div className = {Style.setting_comfirm}>
              <Button 
                type = 'primary'
                loading = {comfirmLoading}
                onClick = {save}
              >保存设置</Button>
            </div>
        </section>
        <section className = {Style.setting_part_2}>
          <Hookheader 
            title = '更改密码'
          />
          <ul  className = {Style.info_1_input}>
            <li>
              <p>当前密码</p>
              <Input.Password 
                maxLength = {16} 
                password = 'true'
                value = {password.oldPassword}
                onChange = {event => {
                  password_({
                    ...password,
                    oldPassword: event.target.value,
                  })
                }} 
              />
            </li>
            <li>
              <p>新密码</p>
              <Input.Password 
                maxLength = {16} 
                password = 'true' 
                value = {password.newPassword}
                onChange = {event => {
                  password_({
                    ...password,
                    newPassword: event.target.value,
                  })
                }} 
              />
            </li>
            <li>
              <p>再次确定</p>
              <Input.Password 
                maxLength = {16} 
                password = 'true' 
                value = {passwordAgain}
                onChange = {event => {
                  passwordAgain_(event.target.value)
                }} 
              />
            </li>
          </ul>
          <div className = {Style.setting_comfirm}>
            <Button 
              type = 'primary'
              loading = {passLoading}
              onClick = {changePass}
            >更改密码</Button>
          </div>
        </section>
      </section>
      <section className = {Style.setting_info_2}>
        <AcntMessage 
          acntAvatar = {props.acnt.data.acntAvatar}
          acntName = {props.acnt.data.acntName}
          acntScore = {props.acnt.data.acntScore}
          acntSignature = {props.acnt.data.acntSignature}
          title = {'个人信息'}
        />
        <Createarticle />
        <Community />
      </section>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    acnt: state.userReducer,
  }
}
  
const mapActionCreators = dispatch => {
  return {
    reSet: bindActionCreators(reset, dispatch),
  }
}
  
export default connect(
  mapStateToProps,
  mapActionCreators
)(Setting);
