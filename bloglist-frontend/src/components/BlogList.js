import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, deleteHandler, likeHandler, user }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} deleteHandler={deleteHandler} likeHandler={likeHandler} user={user} />
    )}
  </div>
)

export default BlogList