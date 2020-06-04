import React from 'react';
import PropTypes from 'prop-types';

const SvgComponent = (props) =>(
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width={props.size} height={props.size} viewBox="0 0 612 792" {...props}>
  <path fill={props.color} d="M571.278,258.52l-41.598-41.598c-7.629-7.629-20.05-7.629-27.679,0L252.688,466.259L134.093,346.824
    c-7.72-7.652-20.095-7.652-27.77,0l-41.529,41.53c-7.675,7.652-7.675,20.095,0,27.724l131.899,132.877l0.454,0.612l28.701,28.746
    l6.698,6.699l0,0l6.153,6.13c7.629,7.63,20.05,7.63,27.724,0l304.854-304.898C578.907,278.615,578.907,266.126,571.278,258.52z"/>
  </svg>
)

SvgComponent.propTypes = {
  arrowColor: PropTypes.string,
  size: PropTypes.number
};

SvgComponent.defaultProps = {
  color: "#8582B3",
  size: 200
};

export default SvgComponent;