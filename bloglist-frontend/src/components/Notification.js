import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification) || {}
  if (message === null || message === undefined) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification