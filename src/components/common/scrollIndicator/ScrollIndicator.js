import React, { useEffect, useState } from 'react'
import './ScrollIndicator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const ScrollIndicator = ({ jump, scrollVisible, gradientColor, textColor, hiddenOnSmallScreen }) => {
  // console.log(gradientColor)
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.001) 0%, ${gradientColor})`,
        color: textColor
      }}
      className={`scroll-indicator ${scrollVisible ? "scrollVisible" : "scrollInvisible"} ${hiddenOnSmallScreen}`}
    >
      <div className={`scroll-icon ${jump ? "jump" : "unjump"}`}>
        <div className="scroll-text">scroll</div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </div>
  )
}

export default ScrollIndicator