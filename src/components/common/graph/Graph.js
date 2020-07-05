import React from 'react'
import './Graph.css'
const Graph = ({ percent, innerText }) => {
  return (
    <div className="graph-container">
      <div className="graph-background" style={{ width: `${percent}%` }}>
        <span className="graph-text">
          {innerText}
        </span>
      </div>
    </div>
  )
}

export default Graph
