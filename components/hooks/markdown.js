import React, { useState, useEffect } from 'react'

import Hookheader from './../contain/hookheader'

const Markdown = props => {
  return (
    <React.Fragment>
      <div className = 'markdown'>
        <Hookheader title = 'Markdown 语法参考' />
        <ul>
          <li>### 单行的标题</li>
          <li>**粗体**</li>
          <li>`console.log('行内代码')`</li>
          <li>```js\n code \n``` 标记代码块</li>
          <li>[内容](链接)</li>
          <li><a href = 'https://segmentfault.com/markdown' target = '_blank' >Markdown 文档</a></li>
        </ul>
      </div>
      <style jsx>{`
        .markdown {
          width: 270px;
          height: 280px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        ul {
          height: 240px;
          margin: 0px;
          padding: 0px;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        li {
          list-style-type: none;
          font-size: 13px;
          color: #333;
        }
        a {
          color: #778087;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Markdown;
