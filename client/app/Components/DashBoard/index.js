import React from 'react'
import { logout } from '@Utils'

export const Dashboard = () => {
  const logoutUser = () => {
    logout()

    window.location.href = '/signin'
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button className="btn-logout" onClick={logoutUser}>
        Logout
      </button>
    </div>
  )
}
