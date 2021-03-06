import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import ProspectInfo from './steps/prospectInfo/ProspectInfo'
import * as applicationHelpers from './ApplicationHelpers'
import FormContainer from './steps/FormContainer'
import RoommateSetup from './steps/roommatesetup/RoommateSetup'
import Submit from './steps/submit/Submit'

const Application = ({
  apartment,
  session,
  updateSession,
  roommates,
  prospect,
  prospects,
  saveProspect,
  saveRoommateGroup,
  saveApartment,
  createAlert,
  setCardMode
}) => {

  const [errors, setErrors] = useState({})
  const handleForm = async (e) => {
    // e.preventDefault();

    // validation
    // if (!applicationHelpers.formIsValid(e, session.prospect, setErrors)) { return }
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
    setCardMode("photo")
    createAlert(`You've successfully signed up for Unit ${apartment.fields.unit}`)
    createAlert(`You will be contacted by one of our representatives soon.`)
  }

  const [formSection, setFormSection] = useState(0)

  const updateRoommateGender = (e) => {
    const roommateGroup = {
      ...session.roommateGroup,
      fields: { ...session.roommateGroup.fields, genderPreference: e.target.value }
    }
    updateSession({ ...session, roommateGroup })
  }

  const nextButton = (formPage) => {
    const validForm = (applicationHelpers.formIsValid(null, session.prospect, setErrors))
    if (!validForm) return
    setFormSection(formPage)
  }

  return (
    <>
      {
        <FormContainer
          unit={apartment.fields.unit}
          step={formSection + 1}
        >
          {[
            <ProspectInfo
              key={0}
              session={session}
              errors={errors}
              updateSession={updateSession}
              nextButton={() => nextButton(1)}
              gender={session.prospect.fields.sex}
            />,
            <RoommateSetup
              key={1}
              roommateGroup={session.roommateGroup}
              updateSession={updateSession}
              session={session}
              roommates={roommates}
              prospect={prospect}
              prospects={prospects}
              error={errors.agreement}
              bedrooms={apartment.fields.bedrooms}
              nextButton={nextButton}
              fontSize={"50px"}
              width={"35px"}
              updateRoommateGender={updateRoommateGender}
            />,
            <Submit
              key={2}
              nextButton={nextButton}
              unit={apartment.fields.unit}
              handleForm={handleForm}
            />
          ][formSection]
          }
        </FormContainer>
      }
    </>
  )
}

Application.propTypes = {
  apartment: PropTypes.object.isRequired,
  roommates: PropTypes.array.isRequired,
  saveApartment: PropTypes.func.isRequired,
  // roommateGroup: PropTypes.object.isRequired,
  saveRoommateGroup: PropTypes.func.isRequired,
  prospects: PropTypes.array.isRequired,
  prospect: PropTypes.object.isRequired,
  // createSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  saveProspect: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
}

export default Application