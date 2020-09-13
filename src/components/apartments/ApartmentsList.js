import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Apartment from "./apartment/Apartment"
import { connect } from "react-redux"
import { newRoommateGroup } from '../../../tools/mockData'
import './ApartmentsList.css'
import { addStateDataToApartments } from './dataHelpers'

const ApartmentsList = ({
  apartments
}) => {

  return (<div className="apartment-list">
    {apartments.map(apartment => {
      return <Apartment
        key={apartment.id}
        apartment={apartment}
      />
    })}
  </div>)
}

ApartmentsList.propTypes = {
  apartments: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const apartments = addStateDataToApartments(state)
  return { apartments }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsList);
