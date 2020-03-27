import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { FetchGet } from './../../../tools'
const Expose = props => {

  // 请求时间展示数据
  const [reqshow, reqshow_] = useState({
    index: new Array(11).fill(0),
    article: new Array(11).fill(0),
    acnt: new Array(11).fill(0),
  })
  useEffect(() => {
    let req_ = {
      index: [],
      article: [],
      acnt: [],
    };
    props.Index.forEach(item => {
      req_.index.push(item.request);
    });
    props.Article.forEach(item => {
      req_.article.push(item.request);
    });
    props.Acnt.forEach(item => {
      req_.acnt.push(item.request);
    });
    let req_show = {
      index: new Array(11).fill(0),
      article: new Array(11).fill(0),
      acnt: new Array(11).fill(0),
    }
    Object.keys(req_).forEach(key => {
      req_[key].forEach(item => {
        let index_ = item * 1000 - 1 > 10 ? 10 : item * 1000 - 1;
        req_show[key][index_] = req_show[key][index_] + 1;
      })
    })
    reqshow_(req_show);
  }, [props])

  // 首屏时间展示数据
  const [fsshow, fsshow_] = useState({
    index: new Array(11).fill(0),
    article: new Array(11).fill(0),
    acnt: new Array(11).fill(0),
  })
  useEffect(() => {
    let req_ = {
      index: [],
      article: [],
      acnt: [],
    };
    props.Index.forEach(item => {
      req_.index.push(item.firstScreen);
    });
    props.Article.forEach(item => {
      req_.article.push(item.firstScreen);
    });
    props.Acnt.forEach(item => {
      req_.acnt.push(item.firstScreen);
    });
    let req_show = {
      index: new Array(11).fill(0),
      article: new Array(11).fill(0),
      acnt: new Array(11).fill(0),
    }
    Object.keys(req_).forEach(key => {
      req_[key].forEach(item => {
        let index_ = Math.round(item * 10 - 1 > 10 ? 10 : item * 10 - 1);
        req_show[key][index_] = req_show[key][index_] + 1;
      })
    })
    fsshow_(req_show);
  }, [props])

  // 加载完成时间展示数据
  const [loadshow, loadshow_] = useState({
    index: new Array(11).fill(0),
    article: new Array(11).fill(0),
    acnt: new Array(11).fill(0),
  })
  useEffect(() => {
    let req_ = {
      index: [],
      article: [],
      acnt: [],
    };
    props.Index.forEach(item => {
      req_.index.push(item.onload);
    });
    props.Article.forEach(item => {
      req_.article.push(item.onload);
    });
    props.Acnt.forEach(item => {
      req_.acnt.push(item.onload);
    });
    let req_show = {
      index: new Array(11).fill(0),
      article: new Array(11).fill(0),
      acnt: new Array(11).fill(0),
    }
    Object.keys(req_).forEach(key => {
      req_[key].forEach(item => {
        let index_ = Math.round(item - 1 > 10 ? 10 : item  - 1);
        req_show[key][index_] = req_show[key][index_] + 1;
      })
    })
    loadshow_(req_show);
  }, [props])

  return (
    <React.Fragment>
      <div className = 'expose_inner'>
        <div className = 'expose_introduce'>
          <h3>页面性能统计</h3>
          <p>取三个访问量最大的页面 - "首页"、"文章详情页"、"用户详情页" 进行性能统计</p>
          <p>对页面进行三个维度的性能测量、绘制成表格，直观地反映出页面性能</p>
          <p className = 'turnLeft'>timing的整体结构如下图所示：</p>
          <img src = './../images/demo.png' />
          <p className = 'turnLeft'>请求耗时：responseEnd - responseStart</p>
          <p className = 'turnLeft'>白屏时间：responseStart - fetchStart</p>
          <p className = 'turnLeft'>加载完成耗时：loadEventEnd - fetchStart</p>
        </div>
        <section>
          <ReactEcharts
            option={{
              title: {
                  text: '请求耗时',
                  subtext: 'responseEnd - responseStart',
                  x: 'center',
                  y: 'top',
              },
              tooltip: {},
              legend: {
                data: ['首页', '文章详情页', '用户详情页'],
                x:'right',
              },
              xAxis: {
                name: '秒',
                data: ["≤0.001","≤0.002","≤0.003","≤0.004","≤0.005", "≤0.006", "≤0.007", "≤0.008", "≤0.009", "≤0.01", "...≥0.01"]
              },
              yAxis: {
                name: '访问量'
              },
              series: [{
                name: '首页',
                type: 'line',
                smooth: true,
                data: reqshow.index,
              }, {
                name: '文章详情页',
                type: 'line',
                smooth: true,
                data: reqshow.article,
              }, {
                name: '用户详情页',
                type: 'line',
                smooth: true,
                data: reqshow.acnt,
              }]
            }}
          />
        </section>
        <section>
          <ReactEcharts
            option={{
              title: {
                text: '白屏时间',
                subtext: 'responseStart - fetchStart',
                x: 'center',
                y: 'top',
              },
              tooltip: {},
              legend: {
                data: ['首页', '文章详情页', '用户详情页'],
                x:'right',
              },
              xAxis: {
                name: '秒',
                data: ["≤0.1","≤0.2","≤0.3","≤0.4","≤0.5", "≤0.6", "≤0.7", "≤0.8", "≤0.9", "≤1", "...≥1"]
              },
              yAxis: {
                name: '访问量',
              },
              series: [{
                name: '首页',
                type: 'line',
                smooth: true,
                data: fsshow.index,
              }, {
                name: '文章详情页',
                type: 'line',
                smooth: true,
                data: fsshow.article,
              }, {
                name: '用户详情页',
                type: 'line',
                smooth: true,
                data: fsshow.acnt,
              }]
            }}
          />
        </section>
        <section>
          <ReactEcharts
            option={{
              title: {
                text: '加载完成耗时',
                subtext: 'loadEventEnd - fetchStart',
                x: 'center',
                y: 'top',
              },
              tooltip: {},
              legend: {
                data: ['首页', '文章详情页', '用户详情页'],
                x:'right',
              },
              xAxis: {
                name: '秒',
                data: ["≤1","≤2","≤3","≤4","≤5", "≤6", "≤7", "≤8", "≤9", "≤10", "...≥10"]
              },
              yAxis: {
                name: '访问量',
              },
              series: [{
                name: '首页',
                type: 'line',
                smooth: true,
                data: loadshow.index,
              }, {
                name: '文章详情页',
                type: 'line',
                smooth: true,
                data: loadshow.article,
              }, {
                name: '用户详情页',
                type: 'line',
                smooth: true,
                data: loadshow.acnt,
              }]
            }}
          />
        </section>
      </div>
      <style jsx>{`
      .expose_inner {
        width: 100%;
        border-radius: 5px;
        background-color: #ffffff;
        padding: 0px 10px;
        padding-top: 20px; 
        display: flex;
        flex-direction: column;
      }
      img {
        max-width: 700px;
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 16px;
        padding: 0;
        font-size: 14px;
        line-height: 20px;
        color: #666;
      }
      h3 {
        font-weight: bold;
        color: #111111;
        font-weight: 400;
        margin-top: 1em;
        margin-bottom: 16px;
        padding: 0;
      }
      .turnLeft {
        position: relative;
        left: 50%;
        margin-left: -350px;
        width: 700px;
        text-align: left;
        font-size: 12px;
      }
      section {
        position: relative;
        left: 50%;
        margin-left: -350px;
        width: 700px;
        padding: 10px;
        border-top: 1px solid #E1E1E1;
      }
      .expose_introduce {
        text-align: center;
      }
    `}</style>
    </React.Fragment>
  )
}
export async function getServerSideProps(context) {
  const data = await FetchGet('other/getPref', {})
    .then(val => {
      return val.data;
    })
  return {
    props: {
      Index: data.Index === undefined ? [] : data.Index,
      Article: data.Article === undefined ? [] : data.Article,
      Acnt: data.Acnt === undefined ? [] : data.Acnt,
    }
  }
}

export default Expose