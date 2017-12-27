import getMargin from './getMargin'
import {PropTypes} from 'prop-types'

const propTypes = {
  margin: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ])
};

const getAreaStyle = ({margin}) => {
  const marginValue = getMargin(margin);
  return {
    transform: `translate(${marginValue.left}px, ${marginValue.top}px)`,
  };
};

getAreaStyle.propTypes = propTypes;

export default getAreaStyle
