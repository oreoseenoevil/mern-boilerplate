import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLogin } from '@Utils'

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() && restricted ? <Redirect to='/' />
        : <Component {...props} />
    )} />
  )
}

export const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ? <Component {...props} />
        : <Redirect to={{
          pathname: '/signin',
          state: {from: props.location}
        }} />
    )} />
  )
}
