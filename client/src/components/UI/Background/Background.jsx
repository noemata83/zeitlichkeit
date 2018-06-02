import React from 'react';
import PropTypes from 'prop-types';
import classes from './Background.css';

const Background = props => (
  <div className={classes.Background}>
    {props.children}
  </div>
);

Background.defaultProps = {
  children: null,
};

Background.propTypes = {
  children: PropTypes.any,
};

export default Background;
