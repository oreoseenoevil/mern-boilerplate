import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import '@Header/index.scss'

import { logout, isLogin } from '@Utils'
import { Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export const Header = () => {
  const classes = useStyles()

  const logoutUser = async () => {
    await axios.get('/api/user/logout')
    
    logout()
    window.location.href = '/'
  }

  const LoggedIn = () => {
    return (
      <Fragment>
        <Link
          onClick={logoutUser}
          style={{ cursor: 'pointer' }}
          color="inherit"
        >
          Sign out
        </Link>
      </Fragment>
    )
  }

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit">Home</Link>
          </Typography>
          {isLogin() ? LoggedIn() :
            <Link href="/signin" color="inherit">Login</Link>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
