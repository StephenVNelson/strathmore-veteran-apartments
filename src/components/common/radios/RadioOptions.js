import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import Radio from './Radio';
import './Radios.css'

function RadioOptions({ onChange, valueName, gender, sessionID }) {
  return (
    <ul className="button-options">
      {["male", "female", "other"].map(id => {
        return (
          <li key={`${sessionID}-${id}-${valueName}`}>
            <Radio id={`${sessionID}-${id}-${valueName}`} selected={gender} value={id} name={valueName} radioClick={onChange} sessionID={sessionID} />
          </li>
        )
      })}
    </ul>
  )
}

RadioOptions.propTypes = {
  setterFunction: PropTypes.func,
  valueName: PropTypes.string,
  onChange: PropTypes.func
}

export default RadioOptions