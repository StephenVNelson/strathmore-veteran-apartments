import React from 'react'
import PropTypes from 'prop-types';
import RadioOptions from '../common/RadioOptions';



const NewProspects = ({ onChange, prospect }) => {
  return (
    <div className="new-prospect--info">
      <div className="new-prospect--inputs">
        <input type="text" name="name" placeholder="full name" className="new-prospect--input" onChange={onChange} value={prospect.fields.name} />
        <input type="text" name="phone" placeholder="phone" className="new-prospect--input" onChange={onChange} value={prospect.fields.phone} />
        <input type="text" name="email" placeholder="email" className="new-prospect--input" onChange={onChange} value={prospect.fields.email} />
      </div>
      <RadioOptions onChange={onChange} valueName={"sex"} />
    </div>
  )
}

NewProspects.propTypes = {
  onChange: PropTypes.func,
  prospect: PropTypes.object
}

export default NewProspects