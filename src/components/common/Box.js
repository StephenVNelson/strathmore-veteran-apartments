import React from 'react'
import { PropTypes } from 'prop-types';

const Box = ({ title, children }) => {
  return (<div className="boxed">
    <div className="boxed-title">{title}</div>
    {children}
  </div>)
}

Box.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
}

// export default Box;