import React from 'react'
import {PropTypes} from 'prop-types'
import getAreaStyle from './getAreaStyle'
import getSVGSize from './getSVGSize'

const propTypes = {
  children:  PropTypes.element.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  width: PropTypes.number.isRequired
};

const SVG = ({
  children,
  height,
  margin,
  /*renderContentContainerBackground,*/
  width,
  ...rest
}) => (
  <svg
    {...rest}
    {...getSVGSize({
      height,
      margin,
      width,
    })}
  >
    <g
      className="contentArea"
      style={getAreaStyle({ margin })}
    >
      <rect
        className="contentAreaBackground"
        height={height}
        width={width}
        x={0}
        y={0}
      />
      {children}
    </g>
  </svg>
);

SVG.propTypes = propTypes

export default SVG
