import React from 'react'
import './NextOrBack.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const NextOrBack = ({ onClick, rightOrLeft }) => {
  const icon = rightOrLeft === "left" ? faArrowCircleLeft : faArrowCircleRight
  return (
    <div className="form-next">
      <div className="next-symbol" onClick={onClick}>

        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  )
}

export default NextOrBack
