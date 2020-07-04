import React from 'react'
import PropTypes from "prop-types";

function Radio({ selected, id, radioClick, name, value }) {
  let btn_class = `${selected}-${name}` == id ? "selected" : ""
  return (
    <label htmlFor={id} className={`${btn_class}`}>
      <input style={{ display: "none" }} type="radio" id={id} value={value} name={name} onClick={radioClick} />
      {id.split('-')[0]}</label>
  )
}
Radio.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  radioClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.string
}

export default Radio