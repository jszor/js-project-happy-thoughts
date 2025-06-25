import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Log In</Link>
    </div>
  )
}

export default Home