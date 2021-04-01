import axios from 'axios'
const baseUrl = '/api/login'
import blogService from './blogs'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  localStorage.setItem('loggedInUser', JSON.stringify(response.data))
  blogService.setToken(response.data.token)
  return response.data
}

const logout = () => {
  localStorage.removeItem('loggedInUser')
  blogService.setToken(null)
}

export default { login, logout }