import React from 'react';
import PropTypes from "prop-types";

const Apartment = ({ apartment }) => {
  const a = apartment.fields
  const building = a?.building?.fields;
  const fullAddress = `${building?.address}\n${building?.city}, ${building?.state} ${building?.zipCode}`
  // get the rent and divide it by total number of people
  const rent = a.Rent
  const sharing = "Private Room"
  return (
    <li>
      <div className="apartment-card">
        <div className="photo-container"></div>
        <div className="apartment-info">
          <ul>
            <li>{fullAddress}</li>
            <li>Apt. {a.Unit}</li>
            <li>{a.Bedrooms} bedroom {a.Bedrooms} bathroom, {a.SqFt} sq/ft.</li>
            <li>${rent}/month</li>
            <li>{sharing}</li>
            <li>lease: {a["Lease In Months"]} months</li>
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