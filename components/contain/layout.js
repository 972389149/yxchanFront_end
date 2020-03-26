import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { message } from 'antd'
import {
  GithubOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FetchPost, FetchGet } from './../../tools'
import { loginout, check } from './../../redux/actions'
import Error_ from './../hooks/error'

const tab = [
  {
    area: '首页',
    router: '/index',
  }, {
    area: '推荐',
    router: '/others/recommend',
  }, {
    area: '性能',
    router: '/others/expose',
  }
]

const Layout = props => {
  const [isNet, isNet_] = useState(true);
  const [status, status_] = useState(props.acnt.status);
  /* 判断网络状态 */
  useEffect(() => {
    FetchGet(`other/checkNet`, {})
      .then(val => {
        isNet_(true);
      })
      .catch(err => {
        isNet_(false);
      })
  }, [])

  /* 判断页面是否登录，登录了就初始化状态 */
  const [navList, navList_] = useState(tab)
  useEffect(() => {
    if (status === 1) return;
    FetchPost(`acnt/getAcntInfo`, {}, false)
      .then(val => {
        status_(1);
        props.checkIn({
          status: 1,
          data: val.data,
        });
        navList_(tab.concat([{
            area: '消息',
            router: '/acnts/message',
          }, {
            area: '设置',
            router: '/acnts/setting',
          }, {
            area: '退出',
            router: '/',
          }
        ]))
      })
      .catch(err => {
        status_(0);
        props.checkIn({
          status: 0,
          data: {},
        });
      });
  }, [])

  useEffect(() => {
    if (props.acnt.status !== 1) {
      navList_(tab);
    } else {
      navList_(tab.concat([{
          area: '消息',
          router: '/acnts/message',
        }, {
          area: '设置',
          router: '/acnts/setting',
        }, {
          area: '退出',
          router: '/',
        }
      ]))
    }
  }, [props.acnt.status])

  // 导航点击
  const navClick = navItem => {
    if (navItem.area === '退出') {
      FetchPost(`acnt/loginout`, {}, false)
        .then(val => {
          props.loginOut();
          navList_(tab);
          status_(0);
          message.success(val.msg);
        }).catch(err => {
          message.error(err.msg);
        });
      return;
    }

    if (navItem.area === '消息') {
      Router.push(`${navItem.router}`);
      return;
    }

    if (navItem.area === '设置') {
      Router.push(`${navItem.router}`);
      return;
    }
    Router.push(`${navItem.router}`);
  }

  const { Component, pageProps, store } = props;
  const specialComp = ['Connect(Setting)', 'Connect(Message)', 'Connect(Create)'];
  return (
    <React.Fragment>
      <Head>
        <title>中文社区</title>
        <meta name = 'viewport' content = 'initial-scale=1.0, width=device-width' />
      </Head>
      <section className = 'public_header'>
          <div className = 'header_inner'>
            {
              <img
                className = 'header_logo'
                src = '/images/logo.png'
                onClick = {
                  () => {
                    Router.push({
                      pathname: '/',
                    })
                  }
                }
              />
            }
            <ul className = 'header_nav'>
              {
                navList.map(item => (
                  <li key = {item.area} className = 'header_nav_item' onClick = {() => navClick(item)}>
                    <a className = 'header_nav_item_a'>{ item.area }</a>
                  </li>
                ))
              }
            </ul>
          </div>
      </section>
      <section className = 'public_box'>
        <div className = 'box_inner'>
          {
            isNet &&  <Component {...pageProps}/>
          }
          {
            !isNet && <Error_ />
          }
        </div>
      </section>
      <section className = 'public_footer'>
          <div className = 'footer_inner'>
            <b>源码地址</b>
            <div className = 'github'>
              <GithubOutlined />
              <span 
                className = 'githubHref footer_text'
                onClick = {
                  () => {
                    window.open('https://github.com/972389149/yxchanFront_end.git')
                  }
                }
              >{'https://github.com/972389149/yxchanFront_end.git'}</span>
              <span className = 'footer_text'>{'(前端)'}</span>
            </div>
            <b>介绍</b>
            <div className = 'github'>
              <span className = 'footer_text'>前端为 <b>React - SSR</b> 项目, 使用 <b>Next.js</b> 前后端同构、<b>Redux - Saga</b> 状态管理、<b>Antd</b> 等...</span>
            </div>
            <div className = 'github'>
              <span className = 'footer_text'>后台为 <b>Node.js - Express</b> 项目, 数据库使用 <b>MongoDB</b></span>
            </div>
          </div>
        </section>
      <style global jsx>{`
        body {
          width: 100%;
          min-height: 100%;
          padding: 0px;
          margin: 0px;
          background-color: #e1e1e1;
          color: #333;
        }
        .public_header {
          width: 100%;
          min-width: 800px;
          height: 50px;
          background: #444;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header_inner {
          height: 40px;
          width: 90%;
          margin: 0px 5% 0px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header_logo {
          height: 28px;
          cursor: pointer;
        }
        .header_nav {
          display: flex;
          flex-direction: row;
          margin: 0px;
          padding: 0px;
        }
        .header_nav_item {
          width: 56px;
          height: 24px;
          list-style: none;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
        }
        .header_nav_item_a {
          text-shadow: none;
          color: #ccc;
          list-style: none;
          text-decoration: none;
          font-size: 13px;
        }
        .header_nav_item_a:hover {
          color: #fff;
        }
        .footer_text {
          color: #ababab;
          margin: 0px 5px 0px 5px;
        }
        .public_footer {
          width: 100%;
          min-width: 800px;
          height: 190px;
          background: #fff;
        }
        .footer_inner {
          height: 190px;
          width: 90%;
          margin: 15px 5% 0px 5%;
          padding: 10px 0 10px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .github {
          display: flex;
          height: 20px;
          align-items: center;
        }
        .githubHref {
          cursor: pointer;
        }
        .public_box {
          width: 100%;
          min-height: calc(100vh - 50px - 205px);
        }
        .box_inner {
          width: 90%;
          margin: 10px 5% 10px 5%;
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
    loginOut: bindActionCreators(loginout, dispatch),
    checkIn: bindActionCreators(check, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapActionCreators
)(Layout);
