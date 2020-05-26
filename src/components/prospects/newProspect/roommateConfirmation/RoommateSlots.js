import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'

const RoommateSlots = ({
  prospects,
  removeRoommate,
  genderPrefs }) => {

  const getIcon = (gender) => gender === "female" ? faFemale : faMale
  const lowerText = prospects.length == 0 ? "REMOVE" : "(TBD)"
  return (
    <div className="resident" onClick={removeRoommate}>
      <FontAwesomeIcon
        icon={getIcon(genderPrefs)}
        style={{ fontSize: "90px", width: "50px" }}
      />
      {lowerText != "(TBD)" && <span>-</span>}
      <div className="resident__title">{lowerText}</div>
    </div>
  )
}

export default RoommateSlots