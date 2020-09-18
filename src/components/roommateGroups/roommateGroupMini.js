import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import MiniMen from './mini-men/MiniMen'

const RoommateGroupMini = ({ apartment }) => {
  const numberOfRoommateGroups = apartment.fields.roommateGroup.length
  const maxRoommates = apartment.fields.roommateGroup[0]?.fields?.roommateTotal || (apartment.fields.bedrooms * 2) + 1 //based on roommateGroup setting or number of bedrooms
  const roommateGroups = apartment.fields.roommateGroup
  // const startingRoommateGroup = roommateGroups.length > 0 ? 0 :
  const [currentRoommateGroup, setCurrentRoommateGroup] = useState(0)
  const showLeftArrow = currentRoommateGroup > 0
  const showRightArrow = currentRoommateGroup < (numberOfRoommateGroups - 1)
  return (
    <div className="roommateGroupMini">
      {showLeftArrow && <div className="arrow">
        < FontAwesomeIcon icon={faArrowCircleRight} />
      </div>}
      <MiniMen roommateGroup={roommateGroups[currentRoommateGroup] || []} bedrooms={apartment.fields.bedrooms} />
      {showRightArrow && <div className="arrow">
        < FontAwesomeIcon icon={faArrowCircleLeft} onCLick={() => setCurrentRoommateGroup(currentRoommateGroup + 1)} />
      </div>}
    </div>
  )
}

export default RoommateGroupMini