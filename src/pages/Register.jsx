import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../components/Alert'

const Register = () => {

  const { signup } = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (

    <div className="row vh-100 justify-content-center  align-items-center">
      <div className="col-md-6 ">
        {error && <Alert message={error} />}
        <form className="card card-body rounded p-4 shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email"
              name="email"
              className="form-control" 
              id="email" 
              placeholder="name@example.com"
              onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              id="password" 
              placeholder="*********"
              onChange={handleChange} />
          </div>
            <button type="submit" className="px-3 btn btn-secondary">Register</button>
          <div className="mt-2 d-flex justify-content-center">
            <p className='my-2 text-secondary'>Already have an Account <Link className=' text-black' to="/login">Login Now!</Link></p>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Register