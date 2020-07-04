import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import { PropTypes } from 'prop-types';

const RoommateSlots = ({
  prospects,
  removeRoommate,
  genderPrefs,
  fontSize,
  width
}) => {
  const getIcon = (gender) => gender === "female" ? faFemale : faMale
  const lowerText = prospects.length == 0 ? "OPEN" : "(TBD)"
  return (
    <div className="resident roommate-slot" onClick={removeRoommate}>
      <FontAwesomeIcon
        icon={getIcon(genderPrefs)}
        style={{ fontSize: fontSize, width: width }}
      />
      {lowerText != "(TBD)" && <span style={{ width: width }}>-</span>}
      <div className="resident__title">{lowerText}</div>
    </div>
  )
}
RoommateSlots.propTypes = {
  prospects: PropTypes.array.isRequired,
  removeRoommate: PropTypes.func.isRequired,
  genderPrefs: PropTypes.string.isRequired,
}
export default RoommateSlots