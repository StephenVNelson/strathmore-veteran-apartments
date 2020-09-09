import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import './Apartment.css'
import { newSession } from '../../../../tools/mockData'
import { createSession, updateSession } from '../../../redux/actions/sessionActions';
import { saveProspect } from '../../../redux/actions/prospectActions';
import { saveRoommateGroup } from '../../../redux/actions/roommateGroupActions';
import { saveApartment } from '../../../redux/actions/apartmentActions';
import { createAlert } from '../../../redux/actions/alertActions';
import * as applicationHelpers from './applicationHelpers'


const Apartment = ({
  apartment,
  roommateGroup,
  session,
  prospects,
  saveProspect,
  saveRoommateGroup,
  saveApartment,
  createSession,
  updateSession,
  createAlert
}) => {
  const { roommates, prospect } = session

  useEffect(() => {
    if (!session.id) {
      applicationHelpers.createSession(
        roommateGroup,
        apartment,
        createSession,
        session
      )
    }
  }, [])

  const images = apartment.fields.Images || []
  const mainPhoto = images[0] ? images[0].thumbnails.large.url : "https://cdngeneral.rentcafe.com/dmslivecafe/3/20467/strathmore_exterior(1).jpg?crop=(0,31,300,162.8604651162788)&cropxunits=300&cropyunits=225&quality=85&scale=both&"
  const [photoVisible, setPhotoVisible] = useState(images.length > 1 ? true : false)
  const [cardMode, setCardMode] = useState("photo")

  return (
    <div className="apartment">
      <div className="apartment-photo" style={{ backgroundImage: `url(${mainPhoto})` }}></div>
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired,
  roommateGroup: PropTypes.object,
  prospects: PropTypes.array,
  session: PropTypes.object.isRequired,
  updateSession: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createSession,
  updateSession,
  saveProspect,
  saveRoommateGroup,
  saveApartment,
  createAlert
}

function pluckFromState(collection, id) {
  return collection && collection.find(item => item.id === id)
}

function mapStateToProps(state, ownProps) {
  const { apartment, roommateGroup } = ownProps
  const prospects = state.prospects.records && roommateGroup.fields.prospects.map(
    p => pluckFromState(state.prospects.records, p)
  ) || []
  const session = pluckFromState(state.session, apartment.id) || newSession
  return {
    prospects,
    session
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartment);