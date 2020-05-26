import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { newApartment, newRoommateGroup, newProspect } from '../../../../tools/mockData'
import { createRoommates, updateRoommates } from '../../../redux/actions/roommateActions';
import ResidentsMini from './ResidentsMini';
import NewProspectForm from './NewProspectForm';
import { saveProspect } from '../../../redux/actions/prospectActions';

const NewProspect = ({
  apartment,
  roommateGroup,
  prospects,
  roommates,
  createRoommates,
  updateRoommates,
  saveProspect
}) => {
  const totalResidents = roommateGroup.fields.prospects.length + roommates.group.length + 1
  const roommateMax = apartment.fields.bedrooms * 2 + 1


  useEffect(() => {
    //Roommates (open slots for prospects to join)
    if (!roommates.id && apartment.id && roommateGroup.fields) {
      const newRoommates = {
        id: apartment.id,
        totalResidents,
        roommateMax,
        genderPrefs: "other"
      }
      if (!roommateGroup.id) {
        createRoommates({ ...newRoommates, group: [] })
      } else {
        const roommateNumber = roommateGroup.fields.roommateTotal - roommateGroup.fields.prospects.length - 1
        const roommatesConstructor = [...new Array(roommateNumber)].map(rm => ({ sex: "other" }))
        createRoommates({ ...newRoommates, group: roommatesConstructor })
      }
    }
  }, [apartment, roommateGroup])

  // ERROR HANDLING
  const [errors, setErrors] = useState({})
  const formIsValid = (e) => {
    const { name, phone, email, sex } = prospect.fields;
    const agreement = e.target.elements?.["roommate-agreement"]
    const errors = {};
    const extractedPhoneNumbers = (phone.match(/\d+/g) || []).join("")
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    // debugger
    if (agreement && agreement.value == "false") errors.agreement = "You must agree to the roommate group arrangement"
    if (!name) errors.name = "Name is required.";
    if (extractedPhoneNumbers.length < 10) errors.phone = "Phone must have at least 10 digits";
    if (!phone) errors.phone = "Phone is required";
    if (!emailValidation.test(email)) errors.email = "Must submit email with correct format";
    if (!email) errors.email = "Email is required";
    if (!sex) errors.sex = "Gender is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }
  const handleForm = async (e) => {
    e.preventDefault();

    // validation
    if (!formIsValid(e)) { return }
    debugger
    // 1) Save prospect
    const createdProspect = await saveProspect({ fields: { ...prospect.fields } })

    // 2) Save new Roomate Group
    const newProspects = [...prospects, createdProspect].map(prospect => prospect.id)
    const blabla = {
      ...roommateGroup,
      fields: {
        ...roommateGroup.fields,
        roommateTotal: roommates.totalResidents,
        genderPreference: roommateGroup.fields.genderPreference || roommates.genderPreference,
        prospects: newProspects,
        apartment: roommateGroup.fields.apartment || [roommates.id]
      }
    }
    const createdRoommateGroup = await saveRoommateGroup(
      // addRemoveProperties(newRoommateGroup, { prospects: newProspects }, ["name"])
    )

    // 3) Add new Roommate Group to newly created prospect
    saveProspect(
      addRemoveProperties(createdProspect, { roommateGroup: [createdRoommateGroup.id] }, [])
    )

    // 4) Adds Roommate Group to apartment IF it was just created
    if (!newRoommateGroup.id) {
      saveApartment(addRemoveProperties(apartment, { roommateGroup: [createdRoommateGroup.id] }, []))
    }
  }

  const updateRoommateGender = (e) => {
    updateRoommates({ ...roommates, genderPrefs: e.target.value })
  }

  // PROSPECT
  const [prospect, setProspect] = useState({
    ...newProspect,
    fields: { ...newProspect.fields }
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProspect(prevProspect => {
      const newProspect = { ...prevProspect, fields: { ...prevProspect.fields, [name]: value } }
      return newProspect
    });
  }

  function summaryData() {
    return {
      "Individual Rent": `$${Math.round(apartment.fields.rent / totalResidents)}`,
      "Total Rooms": apartment.fields.bedrooms,
      "Total Residents": <ResidentsMini totalResidents={totalResidents} />,
      "Residents Per-Room": totalResidents / apartment.fields.bedrooms,
      "Average Utilities": `$${Math.round(150 / totalResidents)}`,
      "Lease Duration": `${apartment.fields.leaseInMonths} Mo.`,
      "Lease Start": Date(apartment.fields.available).split(" ").slice(1, 3).join(" ")
    }
  }

  return (
    // <div>{roommates.group.length}</div>
    <>
      {
        (apartment.id && roommates.id) && <NewProspectForm
          apartment={apartment}
          roommateGroup={roommateGroup}
          prospects={prospects}
          prospect={prospect}
          errors={errors}
          handleForm={handleForm}
          handleChange={handleChange}
          summaryData={summaryData()}
          roommates={roommates}
          updateRoommateGender={updateRoommateGender}
        />
      }
    </>
  )
}


const mapDispatchToProps = {
  createRoommates,
  updateRoommates,
  saveProspect
}

function pluckFromState(collection, id) {
  return collection && collection.find(item => item.id === id)
}

function mapStateToProps(state, ownProps) {
  const apartments = state.apartments || {}
  const apartment = apartments.records ?
    apartments.records.find(apartment => apartment.fields.unit === ownProps.match.params.slug) :
    newApartment
  const roommateGroup = pluckFromState(state.roommateGroups.records, apartment.fields.roommateGroup?.[0]) ||
    newRoommateGroup
  const prospects = state.prospects.records && roommateGroup.fields.prospects.map(
    p => pluckFromState(state.prospects.records, p)
  ) || []
  const roommates = pluckFromState(state.roommates, apartment.id) || { id: null, group: [] }
  return {
    apartment,
    roommateGroup,
    prospects,
    roommates,
    newProspect
  }
}

NewProspect.propTypes = {
  apartment: PropTypes.object.isRequired,
  roommateGroup: PropTypes.object.isRequired,
  prospects: PropTypes.array.isRequired,
  roommates: PropTypes.object.isRequired,
  createRoommates: PropTypes.func.isRequired,
  updateRoommates: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProspect)