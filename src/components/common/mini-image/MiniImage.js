import React from 'react'


const MiniImage = ({ unit, mainPhoto }) => {

    return (
        <>
            <div className="apartment-photo" style={{ backgroundImage: `url(${mainPhoto})` }}>
                <span className="rectangle apartment-unit">APT {unit}</span>
            </div>
            {/* <div className="apartment-unit">{unit}</div> */}
        </>
    )
}

export default MiniImage