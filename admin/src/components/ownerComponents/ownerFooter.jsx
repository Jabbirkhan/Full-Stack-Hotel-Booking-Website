import React from 'react'
import { useLocation } from 'react-router-dom'

const OwnerFooter = () => {

  const location = useLocation();
  if (location.pathname === '/owner-login' || location.pathname === '/login' || location.pathname === '/owner-forget-password' || location.pathname === '/verify-email') {
    return null
  }

  return (
    <div>
      Owner footer
    </div>
  )
}

export default OwnerFooter
