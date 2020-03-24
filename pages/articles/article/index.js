import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Result, Button, Comment, Popconfirm, List, message, Input, Avatar, Form, Tooltip, Pagination  } from 'antd'
import {
  LikeOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
const { TextArea } = Input;
import { url, type } from './../../../config/default'
import ReactMarkdown  from 'react-markdown'
import Router from 'next/router'

import Style from './Article.module.scss'
import { getYMDHMS, FetchPost, FetchGet } from './../../../tools'
import AcntMessage from './../../../components/hooks/acntMessage'
import Noreply from './../../../components/hooks/Noreply'
import Community from './../../../components/hooks/Community'

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows = {4} onChange = {onChange} value = {value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType = 'submit' loading = {submitting} onClick = {onSubmit} type = 'primary'>
        回复
      </Button>
    </Form.Item>
  </div>
);

const Article = props => {

  const [hasCollect, hasCollect_] = useState(props.likeCollect.hasCollect);
  const [hasLike, hasLike_] = useState(props.likeCollect.hasLike);
  const [beLike, beLike_] = useState(props.detail.data.beLike);
  const [currentPage, currentPage_] = useState(1);

  useEffect(() => {
    showComments_(comments.slice((currentPage - 1) * 10 , currentPage * 10))
  }, [currentPage])

  const Actions = val => {
    if (val.author._id !== props.acnt.data._id) {
      return [
        <span key = 'comment-basic-like'>
          <Tooltip>
            <LikeOutlined
              onClick = {
                () => {
                  beLikeClick(val.beLike.indexOf(props.acnt.data._id) !== -1, props.id, val._id)
                }
              }
              style = {val.beLike.indexOf(props.acnt.data._id) !== -1 ? {color: '#40a9ff'} : {}}
            />
          </Tooltip>
          <span className = "comment-action" style = {{fontSize: '14px'}}>&nbsp;{val.beLike.length}</span>
        </span>
      ];
    } else {
      return [
        <span key = 'comment-basic-like'>
          <Tooltip>
            <LikeOutlined
              onClick = {
                () => {
                  beLikeClick(val.beLike.indexOf(props.acnt.data._id) !== -1, props.id, val._id)
                }
              }
              style = {val.beLike.indexOf(props.acnt.data._id) !== -1 ? {color: '#40a9ff'} : {}}
            />
          </Tooltip>
          <span className="comment-action" style = {{fontSize: '14px'}}>&nbsp;{val.beLike.length}</span>
        </span>,
        <span key = 'comment-basic-delete'>
          <Popconfirm placement = 'top' title = '删除评论后不可恢复, 确定删除吗?' onConfirm = {() => {deleteComment(val._id)}} okText = '确定' cancelText = '取消'>
            <Tooltip>
              <DeleteOutlined
                style = {{color: 'red'}}
              />
            </Tooltip>
          </Popconfirm>
        </span>
      ];
    }
  }

  // 点击收藏
  const collect = () => {
    if (!hasCollect) {
      FetchPost(`article/collect`, {
        id: props.id,
      }, false)
        .then(val => {
          message.success('收藏成功!');
          hasCollect_(true);
        })
        .catch(err => {
          message.error(err.msg);
        });
    } else {
      FetchPost(`article/collectC`, {
        id: props.id,
      }, false)
        .then(val => {
          message.success('取消收藏成功!');
          hasCollect_(false);
        })
        .catch(err => {
          message.error(err.msg);
        });
    }
  }

  // 点击点赞
  const like = () => {
    if (!hasLike) {
      FetchPost(`article/articleLike`, {
        id: props.id,
      }, false)
        .then(val => {
          hasLike_(true);
          beLike_(beLike + 1);
        })
        .catch(err => {
          message.error(err.msg);
        });
    } else {
      FetchPost(`article/articleLikeC`, {
        id: props.id,
      }, false)
        .then(val => {
          hasLike_(false);
          beLike_(beLike - 1);
        })
        .catch(err => {
          message.error(err.msg);
        });
    }
  }

  // 点击编辑
  const edit = () => {
    Router.push({
      pathname: '/articles/edit/' + props.id,
      // query: {id: props.id},
    })
  }

  // 点击删除
  const delete_ = () => {
    FetchPost(`article/articleDel`, {
      id: props.id,
    }, false)
      .then(val => {
        message.success('删除成功!');
        Router.push({
          pathname: '/index',
        })
      })
      .catch(err => {
        message.error(err.msg);
      });
  }
  const [comments, comments_] = useState([]);
  const [showComments, showComments_] = useState(comments.slice((currentPage - 1) * 10 , currentPage * 10));
  useEffect(() => {
    if (props.detail.code !== 1) return;
    let objWash = [];
    props.detail.data.commentList.forEach(item => {
      objWash.push({
        _id: item._id,
        author: {
          _id: item.author._id,
        },
        acntName: item.author.acntName,
        acntAvatar: url + item.author.acntAvatar,
        comment: <p>{item.comment}</p>,
        commentTime: getYMDHMS(item.commentTime),
        actions: props.acnt.status === 1 ? Actions(item) : [],
        beLike: item.beLike,
      })
    })
    comments_(objWash);
  }, [props.acnt])

  useEffect(() => {
    if ((currentPage - 1) * 10 >= comments_.length) {
      currentPage_(currentPage - 1);
    }
    showComments_(comments.slice((currentPage - 1) * 10 , currentPage * 10))
  }, [comments])
  // 点赞评论
  const beLikeClick = (isLike, articleId, commentId) => {
    FetchPost(`article/${!isLike ? 'commentLike' : 'commentLikeC'}`, {
      articleId: articleId,
      commentId: commentId,
    }, false)
      .then(val => {
        let data = [];
        val.data.list.forEach(item => {
          data.push({
            _id: item._id,
            author: {
              _id: item.author._id,
            },
            acntName: item.author.acntName,
            acntAvatar: url + item.author.acntAvatar,
            comment: <p>{item.comment}</p>,
            commentTime: getYMDHMS(item.commentTime),
            actions: props.acnt.status === 1 ? Actions(item) : [],
            beLike: item.beLike,
          })
        })
        comments_(data);
      })
      .catch(err => {
        message.error(err.msg);
      })
  }

  const [submitting, submitting_] = useState(false);
  const [value, value_] = useState('');

  // 删除评论
  const deleteComment = id => {
    FetchPost(`article/commentDel`, {
      articleId: props.id,
      commentId: id,
    }, false)
      .then(val => {
        let data = [];
        val.data.list.forEach(item => {
          data.push({
            _id: item._id,
            author: {
              _id: item.author._id,
            },
            acntName: item.author.acntName,
            acntAvatar: url + item.author.acntAvatar,
            comment: <p>{item.comment}</p>,
            commentTime: getYMDHMS(item.commentTime),
            actions: props.acnt.status === 1 ? Actions(item) : [],
            beLike: item.beLike,
          })
        })
        comments_(data);
        message.success('删除评论成功!');
      })
      .catch(err => {
        message.error(err.msg);
      })
  }

  // 回复文章
  const handleSubmit = () => {
    if (!value) {
      message.warning('回复内容不能为空！');
      return;
    }
    submitting_(true);

    FetchPost(`article/comment`, {
      id: props.detail.data._id,
      comment: value,
    }, false)
      .then(val => {
        let data = [];
        val.data.list.forEach(item => {
          data.push({
            _id: item._id,
            author: {
              _id: item.author._id,
            },
            acntName: item.author.acntName,
            acntAvatar: url + item.author.acntAvatar,
            comment: <p>{item.comment}</p>,
            commentTime: getYMDHMS(item.commentTime),
            actions: props.acnt.status === 1 ? Actions(item) : [],
            beLike: item.beLike,
          })
        })
        comments_(data);
        value_('');
        submitting_(false);
        message.success('回复成功!');
      })
      .catch(err => {
        message.error(err.msg);
      });
  };

  const handleChange = e => {
    value_(e.target.value);
  };

  return (
    <div className = {Style.article_inner}>
      <React.Fragment>
        {
          props.detail.code === 1 &&
          <section className = {Style.article_info_1}>
            <div className = {Style.article_title}>
              <ul className = {Style.title_left}>
                <li className = {Style.left_title}>
                  <h1>{props.detail.data.title}</h1>
                </li>
                <li className = {Style.left_info}>
                  {props.detail.data.editTime === '' ? '发布于' : '编辑于'} {getYMDHMS(props.detail.data.editTime === '' ? props.detail.data.createTime:props.detail.data.editTime )}  ●  作者 {props.detail.data.author.acntName}  ●  {props.detail.data.readCount} 次浏览  ●  来自 {type[props.detail.data.type]}
                </li>
                <li className = {Style.left_desc}>
                  {props.detail.data.description}
                </li>
              </ul>
              {
                props.acnt.status === 1 &&
                <div className = {Style.title_right}>
                  <Button 
                    style = {hasCollect ? {color: '#40a9ff', borderColor: '#40a9ff'} : {}}
                    type = {hasCollect ? 'dashed' : 'default'}
                    onClick = {collect}
                  >{hasCollect ? '已收藏' : '收藏'}</Button>
                  <Button
                    style = {hasLike ? {color: '#40a9ff', borderColor: '#40a9ff'} : {}}
                    icon = {<LikeOutlined />} 
                    type = {hasLike ? 'dashed' : 'default'}
                    onClick = {like}
                  > {beLike}</Button>
                </div>
              }
            </div>
            <div className = {Style.article_content}>
              <ReactMarkdown escapeHtml = {false} source = {props.detail.data.content}/> 
            </div>
            {
              props.isAuthor && props.acnt.status === 1 &&
              <div className = {Style.article_del}>
              <Popconfirm placement = 'top' title = '删除后不可恢复, 确定删除吗?' onConfirm = {delete_} okText = '确定' cancelText = '取消'>
                <Button
                  icon = {<DeleteOutlined />} 
                  type = 'danger'
                >删除</Button>
              </Popconfirm>
                <Button
                  icon = {<EditOutlined />} 
                  type = 'default'
                  onClick = {edit}
                >编辑</Button>
              </div>
            }
            <div className = {Style.article_comment}>
              <List
                className = 'comment-list'
                header = {`${comments.length} 个回复`}
                itemLayout = 'horizontal'
                dataSource = {showComments}
                renderItem={item => (
                  <li key = {Math.random()}>
                    <Comment
                      actions = {item.actions}
                      author = {item.acntName}
                      avatar = {item.acntAvatar}
                      content = {item.comment}
                      datetime = {item.commentTime}
                    />
                  </li>
                )}
              />
              <Pagination
                total = {comments.length}
                showTotal={() => `第 ${comments.length === 0 ? 0 : currentPage} 页, 共 ${Math.ceil(comments.length / 10)} 页`}
                pageSize = {10}
                defaultCurrent = {currentPage}
                onChange = {(page, pageSize) => {
                  currentPage_(page);
                }}
                style = {{marginBottom: '10px'}}
              />
              {
                props.acnt.status === 1 &&
                <Comment
                  avatar={
                    <Avatar
                      src = {url + props.acnt.data.acntAvatar}
                      alt = {props.acnt.data.acntName}
                    />
                  }
                  content = {
                    <Editor
                      onChange = {handleChange}
                      onSubmit = {handleSubmit}
                      submitting = {submitting}
                      value = {value}
                    />
                  }
                /> 
              }
            </div>
          </section>
        }
        {
          props.detail.code !== 1 &&
          <section className = {Style.article_warn}>
            <Result
              status = '404'
              title = '404'
              subTitle = 'Sorry, the article you visited does not exist.'
            />
          </section>
        }
        {
          props.detail.code === 1 &&
          <section className = {Style.article_info_2}>
            {
              props.detail.code === 1 &&
              <React.Fragment>
                <AcntMessage 
                  title = '作者'
                  acntAvatar = { props.detail.data.author.acntAvatar }
                  acntName = { props.detail.data.author.acntName }
                  acntScore = { props.detail.data.author.acntScore }
                  acntSignature = { props.detail.data.author.acntSignature }
                />
                <Noreply 
                  title = '作者其他文章'
                  list = {props.otherComments.list}
                />
              </React.Fragment>
            }
            <Noreply 
              title = '无人回复文章'
              list = {props.noReplies.list}
            />
            <Community />
          </section>
        }
      </React.Fragment>
    </div>
  )
}

export async function getServerSideProps(context) {
  let articles;
  let cookies = context.req.headers.cookie;
  let content = '404';
  let otherComments = {
    list: [],
    total: 0,
  };
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
          msg: '请求成功！',
          data: val.data,
        }
      })
      .catch(err => {
        return {
          code: 0,
          msg: '404',
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
      otherComments = await FetchGet(`topic/otherArticle`, {
        id: context.query.id,
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
        })
    }
  }
  // 是否收藏与点赞
  const likeCollect = await FetchPost(`article/hasCollectLike`, {
    id: context.query.id,
  }, true, cookies)
    .then(val => {
      return val.data;
    })
    .catch(err => {
      return {
        hasCollect: false,
        hasLike: false,
      }
    });
  
  // 是否作者
  const isAuthor = await FetchPost(`article/isAuthor`, {
    id: context.query.id,
  }, true, cookies)
    .then(val => {
      return val.data.is;
    })
    .catch(err => {
      return false;
    });
  
  // 获取无人回复文章
  const noReplies = await FetchGet(`topic/getNoneReplies`, {
    key: 'all',
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

  return {
    props: {
      id: context.query.id == undefined ? null : context.query.id,
      detail: articles,
      otherComments: otherComments,
      noReplies: noReplies,
      likeCollect: likeCollect,
      isAuthor: isAuthor,
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
)(Article);