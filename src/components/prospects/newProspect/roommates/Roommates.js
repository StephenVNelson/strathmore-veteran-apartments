import React from 'react'
import { PropTypes } from 'prop-types';
import RoommateConfirmation from '../roommateConfirmation/RoommateConfirmation';

const Roommates = ({
  apartment,
  roommates,
  prospects,
  prospect,
  errors,
  session
}) => {

  return (
    <div className="step">
      <div className="new-prospect--step">2. {prospects.length == 0 ? "add desired roommate slots" : "verify roommates"}</div>
      <RoommateConfirmation
        prospects={prospects}
        prospect={prospect}
        roommates={roommates}
        bedrooms={apartment.fields.bedrooms}
        error={errors.agreement}
        session={session}
      />
    </div>
  )
}

Roommates.propTypes = {
  prospects: PropTypes.array.isRequired
}

export default Roommates