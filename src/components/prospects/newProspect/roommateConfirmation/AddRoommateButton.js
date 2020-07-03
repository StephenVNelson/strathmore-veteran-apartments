import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import { updateSession } from '../../../../redux/actions/sessionActions'
import { PropTypes } from 'prop-types';

const AddRoommateButton = ({
  session,
  updateSession,
  fontSize,
  width
}) => {
  const getIcon = (gender) => gender === "female" ? faFemale : faMale
  const { roommates, roommateGroup } = session
  const addRoommate = () => {
    if (roommateGroup.fields.roommateTotal < session.roommateMax) {
      const newTotal = roommateGroup.fields.roommateTotal + 1
      updateSession({
        ...session,
        roommateGroup: { ...roommateGroup, fields: { ...roommateGroup.fields, roommateTotal: newTotal } },
        roommates: [...roommates, { sex: roommateGroup.fields.genderPreference }]
      })
    }
  }


  return (
    <div className="resident resident--add" onClick={addRoommate}>
      <FontAwesomeIcon icon={getIcon(roommateGroup.fields.genderPreference)} style={{ fontSize: fontSize, width: width }} />
      <span>+</span>
      <div className="resident__title">ADD</div>
    </div>
  )
}

AddRoommateButton.propTypes = {
  session: PropTypes.object.isRequired,
  updateSession: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateSession
}

// function mapStateToProps(state) {
//   return {
//     session: state.session
//   }
// }

export default connect(null, mapDispatchToProps)(AddRoommateButton)