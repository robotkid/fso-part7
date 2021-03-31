import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'

const BlogDetails = ({ blog, user }) => {
  const dispatch = useDispatch()

  const likeHandler = () => {
    dispatch(likeBlog(blog))
  }

  const deleteHandler = blog => {
    if (!window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
    dispatch(setSuccessNotification('Blog deleted', 5))
  }

  return (
    <div className="blogDetails">
      <p>{blog.url}</p>
      <p className='blogLikes'>
      likes <span className='likeCount'>{blog.likes}</span>
        <button className='likeButton' onClick={likeHandler}>like</button>
      </p>
      <p className='blogUser'>{blog.user.name}</p>
      {blog.user.name === user.name &&
      <button className='deleteBlog' onClick={deleteHandler}>
        delete
      </button>
      }
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [show, setShow] = useState(false)

  return (
    <div className='blog' style={blogStyle}>
      <span className='blogTitle'>{blog.title}</span>
      <span className='blogAuthor'>{blog.author}</span>
      <button onClick={() => setShow(!show)}>
        {show ? 'hide' : 'view'}
      </button>
      {show && <BlogDetails blog={blog} user={user} />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog