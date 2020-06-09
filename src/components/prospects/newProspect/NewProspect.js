import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { newApartment, newRoommateGroup, newSession } from '../../../../tools/mockData'
import { createSession, updateSession } from '../../../redux/actions/sessionActions';
import NewProspectForm from './newProspectForm/NewProspectForm';
import { saveProspect } from '../../../redux/actions/prospectActions';
import { saveRoommateGroup } from '../../../redux/actions/roommateGroupActions';
import { saveApartment } from '../../../redux/actions/apartmentActions';

const NewProspect = ({
  apartment,
  saveApartment,
  roommateGroup,
  saveRoommateGroup,
  prospects,
  session,
  createSession,
  updateSession,
  saveProspect,
  history
}) => {
  const { roommates, prospect } = session

  const roommateConstructor = () => {
    let group = []
    if (apartment.fields.roommateGroup?.[0]) {
      const roommateNumber = roommateGroup.fields.roommateTotal - roommateGroup.fields.prospects.length - 1
      group = [...new Array(roommateNumber)].map(() => ({ sex: "other" }))
    }
    return group
  }

  useEffect(() => {
    let loadedRoommateGroup = false
    if (apartment.id) {
      if (apartment.fields.roommateGroup?.[0]) {
        if (roommateGroup.id) {
          loadedRoommateGroup = true
        }
      } else {
        loadedRoommateGroup = true
      }
    }
    if (!session.id && apartment.id && loadedRoommateGroup) {
      const roommates = roommateConstructor()
      const roommateMax = apartment.fields.bedrooms * 2 + 1
      const groupApartment = [roommateGroup.fields?.apartment?.[0] || apartment.id]
      const newRoommateGroup = {
        id: roommateGroup.id,
        fields: {
          prospects: roommateGroup.fields.prospects,
          genderPreference: roommateGroup.fields.genderPreference,
          roommateTotal: roommateGroup.fields.roommateTotal,
          apartment: groupApartment
        }
      }
      createSession({
        ...session,
        id: apartment.id,
        roommates,
        roommateMax,
        roommateGroup: newRoommateGroup
      })
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

    // 1) Save prospect
    const createdProspect = await saveProspect({ fields: { ...session.prospect.fields } })

    // 2) Save new Roomate Group
    const newProspects = [...prospects, createdProspect].map(prospect => prospect.id)
    const newRoommateGroup = {
      ...session.roommateGroup,
      fields: { ...session.roommateGroup.fields, prospects: newProspects }
    }
    const createdRoommateGroup = await saveRoommateGroup(newRoommateGroup)

    // 3) Add new Roommate Group to newly created prospect
    saveProspect(
      // addRemoveProperties(createdProspect, { roommateGroup: [createdRoommateGroup.id] }, [])
      { ...createdProspect, fields: { ...createdProspect.fields, roommateGroup: [createdRoommateGroup.id] } }
    )

    // 4) removes a roommate from the session
    updateSession({
      ...session,
      roommates: session.roommates.slice(0, -1),
      roommateGroup: { ...createdRoommateGroup }
    })

    // 5) Adds Roommate Group to apartment IF it was just created
    if (!newRoommateGroup.id) {
      saveApartment({ ...apartment, fields: { ...apartment.fields, roommateGroup: [createdRoommateGroup.id] } })
    }
    history.push('/')
  }

  const updateRoommateGender = (e) => {
    const roommateGroup = {
      ...session.roommateGroup,
      fields: { ...session.roommateGroup.fields, genderPreference: e.target.value }
    }
    updateSession({ ...session, roommateGroup })
  }
  // console.log("pros length", prospects.length)
  // console.log("roommate total", roommateGroup.fields.roommateTotal)
  // if (prospects.length >= roommateGroup.fields.roommateTotal) { history.push('/') }
  // console.log(roommateGroup)



  return (
    <>
      {
        (apartment.id && session.id) && <NewProspectForm
          apartment={apartment}
          roommateGroup={roommateGroup}
          prospects={prospects}
          prospect={prospect}
          errors={errors}
          handleForm={handleForm}
          roommates={roommates}
          updateRoommateGender={updateRoommateGender}
          session={session}
          history={history}
        />
      }
    </>
  )
}


const mapDispatchToProps = {
  createSession,
  updateSession,
  saveProspect,
  saveRoommateGroup,
  saveApartment
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
  const session = pluckFromState(state.session, apartment.id) || newSession
  return {
    apartment,
    roommateGroup,
    prospects,
    session
  }
}

NewProspect.propTypes = {
  apartment: PropTypes.object.isRequired,
  saveApartment: PropTypes.func.isRequired,
  roommateGroup: PropTypes.object.isRequired,
  saveRoommateGroup: PropTypes.func.isRequired,
  prospects: PropTypes.array.isRequired,
  createSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  saveProspect: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProspect)