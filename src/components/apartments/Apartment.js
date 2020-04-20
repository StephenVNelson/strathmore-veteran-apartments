import React from 'react';
import PropTypes from "prop-types";
import RoommateIcons from './RoommateIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const Apartment = ({ apartment }) => {
  const a = apartment.fields
  const building = a.building.fields;
  const roommateGroup = a.roommateGroup.fields
  const shared = a.roommateGroup.id ? "SHARED" : "WHOLE APT."
  const rent = Math.round(a.rent / ((roommateGroup?.prospects.length + 1) || 1))
  const prosepctIcons = roommateGroup ?
    roommateGroup.prospects.map(p => <RoommateIcons key={p.id} prospect={p.fields} />) :
    <FontAwesomeIcon icon={faBan} />
  const gengerPrefs = roommateGroup ? roommateGroup.prospects[0].fields.sex.charAt(0) : "N/A"
  return (
    <div className="card">
      <div className="card-photo">
        {/* <img className="card-photo--photo" src="https://via.placeholder.com/300" alt="" /> */}
      </div>

      <div className="details">
        <div className="upper-half">
          <div className="upper-details">
            <div className="upper-details--shared">
              <div className="upper-details--share-status">{shared}</div>
              <div className="upper-details--bedrooms">
                <span>{a.bedrooms} Bed / {a.bedrooms} Bath</span>
              </div>
            </div>
            <div className="upper-details--price">
              <span>${rent}</span><span className="lower-details--price-sm"></span>
            </div>
          </div>
        </div>
        <div className="lower-details">
          <div className="lower-details--building">
            {building.name.toUpperCase()}, UNIT {a.unit}
          </div>
          <table className="lower-details--details">
            <tbody>
              <tr>
                <td>Lease Length:</td>
                <td >
                  <div className="lower-details--month-cell">
                    <div className="lower-details--month-length">{a.leaseInMonths} MO.</div>
                    <div className="lower-details--lower-month-graph"></div>
                    <div className="lower-details--month-graph" style={{ width: `${a.leaseInMonths / 12 * 100}%` }}></div>
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
                <td> <div className="lower-details--gender" style={{ width: 15 + (gengerPrefs.length * 10) }}>{gengerPrefs}</div> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button">
          <button className="button--button">
            <span className="button--text">APPLY</span>
          </button>
        </div>
      </div >
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired
}

export default Apartment;