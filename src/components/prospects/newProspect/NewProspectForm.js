import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import NewProspects from '../NewProspects';
import Button from '../../common/button/Button';
import SummaryBox from '../../apartments/SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import RoommateConfirmation from './roommateConfirmation/RoommateConfirmation';
import RadioOptions from '../../common/RadioOptions';
import { newProspect } from '../../../../tools/mockData'
import Roommates from './roommates/Roommates';
import Summary from './newProspectForm/Summary';


const NewProspectForm = ({
  apartment,
  roommateGroup,
  prospects,
  prospect,
  newProspect,
  errors,
  roommates,
  summaryData,
  handleForm,
  handleChange,
  updateRoommateGender
}) => {



  // const addRemoveProperties = (obj, propsToAdd = {}, propsToDelete = []) => {
  //   let objCopy = { ...obj, fields: { ...obj.fields, ...propsToAdd } }
  //   propsToDelete.forEach(prop => {
  //     delete objCopy.fields[prop]
  //   })
  //   return objCopy
  // }

  // FORM SUBMISSION
  // const handleForm = async (e) => {

  //   // 1) Save prospect
  //   const createdProspect = await saveProspect({ fields: { ...prospect.fields } })

  //   // 2) Save new Roomate Group
  //   const newProspects = [...prospects, createdProspect].map(prospect => prospect.id)
  //   const createdRoommateGroup = await saveRoommateGroup(
  //     addRemoveProperties(newRoommateGroup, { prospects: newProspects }, ["name"])
  //   )

  //   // 3) Add new Roommate Group to newly created prospect
  //   // saveProspect(
  //   //   addRemoveProperties(createdProspect, { roommateGroup: [createdRoommateGroup.id] }, [])
  //   // )

  //   // 4) Adds Roommate Group to apartment IF it was just created
  //   if (!newRoommateGroup.id) {
  //     saveApartment(addRemoveProperties(apartment, { roommateGroup: [createdRoommateGroup.id] }, []))
  //   }
  // }




  const displayResidents = (totalResidents) => {
    return [...Array(totalResidents)].map((_, i) => <FontAwesomeIcon key={i} style={{ margin: "2px" }} icon={faMale} />)
  }

  return (
    <div className="modal-container">
      <div className="modal-content">

        <Summary summaryData={summaryData} />
        {/* 
        {/* form section */}
        <div className="new-prospect--container">
          <form className="new-prospect--form" onSubmit={handleForm}>

            {/* step 1 */}
            <div className="step">
              <div className="new-prospect--step">1. enter your information</div>
              <NewProspects onChange={handleChange} prospect={prospect} errors={errors} />
            </div>

            {/* step 2 */}
            <Roommates
              apartment={apartment}
              roommates={roommates}
              prospect={prospect}
              roommateGroup={roommateGroup}
              prospects={prospects}
              errors={errors}
            />

            {/* optional step 3 */}
            {!roommateGroup?.id && (
              <div className="step">
                <div className="new-prospect--step">3. specify roommate details</div>
                <div>select your roommate gender preferences</div>
                <RadioOptions
                  onChange={updateRoommateGender}
                  valueName={"genderPreference"}
                />
              </div>
            )}

            {/* submit */}
            <div className="main-button--container">
              <Button style={{ fontSize: "20px", padding: "0.5% 4%", borderRadius: "25px" }}>SUBMIT</Button>
            </div>
          </form>
        </div> */}


      </div>
    </div>)
}

NewProspectForm.propTypes = {
  apartment: PropTypes.object.isRequired,
  handleForm: PropTypes.func,
  // newProspect: PropTypes.object.isRequired,
  roommateGroup: PropTypes.object.isRequired,
  prospects: PropTypes.array.isRequired
}


export default NewProspectForm