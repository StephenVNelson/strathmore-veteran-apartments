import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddRoommateButton from './AddRoommateButton'
import { updateSession } from '../../../../redux/actions/sessionActions'
import './roommateConfirmation.css'
import sharing from './roommateConfirmationHelpers'
import RoommateSlots from './RoommateSlots';

const RoommateConfirmation = ({
  prospects,
  prospect,
  bedrooms,
  error,
  updateSession,
  session
}) => {
  const { roommates, roommateGroup } = session

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
        {prospects.map((prospect, i) => (
          <div key={i} className="resident">
            <FontAwesomeIcon icon={getIcon(prospect.fields.sex)} style={{ fontSize: "90px", width: "50px" }} />
            <div className="resident__title">{prospect.fields.name.split(" ")[0].toUpperCase()}</div>
          </div>
        ))}

        {/* icons representing roommates */}
        {roommates.map((_, i) => (
          <RoommateSlots
            key={i}
            prospects={prospects}
            removeRoommate={removeRoommate}
            genderPrefs={roommateGroup.fields.genderPreference}
          />
        ))}

        {(
          prospects.length > 0 ||
          roommateGroup.fields.roommateTotal >= session.roommateMax
        ) || < AddRoommateButton session={session} />
        }
      </div>
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
  )
}

RoommateConfirmation.propTypes = {
  prospects: PropTypes.array,
  prospect: PropTypes.object,
  addRoommate: PropTypes.func,
  updateSession: PropTypes.func,
  roommateMax: PropTypes.number,
  session: PropTypes.object,
  bedrooms: PropTypes.number,
  error: PropTypes.object
}

const mapDispatchToProps = {
  updateSession
}



export default connect(null, mapDispatchToProps)(RoommateConfirmation)