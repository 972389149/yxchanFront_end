import React, { useState, useEffect } from 'react'
import { Result } from 'antd'

const Error_ = props => {
    return (
      <React.Fragment>
        <div className = 'error_'>
          <Result
            status = '500'
            title = '500'
            subTitle = '服务器炸了, 请联系管理员.'
          />
        </div>
        <style jsx>{`
          .error_ {
            border-radius: 5px;
            overflow: hidden;
            width: 100%;
            background: #fff;
          }
        `}</style>
      </React.Fragment>
    )
}
export default Error_;
