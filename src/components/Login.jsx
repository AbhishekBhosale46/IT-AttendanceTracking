import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

// --- LOGIN FORM ---

const Login = () => {

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(name, pass)
  }

  return (
    <div className='container'>

      <div className='image'>
        <img src="https://pict.edu/images/pic.jpg"/>
      </div>

      <div className="wrapper">
        <div className="title">Faculty Login</div>
        <form className='create'>
          <label>Username : </label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
          <label>Password : </label>
          <input type="password" onChange={(e) => setPass(e.target.value)} value={pass}/>
          {error && <div className="error">Wrong username or password ! </div>}
          {isLoading && <div className="loading">Loading...</div>}
          <button onClick={handleSubmit}>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login