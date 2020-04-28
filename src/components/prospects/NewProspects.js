import React from 'react'
import PropTypes from 'prop-types';
import RadioOptions from '../common/RadioOptions';



const NewProspects = ({ setterFunction }) => {
  return (
    <div className="new-prospect--info">
      <div className="new-prospect--inputs">
        <input type="text" name="name" placeholder="full name" className="new-prospect--input" />
        <input type="text" name="phone" placeholder="phone" className="new-prospect--input" />
        <input type="text" name="email" placeholder="email" className="new-prospect--input" />
      </div>
      <RadioOptions setterFunction={setterFunction} valueName={"gender"} />
    </div>
  )
}

NewProspects.propTypes = {
  setterFunction: PropTypes.func,
}

export default NewProspects