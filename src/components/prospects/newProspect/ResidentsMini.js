import React from 'react'
import { faMale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResidentsMini = (totalResidents) => {
  return (
    [...new Array(totalResidents)].map((_, idx) => <FontAwesomeIcon key={idx} style={{ margin: "2px" }} icon={faMale} />)
  )
}

export default ResidentsMini