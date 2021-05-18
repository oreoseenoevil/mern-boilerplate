import React from 'react'

const TOKEN_KEY = 'mern-session'

export const isAdmin = () => {
  return localStorage.getItem(TOKEN_KEY) ? JSON.parse(localStorage.getItem(TOKEN_KEY)).role === 1 : false
}

export const isLogin = () => {
  return localStorage.getItem(TOKEN_KEY) ? true : false
}

export const login = (value) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(value))
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const NotFound = () => {
  return (
    <div className="not-found">
      404 | Not Found
    </div>
  )
}
