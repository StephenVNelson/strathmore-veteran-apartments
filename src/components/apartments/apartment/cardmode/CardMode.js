import React from 'react'
import './CardMode.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faFileSignature } from '@fortawesome/free-solid-svg-icons'

const CardMode = ({ setCardMode, cardMode }) => {
  return (
    <div className="mode-container" >
      <div
        className={`icon-container ${cardMode === "photo" ? "icon-container-selected" : ""}`}
        onClick={() => setCardMode("photo")}
      >
        <span className={`mode-icon ${cardMode === "photo" ? "mode-icon-selected" : ""}`}>
          <FontAwesomeIcon icon={faImage} />
        </span>
      </div>
      <div
        className={`icon-container ${cardMode === "application" ? "icon-container-selected" : ""}`}
        onClick={() => setCardMode("application")}
      >
        <span className={`mode-icon ${cardMode === "application" ? "mode-icon-selected" : ""}`}>
          <span style={{ position: "relative", right: "-1.5px" }}>
            <FontAwesomeIcon icon={faFileSignature} />
          </span>
        </span>
      </div>
    </div>
  )
}

export default CardMode