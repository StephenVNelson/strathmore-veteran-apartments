import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import Button from '../common/Button';

const RoommateConfirmation = ({ prospects, applicant }) => {

  const addRoommate = () => {
    if (roommates.length + 1 < roommateMax) { setRoommates([...roommates, { gender: "male" }]) }
  }
  const removeRoommate = () => {
    setRoommates(roommates.slice(0, -1))
  }

  const roommateMax = 3
  const getIcon = (gender) => gender === "male" ? faMale : faFemale
  const [roommates, setRoommates] = useState([])

  const addRoommateButton = (roommates.length + 1 >= roommateMax) ? null : (
    <div className="resident" onClick={addRoommate}>
      <FontAwesomeIcon className="resident--add" icon={getIcon(applicant.gender)} />
      <span>+</span>
    </div>)


  return (
    <div className="resident-confirmation">
      <input hidden name="residentTotal" value={roommates.length + 1} />
      <div className="resident">
        <FontAwesomeIcon icon={getIcon(applicant.gender)} style={{ fontSize: "90px" }} />
      </div>
      {roommates.map((roommate, i) => {
        return (<div key={i} className="resident" onClick={removeRoommate}>
          <FontAwesomeIcon icon={getIcon(roommate.gender)} style={{ fontSize: "90px" }} />
          <span>-</span>
        </div>)
      })}
      {addRoommateButton}
    </div>
  )
}

RoommateConfirmation.propTypes = {
  prospects: PropTypes.array,
  applicant: PropTypes.object
}

export default RoommateConfirmation