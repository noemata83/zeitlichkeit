// A stateless component for displaying the redux-form-powered login form.
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core';
import FormField from './FormField';
import styles from './formStyles';

const LoginForm = (props) => {
  const { handleLogin, classes, errors } = props;
  return (
    <form onSubmit={props.handleSubmit(handleLogin)} className={classes.Form}>
      <div className={classes.Fields}>
        <Field
          name="username"
          component={FormField}
          type="text"
          placeholder="Username"
        />
        <Field
          name="password"
          component={FormField}
          type="password"
          placeholder="Password"
        />
      </div>
      <div className={classes.Error}>{errors}</div>
      <div className={classes.Controls}>
        <button className={classes.Link} type="submit">
          Login
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(withStyles(styles)(LoginForm));
