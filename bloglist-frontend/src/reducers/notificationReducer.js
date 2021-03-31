
// const initialState = {
//   message: null,
//   type: null,
//   timeOutID: null
// }

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.payload
  case 'CLEAR_MESSAGE':
    return null
  default:
    return state
  }
}

export const setSuccessNotification = (message, timeOut) => {
  return setNotification(message, 'success', timeOut)
}

export const setErrorNotification = (message, timeOut) => {
  return setNotification(message, 'error', timeOut)
}

const setNotification = (message, type, timeOut) => {
  return (dispatch, getState) => {
    const { timeoutID } = getState().notification || {}
    clearTimeout(timeoutID)
    const newTimeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR_MESSAGE' })
    }, timeOut * 1000)
    dispatch(
      {
        type: 'SET_MESSAGE',
        payload: {
          message,
          type,
          timeoutID: newTimeoutID
        }
      })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default notificationReducer