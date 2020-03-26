import React, { useState, useEffect } from 'react'
import { Avatar } from 'antd'
import Link from 'next/link'

import Hookheader from './../contain/hookheader'
import { url } from './../../config/default'

const AcntMessage = props => {
  return (
    <React.Fragment>
      <div className = 'haslogin'>
        <Hookheader title = {props.title} />
        <div className = 'haslogin_detail'>
          <div className = 'avatar'>
            <Link
              // as = {`/acnts/acnt/${props.acntName}`}
              href={{pathname: '/acnts/acnt', query: {user: props.acntName}}}
            >
              <Avatar size = 'large' shape = 'square' src = {url + props.acntAvatar} alt = {props.acntName}/>
            </Link>
            <Link
              // as = {`/acnts/acnt/${props.acntName}`}
              href={{pathname: '/acnts/acnt', query: {user: props.acntName}}}
            >
              <a className = 'avatarName'>{props.acntName}</a>
            </Link>
          </div>
          <div className = 'score'>积分：{props.acntScore}</div>
          <div className = 'signature'>“ {props.acntSignature} ”</div>
        </div>
      </div>
      <style jsx>{`
        .haslogin {
          width: 270px;
          min-height: 170px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          margin-bottom: 10px;
        }
        .haslogin_detail {
          width: 250px;
          min-height: 110px;
          margin: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .avatar {
          display: flex;
          align-items: center;
        }
        .avatarName {
          color: #778087;
          font-size: 16px;
          cursor: pointer;
          margin-left: 10px;
        }
        .signature {
          font-style: italic;
          font-size: 13px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default AcntMessage;
