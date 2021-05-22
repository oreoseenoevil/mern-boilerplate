import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({auth, component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      auth && restricted ? <Redirect to='/' />
        : <Component {...props} />
    )} />
  )
}

export const PrivateRoute = ({auth, component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      auth ? <Component {...props} />
        : <Redirect to={{
          pathname: '/signin',
          state: {from: props.location}
        }} />
    )} />
  )
}
