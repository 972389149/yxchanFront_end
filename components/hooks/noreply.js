import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import Link from 'next/link'

import Hookheader from './../contain/hookheader'

const Noreply = props => {
    return (
      <React.Fragment>
        <div className = 'noreply'>
          <Hookheader title = {props.title} />
          <div className = 'noreply_list'>
            <List
              size = 'small'
              dataSource = {props.list}
              renderItem = {item => (
                <List.Item>
                  <Link as = {`/article/${item._id}`} href={{pathname: '/article', query: {id: item._id}}}>
                    <span className = 'title'>{item.title}</span>
                  </Link>
                </List.Item>
              )}
            />
          </div>
        </div>
        <style jsx>{`
          .noreply {
            width: 270px;
            border-radius: 5px;
            overflow: hidden;
            background: #fff;
            margin-bottom: 10px;
          }
          .noreply_list {
            width: 250px;
            margin: 0px 10px 0px 10px;
          }
          .title {
            color: rgba(0,0,0,.65);
            cursor: pointer;
          }
          .title:hover {
            color: #1890ff;
          }
        `}</style>
      </React.Fragment>
    )
}
export default Noreply;
