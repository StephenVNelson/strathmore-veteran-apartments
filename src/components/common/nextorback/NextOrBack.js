import React from 'react'
import './NextOrBack.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const NextOrBack = ({ onClick, rightOrLeft }) => {
  const icon = rightOrLeft === "left" ? faArrowCircleLeft : faArrowCircleRight
  return (
    <div className="form-next">
      <span className="next-text">Next Page</span>
      <div className="next-symbol" title="Next Page" onClick={onClick}>

        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  )
}

export default NextOrBack
