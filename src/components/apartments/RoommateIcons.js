import React from 'react'
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'

const RoommateIcons = ({ prospect }) => {
  const icon = prospect.sex === 'male' ? faMale : faFemale
  return (<span className="roommateIcons"> <FontAwesomeIcon icon={icon} /></span>)
}

RoommateIcons.propTypes = {
  prospect: PropTypes.object.isRequired
}

export default RoommateIcons