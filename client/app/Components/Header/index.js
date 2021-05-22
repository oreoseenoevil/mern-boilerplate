import React, { useContext, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { AuthContext } from '@Context/Auth'
import axios from 'axios'
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: '320px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}))

export const Header = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const classes = useStyles()
  const history = useHistory()

  const gotoSignin = () => {
    history.push('/signin')
  }

  const gotoSignup = () => {
    history.push('/signup')
  }

  const gotoDashboard = () => {
    history.push('/dashboard')
  }

  const logoutUser = async () => {
    await axios.get('/api/user/logout')
    setAuth(false)
    Cookies.remove('dotcom_user')
    history.push('/')
  }


  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none'
  }

  const loggedRouter = () => {
    return (
      <Fragment>
        <Button
          color="inherit"
          onClick={gotoSignin}
        >
          Sign in
        </Button>
        <Button
          color="inherit"
          onClick={gotoSignup}
        >
          Sign up
        </Button>
      </Fragment>
    )
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={linkStyle}>Home</Link>
          </Typography>
          { auth ? (
            <Fragment>
              <Button color="inherit" onClick={gotoDashboard}>Dashboard</Button>
              <Button color="inherit" onClick={logoutUser}>Sign out</Button>
            </Fragment>
          ) : loggedRouter() }
        </Toolbar>
      </AppBar>
    </div>
  )
}
