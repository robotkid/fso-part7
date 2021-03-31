import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setSuccessNotification, setErrorNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const setBlogs = (newBlogs) => {
    newBlogs.sort((a,b) => b.likes - a.likes)
    setSortedBlogs(newBlogs)
  }

  useEffect(() => {
    (async () => {
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs)
    })()
  }, [user])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON && !user) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const addBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    dispatch(
      setSuccessNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5)
    )
  }

  const handleLogin = async (username, password) => {
    try {
      const userResponse = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(userResponse)
      )
      setUser(userResponse)
      blogService.setToken(userResponse.token)
      dispatch(
        setSuccessNotification(`Logged in successfully as ${userResponse.name}`, 5)
      )
    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleDelete = async blog => {
    try {
      if (!window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
        return
      }
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b !== blog))
      dispatch(setSuccessNotification('Blog deleted', 5))
    } catch (err) {
      console.error(err)
      dispatch(setErrorNotification(err, 5))
    }
  }

  const handleLike = async blog => {
    const updatedBlog = { ...blog }
    updatedBlog.likes++
    const returnedBlog = await blogService.updateBlog(updatedBlog)
    const updatedBlogs = [...blogs]
    updatedBlogs[blogs.indexOf(blog)] = returnedBlog
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <Notification />
      { user === null
        ? <LoginForm handleLogin={handleLogin} />
        : (<div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} deleteHandler={handleDelete} likeHandler={handleLike} user={user} />
        </div>
        )
      }
    </div>
  )
}

export default App