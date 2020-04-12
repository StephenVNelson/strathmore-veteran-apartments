import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const CourseList = ({ apartments }) => (

  <ul>
    {apartments.map(apartment => {
      return (<li key={apartment.id}>{apartment.fields.Unit}</li>)
    })}
  </ul>
)

CourseList.propTypes = {
  apartments: PropTypes.array.isRequired
};

export default CourseList;
