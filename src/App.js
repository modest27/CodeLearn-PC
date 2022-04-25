import { Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'
import { Spin } from 'antd'

// import Home from 'pages/Layout'
// import Login from 'pages/Login'

const Login = React.lazy(() => import('pages/Login'))
const Home = React.lazy(() => import('pages/Layout'))

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
        {/* Suspense配合路由懒加载 */}
        {/* fallback表示兜底，组件未显示时先展示的内容 */}
        <Suspense fallback={<Spin></Spin>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <AuthRoute path="/home" component={Home}></AuthRoute>
            <Route path="/login" component={Login}></Route>
            {/* 配置一个404组件 */}
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
