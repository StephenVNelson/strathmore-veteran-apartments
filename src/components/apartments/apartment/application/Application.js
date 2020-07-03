import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { newApartment, newRoommateGroup, newSession } from '../../../../../tools/mockData'
import { createSession, updateSession } from '../../../../redux/actions/sessionActions';
import { saveProspect } from '../../../../redux/actions/prospectActions';
import { saveRoommateGroup } from '../../../../redux/actions/roommateGroupActions';
import { saveApartment } from '../../../../redux/actions/apartmentActions';
import ProspectInfo from './steps/prospectInfo/ProspectInfo'
import * as applicationHelpers from './ApplicationHelpers'
import FormContainer from './steps/FormContainer'
import RoommateSetup from './steps/roommatesetup/RoommateSetup'
import Submit from './steps/submit/Submit'

const Application = ({
  apartment,
  saveApartment,
  roommateGroup,
  saveRoommateGroup,
  prospects,
  session,
  createSession,
  updateSession,
  saveProspect
}) => {
  const { roommates, prospect } = session

  useEffect(() => {
    if (!session.id) {
      applicationHelpers.createSession(
        roommateGroup,
        apartment,
        createSession,
        session
      )
    }
  }, [])
  const [errors, setErrors] = useState({})
  const handleForm = async (e) => {
    e.preventDefault();

    // validation
    if (!applicationHelpers.formIsValid(e, prospect, setErrors)) { return }

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
  }

  const updateRoommateGender = (e) => {
    const roommateGroup = {
      ...session.roommateGroup,
      fields: { ...session.roommateGroup.fields, genderPreference: e.target.value }
    }
    updateSession({ ...session, roommateGroup })
  }

  const [formSection, setFormSection] = useState(0)

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
              nextButton={() => setFormSection(1)}
            />,
            <RoommateSetup key={1} />,
            <Submit key={2} />
          ][formSection]
          }
        </FormContainer>
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
  const { apartment, roommateGroup } = ownProps
  const prospects = state.prospects.records && roommateGroup.fields.prospects.map(
    p => pluckFromState(state.prospects.records, p)
  ) || []
  const session = pluckFromState(state.session, apartment.id) || newSession
  return {
    prospects,
    session
  }
}

Application.propTypes = {
  apartment: PropTypes.object.isRequired,
  saveApartment: PropTypes.func.isRequired,
  roommateGroup: PropTypes.object.isRequired,
  saveRoommateGroup: PropTypes.func.isRequired,
  prospects: PropTypes.array.isRequired,
  createSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  saveProspect: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)