/*  This component is used to render form fields within the auth-related components, allowing errors
    to be programmatically displayed. */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './formStyles';

const formField =
  ({
    input,
    type,
    placeholder,
    classes,
    meta: {
      error,
      touched,
    },
  }) => (
    <div className={classes.Field}>
      <input
        className={classes.input}
        {...input}
        type={type}
        placeholder={placeholder}
        size="17"
      />
      <div className={classes.Error}>{touched && error}</div>
    </div>
  );

formField.defaultProps = {
  input: {},
};

formField.propTypes = {
  input: PropTypes.object,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(formField);
