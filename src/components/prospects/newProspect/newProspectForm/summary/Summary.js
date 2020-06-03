import React from 'react'
import SummaryBox from '../../../../apartments/SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import ResidentsMini from '../../ResidentsMini';
import './summary.css'
import { PropTypes } from 'prop-types';


export const Summary = ({
  apartment,
  session,
  history }) => {
  function summaryData() {
    const totalResidents = session.roommateGroup.fields.prospects.length + session.roommates.length + 1
    const object = {
      "Individual Rent": `$${Math.round(apartment.fields.rent / totalResidents)}`,
      "Total Rooms": apartment.fields.bedrooms,
      "Total Residents": <ResidentsMini totalResidents={totalResidents} />,
      "Residents Per-Room": totalResidents / apartment.fields.bedrooms,
      "Average Utilities": `$${Math.round(150 / totalResidents)}`,
      "Lease Duration": `${apartment.fields.leaseInMonths} Mo.`,
      "Lease Start": Date(apartment.fields.available).split(" ").slice(1, 3).join(" ")
    }
    return Object.entries(object)
  }
  return (
    <div className="summary">
      <div className="summary-header">
        <FontAwesomeIcon
          className="back-icon"
          icon={faArrowAltCircleLeft}
          onClick={() => history.push('/')}
        />
        <div className="summary-title">Summary</div>
        <div></div>
      </div>
      <div className="summary-content">
        {
          summaryData().map(([key, value]) => {
            return (
              <SummaryBox key={key} title={key} value={value} />

            )
          })
        }
      </div>
    </div>
  )
}

Summary.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  apartment: PropTypes.object.isRequired
}

export default Summary