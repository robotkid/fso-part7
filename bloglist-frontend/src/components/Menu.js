import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/currentUserReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

  const padding = {
    paddingRight: 5
  }

  const style = {
    backgroundColor: 'lightGray',
    display: 'flex',
    padding: '5px 20px'
  }

  const userDetails = () => {
    if (!currentUser) {
      return null
    } else {
      return (
        <div className='loginDetails'>
          <em>{currentUser.name} logged in</em>
          <button onClick={handleLogout}>log out</button>
        </div>
      )
    }
  }

  return (
    <div style={style}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {userDetails()}
    </div>
  )
}

export default Menu