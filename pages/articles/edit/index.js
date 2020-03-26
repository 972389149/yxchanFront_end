import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Input, Button, message, Result } from 'antd'
import {
  HomeOutlined
} from '@ant-design/icons'
import Router from 'next/router'

import Style from './Edit.module.scss'
import { FetchPost } from './../../../tools'
import Guild from './../../../components/hooks/guild'
import Markdown from './../../../components/hooks/markdown'

const Editor_ = dynamic(import('./../../../components/hooks/editor'), {
  ssr: false
})
const list = ['精华', '分享', '问答', '招聘', '测试'];

const Edit = props => {

  const [hasEdit, hasEdit_] = useState(false);

  const [article, article_] = useState({
    description: props.details.data.description,
    content: props.details.data.content,
  })
  
  const handleContent = val => {
    article_({
      ...article,
      content: val,
    })
  }


  const [loading, loading_] = useState(false);
  // 编辑文章
  const submit = () => {
    const check = [article.description, article.content];
    if (check.indexOf('') !== -1) {
      message.error('文章不完整！');
      return ;
    }
    if ((article.description === props.details.data.description) && (article.content === props.details.data.content)) {
      message.error('文章未更改！');
      return ;
    }
    loading_(true)
    FetchPost(`article/edit`, {
      ...article,
      id: props.id,
    }, false)
      .then(val => {
        message.success('编辑成功！');
        loading_(false);
        hasEdit_(true);
    }).catch(err => {
      message.error(err.msg);
      loading_(false);
    })
  }

  return (
    <div className = {Style.edit_inner}>
      {
        props.details.code === 1 && !hasEdit &&
        <React.Fragment>
          <section className = {Style.edit_info_1}>
            <section className = {Style.title}>
              <Breadcrumb>
                <Breadcrumb.Item href = '/'>
                  <HomeOutlined />
                  <span>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>编辑文章</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </section>
            <section className = {Style.topicIntro, Style.sections}>
              <div className = {Style.subTitle}>文章板块: </div>
              <b>{list[props.details.data.type - 1]}</b>
            </section>
            <section className = {Style.titleIntro, Style.sections}>
              <div className = {Style.subTitle}>文章标题: </div>
              <b>{props.details.data.title}</b>
            </section>
            <section className = {Style.descInput, Style.sections}>
              <div className = {Style.subTitle}>内容概要: </div>
              <div className = {Style.subInput}>
                <Input 
                  maxLength = {50} 
                  placeholder = '一句话概括文章的主要内容...'
                  value = {article.description}
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
                  /* v0.0.9 */
                  undo: true, // 撤销
                  redo: true, // 重做
                  save: false, // 保存
                  /* v0.2.3 */
                  subfield: true, // 单双栏模式
                }} 
              />
            </section>
            <section className = {Style.sections}> 
              <Button
                type="primary"
                loading = {loading}
                onClick = {submit}
              >完成编辑</Button>
            </section>
          </section>
        </React.Fragment>
      }
      {
        props.details.code !== 1 && !hasEdit &&
        <section className = {Style.edit_warn}>
          <Result
            status = '404'
            title = '404'
            subTitle = 'Sorry, this article you visited does not exist.'
          />
        </section>
      }
      {
        hasEdit &&
        <section className = {Style.edit_warn}>
          <Result
            status = "success"
            title = "编辑成功!"
          />
        </section>
      }
      {
        props.details.code === 1 && !hasEdit &&
        <section className = {Style.edit_info_2}>
          <Markdown />
          <Guild />
        </section>
      }
    </div>
  )
}
export async function getServerSideProps(context) {
  let articles;
  let content;
  if (context.query.id === undefined) {
    articles = {
      code: 0,
      msg: '404',
      data: {},
    }
  } else {
    // 获取文章详情
    articles = await FetchPost(`article/articleDetail`, {
        id: context.query.id,
    }, true, '')
      .then(val => {
        return {
          code: 1,
          msg: '查询成功',
          data: val.data,
        }
      })
      .catch(err => {
        return {
          code: 0,
          msg: err.msg,
          data: {},
        }
      });
    if (articles.code === 1) {
        content = await FetchPost(`article/downloadMD`, {
          pathname: articles.data.content
        }, true, '')
          .then(val => {
            return val.data;
          })
          .catch(err => {
            return '404'
          })
        articles = {
          ...articles,
          data: {
            ...articles.data,
            content: content,
          }
        }
      }
  }
  return {
    props: {
      details: articles,
      id: context.query.id === undefined ? null : context.query.id,
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
)(Edit);
