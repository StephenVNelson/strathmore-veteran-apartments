import React from 'react';
import PropTypes from "prop-types";

const Apartment = ({ apartment }) => {
  const a = apartment.fields
  const building = a.building.fields;
  const fullAddress = `${building?.address}\n${building?.city}, ${building?.state} ${building?.zipCode}`
  const roommateGroup = a.roommateGroup.fields
  const rent = Math.round(a.rent / ((roommateGroup?.prospects.length + 1) || 1))
  // get the rent and divide it by total number of people
  const sharing = "Private Room"
  return (
    <li>
      <div className="apartment-card">
        <div className="photo-container"></div>
        <div className="apartment-info">
          <ul>
            <li>{fullAddress}</li>
            <li>Apt. {a.unit}</li>
            <li>{a.Bedrooms} bedroom {a.bedrooms} bathroom, {a.sqft} sq/ft.</li>
            <li>${rent}/month</li>
            <li>{sharing}</li>
            <li>lease: {a.leaseInMonths} months</li>
          </ul>
        </div>
      </div>
    </li>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired
}

export default Apartment;