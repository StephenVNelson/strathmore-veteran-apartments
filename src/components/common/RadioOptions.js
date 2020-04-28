import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import Radio from './Radio';

const RadioOptions = ({ setterFunction, valueName }) => {
  const radioClick = (e) => {
    setterFunction(e)
    setSelected(e.target.id.split('-')[0])
  }
  const [selected, setSelected] = useState("other");
  return (
    <ul className="button-options">
      {["male", "female", "any"].map(id => {
        return (
          <li key={`${id}-${valueName}`}>
            <Radio id={`${id}-${valueName}`} selected={selected} name={valueName} radioClick={radioClick} />
          </li>
        )
      })}
    </ul>
  )
}

RadioOptions.propTypes = {
  setterFunction: PropTypes.func,
  valueName: PropTypes.string
}

export default RadioOptions