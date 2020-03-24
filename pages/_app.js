import { Provider } from "react-redux"
import withRedux from "next-redux-wrapper"
import withReduxSaga from "next-redux-saga"
import configureStore from "./../redux/store"

import 'antd/dist/antd.min.css'
import Layout from './../components/contain/layout'

const YxApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store = {store}>
      <Layout Component = {Component} pageProps = {pageProps} />
    </Provider>
  )
} 

export default withRedux(configureStore)(withReduxSaga(YxApp));
