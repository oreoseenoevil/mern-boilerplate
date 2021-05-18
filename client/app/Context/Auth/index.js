import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  const state = {
    token: [token, setToken]
  }
  
  return (
    <AuthContext.Provider value={{state}}>
      {children}
    </AuthContext.Provider>
  )
}
