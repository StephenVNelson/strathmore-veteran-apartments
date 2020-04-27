import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import Button from '../common/Button';

const RoommateConfirmation = ({ prospects, applicant }) => {
  const getIcon = (gender) => gender === "male" ? faMale : faFemale
  return (
    <div className="resident-confirmation">
      <div className="resident">
        <FontAwesomeIcon icon={getIcon(applicant.gender)} style={{ fontSize: "90px" }} />
      </div>
      <div className="resident">
        <FontAwesomeIcon className="resident--add" icon={getIcon(applicant.gender)} />
        <span>+</span>
      </div>
      {/* <div>{prospects.length}</div> */}
    </div>
  )
}

RoommateConfirmation.propTypes = {
  prospects: PropTypes.array,
  applicant: PropTypes.object
}

export default RoommateConfirmation