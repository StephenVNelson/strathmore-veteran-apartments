import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import Radio from './Radio';
import './Radios.css'

function RadioOptions({ onChange, valueName, gender, session }) {
  // const [selected, setSelected] = useState(gender);
  console.log(session.id)
  return (
    <ul className="button-options">
      {["male", "female", "other"].map(id => {
        return (
          <li key={`${id}-${valueName}`}>
            <Radio id={`${id}-${valueName}`} selected={gender} value={id} name={valueName} radioClick={onChange} />
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