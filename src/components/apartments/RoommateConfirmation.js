import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
// import Button from '../common/Button';

const RoommateConfirmation = ({ prospects, applicant, addRoommate, removeRoommate, totalResidents, roommateMax, roommates }) => {

  if (removeRoommate === undefined) { debugger }
  const getIcon = (gender) => gender === "male" ? faMale : faFemale

  const addRoommateButton = (totalResidents >= roommateMax) ? null : (
    <div className="resident resident--add" onClick={addRoommate}>
      <FontAwesomeIcon icon={getIcon(applicant.gender)} style={{ fontSize: "90px" }} />
      <span>+</span>
    </div>)


  return (
    <div className="resident-confirmation">
      <input hidden name="residentTotal" readOnly value={roommates.length + 1} />
      <div className="resident">
        <FontAwesomeIcon icon={getIcon(applicant.gender)} style={{ fontSize: "90px" }} />
      </div>
      {prospects.map((prospect, i) => {
        return (<div key={i} className="resident">
          <FontAwesomeIcon icon={getIcon(prospect.sex)} style={{ fontSize: "90px" }} />
        </div>)
      })}
      {roommates.map((roommate, i) => {
        return (<div key={i} className="resident resident--remove" onClick={removeRoommate}>
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
  applicant: PropTypes.object,
  addRoommate: PropTypes.func,
  removeRoommate: PropTypes.func,
  roommateMax: PropTypes.number,
  totalResidents: PropTypes.number,
  roommates: PropTypes.array
}

export default RoommateConfirmation