import React from 'react'

export default function Button({ children, style }) {
  return (
    <button style={style} className="main-button">
      <span className="main-button--text">{children}</span>
    </button>
  )
}
