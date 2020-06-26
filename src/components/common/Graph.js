import React from 'react'

const Graph = ({ percent, innerText }) => {
  return (
    <div style={{
      backgroundColor: "lightgrey",
      height: "15px",
      margin: "5% 0%",
      width: "100%",
    }}>
      <div style={{
        backgroundColor: "#333333",
        height: "15px",
        margin: "5% 0%",
        width: `${percent}%`,
      }}>
        <span
          style={{
            color: "white",
            fontSize: "15px",
            position: "relative",
            top: "-20px"
          }}>
          {innerText}
        </span>
      </div>
    </div>
  )
}

export default Graph
