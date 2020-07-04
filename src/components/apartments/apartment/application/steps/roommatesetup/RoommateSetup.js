import React, { useState } from 'react'
import './RoommateSetup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faPlus } from '@fortawesome/free-solid-svg-icons'
import RoommateSlots from '../../../../../prospects/newProspect/roommateConfirmation/RoommateSlots'
import AddRoommateButton from '../../../../../prospects/newProspect/roommateConfirmation/AddRoommateButton';
import sharing from '../../../../../prospects/newProspect/roommateConfirmation/roommateConfirmationHelpers';
import NextOrBack from '../../../../../common/nextorback/NextOrBack'



const RoommateSetup = ({ roommateGroup, updateSession, session, roommates, prospect, prospects, error, bedrooms, setFormSection }) => {
  const getIcon = (gender) => gender === "female" ? faFemale : faMale
  const [checked, setChecked] = useState(false)
  const checkdisplay = checked ? "inline" : "none"

  const removeRoommate = () => {
    const roommateTotal = roommateGroup.fields.roommateTotal - 1
    updateSession({
      ...session,
      roommateGroup: { ...roommateGroup, fields: { ...roommateGroup.fields, roommateTotal } },
      roommates: roommates.slice(0, -1)
    })
  }
  return (
    <div className="roommate-setup">
      <div className="resident-confirmation">
        <input hidden name="residentTotal" readOnly value={roommates.length + 1} />
        <div className="resident-icons">

          {/* icon representing resident */}
          <div className="resident">
            <FontAwesomeIcon icon={getIcon(prospect.fields.sex)} style={{ fontSize: "50px", width: "50px" }} />
            <div className={"resident__title"}>YOU</div>
          </div>

          {/* plus icon */}
          <div className="resident">
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: "20px", width: "30px" }} />
          </div>

          {/* icons representing prospects */}
          {prospects.map((pros, i) => (
            <div key={i} className="resident prospect">
              <FontAwesomeIcon icon={getIcon(pros.fields.sex)} style={{ fontSize: "50px", width: "50px" }} />
              <div className="resident__title">{pros.fields.name.split(" ")[0].toUpperCase()}</div>
            </div>
          ))}

          {/* icons representing roommates */}
          {roommates.map((_, i) => (
            <RoommateSlots
              key={i}
              prospects={prospects}
              removeRoommate={removeRoommate}
              genderPrefs={roommateGroup.fields.genderPreference}
              fontSize={"50px"}
              width={"50px"}
            />
          ))}

          {(
            prospects.length > 0 ||
            roommateGroup.fields.roommateTotal >= session.roommateMax
          ) || < AddRoommateButton session={session} fontSize={"50px"} width={"50px"} />
          }
        </div>
        {
          prospects.length === 0 &&
          <div className="resident-estimate">
            <div style={{ fontSize: "30px" }}>
              {roommateGroup.fields.roommateTotal / bedrooms}
            </div>
            <div>
              residents/
            </div>
            <div>
              bedroom
            </div>
          </div>
        }
        {
          prospects.length !== 0 &&
          <div className="roommate-agreement">
            <label htmlFor="roommate-agreement" onClick={() => setChecked(!checked)}>
              <input type="checkbox" name="roommate-agreement" value={checked} />
              <span style={{ display: checkdisplay }}>X</span>
            </label>
            <div className="roommate-agreement__agreements">
              {error && <span className={"roommate-confirmation--error"}>{error}</span>}
              <span className="roommate-agreement--agreement">
                {sharing(prospects, roommates, bedrooms)}
              </span>
            </div>
          </div>
        }
      </div>
      <div className="roommate-setup_next-buttons">
        <NextOrBack rightOrLeft={"left"} onClick={() => setFormSection(0)} />
        <NextOrBack rightOrLeft={"right"} onClick={() => setFormSection(2)} />
      </div>
    </div>
  )
}

export default RoommateSetup
