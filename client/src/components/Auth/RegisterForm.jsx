// A stateless component for displaying the registration form.
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core';

import styles from './formStyles';
import FormField from './FormField';

const formFields = [
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'confirmpassword', type: 'password', label: 'Confirm Password' },
];

const RegistrationForm = (props) => {
  const { handleRegistration, classes } = props;
  const renderFields = formFields.map(({ name, type, label }) => (
    <Field
      key={name}
      name={name}
      component={FormField}
      type={type}
      placeholder={label}
    />
  ));
  return (
    <form
      onSubmit={props.handleSubmit(handleRegistration)}
      className={classes.Form}
    >
      <div className={classes.Fields}>{renderFields}</div>
      <div className={classes.Controls}>
        <button className={classes.Link} type="submit">
          Register
        </button>
        <button
          className={[classes.Link, classes.Back].join(' ')}
          onClick={() => props.switchMode('GREETING')}
        >
          Back
        </button>
      </div>
    </form>
  );
};

const asyncValidate = values =>
  new Promise((resolve, reject) => {
    axios.get(`/api/users/${values.username}/`).then((res) => {
      if (res.data.result) {
        return resolve();
      }
      return reject(new Error('Username is taken'));
    });
  });

function validate(values) {
  const errors = {};

  if (values.password !== values.confirmpassword) {
    errors.confirmpassword = 'Passwords must match.';
  }

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must enter a value.';
    }
  });

  return errors;
}

RegistrationForm.propTypes = {
  handleRegistration: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
  form: 'register',
})(withStyles(styles)(RegistrationForm));
