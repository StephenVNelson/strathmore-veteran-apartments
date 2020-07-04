import React from 'react'
import './Submit.css'
import Button from '../../../../../common/button/Button';
import NextOrBack from '../../../../../common/nextorback/NextOrBack';

const Submit = ({ setFormSection }) => {
  return (
    <div className={"submit"}>
      <div>
        Click below to submit your name for signing up for apartment _____. If you have any questions you may call or text Stephen the property manager at 310-694-4660. Make sure to check all of the details ___to the right/below____ before you submit.
    </div>
      <div className="main-button--container">
        <Button style={{ fontSize: "20px", padding: "0.5% 4%", borderRadius: "25px" }}>SUBMIT</Button>
      </div>
      <div className="roommate-setup_next-buttons">
        <NextOrBack rightOrLeft={"left"} onClick={() => setFormSection(1)} />
      </div>
    </div>
  )
}

export default Submit
