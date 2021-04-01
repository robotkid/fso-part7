import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'UPDATE_BLOG':
    return state.map(b => b.id !== action.blog.id ? b : action.blog)
  default:
    return state
  }
}

export const likeBlog = blog => {
  const updatedBlog = { ...blog }
  updatedBlog.likes++
  return async dispatch => {
    const returnedBlog = await blogService.updateBlog(updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: returnedBlog
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const returnedBlog = await blogService.addComment(blog.id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: returnedBlog
    })
  }
}


export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer