import React, { useState, useEffect } from 'react'

import Hookheader from './../contain/hookheader'

const Community = props => {
  return (
    <React.Fragment>
      <div className = 'community'>
        <Hookheader title = '其他社区' />
        <section className = 'otherlink'>
          <img
            src = '/images/other1.png'
            alt = 'PHPhub'
            onClick = {
              () => {
                window.open('https://learnku.com/laravel');
              }
            }
          />
          <img
            src = '/images/other2.png'
            alt = 'RUBY'
            onClick = {
              () => {
                window.open('https://ruby-china.org/');
              }
            }
          />
        </section>
      </div>
      <style jsx>{`
        .community {
          width: 270px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          padding-bottom: 10px;
        }
        .otherlink {
          height: 170px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0px 10px;
        }
        img {
          cursor: pointer;
          width: 250px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Community;
