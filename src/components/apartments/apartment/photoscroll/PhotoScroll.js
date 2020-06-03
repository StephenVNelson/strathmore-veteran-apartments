import React from 'react'
import './PhotoScroll.css'

const PhotoScroll = ({ images }) => {
  return (
    <div className="photo-scroll-container">
      {images.map((image, i) => (
        <div key={i} className="photo-scroll-image" style={{ backgroundImage: `url(${image.thumbnails.large.url})` }}></div>
      ))}
    </div>
  )
}

export default PhotoScroll