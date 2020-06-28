import React, { useState } from 'react';
import PropTypes from "prop-types";
import PhotoScroll from './photoscroll/PhotoScroll'
import DetailScroll from './detailscroll/DetailScroll'
import CardMode from './cardmode/CardMode'
import './Apartment.css'

const Apartment = ({ apartment, roommateGroup, jump }) => {
  const images = apartment.fields.Images || []
  const [photoScrollVisible, setPhotoScrollVisible] = useState(images.length > 1 ? true : false)
  const [detailScrollVisible, setDetailScrollVisible] = useState(true)
  return (
    <div className="apartment">
      <CardMode />

      <div className="card">
        <PhotoScroll
          images={images}
          jump={jump}
          scrollVisible={photoScrollVisible}
          setScrollVisible={setPhotoScrollVisible}
        />
        <DetailScroll
          apartment={apartment}
          roommateGroup={roommateGroup}
          jump={jump}
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
  prospects: PropTypes.array
}

export default Apartment;