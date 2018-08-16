import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  Welcome: {
    padding: '2rem 2rem 0 2rem',
  },
  Copy: {
    fontSize: '2rem',
    lineHeight: '1.7',
  },
});

const welcome = (props) => {
  const { classes } = props;
  return (
    <div className={classes.Welcome}>
      <h1>Welcome to Temporalite!</h1>
      <p className={classes.Copy}>
        To get started, simply time, log, or pace your work using the time entry
        widgets to the left, or create a new Project with the Project Manager.
      </p>
    </div>
  );
};

welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(welcome);
