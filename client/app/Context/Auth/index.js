import React, { createContext, useReducer } from 'react'
import { initialState, AuthReducer } from '@Reducer/Auth'
import axios from 'axios'
import { login } from '@Utils'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const loginUser = async user => {
    try {
      const res = await axios.post('/api/user/login', user)
      
      dispatch({
        type: 'SET_USER',
        payload: res.data.data
      })

      login(res.data.data)
      window.location.href = '/dashboard'
    } catch (error) {
      dispatch({
        type: 'ERROR_AUTH',
        payload: error.response.data.error
      })
    }
  }
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
