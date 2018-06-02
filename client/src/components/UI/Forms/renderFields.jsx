import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';

export const renderTimeField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    type="time"
    InputLabelProps={{ shrink: true }}
    {...input}
    {...custom}
  />
);

renderTimeField.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: null,
  },
};
renderTimeField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export const renderDateField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    type="date"
    fullWidth
    InputLabelProps={{ shrink: true }}
    {...input}
    {...custom}
  />
);

renderDateField.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: null,
  },
};

renderDateField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export const renderSelectField = ({
  input,
  inputProps,
  label,
  children,
  ...custom
}) =>
  (
    <Select {...input} inputProps={{ ...inputProps }} {...custom}>
      {children}
    </Select>
  );

renderSelectField.defaultProps = {
  input: {},
  inputProps: {},
  meta: {
    touched: false,
    error: null,
  },
  children: null,
};

renderSelectField.propTypes = {
  input: PropTypes.object,
  inputProps: PropTypes.object,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.any,
};

export const renderTextField = ({ inputProps, label, ...custom }) => (
  <TextField
    label={label}
    type="text"
    inputProps={{ ...inputProps }}
    InputLabelProps={{ shrink: true }}
    {...custom}
  />
);

renderTextField.defaultProps = {
  inputProps: {},
};

renderTextField.propTypes = {
  inputProps: PropTypes.object,
  label: PropTypes.string.isRequired,
};

export const renderInput = ({ inputProps, placeholder, ...custom }) => (
  <Input
    placeholder={placeholder}
    inputProps={{ ...inputProps }}
    fullWidth
    {...custom}
  />
);

renderInput.defaultProps = {
  inputProps: {},
};

renderInput.propTypes = {
  inputProps: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
};
