import React from 'react'
import PropTypes from 'prop-types';
import RadioOptions from '../../../../../common/radios/RadioOptions';
import Input from '../../../../../common/input/Input'
import './ProspectInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

export const ProspectInfo = ({ session, errors = {}, updateSession, nextButton }) => {
  const { prospect } = session
  const onChange = (event) => {
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
        <RadioOptions onChange={onChange} valueName={"sex"} error={errors.sex} />
      </div>
      <div className="form-next">
        <div className="next-symbol" onClick={nextButton}>

          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </div>
    </>
  )
}

ProspectInfo.propTypes = {
  updateSession: PropTypes.func,
  session: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


export default ProspectInfo