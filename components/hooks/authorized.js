import React from 'react'
import { Result } from 'antd'

const Authorized = props => {
    return (
      <React.Fragment>
        <div className = 'authorized'>
          <Result
            status = '403'
            title = '403'
            subTitle = '对不起，您没权限访问该页面.'
          />
        </div>
        <style jsx>{`
          .authorized {
            height: 500px;
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            background: #fff;
          }
        `}</style>
      </React.Fragment>
    )
}
export default Authorized;
