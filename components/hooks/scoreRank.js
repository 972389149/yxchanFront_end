import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd'
import Link from 'next/link'

import Hookheader from './../contain/hookheader'
import { url } from './../../config/default'

const Scorerank = props => {
  return (
    <React.Fragment>
      <div className = 'scorerank'>
        <Hookheader title = '积分榜' />
        <div className = 'scorerank_list'>
          <List
            size = 'small'
            itemLayout = "horizontal"
            dataSource = {props.list}
            renderItem = {item => (
              <List.Item>
                <List.Item.Meta
                  avatar = {
                    <Link
                      // as = {`/acnts/acnt/${item.acntName}`}
                      href={{pathname: '/acnts/acnt', query: {user: item.acntName}}}
                    >
                      <Avatar src = { url + item.acntAvatar} />
                    </Link>
                  }
                  title = {
                    <Link
                      // as = {`/acnts/acnt/${item.acntName}`}
                      href={{pathname: '/acnts/acnt', query: {user: item.acntName}}}
                    >
                      <a>{item.acntName}</a>
                    </Link>
                  }
                  description = {<p>{`积分：${item.acntScore}`}</p>}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <style jsx>{`
        .scorerank {
          width: 270px;
          border-radius: 5px;
          overflow: hidden;
          background: #fff;
          margin-bottom: 10px;
        }
        .scorerank_list {
          padding: 0px 10px;
        }
        p {
          margin: 0px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Scorerank;
