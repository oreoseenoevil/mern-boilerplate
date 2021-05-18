import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

// Context
import { AuthContextProvider } from '@Context/Auth'

// Components
import { Header } from '@Header'

import { Routes } from '@Routes'
import '@App/index.scss'

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="sections">
            <Routes />
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default hot(module)(App)
