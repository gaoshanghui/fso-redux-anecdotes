import React from 'react'
import { useSelector, connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 12,
    borderWidth: 1
  }

  return (
    <div>
      {!notification || <div style={style}>{notification.content}</div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
