import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, deleteHandler, likeHandler, user }) => (
  <div className="blogDetails">
    <p>{blog.url}</p>
    <p className='blogLikes'>
      likes <span className='likeCount'>{blog.likes}</span>
      <button className='likeButton' onClick={() => likeHandler(blog)}>like</button>
    </p>
    <p className='blogUser'>{blog.user.name}</p>
    {blog.user.name === user.name &&
      <button className='deleteBlog' onClick={() => deleteHandler(blog)}>
        delete
      </button>
    }
  </div>
)

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const Blog = ({ blog, deleteHandler, likeHandler, user }) => {
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
      {show && <BlogDetails blog={blog} deleteHandler={deleteHandler} likeHandler={likeHandler} user={user} />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog