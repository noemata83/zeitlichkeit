import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
    taskView: false,
  };

  modeChangeHandler = (event) => {
    this.setState({
      taskView: event.target.checked,
    });
  };

  render() {
    const { classes } = this.props;
    const label = this.state.taskView ? 'Task View' : 'Day View';
    const view =
      this.state.taskView ? (
        <TaskView changeMode={this.modeChangeHandler} />
      ) : (
        <DayView changeMode={this.modeChangeHandler} />
      );
    return this.state.loading ? (
      <CircularProgress color="secondary" className={classes.progress} />
    ) : (
      <div style={{ padding: '2rem 2rem 0 2rem' }}>
        <h1>{label}</h1>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.taskView}
              onChange={this.modeChangeHandler}
              value="taskView"
            />
          }
          label="Breakdown by Task"
        />
        {view}
      </div>
    );
  }
}

SprintWorkspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprintWorkspace);
