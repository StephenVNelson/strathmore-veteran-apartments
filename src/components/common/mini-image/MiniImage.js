import React from 'react'
import './MiniImage.css'


const MiniImage = ({ unit, mainPhoto }) => {

    return (
        <div className="apartment-photo" style={{ backgroundImage: `url(${mainPhoto})` }}>
            <span className="rectangle apartment-unit">APT {unit}</span>
        </div>
    )
}

export default MiniImage