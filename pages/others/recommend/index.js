import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  HomeOutlined
} from '@ant-design/icons'
import { Breadcrumb } from 'antd'

import AcntMessage from './../../../components/hooks/acntMessage'
import Community from './../../../components/hooks/community'
import Introduce from './../../../components/hooks/introduce'

const Recommend = props => {
  return (
    <div className = 'recommend_inner'>
      <section className = 'recommend_info_1'>
        <div className = 'bread'>
          <Breadcrumb>
            <Breadcrumb.Item href = '/'>
              <HomeOutlined />
              <span>首页</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>资源推荐</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className = 'content'>
          <h1>Node.js入门</h1>
          <strong>“快速搭建 Node.js 开发环境以及加速 npm”</strong>
          <a href = 'http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html'>http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html</a>
          <strong>“Node.js 包教不包会”</strong>
          <a href = 'https://github.com/alsotang/node-lessons'>https://github.com/alsotang/node-lessons</a>
          <strong>“ECMAScript 6入门”</strong>
          <a href = 'http://es6.ruanyifeng.com/'>http://es6.ruanyifeng.com/</a>
          <strong>“七天学会NodeJS”</strong>
          <a href = 'https://github.com/nqdeng/7-days-nodejs'>https://github.com/nqdeng/7-days-nodejs</a>
          <h1>Node.js资源</h1>
          <strong>“前端资源教程”</strong>
          <a href = 'https://cnodejs.org/topic/56ef3edd532839c33a99d00e'>https://cnodejs.org/topic/56ef3edd532839c33a99d00e</a>
          <strong>“国内的 npm 镜像源”</strong>
          <a href = 'http://cnpmjs.org/'>http://cnpmjs.org/</a>
          <strong>“node weekly”</strong>
          <a href = 'http://nodeweekly.com/issues'>http://nodeweekly.com/issues</a>
          <strong>“node123-node.js中文资料导航”</strong>
          <a href = 'https://github.com/youyudehexie/node123'>https://github.com/youyudehexie/node123</a>
          <strong>“A curated list of delightful Node.js packages and resources”</strong>
          <a href = 'https://github.com/sindresorhus/awesome-nodejs'>https://github.com/sindresorhus/awesome-nodejs</a>
          <strong>“Node.js Books”</strong>
          <a href = 'https://github.com/pana/node-books'>https://github.com/pana/node-books</a>
          <h1>Node.js名人</h1>
          <strong>“名人堂”</strong>
          <a href = 'https://github.com/cnodejs/nodeclub/wiki/名人堂'>https://github.com/cnodejs/nodeclub/wiki/名人堂</a>
          <h1>Node.js服务器</h1>
          <strong>“新手搭建 Node.js 服务器，推荐使用无需备案的”</strong>
          <a href = 'https://www.digitalocean.com/?refcode=eba02656eeb3'>DigitalOcean(https://www.digitalocean.com/)</a>
        </div>
      </section>
      <section className = 'recommend_info_2'>
        {
          props.acnt.status === 1 &&
          <React.Fragment>
            <AcntMessage
              title = '个人信息'
              acntAvatar = { props.acnt.data.acntAvatar }
              acntName = { props.acnt.data.acntName }
              acntScore = { props.acnt.data.acntScore }
              acntSignature = { props.acnt.data.acntSignature }
            />
          </React.Fragment>
        }
        {
          props.acnt.status === 0 &&
          <Introduce />
        }
        <Community />
      </section>
      <style jsx>{`
        .recommend_inner {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: #e1e1e1;
          border-radius: 5px;
          overflow: hidden;
        }
        .recommend_info_1 {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .recommend_info_2 {
          width: 290px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
        }
        .bread {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          background-color: #f6f6f6;
          padding: 5px 10px 5px 10px;
          color: #51585c;
          font-size: 14px;
        }
        .content {
          width: 100%;
          padding: 10px;
          background-color: #ffffff;
        }
        h1 {
          font-weight: bold;
          font-size: 26px;
          margin: 0px 0px 15px 0px;
          border-bottom: 1px solid #eee;
        }
        strong {
          margin: 15px 0px;
        }
        a {
          margin: 15px 0px;
          display: block;
          color: #08c;
        }
      `}</style>
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
      
  }
}
  
export default connect(
  mapStateToProps,
  mapActionCreators
)(Recommend);