import React from 'react'
import PropTypes from 'prop-types';
import RadioOptions from '../common/RadioOptions';
import Input from '../common/input/Input'



const NewProspects = ({ onChange, prospect, errors = {} }) => {
  return (
    <div className="new-prospect--info">
      <div className="new-prospect--inputs">
        <Input name={"name"} placeholder={"full name"} value={prospect.fields.name} error={errors.name} onChange={onChange} />
        <Input name={"phone"} placeholder={"phone"} value={prospect.fields.phone} error={errors.phone} onChange={onChange} />
        <Input name={"email"} placeholder={"email"} value={prospect.fields.email} error={errors.email} onChange={onChange} />
      </div>
      <RadioOptions onChange={onChange} valueName={"sex"} error={errors.sex} />
    </div>
  )
}

NewProspects.propTypes = {
  onChange: PropTypes.func,
  prospect: PropTypes.object
}

export default NewProspects