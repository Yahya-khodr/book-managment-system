import useAuth from "../hooks/useAuth"

const Home = () => {
  const { user, logout, loading } = useAuth()

  const handleLogout = async () => {
    await logout()

  }
  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <div className="row vh-100 justify-content-center  align-items-center">
      <div className="col-md-6  ">
        <div className="card border-success shadow py-3 px-1">

          <div className="card-body">

            <h1 className="card-title">Welcome {user.displayName || user.email}</h1>
            <button onClick={handleLogout} className="btn btn-secondary mt-3">Logout</button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home