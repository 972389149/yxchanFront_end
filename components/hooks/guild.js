import React, { useState, useEffect } from 'react'

import Hookheader from './../contain/hookheader'

const Guild = props => {
  return (
    <React.Fragment>
      <div className = 'guild'>
        <Hookheader title = '文章发布指南' />
        <ul>
          <li>尽量把文章要点浓缩到文章说明或标题里</li>
          <li>根据文章类型发布在相应的板块</li>
        </ul>
      </div>
      <style jsx>{`
        .guild {
          width: 270px;
          height: 120px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          padding-bottom: 10px;
        }
        ul {
          height: 80px;
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
      `}</style>
    </React.Fragment>
  )
}
export default Guild;
