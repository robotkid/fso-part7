import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { getAll, setToken, create, deleteBlog, updateBlog }