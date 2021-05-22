import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)
  const [auth, setAuth] = useState(false)

  const readCookie = () => {
    const user = Cookies.get('dotcom_user')
    if (user || token) {
      setAuth(true)
    }
  }

  useEffect(() => {
    if (auth) {
      const refreshToken = async () => {
        try {
          const res = await axios.get('/api/user/token')
          setToken(res.data.token)
          setTimeout(() => {
            refreshToken()
          }, 10 * 60 * 1000)
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
      refreshToken()
    }
    readCookie()
  }, [])

  return (
    <AuthContext.Provider value={{ token, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
