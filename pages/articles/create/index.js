import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Select, Input, Button, message, Result } from 'antd'
import {
  HomeOutlined
} from '@ant-design/icons'
const { Option } = Select
import Router from 'next/router'

import Style from './Create.module.scss'
import Guild from './../../../components/hooks/guild'
import Markdown from './../../../components/hooks/markdown'
import { FetchGet, FetchPost } from './../../../tools'
import Authorized from './../../../components/hooks/authorized'

const Editor_ = dynamic(import('./../../../components/hooks/editor'), {
  ssr: false
})

const Create = props => {
  
  const [topics, topics_] = useState([]);
  const [article, article_] = useState({});
  useEffect(() => {
    FetchGet(`topic/getAllTopics`, {})
      .then(val => {
        topics_(val.data.list.slice(1, val.data.list.length))
        article_({
          key: val.data.list.slice(1, val.data.list.length)[0] === undefined ? '' : val.data.list.slice(1, val.data.list.length)[0].key,
          title: '',
          description: '',
          content: '',
        })
      }).catch(err => {
        article_({
          key: '',
          title: '',
          description: '',
          content: '',
        })
      });
  }, [])

  const [hasPub, hasPub_] = useState(false);

  // 类型选择
  const handleChange = val => {
    article_({
      ...article,
      key: val,
    })
  }
  
  const handleContent = val => {
    article_({
      ...article,
      content: val,
    })
  }

  const [loading, loading_] = useState(false);
  // 发布文章
  const submit = () => {
    const check = [article.title, article.description, article.content]
    if (check.indexOf('') !== -1) {
      message.warning('文章不完整!');
      return ;
    }
    loading_(true)
    FetchPost(`article/publish`, article, false)
    .then(val => {
      loading_(false);
      hasPub_(true);
      setTimeout(() => {
        Router.push({
          pathname: '/articles/article/' + val.data.articleId,
        })
      }, 1000)
    }).catch(err => {
      message.error(err);
      loading_(false)
    })
  }

  if (props.acnt.status !== 1) {
    return (
      <Authorized />
    )
  }

  return (
    <div className = {Style.create_inner}>
      {
        !hasPub &&
        <React.Fragment>
          <section className = {Style.create_info_1}>
            <section className = {Style.title}>
              <Breadcrumb>
                <Breadcrumb.Item href = '/'>
                  <HomeOutlined />
                  <span>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>发布文章</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </section>
            <section className = {Style.topicInput, Style.sections}>
              <div className = {Style.subTitle}>选择板块: </div>
              {
                topics.length !== 0 &&
                <Select defaultValue = {topics[0].key} style={{ width: 200 }} onChange={handleChange}>
                  {
                    topics.map(item => (
                      <Option key = {item.key} value = {item.key} style={{ width: 200 }}>{item.desc}</Option>
                    ))
                  }
                </Select>
              }
            </section>
            <section className = {Style.titleInput, Style.sections}>
              <div className = {Style.subTitle}>标题: </div>
              <div className = {Style.subInput}>
                <Input 
                  maxLength = {20}
                  placeholder = '字数20字以下'
                  onChange = {event => {
                    article_({
                      ...article,
                      title: event.target.value,
                    })
                  }}
                />
              </div>
            </section>
            <section className = {Style.descInput, Style.sections}>
              <div className = {Style.subTitle}>内容概要: </div>
              <div className = {Style.subInput}>
                <Input 
                  maxLength = {50} 
                  placeholder = '一句话概括文章的主要内容...'
                  onChange = {event => {
                    article_({
                      ...article,
                      description: event.target.value,
                    })
                  }}
                />
              </div>
            </section>
            <section  className = {Style.editorInput}>
              <Editor_ 
                handle = {handleContent} 
                value = {article.content}
                height = '600px'
                toolbar = {{
                  h1: true, // h1
                  h2: true, // h2
                  h3: true, // h3
                  h4: true, // h4
                  img: true, // 图片
                  link: true, // 链接
                  code: true, // 代码块
                  preview: true, // 预览
                  expand: true, // 全屏
                  undo: true, // 撤销
                  redo: true, // 重做
                  save: false, // 保存
                  subfield: true, // 单双栏模式
                }} 
              />
            </section>
            <section className = {Style.sections}> 
              <Button
                type = "primary"
                loading = {loading}
                onClick = {submit}
              >发布文章</Button>
            </section>
          </section>
        </React.Fragment>
      }
      {
        hasPub &&
        <section className = {Style.create_warn}>
          <Result
            status = "success"
            title = "文章发布成功!"
          />
        </section>
      }
      <section className = {Style.create_info_2}>
        <Markdown />
        <Guild />
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
  return {}
}
  
export default connect(
  mapStateToProps,
  mapActionCreators
)(Create);
