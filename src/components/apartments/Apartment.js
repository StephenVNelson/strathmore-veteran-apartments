import React from 'react';
import PropTypes from "prop-types";

function shareStatement(roommateGroup) {
  if (!roommateGroup) { return "Whole apartment" }
  let males = roommateGroup.prospects.filter(p => p.fields.sex === "Male").length
  let females = roommateGroup.prospects.filter(p => p.fields.sex === "Female").length
  if (males && females) {
    return `shared apartment with ${males} males and ${females}`
  }
  if (males) {
    return `shared apartment with ${males} males`
  }
  if (females) {
    return `shared apartment with ${females} females`
  }
}

const Apartment = ({ apartment }) => {
  const a = apartment.fields
  const building = a.building.fields;
  const roommateGroup = a.roommateGroup.fields
  const rent = Math.round(a.rent / ((roommateGroup?.prospects.length + 1) || 1))
  const sharing = shareStatement(roommateGroup)
  return (
    <div className="card">
      <div className="card-photo">
        {/* <img className="card-photo--photo" src="https://via.placeholder.com/300" alt="" /> */}
      </div>

      <div id="Details">
        <div className="upper-details">
          <div className="upper-details--address">
            <span >{building?.address}<br />{building?.city}, {building?.state} {building?.zipCode}</span>
          </div>
          <div className="upper-details--unit">
            <div className="upper-details--unit-apt">
              <span>APT.</span>
            </div>
            <div className="upper-details--unit-num">
              <span>{a.unit}</span>
            </div>
          </div>
        </div>
        <svg className="upper-lower-divider" viewBox="0 0 306 1">
          <path fill="transparent" stroke="rgba(112,112,112,1)" strokeWidth="3px" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="4" shapeRendering="auto" id="Line_1" d="M 0 0 L 306 1">
          </path>
        </svg>
        <div className="lower-details">
          <div className="lower-details--bedrooms">
            <span>1 bedroom 1 bathroom, 450 sq/ft.</span>
          </div>
          <div className="lower-details--price">
            <span>${rent}</span><span className="lower-details--price-sm">/month</span>
          </div>
          <div className="lower-details--sharing">
            <span>{sharing}<br />lease: {a.leaseInMonths} months</span>
          </div>
        </div>

        <div className="button">
          <button className="button--button">
            <span className="button--text">APPLY</span>
          </button>
        </div>

      </div >


    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired
}

export default Apartment;