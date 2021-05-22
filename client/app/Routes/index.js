import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from '@Utils'
import { AuthContext } from '@Context/Auth'
import { PublicRoute, PrivateRoute } from '@Helpers'


// Components
// Public Route
import { SignIn } from '@SignIn'
import { SignUp } from '@SignUp'
import { Home } from '@Home'

// Private Route
import { Dashboard } from '@Dashboard'


export const Routes = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Switch>
      <PublicRoute
        auth={auth}
        restricted={false} 
        component={Home} 
        path='/'
        exact
      />
      <PublicRoute
        auth={auth}
        restricted={true} 
        component={SignIn} 
        path='/signin'
        exact
      />
      <PublicRoute
        auth={auth}
        restricted={true} 
        component={SignUp} 
        path='/signup'
        exact
      />
      <PrivateRoute
        auth={auth}
        component={Dashboard}
        path='/dashboard'
        exact
      />
      <Route exact={true} path='*' component={NotFound} />
    </Switch>
  )
}
