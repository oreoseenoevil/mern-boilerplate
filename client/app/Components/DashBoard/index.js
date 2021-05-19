import React from 'react'
import { getUser } from '@Utils'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome {getUser.username}</h1>
    </div>
  )
}
