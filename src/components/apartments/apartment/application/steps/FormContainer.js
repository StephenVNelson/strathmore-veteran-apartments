import React from 'react'
import PropTypes from 'prop-types';
import './FormContainer.css'

export const FormContainer = ({ children, unit }) => {

  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <div className="form-header__title">SIGNUP FORM | UNIT {unit}</div>
          <span>step 1:</span> <span style={{ fontWeight: "100" }}>fill in your info</span>
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