import React from 'react'
import './input.css'

export default function Input({ onChange, value, name, error }) {
  // if (error) { debugger }
  return (
    <div className="input-container">
      {error && <div className={"new-prospect--error"}>{error}</div>}
      <label htmlFor={name}>{name}</label>
      <input type="text" name={name} className="form-input" onChange={onChange} value={value} />
    </div>
  )
}