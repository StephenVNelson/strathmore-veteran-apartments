import React from 'react'
import { PropTypes } from 'prop-types';

const SummaryBox = ({ title, value }) => {
  // console.log("title: ", title, ", value: ", value)
  return (
    <div className="summary-box">
      <div className="summary-box--title">
        {title.split(" ").map(w => <span key={w}>{w}</span>)}
      </div>
      <div className="summary-box--value">
        {value}
      </div>
    </div>
  )
}

SummaryBox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any
}

export default SummaryBox