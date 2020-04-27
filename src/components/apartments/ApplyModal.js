import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import NewProspects from '../prospects/NewProspects';
import Button from '../common/Button';
import SummaryBox from './SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import RoommateConfirmation from './RoommateConfirmation';
import RoommateDetails from './RoommateDetails';

const base_url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`
console.log(base_url)


const ApplyModal = ({ apartment }) => {
  const [totalResidents, setTotalResidents] = useState(
    (apartment?.roommateGroup?.fields?.prospects?.length || 0) + 1
  )
  const [applicant, setApplicant] = useState({
    name: "Stephen Nelson",
    phone: "208-891-8492",
    email: "stephen@stephen.com",
    gender: "male"
  })
  const displayResidents = (totalResidents) => {
    return [...Array(totalResidents)].map((_, i) => <FontAwesomeIcon key={i} icon={faMale} />)
  }
  const summaryData = {
    "Individual Rent": `$${Math.round(apartment.rent / totalResidents)}`,
    "Total Rooms": apartment.bedrooms,
    "Total Residents": displayResidents(totalResidents),
    "Residents Per-Room": null,
    "Average Utilities": `$${Math.round(150 / totalResidents)}`,
    "Lease Duration": `${apartment.leaseInMonths} Mo.`,
    "Lease Start": Date(apartment.available).split(" ").slice(1, 3).join(" ")
  }
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="summary">
          <div className="summary-title">Summary</div>
          <div className="summary-content">
            {
              Object.entries(summaryData).map(([key, value]) => {
                return (
                  <SummaryBox key={key} title={key} value={value} />

                )
              })
            }
          </div>
        </div>
        <div className="new-prospect--conatiner">
          <div className="new-prospect--step">1. enter your information</div>
          <form action="">
            <NewProspects />
            <div className="new-prospect--step">2. add desired roommate slots</div>
            <RoommateConfirmation prospects={apartment.roommateGroup.fields.prospects} applicant={applicant} />
            <div className="new-prospect--step">2. specify roommate details</div>
            <RoommateDetails />
            <div className="main-button--container">
              <Button style={{ fontSize: "20px", padding: "0.5% 4%", borderRadius: "25px" }}>SUBMIT</Button>
            </div>
          </form>
        </div>
      </div>
    </div>)
}

ApplyModal.propTypes = {
  apartment: PropTypes.object
}
export default ApplyModal