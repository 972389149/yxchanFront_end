import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, List, Typography, Pagination } from 'antd'
import Link from 'next/link'
import {
  HomeOutlined
} from '@ant-design/icons'

import Style from './Message.module.scss'
import { FetchPost } from './../../../tools'
import AcntMessage from './../../../components/hooks/acntMessage'
import Community from './../../../components/hooks/community'
import Authorized from './../../../components/hooks/authorized'

const Message = props => {

  const [readCurrent, readCurrent_] = useState(1);
  const [unReadCurrent, unReadCurrent_] = useState(1);

  const [readL, readL_] = useState(props.readL);
  const [showRead, showRead_] = useState([]);
  const [unReadL, unReadL_] = useState(props.unReadL);
  const [showunRead, showunRead_] = useState([]);

  useEffect(() => {
    showRead_(readL.slice((readCurrent - 1) * 10 , readCurrent * 10));
  }, [readL, readCurrent])

  useEffect(() => {
    showunRead_(unReadL.slice((unReadCurrent - 1) * 10 , unReadCurrent * 10));
  }, [unReadL, unReadCurrent])

  const content_ = item => {
    if (item.messageType === 1) {
      return (
        <span >
          &nbsp;你的&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article' + item.articleId}}
          >
            <a>{item.title}</a>
          </Link>
          &nbsp;收到新的评论
        </span>
      )
    } else if (item.messageType === 2) {
      return (
        <span >
          &nbsp;你的&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article', query: {id: item.articleId}}}>
            <a>{item.title}</a>
          </Link>
          &nbsp;收获一个赞
        </span>
      )
    } else if (item.messageType === 3) {
      return (
        <span >
          &nbsp;你的&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article/' + item.articleId}}
          >
            <a>{item.title}</a>
          </Link>
          &nbsp;被其他用户收藏了
        </span>
      )
    } else if (item.messageType === 4) {
      return (
        <span >
          &nbsp;你在&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article/' + item.articleId}}
          >
            <a>{item.title}</a>
          </Link>
          &nbsp;中的评论被点赞了
        </span>
      )
    } else if (item.messageType === 5) {
      return (
        <span >
          &nbsp;你收藏的&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article/' + item.articleId}}
          >
            <a>{item.title}</a>
          </Link>
          &nbsp;有新的动态
        </span>
      )
    } else if (item.messageType === 6) {
      return (
        <span >
          &nbsp;你收藏的&nbsp;
          <Link
            as = {`/articles/article/${item.articleId}`}
            href={{pathname: '/articles/article/' + item.articleId}}
          >
            <a>{item.title}</a>
          </Link>
          &nbsp;更新了
        </span>
      )
    }
  }  
  
  if (props.acnt.status !== 1) {
    return (
      <Authorized />
    )
  }

  return (
    <div className = {Style.message_inner}>
      <section className = {Style.message_info_1}>
        <section className = {Style.message_part_1}>
          <div className = {Style.part_title}>
            <Breadcrumb>
              <Breadcrumb.Item href = '/'>
                <HomeOutlined />
                <span>首页</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>消息</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>未读</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className = {Style.part_content}>
            <List
              dataSource = {showunRead}
              renderItem = {item => (
                <List.Item
                  style = {{
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography.Text mark>
                    {
                      (() => {
                        if ([1, 4, 5].indexOf(item.messageType) === -1) {
                          return '[评论动态]'
                        } else {
                          return '[文章动态]'
                        }
                      })()
                    }
                  </Typography.Text>
                  {
                    content_(item)
                  }
                </List.Item>
              )}
            />
            <Pagination
              style = {{marginTop: '10px'}}
              total={unReadL.length}
              showTotal={() => `第 ${unReadL.length === 0 ? 0 : unReadCurrent} 页, 共 ${Math.ceil(unReadL.length / 10)} 页`}
              pageSize = {10}
              defaultCurrent = {unReadCurrent}
              onChange = {(page, pageSize) => {
                unReadCurrent_(page);
              }}
            />
          </div>
        </section>
        <section className = {Style.message_part_2}>
          <div className = {Style.part_title}>
            <Breadcrumb>
              <Breadcrumb.Item href = '/'>
                <HomeOutlined />
                <span>首页</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>消息</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>已读</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className = {Style.part_content}>
            <List
              dataSource={showRead}
              renderItem={item => (
                <List.Item
                  style = {{
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography.Text mark>
                    {
                      (() => {
                        if ([1, 4, 5].indexOf(item.messageType) === -1) {
                          return '[评论动态]'
                        } else {
                          return '[文章动态]'
                        }
                      })()
                    }
                  </Typography.Text>
                  {
                    content_(item)
                  }
                </List.Item>
              )}
            />
            <Pagination
              style = {{marginTop: '10px'}}
              total={readL.length}
              showTotal={() => `第 ${readL.length === 0 ? 0 : readCurrent} 页, 共 ${Math.ceil(readL.length / 10)} 页`}
              pageSize = {10}
              defaultCurrent = {readCurrent}
              onChange = {(page, pageSize) => {
                readCurrent_(page);
              }}
            />
          </div>
        </section>
      </section>
      <section className = {Style.message_info_2}>
        <AcntMessage 
          title = '个人信息'
          acntAvatar = { props.acnt.data.acntAvatar }
          acntName = { props.acnt.data.acntName }
          acntScore = { props.acnt.data.acntScore }
          acntSignature = { props.acnt.data.acntSignature }
        />
        <Community />
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let cookies = context.req.headers.cookie;
  const data = await FetchPost(`acntMessage/getMessage`, {}, true, cookies)
    .then(val => {
      return val.data;
    })
    .catch(err => {
      return {
        read: [],
        unRead: [],
      }
    })
  return {
    props: {
      readL: data.read,
      unReadL: data.unRead,
    }
  }
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
)(Message);
