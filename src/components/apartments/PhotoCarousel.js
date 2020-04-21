import React, { useState } from 'react'
import PropTypes from "prop-types";

const PhotoCarousel = ({ images }) => {
  const gallery = [...images.map(i => i.url),
    "https://cdngeneral.rentcafe.com/dmslivecafe/3/20467/CA_LosAngeles_StrathmoreArms_p0000625_2_02_1_PhotoGallery.jpg?&quality=85&",
    "https://cdngeneral.rentcafe.com/dmslivecafe/3/20467/CA_LosAngeles_StrathmoreArms_p0000625_5_05_1_PhotoGallery.jpg?&quality=85&"
  ]
  const changePhoto = (n) => n < (gallery.length - 1) ? n + 1 : 0
  const [count, setCount] = useState(0);
  return (
    <div className="card-photo" onClick={() => setCount(changePhoto(count))} style={{ backgroundImage: `url(${gallery[count]})` }}>
    </div>
  )
}
PhotoCarousel.propTypes = {
  images: PropTypes.array.isRequired
}


export default PhotoCarousel