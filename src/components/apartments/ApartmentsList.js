import React from "react";
import PropTypes from "prop-types";
import Apartment from "./Apartment"
// import { Link } from "react-router-dom";

const CourseList = ({ apartments }) => (

  <ul>
    {apartments.map(apartment => {
      return <Apartment key={apartment.id} apartment={apartment} />
    })}
  </ul>
)

CourseList.propTypes = {
  apartments: PropTypes.array.isRequired
};

export default CourseList;
