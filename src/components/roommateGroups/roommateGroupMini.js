import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import MiniMen from './mini-men/MiniMen'

const RoommateGroupMini = ({ apartment }) => {
  const numberOfRoommateGroups = apartment.fields.roommateGroup.length
  const maxRoommates = apartment.fields.roommateGroup[0]?.fields?.roommateTotal || (apartment.fields.bedrooms * 2) + 1 //based on roommateGroup setting or number of bedrooms
  const [currentRoommateGroup, setCurrentRoommateGroup] = useState(0)

  return (
    <div className="miniMenContainer">
      {new Array(maxRoommates).fill().map((_, i) => {
        return (
          <MiniMen key={i} />
        )
      })}
    </div>
  )
}

export default RoommateGroupMini