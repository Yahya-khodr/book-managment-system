import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
 
  const { user , logout} = useAuth()
  const handleLogout = async () => {
    await logout()

  }
  return (
    <div className='customNavbar'>
      <ul>
        <li className='logo '>
          <p>BOOK LIBRARY</p>
        </li>
        { !user && (<>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </>)}
        { user && (<>
          <li>
            {  <button className='btn btn-outline-light logout' onClick={handleLogout}>Logout</button> }
           
          </li>
        </>)}
      </ul>
    </div>
  )
}