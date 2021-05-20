import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

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
  const classes = useStyles()
  const history = useHistory()

  const gotoSignin = () => {
    history.push('/signin')
  }

  const gotoSignup = () => {
    history.push('/signup')
  }


  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none'
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={linkStyle}>Home</Link>
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  )
}
