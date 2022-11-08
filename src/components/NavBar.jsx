import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// --- NAVIGATION BAR COMPONENT ---

const NavBar = () => {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
        <nav className='navbar'>
            <h1>IT Attendance Tracking</h1>

            {user && (
            <div className='links'>
              <button onClick={handleLogout}>Log Out</button>
            </div>
            )}

            {!user && (
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
            )}

        </nav>
    </div>
  )
}

export default NavBar