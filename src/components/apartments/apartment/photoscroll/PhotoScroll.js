import React, { useState, useEffect } from 'react'
import './PhotoScroll.css'
import ScrollIndicator from '../../../common/scrollIndicator/ScrollIndicator'

const PhotoScroll = ({ images, jump, setJumping, scrollVisible, setScrollVisible }) => {
  const [scroll, setScroll] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setScroll("")
    }, 1000)
  }, [scroll])

  const onScroll = () => {
    setScroll("scrolling")
    setJumping(false)
    if (scrollVisible) setScrollVisible(false)
  }

  return (
    <>
      <div className={`photo-scroll new-scroll ${scroll}`} onScroll={onScroll}>
        {images.length > 0 && images.map((image, i) => (
          <div key={i} className="photo-scroll-image" style={{ backgroundImage: `url(${image.thumbnails.large.url})` }}></div>
        ))}
        {
          images.length === 0 &&
          <div className="photo-scroll-image stock-image">
            <div className="stock-image-overlay">
              PHOTOS COMING SOON
            </div>
          </div>
        }
      </div>
      <ScrollIndicator
        jump={jump}
        scrollVisible={scrollVisible}
        gradientColor={"var(--main-color)"}
        textColor={"white"}
      />
    </>
  )
}

export default PhotoScroll