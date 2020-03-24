import React, { useState, useEffect } from 'react'

const Hookheader = props => {
  return (
    <React.Fragment>
      <div className = 'hookheader'>
        {
          props.title
        }
      </div>
      <style jsx>{`
        .hookheader {
          width: 100%;
          height: 40px;
          padding: 0px 10px 0px 10px;
          line-height: 40px;
          color: #51585c;
          font-size: 14px;
          background-color: #f6f6f6;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Hookheader;
