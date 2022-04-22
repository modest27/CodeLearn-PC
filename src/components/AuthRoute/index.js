import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
import { Redirect } from 'react-router-dom'

export default class AuthRoute extends Component {
  render() {
    const { component: Component, ...res } = this.props
    return (
      <Route
        {...res}
        render={routeProps => {
          //  有token就返回Component组件，也就是进行跳转
          if (hasToken()) {
            return <Component {...routeProps} />
          } else {
            return <Redirect to={{ pathname: '/login', state: { from: routeProps.location.pathname } }}></Redirect>
          }
        }}
      ></Route>
    )
  }
}
