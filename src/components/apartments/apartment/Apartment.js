import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import './Apartment.css'
import Application from './application/Application'
import { newSession } from '../../../../tools/mockData'
import { createSession, updateSession } from '../../../redux/actions/sessionActions';
import { saveProspect } from '../../../redux/actions/prospectActions';
import { saveRoommateGroup } from '../../../redux/actions/roommateGroupActions';
import { saveApartment } from '../../../redux/actions/apartmentActions';
import PhotoScroll from './photoscroll/PhotoScroll'
import DetailScroll from './detailscroll/DetailScroll'
import CardMode from './cardmode/CardMode'
import * as applicationHelpers from './application/ApplicationHelpers'


const Apartment = ({
  apartment,
  roommateGroup,
  jump,
  setJumping,
  session,
  prospects,
  createSession,
  updateSession
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

  const updateRoommateGender = (e) => {
    const roommateGroup = {
      ...session.roommateGroup,
      fields: { ...session.roommateGroup.fields, genderPreference: e.target.value }
    }
    updateSession({ ...session, roommateGroup })
  }



  const images = apartment.fields.Images || []
  const [photoScrollVisible, setPhotoScrollVisible] = useState(images.length > 1 ? true : false)
  const [detailScrollVisible, setDetailScrollVisible] = useState(true)
  const [cardMode, setCardMode] = useState("photo")

  // decides which component will show on the left hand side of each apartment card
  const modeComponent = () => {
    switch (cardMode) {
      case "application":
        return (
          <Application
            apartment={apartment}
            session={session}
            updateSession={updateSession}
            roommates={roommates}
            prospect={prospect}
            prospects={prospects}
            saveProspect={saveProspect}
            saveRoommateGroup={saveRoommateGroup}
            saveApartment={saveApartment}
          />
        )
      default:
        return (<PhotoScroll
          images={images}
          jump={jump}
          setJumping={setJumping}
          scrollVisible={photoScrollVisible}
          setScrollVisible={setPhotoScrollVisible}
        />)
    }
  }
  return (
    <div className="apartment">
      <CardMode setCardMode={setCardMode} cardMode={cardMode} />

      <div className="card">
        <div className="main-card-display">
          {modeComponent()}
        </div>
        <DetailScroll
          apartment={apartment}
          roommateGroup={session.roommateGroup}
          jump={jump}
          setJumping={setJumping}
          scrollVisible={detailScrollVisible}
          setScrollVisible={setDetailScrollVisible}
        />
      </div>
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired,
  roommateGroup: PropTypes.object,
  prospects: PropTypes.array,
  session: PropTypes.object.isRequired,
  jump: PropTypes.bool.isRequired,
  setJumping: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createSession,
  updateSession,
  saveProspect,
  saveRoommateGroup,
  saveApartment
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