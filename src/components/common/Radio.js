import React from 'react'
import PropTypes from "prop-types";

const Radio = ({ selected, id, radioClick }) => {
  let btn_class = selected === id ? "selected" : ""
  return (
    <label htmlFor={id} className={`new-prospect--radio ${btn_class}`}>
      <input type="radio" id={id} name="gender" value={id} className="new-prospect--radio" onChange={radioClick} />
      {id.toUpperCase()}</label>
  )
}
Radio.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  radioClick: PropTypes.func.isRequired
}

export default Radio