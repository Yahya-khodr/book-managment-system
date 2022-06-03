import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
    <div>
      <h1 className="text-warning  mt-2 d-flex justify-content-center">404 : Not Found!</h1>
      <Link to="/" className="inline-block mt-2 d-flex justify-content-center">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound