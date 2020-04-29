import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import NewProspects from '../prospects/NewProspects';
import Button from '../common/Button';
import SummaryBox from './SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import RoommateConfirmation from './RoommateConfirmation';
import RadioOptions from '../common/RadioOptions';
import { newProspect } from '../../../tools/mockData'

const base_url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`
console.log(base_url)


const ApplyModal = ({ apartment, toggleForm, handleForm, ...props }) => {

  const [prospect, setProspect] = useState({
    ...props.prospect,
    roommateGroup: apartment.roommateGroup?.id
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProspect(prevProspect => {
      const newProspect = { ...prevProspect, [name]: value }
      console.log(newProspect)
      return newProspect
    });
  }

  // ROOMATE SECTION
  const [roommates, setRoommates] = useState([])
  const [roommateGender, setRoommateGender] = useState("other")
  const addRoommate = () => {
    if (totalResidents < roommateMax) { setRoommates([...roommates, { gender: roommateGender }]) }
  }
  const removeRoommate = () => {
    setRoommates(roommates.slice(0, -1))
  }
  const updateRoommateGender = (e) => {
    const gender = e.target.id.split('-')[0]
    setRoommateGender(gender)
    setRoommates(roommates.map(rm => ({ ...rm, gender: roommateGender })))
  }

  // 3rd Step
  const thirdStep = apartment.roommateGroup.id ? "" : (
    <div className="step">
      <div className="new-prospect--step">3. specify roommate details</div>
      <div>select your roommate gender preferences</div>
      <RadioOptions onChange={updateRoommateGender} valueName={"genderPreference"} />
    </div>
  )


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



  // RETURN
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

            {/* step 1 */}
            <div className="step">
              <div className="new-prospect--step">1. enter your information</div>
              <NewProspects onChange={handleChange} prospect={prospect} />
            </div>

            {/* step 2 */}
            <div className="step">
              <div className="new-prospect--step">2. {prospects.length == 0 ? "add desired roommate slots" : "verify roommates"}</div>
              <RoommateConfirmation prospects={prospects} prospect={prospect} addRoommate={addRoommate} removeRoommate={removeRoommate} totalResidents={totalResidents} roommateMax={roommateMax} roommates={roommates} bedrooms={apartment.bedrooms} roommateGender={roommateGender} />
            </div>

            {/* optional step 3 */}
            {thirdStep}

            {/* submit */}
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
  prospect: PropTypes.object
}

const mapDispatchToProps = () => {
  return {}
}

const mapStateToProps = () => {
  return { prospect: newProspect }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplyModal)