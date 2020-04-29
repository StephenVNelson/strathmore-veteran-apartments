import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import Radio from './Radio';

const RadioOptions = ({ onChange, valueName }) => {
  const radioClick = (e) => {
    onChange(e)
    setSelected(e.target.id.split('-')[0])
  }
  const [selected, setSelected] = useState("other");
  return (
    <ul className="button-options">
      {["male", "female", "other"].map(id => {
        return (
          <li key={`${id}-${valueName}`}>
            <Radio id={`${id}-${valueName}`} selected={selected} value={id} name={valueName} radioClick={radioClick} />
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