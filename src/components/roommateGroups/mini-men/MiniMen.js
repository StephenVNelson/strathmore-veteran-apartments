import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const MiniMen = ({ bedrooms, roommateGroups }) => {
    const numberOfRoommateGroups = roommateGroups.length
    const [currentRoommateGroup, setCurrentRoommateGroup] = useState(0)
    const maxRoommates = roommateGroups[currentRoommateGroup]?.fields?.roommateTotal || (bedrooms * 2) + 1 //based on roommateGroup setting or number of bedrooms

    return (
        <div className="miniMenContainer">
            {new Array(maxRoommates).fill().map((_, i) => {
                return (
                    <div key={i} className="miniMan">
                        <FontAwesomeIcon icon={faCoffee} />
                    </div>
                )
            })}
        </div>
    )
}

export default MiniMen