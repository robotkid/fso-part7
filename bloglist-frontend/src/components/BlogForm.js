import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      author,
      title,
      url,
      likes
    }))

    dispatch(
      setSuccessNotification(`a new blog ${title} by ${author} added`, 5)
    )

    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes(0)
  }

  return (
    <div className="formDiv">
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          author:
          <input
            type='text'
            id='author-field'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title:
          <input
            type='text'
            id='title-field'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='url'
            id='url-field'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        {/* <div>
          likes:
          <input
            type='number'
            value={likes}
            name='author'
            onChange={({ target }) => setLikes(target.value)}
          />
        </div> */}
        <div><button id='blog-submit' type='submit'>Save</button></div>
      </form>
    </div>
  )
}

export default BlogForm