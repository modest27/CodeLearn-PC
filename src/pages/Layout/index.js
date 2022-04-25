import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { LogoutOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'

// import Home from 'pages/Home'
// import ArticleList from 'pages/ArticleList'
// import ArticlePublish from 'pages/ArticlePublish'

const Home = React.lazy(() => import('pages/Home'))
const ArticleList = React.lazy(() => import('pages/ArticleList'))
const ArticlePublish = React.lazy(() => import('pages/ArticlePublish'))

const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    profile: {},
    selectedKey: this.props.location.pathname
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm placement="topLeft" title="您确定要退出吗？" onConfirm={this.onConfirm} okText="确定" cancelText="取消">
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              {/* 如果菜单不会改变，就用defaultSelectedKeys
              如果菜单会改变，就用selectedKeys */}
              <Menu
                mode="inline"
                selectedKeys={[this.state.selectedKey]}
                style={{
                  height: '100%',
                  borderRight: 0
                }}
                theme="dark"
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                  <Link to="/home/list">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                  <Link to="/home/publish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: '24px',
                overflow: 'auto'
              }}
            >
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  {/* 新增文章路由 */}
                  <Route exact path="/home/publish" component={ArticlePublish} key="add"></Route>
                  {/* 修改文章的路由 */}
                  <Route path="/home/publish/:id" component={ArticlePublish} key="edit"></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  // 组件更新后，重新改变菜单默认值
  componentDidUpdate(preprops) {
    let pathname = this.props.location.pathname
    if (this.props.location.pathname !== preprops.location.pathname) {
      if (pathname.startsWith('/home/publish')) {
        pathname = '/home/publish'
      }
      this.setState({
        selectedKey: pathname
      })
    }
  }

  // 发起请求获取用户信息
  async componentDidMount() {
    const res = await getUserProfile()
    this.setState({
      profile: res.data
    })
  }

  // 退出系统
  onConfirm = () => {
    // 移除token
    // localStorage.removeItem('token')
    removeToken()
    // 跳转到登录页
    this.props.history.push('/login')
    // 提示消息
    message.success('退出成功', 1)
  }
}
