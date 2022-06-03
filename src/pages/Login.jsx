import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../components/Alert'

const Login = () => {

  const { login, loginWithGoogle ,resetPassword} = useAuth()
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
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleSignin = async (e) => {
    e.preventDefault()
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }
  const handleResetPassword = async() => {
    if(!user.email) return setError('Please enter your email')
    try {
      await resetPassword(user.email)
      setError('we send you an email with a link to reset your password')
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
            <button type="submit" className="btn btn-secondary">Login</button>
          <div className="mt-2 d-md-flex justify-content-around">
            <p className='my-2 text-secondary'>Don't have an Account <Link className=' text-black' to="/register">Register Now!</Link></p>
            <a href="#" onClick={handleResetPassword} className='my-2 text-secondary fw-bold'>Forgot Password?</a>
          </div>
          <div className='card mt-3'>
            <button onClick={handleGoogleSignin} className="btn btn-outline-dark">
              <img width="20px" className='mb-1 me-1' alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login