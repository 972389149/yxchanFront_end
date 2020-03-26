import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import Login from './../acnt/login'
import Register from './../acnt/register'

const Introduce = props => {
  const [login_visible, login_visible_] = useState(false);
  const login_showModal = () => {
    login_visible_(true);
  };

  const [reg_visible, reg_visible_] = useState(false);
  const reg_showModal = () => {
    reg_visible_(true);
  };
  
  return (
    <React.Fragment>
      <div className = 'nologin'>
        <div>JavaScript业余中文社区</div>
        <div className = 'nologin_btn'>
          <p>您想要</p>
          <Button onClick = {login_showModal}>登录</Button>
          <p>亦或是</p>
          <Button onClick = {reg_showModal}>注册</Button>
          <p>?</p>
        </div>
      </div>
      <Login 
        modalStatus = {login_visible}
        modalClose= {() => { login_visible_(false)}}
      />
      <Register 
          modalStatus = {reg_visible}
          modalClose= {() => { reg_visible_(false)}}
      />
      <style jsx>{`
        .nologin {
          width: 270px;
          background: #fff;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 10px;
          padding: 10px;
        }
        .nologin_btn {
          width: 250px;
          margin-top: 10px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        p {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Introduce;
