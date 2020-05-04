import React from 'react'
import './input.css'

export default function Input({ placeholder, onChange, value, name, error }) {
  // if (error) { debugger }
  return (
    <>
      {error && <div className={"new-prospect--error"}>{error}</div>}
      <input type="text" name={name} placeholder={placeholder} className="new-prospect--input" onChange={onChange} value={value} />
    </>
  )
}