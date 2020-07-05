import React from 'react'
import './Submit.css'
import Button from '../../../../../common/button/Button';
import NextOrBack from '../../../../../common/nextorback/NextOrBack';

const Submit = ({ setFormSection, unit, handleForm }) => {
  return (
    <div className={"submit"}>
      <div>
        Click below to submit your name for apartment {unit}. If you have any questions you may call or text Stephen the property manager at 310-694-4660. Make sure to check all of the details before you submit.
    </div>
      <div className="main-button--container">
        <button className="main-button" onClick={handleForm}>
          <span className="main-button--text">SUBMIT</span>
        </button>
      </div>
      <div className="roommate-setup_next-buttons">
        <NextOrBack rightOrLeft={"left"} onClick={() => setFormSection(1)} />
      </div>
    </div>
  )
}

export default Submit
