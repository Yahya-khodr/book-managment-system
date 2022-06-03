import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
 
  const { user , logout} = useAuth()
  const handleLogout = async () => {
    await logout()

  }

  const handleCreate= async () => {
    
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
            <button className='btn btn-outline-light logout' onClick={handleCreate}>Create Book</button> 
          </li>
        </>)}
      </ul>
    </div>
  )
}