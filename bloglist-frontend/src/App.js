import React, { useEffect } from 'react'
import {
  Switch, Route, useHistory
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/currentUserReducer'
import User from './components/User'
import Menu from './components/Menu'

const App = () => {
  const currentUser = useSelector(state => state.currentUser)
  console.log(currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON && !currentUser) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(loggedInUser))
    }
  }, [])

  return (
    <div>
      <Notification />
      <Menu />
      <div className='content'>
        <h1>blog app</h1>
        <Switch>
          <Route path='/login'>
            { currentUser ? history.goBack() : <LoginForm /> }
          </Route>
          {currentUser === null && history.push('/login')}
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <BlogList />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App