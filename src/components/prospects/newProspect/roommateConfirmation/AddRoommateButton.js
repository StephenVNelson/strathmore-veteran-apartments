import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faPlus } from '@fortawesome/free-solid-svg-icons'
import { updateRoommates } from '../../../../redux/actions/roommateActions'

const AddRoommateButton = ({
  roommates,
  updateRoommates
}) => {
  const getIcon = (gender) => gender === "female" ? faFemale : faMale

  const addRoommate = () => {
    if (roommates.totalResidents < roommates.roommateMax) {
      const newTotal = roommates.totalResidents + 1
      updateRoommates({
        ...roommates,
        totalResidents: newTotal,
        group: [...roommates.group, { sex: roommates.genderPrefs }]
      })
    }
  }


  return (
    <div className="resident resident--add" onClick={addRoommate}>
      <FontAwesomeIcon icon={getIcon(roommates.genderPrefs)} style={{ fontSize: "90px", width: "50px" }} />
      <span>+</span>
      <div className="resident__title">ADD</div>
    </div>
  )
}

const mapDispatchToProps = {
  updateRoommates
}

// function mapStateToProps(state) {
//   return {
//     roommates: state.roommates
//   }
// }

export default connect(null, mapDispatchToProps)(AddRoommateButton)