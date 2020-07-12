import React, { useState, useEffect } from 'react'

const Alert = ({ alert }) => {
  useEffect(() => {
    setTimeout(() => setFadeOut(true), 5000)
  }, [])

  const [fadeOut, setFadeOut] = useState(false)
  const fadeOutClass = fadeOut ? "fade-out hide" : ""
  return (
    <div className={`alert fade-in ${fadeOutClass}`}>{alert.message}</div>
  )
}

export default Alert
