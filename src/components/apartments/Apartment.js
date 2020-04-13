import React from 'react';
import PropTypes from "prop-types";

const Apartment = ({ apartment }) => {
  const building = apartment.fields.Building.fields;
  return (
    <li>
      <div className="apartment-card">
        <div className="photo-container"></div>
        <div className="apartment-info">
          <ul>
            <li>{building.City}</li>
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