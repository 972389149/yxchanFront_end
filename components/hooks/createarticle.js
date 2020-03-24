import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Router from 'next/router'
import Link from 'next/link'

const Createarticle = props => {
  return (
    <React.Fragment>
      <div className = 'create_article'>
      <Link  href={`/articles/create`}>
        <Button>创建文章</Button>
      </Link>
      </div>
      <style jsx>{`
        .create_article {
          width: 270px;
          height: 55px;
          border-radius: 5px;
          overflow: hidden;
          padding: 0px 10px 0px 10px;
          background: #fff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Createarticle;
