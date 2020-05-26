import React from 'react'
import SummaryBox from '../../../apartments/SummaryBox';

const Summary = (summaryData) => {
  return (
    <div className="summary">
      <div className="summary-title">Summary</div>
      <div className="summary-content">
        {/* {
          Object.entries(summaryData).map(([key, value]) => {
            return (
              <SummaryBox key={key} title={key} value={value} />

            )
          })
        } */}
      </div>
    </div>
  )
}

export default Summary