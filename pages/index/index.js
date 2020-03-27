import React, { useState } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Menu, List, Avatar, Pagination } from 'antd'
import {
  LikeOutlined,
  EyeOutlined,
  StarOutlined,
  MessageOutlined
} from '@ant-design/icons'

import { getYMDHMS } from './../../tools'
import Style from './Index.module.scss'
import { FetchGet, FetchPost } from './../../tools'
import { pageSize, url } from './../../config/default'

import AcntMessage from './../../components/hooks/acntMessage'
import Createarticle from './../../components/hooks/createarticle'
import Noreply from './../../components/hooks/noreply'
import Scorerank from './../../components/hooks/scoreRank'
import Community from './../../components/hooks/community'
import Introduce from './../../components/hooks/introduce'

const IconText = ({ type, text }) => {
  switch(type) {
    case 'like-o':
      return (
        <span>
          <LikeOutlined style={{ marginRight: 8 }}/>
          {text}
        </span>
      )
    case 'eye':
      return (
        <span>
          <EyeOutlined style={{ marginRight: 8 }}/>
          {text}
        </span>
      )
    case 'star-o':
      return (
        <span>
          <StarOutlined style={{ marginRight: 8 }}/>
          {text}
        </span>
      )
    case 'message':
      return (
        <span>
          <MessageOutlined style={{ marginRight: 8 }}/>
          {text}
        </span>
      )
  }
}

const Index = props => {

  const [current, changeCurrent] = useState(props.topicKey);
  const handleClick = e => {
    changeCurrent(e.key)
      Router.push({
        pathname: '/',
        query: {topic: e.key}
      })
  }

  const pageChange = index => {
    Router.push({
      pathname: '/',
      query: {topic: props.topicKey, page: index}
    })
  }

  const findDesc = type => {
    let result;
    props.topicList.forEach(item => {
      if (item.type === type) {
        result = item.desc;
      }
    })
    return result;
  }

  return (
    <div className = {Style.index_inner}>
      <section className = {Style.article_list}>
        <div className = {Style.topic_nav}>
        {
          current !== null &&
          <Menu
            onClick = {handleClick}
            selectedKeys = {[current]}
            mode = 'horizontal'
            style = {{
              height: '40px',
              lineHeight: '40px',
              backgroundColor: '#6f6f6',
            }}
          >
            {
              props.topicList.map(item => (
                <Menu.Item
                  key = {item.key}
                  style = {{
                    height: '40px',
                  }}
                >
                  {item.desc}
                </Menu.Item>
              ))
              }
          </Menu>
        }
        </div>
        <div className = {Style.index_list}>
          {
            <List
              itemLayout = 'vertical'
              size = 'small'
              dataSource = {props.articleList}
              footer = {
                <div>
                  当前第 <b>{parseInt(props.articleList.length === 0 ? 0 : props.pageIndex)}</b> 页, 共 <b>{Math.ceil(props.total / pageSize)}</b> 页
                </div>
              }
              renderItem = {item => (
                  <List.Item
                    key = {item.title}
                    actions = {[
                      <IconText type = 'eye' text = {item.readCount} key = 'list-vertical-view' />,
                      <IconText type = 'star-o' text = {item.collectList} key = 'list-vertical-star-o' />,
                      <IconText type = 'like-o' text = {item.beLike} key = 'list-vertical-like-o' />,
                      <IconText type = 'message' text = {item.commentList} key = 'list-vertical-message' />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar = {
                        <Link
                          as = {`/acnts/acnt/${item.author.acntName}`}
                          href = {{pathname: '/acnts/acnt', query: { user: item.author.acntName}}}
                        >
                          <Avatar src = {url + item.author.acntAvatar} />
                        </Link>
                      }
                      title = {
                        <Link
                          as = {`/articles/article/${item._id}`}
                          href={{pathname: '/articles/article', query: { id: item._id}}}
                        >
                          <a>{item.title}</a>
                        </Link>
                      }
                      description = {`
                        发布于 ${getYMDHMS(Number(item.createTime))}  ●  作者 ${item.author.acntName}${current === props.topicList[0].key ? '  ●  来自 ' + findDesc(item.type) : ''}
                      `}
                    />
                    {item.description}
                </List.Item>
              )}
            />
          }
          <Pagination 
            defaultCurrent = {parseInt(props.pageIndex)}
            pageSize = {parseInt(pageSize)}
            total = { parseInt(props.total) } 
            hideOnSinglePage = {false}
            onChange = {pageChange}
          />
        </div>
      </section>
      <section className = {Style.acnt_list}>
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
            <Createarticle />
          </React.Fragment>
        }
        {
          props.acnt.status === 0 &&
          <Introduce />
        }
        <Noreply 
          title = '无人回复的文章'
          list = { props.noReplies }
        />
        <Scorerank list = { props.scoreRank }/>
        <Community />
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  // 获取topic列表 
  const topicData = await FetchGet(`topic/getAllTopics`, {})
    .then(val => {
      return {
        list: val.data.list,
      }
    }).catch(err => {
      return {
        list: [],
      }
    });
  const topicSelect = topicData.list.filter(item => {
    return item.key === context.query.topic;
  })
  const topicOnly = topicSelect.length === 1 ? topicSelect[0] : topicData.list[0] !== undefined ? topicData.list[0] : null;

  let pageIndex;
  if (context.query.page === undefined) {
    pageIndex = 1;
  } else {
    if (context.query.page === '') {
      pageIndex = 1;
    }else {
      pageIndex = Number(context.query.page);
      if (isNaN(pageIndex)) {
        pageIndex = 1;
      }else if(pageIndex > Math.ceil(topicOnly.total / pageSize)) {
        pageIndex = Math.ceil(topicOnly.total / pageSize);
      }
    }
  }

  // 获取topic下文章列表
  const articles = await FetchGet(`topic/getTopicArticles`, {
    key: topicOnly === null ? null : topicOnly.key,
    page: pageIndex,
    pageSize: pageSize,
  })
    .then(val => {
      return {
        list: val.data.list,
        total: val.data.total,
      }
    })
    .catch(err => {
      return {
        list: [],
        total: 0,
      }
    });
  
    // 获取该topic下无人回复文章
  const noReplies = await FetchGet(`topic/getNoneReplies`, {
    key: topicOnly === null ? null : topicOnly.key,
  })
    .then(val => {
      return {
        list: val.data.list,
        total: val.data.total,
      }
    })
    .catch(err => {
      return {
        list: [],
        total: 0,
      }
    });

  // 获取积分排行榜
  const scoreRank = await FetchPost(`acnt/getScoreRank`, {}, true, '')
    .then(val => {
      return {
        list: val.data.list,
      }
    })
    .catch(err => {
      return {
        list: [],
      }
    });

  return {
    props: {
      topicList: topicData.list,
      topicKey: topicOnly === null ? null : topicOnly.key,
      articleList: articles.list,
      total: articles.total,
      pageIndex: pageIndex,
      noReplies: noReplies.list,
      scoreRank: scoreRank.list,
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
)(Index);