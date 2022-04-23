import { Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthRoute from 'components/AuthRoute'
import Home from 'pages/Layout'
import Login from 'pages/Login'
import history from 'utils/history'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <Route path="/login" component={Login}></Route>
          {/* 配置一个404组件 */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
