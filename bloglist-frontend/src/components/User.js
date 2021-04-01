import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'

const User = () => {
  const users = useSelector(state => state.users)
  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>
            {b.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User