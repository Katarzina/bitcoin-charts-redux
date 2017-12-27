import getMargin from './getMargin'
import {PropTypes} from 'prop-types'

const propTypes = {
  height: PropTypes.number.isRequired,
  margin: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  width: PropTypes.number.isRequired
};

const getSVGSize = ({
  height,
  margin,
  width,
}) => {
  const marginObject = getMargin(margin);
  const heightWithMargin = height
    + marginObject.top
    + marginObject.bottom;
  const widthWithMargin = width
    + marginObject.left
    + marginObject.right;

  return {
    height: heightWithMargin,
    width: widthWithMargin,
  };
};

getSVGSize.propTypes = propTypes;

export default getSVGSize