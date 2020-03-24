import React, { useState, useEffect } from 'react'
import Editor from 'for-editor'
import { message } from 'antd'
import axios from 'axios'

import { url } from './../../config/default'

const Editor_ = props => {

  const handleChange = val => {
    props.handle(val);
  }

  const loadImg = file => {
    const form = new FormData();
    form.append('articles', file);
    axios.post(`${url}article/uploadImg`, form, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(val => {
      if (val.data.code === 1) {
        message.success(val.data.data.originalname + ' 上传成功!');
        props.handle(props.value + `![${val.data.data.originalname }](${url}${val.data.data.path})`)
      } else {
        message.error(val.data.data.originalname + ' 上传失败!');
      }
    }).catch(err => {
      message.error('上传失败：' + err)
    })
  }

  return (
    <React.Fragment>
      <Editor 
        value = {props.value} 
        onChange = {handleChange} 
        toolbar = {props.toolbar}
        height = {props.height}
        addImg = {loadImg}
      />
    </React.Fragment>
  )
}
export default Editor_;
