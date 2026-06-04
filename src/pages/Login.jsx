import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        },
      )

      localStorage.setItem(
        'token',
        response.data.token,
      )

      alert('Login Successful')

      navigate('/builder')
    } catch (error) {
      alert(
        error.response?.data?.error ||
          'Login Failed',
      )
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default Login