import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/currentUserReducer'
import { useHistory } from 'react-router'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const userResponse = await loginService.login({
        username, password
      })
      dispatch(setUser(userResponse))
      dispatch(
        setSuccessNotification(`Logged in successfully as ${userResponse.name}`, 5)
      )
      history.push('/')
    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
    }
  }

  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleLogin()
        setUsername('')
        setPassword('')
      }}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm