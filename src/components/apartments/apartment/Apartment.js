import React, { useState } from 'react';
import PropTypes from "prop-types";
import RoommateIcons from '../RoommateIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import PhotoCarousel from '../PhotoCarousel';
import Button from '../../common/button/Button';
import ApplyModal from '../ApplyModal';
import { Link } from 'react-router-dom';

const Apartment = ({ apartment, building, roommateGroup, prospects }) => {
  const toggleForm = () => setShowModal(!showModal)

  const totalResidents = roommateGroup?.fields?.roommateTotal || 1
  const images = apartment.fields.Images || []
  const shared = roommateGroup?.id ? "SHARED" : "WHOLE APT."
  const rent = Math.round(apartment.fields.rent / totalResidents)
  const prosepctIcons = roommateGroup?.id ?
    [...new Array(totalResidents - 1)].map((p, i) => <RoommateIcons key={i} prospect={{ sex: "male" }} />) :
    <FontAwesomeIcon icon={faBan} />
  const genderPrefs = () => {
    if (roommateGroup?.id) {
      const preference = roommateGroup.fields.genderPreference.charAt(0).toUpperCase()
      return preference === "O" ? "ANY" : preference
    }
    return "N/A"
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? <ApplyModal apartment={apartment} roommateGroup={roommateGroup} prospects={prospects} toggleForm={toggleForm} /> : ""}
      <div className="card">
        <PhotoCarousel images={images} />
        <div style={{ textAlign: "center", fontSize: "12px", fontFamily: "arial" }}>(click photos to browse)</div>
        <div className="details">
          <div className="upper-half">
            <div className="upper-details">
              <div className="upper-details--shared">
                <div className="upper-details--share-status">{shared}</div>
                <div className="upper-details--bedrooms">
                  <span>{apartment.fields.bedrooms} Bed / {apartment.fields.bedrooms} Bath</span>
                </div>
              </div>
              <div className="upper-details--price">
                <span>${rent}</span><span className="lower-details--price-sm"></span>
              </div>
            </div>
          </div>
          <div className="lower-details">
            <div className="lower-details--building">
              {building.fields.name.toUpperCase()}, UNIT {apartment.fields.unit}
            </div>
            <table className="lower-details--details">
              <tbody>
                <tr>
                  <td>Lease Length:</td>
                  <td >
                    <div className="lower-details--month-cell">
                      <div className="lower-details--month-length">{apartment.fields.leaseInMonths} MO.</div>
                      <div className="lower-details--lower-month-graph"></div>
                      <div className="lower-details--month-graph" style={{ width: `${apartment.fields.leaseInMonths / 12 * 100}%` }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Roommates: </td>
                  <td >

                    {prosepctIcons}
                  </td>
                </tr>
                <tr>
                  <td>Gender Prefs:</td>
                  <td> <div className="lower-details--gender" style={{ width: 15 + (genderPrefs().length * 10) }}>{genderPrefs()}</div> </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="main-button--container">
            <Button style={{ fontSize: "24px", padding: "0.5% 4%" }}>
              <Link className="main-button--text" to="/apply/1">APPLY</Link></Button>
          </div>
        </div >
      </div>
    </>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired,
  roommateGroup: PropTypes.object,
  prospects: PropTypes.array
}

export default Apartment;