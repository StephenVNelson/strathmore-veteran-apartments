import React from 'react'
import PropTypes from 'prop-types';
import './FormContainer.css'

export const FormContainer = ({ children, unit, step }) => {
  const instructions = () => {
    switch (step) {
      case 1:
        return "fill in your info"
      case 2:
        return "Roommate setup"
      default:
        "fill in your info"
    }
  }
  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <div className="form-header__title">SIGNUP FORM | UNIT {unit}</div>
          <span>step {step}:</span> <span style={{ fontWeight: "100" }}>{instructions()}</span>
        </div>
        <div className="form-contents">
          {children}
        </div>
      </div>
    </>
  )
}

FormContainer.propTypes = {
  children: PropTypes.element
}


export default FormContainer