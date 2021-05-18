import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from '@Utils'
import { PublicRoute, PrivateRoute } from '@Helpers'

// Components
// Public Route
import { SignIn } from '@SignIn'
import { SignUp } from '@SignUp'
import { Home } from '@Home'

// Private Route
import { Dashboard } from '@Dashboard'

export const Routes = () => {
  return (
    <Switch>
      <PublicRoute
        restricted={false} 
        component={Home} 
        path='/'
        exact
      />
      <PublicRoute
        restricted={false} 
        component={SignIn} 
        path='/signin'
        exact
      />
      <PublicRoute
        restricted={false} 
        component={SignUp} 
        path='/signup'
        exact
      />
      <PrivateRoute
        component={Dashboard}
        path='/dashboard'
        exact
      />
      <Route exact={true} path='*' component={NotFound} />
    </Switch>
  )
}
