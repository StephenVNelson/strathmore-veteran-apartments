import React from 'react'
import SummaryBox from '../../../../apartments/SummaryBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './summary.css'


const Summary = ({ summaryData, history }) => {
  return (
    <div className="summary">
      <div className="summary-header">
        <FontAwesomeIcon
          className="back-icon"
          icon={faArrowAltCircleLeft}
          onClick={() => history.push('/')}
        />
        <div className="summary-title">Summary</div>
        <div></div>
      </div>
      <div className="summary-content">
        {
          summaryData.map(([key, value]) => {
            return (
              <SummaryBox key={key} title={key} value={value} />

            )
          })
        }
      </div>
    </div>
  )
}

export default Summary