import { Result } from 'antd';
const ErrorPage = props => {
  return (
    <Result
      status = "500"
      title = "500"
      style = {{background: '#fff'}}
      subTitle = "Sorry, the server is wrong."
    />
  )
}

export default ErrorPage
