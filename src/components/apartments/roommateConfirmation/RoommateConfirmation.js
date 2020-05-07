import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faPlus } from '@fortawesome/free-solid-svg-icons'
import './roommateConfirmation.css'
// import Button from '../common/Button';

const RoommateConfirmation = ({
  prospects,
  prospect,
  error,
  addRoommate,
  removeRoommate,
  totalResidents,
  roommateMax,
  roommates,
  roommateGender,
  bedrooms }) => {

  // Adding roommate
  const getIcon = (gender) => gender === "female" ? faFemale : faMale
  const addRoommateButton = (totalResidents >= roommateMax) ? null : (
    <div className="resident resident--add" onClick={addRoommate}>
      <FontAwesomeIcon icon={getIcon(roommateGender)} style={{ fontSize: "90px", width: "50px" }} />
      <span>+</span>
      <div className="resident__title">ADD</div>
    </div>)

  const roommateStatement = () => {
    const statements = ["male", "female", "other"].map(sex => {
      const prospectAmount = [...prospects].filter(p => p.fields.sex == sex).length
      const roommateAmount = [...roommates].filter(p => p.gender == sex).length
      const amount = prospectAmount + roommateAmount
      const es = amount > 1 ? "s" : ""
      return amount ? `${amount} ${sex}${es}` : null
    })
    const nonNullStatements = statements.filter(statement => !!statement)
    return nonNullStatements.join(" and ")
  }

  const sharing = () => {
    let boysAndGirls = roommateStatement()
    return `I confirm I want to join this group sharing a ${bedrooms} bedroom apartment with ${boysAndGirls}.`
  }

  const [checked, setChecked] = useState(false)
  const checkdisplay = checked ? "inline" : "none"
  const roommateAgreement = prospects.length == 0 ? "" : (

    <div className="roommate-agreement">
      <label htmlFor="roommate-agreement" onClick={() => setChecked(!checked)}>
        <input type="checkbox" name="roommate-agreement" value={checked} />
        <span style={{ display: checkdisplay }}>X</span>
      </label>
      <div className="roommate-agreement__agreements">
        {error && <span className={"roommate-confirmation--error"}>{error}</span>}
        <span className="roommate-agreement--agreement">
          {sharing()}
        </span>
      </div>
    </div>
  )


  const roommateSlot = (index, lowerText) => (
    <div key={index} className="resident" onClick={removeRoommate}>
      <FontAwesomeIcon icon={getIcon(roommateGender)} style={{ fontSize: "90px", width: "50px" }} />
      <div className="resident__title">{lowerText}</div>
    </div>
  )
  const roommateSlots = (i) => {
    return prospects.length == 0 ? roommateSlot(i, "REMOVE") : roommateSlot(i, "(TBD)")
  }

  // RETURN
  return (
    <div className="resident-confirmation">
      <input hidden name="residentTotal" readOnly value={roommates.length + 1} />
      <div className="resident-icons">

        {/* icon representing resident */}
        <div className="resident">
          <FontAwesomeIcon icon={getIcon(prospect.fields.sex)} style={{ fontSize: "90px", width: "50px" }} />
          <div className={"resident__title"}>YOU</div>
        </div>

        {/* plus icon */}
        <div className="resident">
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: "30px", width: "50px" }} />
        </div>

        {/* icons representing prospects */}
        {prospects.map((prospect, i) => {
          return (<div key={i} className="resident">
            <FontAwesomeIcon icon={getIcon(prospect.fields.sex)} style={{ fontSize: "90px", width: "50px" }} />
            <div className="resident__title">{prospect.fields.name.split(" ")[0].toUpperCase()}</div>
          </div>)
        })}

        {/* icons representing roommates */}
        {roommates.map((_, i) => {
          return roommateSlots(i)
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