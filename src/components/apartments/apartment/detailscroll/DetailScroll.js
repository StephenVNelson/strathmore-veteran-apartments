import React, { useState, useEffect } from 'react'
import './DetailScroll.css'
import RoommateIcons from '../../RoommateIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faUserAltSlash, faMars, faVenus, faRestroom, faGenderless, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import Graph from '../../../common/Graph';
import ScrollIndicator from '../../../common/scrollIndicator/ScrollIndicator';

const DetailScroll = ({ apartment, roommateGroup, jump, setScrollVisible, scrollVisible }) => {
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
      <FontAwesomeIcon icon={faUserAltSlash} style={{ fontSize: "25px" }} />
      <button className="tiny-button">
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
      <div style={{ fontSize: "20px", height: "35px" }}>
        {bedNumber}{<FontAwesomeIcon icon={faBath} style={iconStyle} />} / {bedNumber}{<FontAwesomeIcon icon={faBed} style={iconStyle} />}
      </div>
    )
  }
  const onScroll = () => {
    setScrollVisible(false)
    setScroll("scrolling")
  }

  const data = {
    "inidividual rent": `$${rent}`,
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
        gradientColor={"white"}
        textColor={"var(--main-color)"}

      />
    </div>
  )
}

export default DetailScroll