import React, { useState, useEffect } from 'react'
import './DetailScroll.css'
import RoommateIcons from '../../RoommateIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faUserAltSlash, faMars, faVenus, faGenderless, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import Graph from '../../../common/graph/Graph';
import ScrollIndicator from '../../../common/scrollIndicator/ScrollIndicator';
import CalendarDate from './calendardate/CalendarDate';

const DetailScroll = ({ apartment, roommateGroup, jump, setScrollVisible, scrollVisible, setCardMode }) => {
  const [scroll, setScroll] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setScroll("")
    }, 1000)
  }, [scroll])


  const totalResidents = roommateGroup?.fields?.roommateTotal || 1
  const shared = roommateGroup?.id ? "SHARED" : "WHOLE APT."
  const rent = Math.round(apartment.fields.rent / totalResidents)
  const prosepctIcons = roommateGroup?.id ?
    [...new Array(totalResidents - 1)].map((p, i) => <RoommateIcons key={i} prospect={{ sex: "male" }} />) :
    <div className="no-roommate">
      <FontAwesomeIcon icon={faUserAltSlash} />
      <button className="tiny-button" onClick={() => setCardMode("application")}>
        Add Roommates
      </button>
    </div>
  const genderPrefs = () => {
    const preference = (() => {
      switch (roommateGroup?.fields?.genderPreference) {
        case "male":
          return faMars
        case "female":
          return faVenus
        case "other":
          return faGenderless
        default:
          return faVenusMars
      }
    })()
    return <FontAwesomeIcon style={{ fontSize: "25px" }} icon={preference} />
  }
  const bedAndBath = () => {
    const iconStyle = { margin: "0% 2%" }
    const bedNumber = apartment.fields.bedrooms
    return (
      <div className={"bed-and-bath"}>
        {bedNumber}{<FontAwesomeIcon icon={faBath} style={iconStyle} />} / {bedNumber}{<FontAwesomeIcon icon={faBed} style={iconStyle} />}
      </div>
    )
  }

  const leaseStartRange = () => {
    let startDate = new Date(apartment.fields.available);
    startDate = startDate < new Date ? new Date : startDate
    let endDate = new Date(startDate)
    endDate = new Date(endDate.setDate(endDate.getDate() + 14));

    return (
      <div className="date-span">
        <CalendarDate fontSize={20} date={startDate} />
        <span>–</span>
        <CalendarDate fontSize={20} date={endDate} />
      </div>
    )
  }

  const onScroll = () => {
    setScrollVisible(false)
    setScroll("scrolling")
  }

  const data = {
    "inidividual rent": `$${rent}`,
    "lease start range": leaseStartRange(),
    "bed / bath": bedAndBath(),
    "lease duration": <Graph
      percent={(apartment.fields.leaseInMonths / 12) * 100}
      innerText={`${apartment.fields.leaseInMonths} Mo.`}
    />,
    "roommates": prosepctIcons,
    "gender preference": genderPrefs()
  }
  return (
    <div className={`data-container`}>
      <div className={`container-child new-scroll new-scroll-left ${scroll}`}
        onScroll={onScroll}>
        {Object.entries(data).map(([key, value], i) => (
          <div className="detail-box" key={i} >
            <div className="detail-value">
              {value}
            </div>
            <div className="detail-category">
              {key}
            </div>
          </div>
        ))}
      </div>
      <ScrollIndicator
        jump={jump}
        scrollVisible={scrollVisible}
        gradientColor={"#FFFFFF"}
        textColor={"var(--main-color)"}
        hiddenOnSmallScreen={"hidden-on-small-screen"}
      />
    </div>
  )
}

export default DetailScroll