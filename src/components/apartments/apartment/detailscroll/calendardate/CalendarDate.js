import React from 'react'
import './CalendarDate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const CalendarDate = ({ fontSize, date }) => {
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase()
  const dateNumber = date.getDate()
  return (
    <div className="cal-date__align">
      <div className="cal-date__month" style={{ fontSize: `${fontSize * 0.5}px` }}>{month}</div>
      <div style={{ fontSize: `${fontSize}px` }} className="cal-date__flex">
        <FontAwesomeIcon icon={faCalendar} />
        <div className="cal-date__date">{dateNumber}</div>
      </div>
    </div>
  )
}

export default CalendarDate
