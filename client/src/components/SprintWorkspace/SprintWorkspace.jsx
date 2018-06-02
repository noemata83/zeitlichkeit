import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import DayView from './DayView/DayView';
import TaskView from './TaskView/TaskView';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class SprintWorkspace extends Component {
  state = {
    mode: 'DAY_VIEW',
  };

  modeChangeHandler = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    const { classes } = this.props;
    const view =
      this.state.mode === 'DAY_VIEW' ? (
        <DayView changeMode={this.modeChangeHandler} />
      ) : (
        <TaskView changeMode={this.modeChangeHandler} />
      );
    return this.state.loading ? (
      <CircularProgress color="secondary" className={classes.progress} />
    ) : (
      view
    );
  }
}

SprintWorkspace.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SprintWorkspace);
