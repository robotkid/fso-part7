// import blogService from '../services/blogs'
import loginService from '../services/login'
import { setErrorNotification, setSuccessNotification } from './notificationReducer'

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = user => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const userResponse = await loginService.login({
        username, password
      })
      dispatch(
        setSuccessNotification(`Logged in successfully as ${userResponse.name}`, 5)
      )
      return setUser(userResponse)
    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
      return logout()
    }
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default currentUserReducer