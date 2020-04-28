import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import NewProspects from '../prospects/NewProspects';
import Button from '../common/Button';
import SummaryBox from './SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import RoommateConfirmation from './RoommateConfirmation';
import RadioOptions from '../common/RadioOptions';

const base_url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`
console.log(base_url)


const ApplyModal = ({ apartment, toggleForm, handleForm }) => {
  const [applicant, setApplicant] = useState({
    name: "Stephen Nelson",
    phone: "208-891-8492",
    email: "stephen@stephen.com",
    gender: "male"
  })
  const applicantGenderSelect = (e) => {
    const gender = e.target.id.split('-')[0]
    setApplicant({ ...applicant, gender })
    // setSelected(e.target.id)
  }

  const addRoommate = () => {
    if (totalResidents < roommateMax) { setRoommates([...roommates, { gender: applicant.gender }]) }
  }
  const removeRoommate = () => {
    setRoommates(roommates.slice(0, -1))
  }
  const updateRoommateGender = (e) => {
    const gender = e.target.id.split('-')[0]
    setRoommates(roommates.map(rm => ({ ...rm, gender })))
  }

  const [roommates, setRoommates] = useState([])
  const prospects = (apartment.roommateGroup.fields?.prospects || [])
  const totalResidents = roommates.length + prospects.length + 1
  const roommateMax = (apartment.bedrooms * 2) + 1

  const displayResidents = (totalResidents) => {
    return [...Array(totalResidents)].map((_, i) => <FontAwesomeIcon key={i} style={{ margin: "2px" }} icon={faMale} />)
  }
  const summaryData = {
    "Individual Rent": `$${Math.round(apartment.rent / totalResidents)}`,
    "Total Rooms": apartment.bedrooms,
    "Total Residents": displayResidents(totalResidents),
    "Residents Per-Room": totalResidents / apartment.bedrooms,
    "Average Utilities": `$${Math.round(150 / totalResidents)}`,
    "Lease Duration": `${apartment.leaseInMonths} Mo.`,
    "Lease Start": Date(apartment.available).split(" ").slice(1, 3).join(" ")
  }

  const thirdStep = prospects.length > 0 ? "" : (
    <div className="step">
      <div className="new-prospect--step">3. specify roommate details</div>
      <div>select your roommate gender preferences</div>
      <RadioOptions setterFunction={updateRoommateGender} valueName={"genderPreference"} />
    </div>
  )
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="summary">
          <div className="close" onClick={toggleForm}><FontAwesomeIcon icon={faTimesCircle} /></div>
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
        <div className="new-prospect--container">
          <form className="new-prospect--form" onSubmit={handleForm}>
            <div className="step">
              <div className="new-prospect--step">1. enter your information</div>
              <NewProspects setterFunction={applicantGenderSelect} appliant={applicant} />
            </div>
            <div className="step">
              <div className="new-prospect--step">2. {prospects.length == 0 ? "add desired roommate slots" : "verify roommates"}</div>
              <RoommateConfirmation prospects={prospects} applicant={applicant} addRoommate={addRoommate} removeRoommate={removeRoommate} totalResidents={totalResidents} roommateMax={roommateMax} roommates={roommates} bedrooms={apartment.bedrooms} />
            </div>
            {thirdStep}
            <div className="main-button--container">
              <Button style={{ fontSize: "20px", padding: "0.5% 4%", borderRadius: "25px" }}>SUBMIT</Button>
            </div>
          </form>
        </div>
      </div>
    </div>)
}

ApplyModal.propTypes = {
  apartment: PropTypes.object,
  toggleForm: PropTypes.func,
  handleForm: PropTypes.func,
}
export default ApplyModal