import React from 'react'
import './CardMode.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faFileSignature } from '@fortawesome/free-solid-svg-icons'

const CardMode = () => {
  return (
    <div className="mode-container">
      <div className="icon-container">
        <span className="mode-icon">
          <FontAwesomeIcon icon={faImage} />
        </span>
      </div>
      <div className="icon-container">
        <span className="mode-icon" >
          <span style={{ position: "relative", right: "-1.5px" }}>
            <FontAwesomeIcon icon={faFileSignature} />
          </span>
        </span>
      </div>
    </div>
  )
}

export default CardMode