import Style from './Acnt.module.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Avatar, List, Tag, Empty } from 'antd'
import {
  HomeOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  UserOutlined
} from '@ant-design/icons'
import Link from 'next/link'
 
import { url } from './../../../config/default'
import { getYMDHMS } from './../../../tools'
import { FetchGet, FetchPost } from './../../../tools'
import AcntMessage from './../../../components/hooks/acntMessage'
import Community from './../../../components/hooks/community'
import Hookheader from './../../../components/contain/hookheader'

const Acnt = props => {
  const [data, data_] = useState([props.data.record.createList, props.data.record.collectList, props.data.record.involeList])

  const openURL = url => {
    if (url === '') return;
    window.open(url);
  }
  
  const articleType = type => {
    switch(type) {
      case 1:
        return '精华';
      case 2:
        return '分享';
      case 3:
        return '问答';
      case 4:
        return '招聘';
      case 5:
        return '测试';
    }
  }

  return (
    <div  className = {Style.acnt_inner}>
      <section className = {Style.acnt_info_1}>
        <section className = {Style.info_part_1}>
          <div className = {Style.part_1_title}>
            <Breadcrumb>
                <Breadcrumb.Item href = '/'>
                    <HomeOutlined />
                    <span>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <UserOutlined />
                    <span>{props.acntName}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {
            props.data !== null &&
            <ul className = {Style.part_1_content}>
              <li>
                <Avatar shape = 'square' size = 'large' src = {url + props.data.acnt.acntAvatar} />
                <span className = {Style.part_1_name}>{props.data.acnt.acntName}</span>
              </li>
              <li>
                {props.data.acnt.acntScore} 积分
              </li>
              <li>
                <HomeOutlined />
                <a 
                  className = {Style.part_1_link}
                  onClick = {() => {
                      openURL(props.data.acnt.acntBlog)
                  }}
                  > {props.data.acnt.acntBlog === '' ? '暂无主页' : props.data.acnt.acntBlog}</a>
              </li>
              <li>
                <EnvironmentOutlined />
                <a 
                  className = {Style.part_1_link}
                > {props.data.acnt.acntAddress === '' ? '火星' : props.data.acnt.acntAddress}</a>
              </li>
              <li>
                <GithubOutlined />
                <a 
                  className = {Style.part_1_link}
                  onClick = {() => {
                    openURL(props.data.acnt.acntGithub)
                  }}
                > {props.data.acnt.acntGithub === '' ? '暂无' : props.data.acnt.acntGithub}</a>
              </li>
              <li>
                <span className = {Style.part_1_regtime}>注册于 {getYMDHMS(props.data.acnt.acntRegisterTime)}</span>
              </li>
            </ul>
          }
          {
            props.data === null &&
            <Empty 
              image = {Empty.PRESENTED_IMAGE_SIMPLE} 
              description = {`${props.acntName} 同学不存在`} 
            />
          }
        </section>
        {
          data.map((item_, index) => (
            <section className = {Style.info_part_2} key = {index} >
              <Hookheader 
                title = {(() => {
                  if (index === 0) {
                    return '最近创建的文章'
                  }
                  if (index === 1) {
                    return '最近收藏的文章'
                  }
                  if (index === 2) {
                    return '最近参与的文章'
                  }
                  return ''
                })()}
              />
              <div className = {Style.part_n_content}>
                <List
                  pagination = {{
                    pageSize: 5,
                    size: 'small',
                  }}
                  dataSource = {item_}
                  renderItem = {item => (
                    <List.Item>
                      <div className = {Style.articleItem}>
                        <Link
                          as = {`/acnts/acnt/${item.author.acntName}`}
                          href = {{pathname: '/acnts/acnt', query: { user: item.author.acntName}}}
                        >
                          <Avatar 
                            shape = 'square' size = 'small' src = {url + item.author.acntAvatar} alt = {item.author.acntName} 
                          />
                        </Link>
                        <span className = {Style.item_count}>
                          <span className = {Style.item_read_count}>{item.commentCount}/</span>
                          <span className = {Style.item_comment_count}>{item.readCount}</span>
                        </span>
                        <Tag color = '#87d068'> {articleType(item.type)} </Tag>
                        <span className = {Style.item_title} >
                          <Link
                            as = {`/articles/article/${item._id}`}
                            href={{pathname: '/articles/article', query: {id: item._id}}}>
                            <a>{item.title}</a>
                          </Link>
                        </span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </section>
          ))
        }
      </section>
      <section className = {Style.acnt_info_2}>
        {
          props.data !== null &&
          <AcntMessage 
            acntAvatar = {props.data.acnt.acntAvatar}
            acntName = {props.data.acnt.acntName}
            acntScore = {props.data.acnt.acntScore}
            acntSignature = {props.data.acnt.acntSignature}
          />
        }
        <Community />
      </section>                       
    </div>
  )
}

export async function getServerSideProps(context) {
  const data_ = await FetchPost('acnt/acntMessage', {
    acntName: context.query.user,
  }, true, '')
    .then(val => {
      return val.data;
    })
    .catch(err => {
      return null;
    })
  return {
    props: {
      acntName: context.query.user,
      data: data_,
    }
  }
}

const mapStateToProps = state => {
  return {
    acnt: state.userReducer,
  }
}
  
const mapActionCreators = dispatch => {
  return {}
}

  
export default connect(
  mapStateToProps,
  mapActionCreators
)(Acnt);

