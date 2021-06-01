const notificationReducer = (state = null, action) => {
  // console.log('notification state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutID
// define action creaters
export const setNotification = (content, displayTime) => {
  // return {
  //   type: 'NEW_NOTIFICATION',
  //   data: { content }
  // }
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { content }
    })

    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, displayTime)
    console.log('TimeoutID after', timeoutID)
  }
}

// export const removeNotification = () => {
//   return {
//     type: 'REMOVE_NOTIFICATION',
//   }
// }

export default notificationReducer