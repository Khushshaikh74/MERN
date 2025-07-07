import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'

const Logout = () => {
  const { logoutUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logoutUser()           // Call the logout function
    navigate('/login')     // Redirect to login page
  }, [logoutUser, navigate])

  return null // no UI needed
}

export default Logout
    