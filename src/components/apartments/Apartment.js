import React from 'react';
import PropTypes from "prop-types";

const Apartment = ({ apartment }) => {
  return (
    <div >
      <li>{apartment.fields.Unit}</li>
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired
}

export default Apartment;