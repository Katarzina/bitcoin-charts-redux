import React from 'react';
import {PropTypes} from 'prop-types'

const propTypes = {
  error: PropTypes.string
};
const defaultProps = {
  error: ''
}

// get error from props
const Error = ({error}) => (
  <div className="error"> Failed to get data: {error}</div>
);

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export {Error}
