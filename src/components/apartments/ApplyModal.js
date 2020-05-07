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
import { saveApartment } from '../../redux/actions/apartmentActions';
import { saveRoommateGroup } from '../../redux/actions/roommateGroupActions';
import { saveProspect } from '../../redux/actions/prospectActions';


const ApplyModal = ({ apartment, roommateGroup, prospects, toggleForm, saveProspect, saveRoommateGroup, saveApartment, newProspect }) => {

  // ERROR HANDLING
  const [errors, setErrors] = useState({})
  const formIsValid = (e) => {
    const { name, phone, email, sex } = prospect.fields;
    const agreement = e.target.elements["roommate-agreement"].value
    const errors = {};
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!agreement) errors.agreement = "You must agree to the roommate group arrangement"
    if (!name) errors.name = "Name is required.";
    if (!phone) errors.phone = "Phone is required";
    if (!emailValidation.test(email)) errors.email = "Must submit email with correct format";
    if (!email) errors.email = "Email is required";
    if (!sex) errors.sex = "Gender is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  // FORM SUBMISSION
  const handleForm = async (e) => {
    e.preventDefault();
    if (!formIsValid(e)) { return }
    const createdProspect = await saveProspect(prospect)
    const newProspects = [...prospects, createdProspect].map(prospect => prospect.id)
    const createdRoommateGroup = await saveRoommateGroup({
      ...newRoommateGroup,
      fields: {
        ...newRoommateGroup.fields,
        prospects: newProspects
      }
    })
    saveProspect({
      ...createdProspect,
      fields: {
        ...createdProspect.fields,
        roommateGroup: [createdRoommateGroup.id]
      }
    })
    await saveApartment({ ...apartment, fields: { ...apartment.fields, roommateGroup: [createdRoommateGroup.id] } })
    toggleForm()
  }

  // ROOOMMATE GROUP
  const roommateMax = (apartment.fields.bedrooms * 2) + 1
  const initialRoommates = roommateGroup?.id ?
    [...new Array(roommateMax - prospects.length - 1)].map(() => ({ gender: "other" })) :
    []
  const [roommates, setRoommates] = useState(initialRoommates)
  const [newRoommateGroup, setNewRoommateGroup] = useState({
    ...roommateGroup,
    fields: { ...roommateGroup.fields, apartment: [apartment.id] }
  })
  const initialGender = roommateGroup?.id && initialRoommates.length > 0 ? prospects[0].fields.sex : "other"
  const [roommateGender, setRoommateGender] = useState(initialGender)
  // helper variables
  const totalResidents = roommates.length + prospects.length + 1


  // state changes
  const addRoommate = () => {
    if (totalResidents < roommateMax) {
      setRoommates([...roommates, { gender: roommateGender }])
      const fields = { ...newRoommateGroup.fields, roommateTotal: roommates.length + 2 }
      setNewRoommateGroup({ ...newRoommateGroup, fields })
      // console.log({ ...newRoommateGroup, fields })
    }
  }
  const removeRoommate = () => {
    const fields = { ...newRoommateGroup.fields, roommateTotal: (roommates.length + 1) - 1 }
    setNewRoommateGroup({ ...newRoommateGroup, fields })
    // console.log({ ...newRoommateGroup, fields })
    setRoommates(roommates.slice(0, -1))
  }
  const updateRoommateGender = (e) => {
    const gender = e.target.value
    const fields = { ...newRoommateGroup.fields, genderPreference: gender }
    setNewRoommateGroup({ ...newRoommateGroup, fields })
    console.log({ ...newRoommateGroup, fields })
    setRoommateGender(gender)
    setRoommates(roommates.map(rm => ({ ...rm, gender: roommateGender })))
  }

  // PROSPECT
  const [prospect, setProspect] = useState({
    ...newProspect
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProspect(prevProspect => {
      const newProspect = { ...prevProspect, fields: { ...prevProspect.fields, [name]: value } }
      return newProspect
    });
  }

  // Dynamic markup templates that change based on data
  const thirdStep = roommateGroup?.id ? "" : (
    <div className="step">
      <div className="new-prospect--step">3. specify roommate details</div>
      <div>select your roommate gender preferences</div>
      <RadioOptions onChange={updateRoommateGender} valueName={"genderPreference"} />
    </div>
  )
  const displayResidents = (totalResidents) => {
    return [...Array(totalResidents)].map((_, i) => <FontAwesomeIcon key={i} style={{ margin: "2px" }} icon={faMale} />)
  }

  // This object will be iterated through to create summary information
  const summaryData = {
    "Individual Rent": `$${Math.round(apartment.fields.rent / totalResidents)}`,
    "Total Rooms": apartment.fields.bedrooms,
    "Total Residents": displayResidents(totalResidents),
    "Residents Per-Room": totalResidents / apartment.fields.bedrooms,
    "Average Utilities": `$${Math.round(150 / totalResidents)}`,
    "Lease Duration": `${apartment.fields.leaseInMonths} Mo.`,
    "Lease Start": Date(apartment.fields.available).split(" ").slice(1, 3).join(" ")
  }

  // RETURN
  return (
    <div className="modal-container">
      <div className="modal-content">

        {/* summary section */}
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

        {/* form section */}
        <div className="new-prospect--container">
          <form className="new-prospect--form" onSubmit={handleForm}>

            {/* step 1 */}
            <div className="step">
              <div className="new-prospect--step">1. enter your information</div>
              <NewProspects onChange={handleChange} prospect={prospect} errors={errors} />
            </div>

            {/* step 2 */}
            <div className="step">
              <div className="new-prospect--step">2. {prospects.length == 0 ? "add desired roommate slots" : "verify roommates"}</div>
              <RoommateConfirmation prospects={prospects} prospect={prospect} addRoommate={addRoommate} removeRoommate={removeRoommate} totalResidents={totalResidents} roommateMax={roommateMax} roommates={roommates} bedrooms={apartment.fields.bedrooms} roommateGender={roommateGender} />
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
  newProspect: PropTypes.object,
  saveProspect: PropTypes.func,
  saveRoommateGroup: PropTypes.func,
  saveApartment: PropTypes.func,
  roommateGroup: PropTypes.object,
  prospects: PropTypes.array
}

const mapDispatchToProps = {
  saveApartment,
  saveRoommateGroup,
  saveProspect
}

const mapStateToProps = () => {
  return {
    newProspect
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplyModal)