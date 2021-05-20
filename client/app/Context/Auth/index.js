import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { isLogin } from '@Utils'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    if (isLogin()) {
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
  }, [])

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  )
}
