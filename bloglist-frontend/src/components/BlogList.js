import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default BlogList