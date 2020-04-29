import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
// import Button from '../common/Button';

const RoommateConfirmation = ({
  prospects,
  prospect,
  addRoommate,
  removeRoommate,
  totalResidents,
  roommateMax,
  roommates,
  roommateGender,
  bedrooms }) => {

  // Adding roommate
  const getIcon = (gender) => gender === "male" ? faMale : faFemale
  const addRoommateButton = (totalResidents >= roommateMax) ? null : (
    <div className="resident resident--add" onClick={addRoommate}>
      <FontAwesomeIcon icon={getIcon(roommateGender)} style={{ fontSize: "90px", width: "50px" }} />
      <span>+</span>
    </div>)

  const sharing = () => {
    let boysAndGirls;
    const boys = prospects.filter(p => p.fields.sex == "male").length
    const girls = prospects.filter(p => p.fields.sex == "Female").length
    if (boys > 0 && girls > 0) { boysAndGirls = `${boys} other males and ${girls} other females.` }
    if (boys > 0) { boysAndGirls = `${boys} other males.` }
    if (girls > 0) { boysAndGirls = `${girls} other females.` }
    return `I confirm I want to join this group sharing a ${bedrooms} bedroom apartment with ${boysAndGirls}`
  }

  const [checked, setChecked] = useState(false)
  const checkdisplay = checked ? "inline" : "none"
  const roommateAgreement = prospects.length == 0 ? "" : (
    <div className="roommate-agreement">
      <label htmlFor="roommate-agreement" onClick={() => setChecked(!checked)}>
        <input type="checkbox" name="roommate-agreement" value={checked} />
        <span style={{ display: checkdisplay }}>X</span>
      </label>
      <span className="roommate-agreement--agreement">
        {sharing()}
      </span>
    </div>
  )

  return (
    <div className="resident-confirmation">
      <input hidden name="residentTotal" readOnly value={roommates.length + 1} />
      <div className="resident-icons">

        {/* icon representing resident */}
        <div className="resident">
          <FontAwesomeIcon icon={getIcon(prospect.sex)} style={{ fontSize: "90px", width: "50px" }} />
        </div>

        {/* icons representing prospects */}
        {prospects.map((prospect, i) => {
          return (<div key={i} className="resident">
            <FontAwesomeIcon icon={getIcon(prospect.sex)} style={{ fontSize: "90px", width: "50px" }} />
          </div>)
        })}

        {/* icons representing roommates */}
        {roommates.map((roommate, i) => {
          return (<div key={i} className="resident resident--remove" onClick={removeRoommate}>
            <FontAwesomeIcon icon={getIcon(roommateGender)} style={{ fontSize: "90px", width: "50px" }} />
            <span>-</span>
          </div>)
        })}
        {addRoommateButton}
      </div>
      {roommateAgreement}
    </div>
  )
}

RoommateConfirmation.propTypes = {
  prospects: PropTypes.array,
  prospect: PropTypes.object,
  addRoommate: PropTypes.func,
  removeRoommate: PropTypes.func,
  roommateMax: PropTypes.number,
  totalResidents: PropTypes.number,
  roommates: PropTypes.array,
  bedrooms: PropTypes.number,
  roommateGender: PropTypes.string
}

export default RoommateConfirmation