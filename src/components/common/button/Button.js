import React from 'react'
import { PropTypes } from 'prop-types';
import './button.css'


export default function Button({ children, style }) {
  return (
    <button style={style} className="main-button">
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object.isRequired
}