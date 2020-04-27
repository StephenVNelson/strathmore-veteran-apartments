import React from 'react'
import PropTypes from "prop-types";

const Radio = ({ selected, id, radioClick, name }) => {
  let btn_class = `${selected}-${name}` == id ? "selected" : ""
  return (
    <label htmlFor={id} className={`${btn_class}`}>
      <input style={{ display: "none" }} type="radio" id={id} name={name} value={id} onChange={radioClick} />
      {id.split('-')[0].toUpperCase()}</label>
  )
}
Radio.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  radioClick: PropTypes.func.isRequired
}

export default Radio