import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Resume Builder</h1>

      <p>Create professional resumes in minutes.</p>

      <Link to="/register">
        <button>Register</button>
      </Link>

      <br />
      <br />

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br />
      <br />

      <Link to="/builder">
        <button>Start Building</button>
      </Link>
    </div>
  )
}

export default Home