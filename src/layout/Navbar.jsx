import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import useAuth from '../hooks/useAuth'
import {useNavigate } from "react-router-dom";
export default function Navbar() {
 
  const { user , logout} = useAuth()
  const handleLogout = async () => {
    await logout()

  }

  const handleCreate= async () => {
    
  }
  const navigate = useNavigate();
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
            <button className='btn btn-outline-light m-auto d-md-flex justify-content-center  align-items-center' onClick={() => navigate("/books")}>Books</button> 
          <li>
            
            {  <button className='btn btn-outline-light logout' onClick={handleLogout}>Logout</button> }
          </li>
        </>)}
      </ul>
    </div>
  )
}