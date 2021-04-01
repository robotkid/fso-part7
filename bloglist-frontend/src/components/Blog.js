import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'


const Blog = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)
  const [comment, setComment] = useState('')

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const likeHandler = () => {
    dispatch(likeBlog(blog))
  }

  const deleteHandler = () => {
    if (!window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
    dispatch(setSuccessNotification('Blog deleted', 5))
  }

  const commentHandler = () => {
    dispatch(addComment(blog, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blogDetails">
      <h2>
        <span className='title'>{blog.title}</span> by <span className='author'>{blog.author}</span>
      </h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p className='blogLikes'>
        <span className='likeCount'>{blog.likes}</span> likes
        <button className='likeButton' onClick={likeHandler}>like</button>
      </p>
      <p className='blogUser'>added by {blog.user.name}</p>
      {blog.user.username === currentUser.username &&
      <button className='deleteBlog' onClick={deleteHandler}>
        delete
      </button>
      }
      <h3>Comments</h3>
      <div>
        <input value={comment} onChange={(e => setComment(e.target.value))} />
        <button onClick={commentHandler}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}


export default Blog