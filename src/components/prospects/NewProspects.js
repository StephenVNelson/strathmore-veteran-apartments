import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Radio from '../common/Radio'
import Box from '../common/Box';
import Button from '../common/Button';




const NewProspects = () => {
  const radioClick = (e) => {
    console.log("selected")
    setSelected(e.target.id)
  }
  const [selected, setSelected] = useState("other");
  return (
    <div className="new-prospect--form">
      <div className="new-prospect--inputs">
        <input type="text" name="name" placeholder="full name" className="new-prospect--input" />
        <input type="text" name="phone" placeholder="phone" className="new-prospect--input" />
        <input type="text" name="email" placeholder="email" className="new-prospect--input" />
      </div>

      <ul className="new-prospect--gender">
        {["male", "female", "other"].map(id => {
          return (
            <li key={id} className="new-prospect--gender">
              <Radio id={id} selected={selected} radioClick={radioClick} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NewProspects