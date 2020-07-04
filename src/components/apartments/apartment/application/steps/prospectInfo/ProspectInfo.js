import React from 'react'
import PropTypes from 'prop-types';
import RadioOptions from '../../../../../common/radios/RadioOptions';
import Input from '../../../../../common/input/Input'
import './ProspectInfo.css'
import NextOrBack from '../../../../../common/nextorback/NextOrBack';

function ProspectInfo({ session, errors = {}, updateSession, nextButton, gender }) {
  const { prospect } = session
  function onChange(event) {
    const { name, value } = event.target;
    const newProspect = { ...prospect, fields: { ...prospect.fields, [name]: value } }
    updateSession({ ...session, prospect: newProspect })
  }

  return (
    <>
      <div className="prospect-info-inputs">
        <Input name={"name"} value={prospect.fields.name} error={errors.name} onChange={onChange} />
        <Input name={"phone"} value={prospect.fields.phone} error={errors.phone} onChange={onChange} />
        <Input name={"email"} value={prospect.fields.email} error={errors.email} onChange={onChange} />
      </div>
      <div className="prospect-gender-container">
        <div style={{ marginBottom: "5px" }}>gender</div>
        <RadioOptions
          onChange={onChange}
          valueName={"sex"}
          error={errors.sex}
          gender={gender}
          sessionID={session.id}
        />
      </div>
      <NextOrBack onClick={nextButton} rightOrLeft={"right"} />
    </>
  )
}

ProspectInfo.propTypes = {
  updateSession: PropTypes.func,
  session: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


export default ProspectInfo