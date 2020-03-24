import React, { useState, useEffect } from 'react'

import Hookheader from './../contain/hookheader'

const Community = props => {
  return (
    <React.Fragment>
      <div className = 'community'>
        <Hookheader title = '其他社区' />
      </div>
      <style jsx>{`
        .community {
          width: 270px;
          height: 280px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          padding-bottom: 10px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Community;
