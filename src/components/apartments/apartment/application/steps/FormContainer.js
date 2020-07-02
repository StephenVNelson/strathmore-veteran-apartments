import React from 'react'
import PropTypes from 'prop-types';

export const FormContainer = ({ children, unit }) => {

  return (
    <>
      <div className="prospect-info-container">
        <div className="prospect-info-header">
          <div className="prospect-info-header__title">SIGNUP FORM | UNIT {unit}</div>
          <span>step 1:</span> <span style={{ fontWeight: "100" }}>fill in your info</span>
        </div>
        <div className="prospect-info-contents">
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