import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography, withStyles } from '@material-ui/core';

import BarChart from './WeekChart/BarChart';
import PieChart from './PieChart/PieChart';
import moment from '../../services/moment';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }),
  title: {
    textAlign: 'center',
  },
});

const addDays = (date, days) => new Date().setDate(date.getDate() + days);

const filterByDay = (sprints, date) =>
  sprints.filter(sprint => new Date(sprint.start_time).getDate() === date);

const getDurationInMilliseconds = sprint =>
  (new Date(sprint.end_time) - new Date(sprint.start_time));

const getTotalDurationInMilliseconds = sprints =>
  sprints.reduce(
    (duration, sprint) =>
      duration + getDurationInMilliseconds(sprint),
    0,
  );


const ConvertToHours = seconds => seconds / 3600000;

const filterByProject = (project, sprints, tasks) => sprints.filter((sprint) => {
  const thetask = tasks.filter(task => task.name === sprint.task)[0];
  return thetask.project === project;
});

const getTotalDuration = sprints =>
  sprints.reduce(
    (total, sprint) => moment.duration(total).add(getDurationInMilliseconds(sprint)),
    moment.duration(0),
  );

class Reports extends Component {
  generateWeek = (date) => {
    const week = [6, 5, 4, 3, 2, 1, 0];
    return week.map(day => new Date(addDays(date, -day)).toDateString());
  };

  generateWeekData = week => week.map(day => ({
    day,
    duration: ConvertToHours(getTotalDurationInMilliseconds(filterByDay(
      this.props.sprints,
      new Date(day).getDate(),
    ))),
  }));

  generateProjectData = () =>
    this.props.projects.map(project => ({
      name: project.name,
      duration: ConvertToHours(getTotalDurationInMilliseconds(filterByProject(
        project.name,
        this.props.sprints,
        this.props.tasks,
      ))),
    })).filter(project => project.duration !== 0);

  render() {
    const { classes } = this.props;
    const weekData = this.generateWeekData(this.generateWeek(new Date()));
    const projectData = this.generateProjectData();
    const totalDuration = getTotalDuration(this.props.sprints).format('hh:mm:ss');
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="title" classes={{ title: classes.title }}>
            Hours Worked This Week
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <BarChart
              data={weekData}
              yValue="duration"
              xValue="day"
              svgHeight={500}
              svgWidth={800}
            />
          </div>
        </Paper>
        <Paper className={classes.root}>
          <Typography variant="title" classes={{ title: classes.title }}>
            Work Done By Project
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <PieChart
              svgHeight={700}
              svgWidth={600}
              valueName="duration"
              data={projectData}
              totalDuration={totalDuration}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprints: state.workspace.sprints,
  projects: state.workspace.project_set,
  tasks: state.workspace.task_set,
});


// TODO: Fix the proptype definitions below! They are useless ATM.

Reports.propTypes = {
  sprints: PropTypes.array.isRequired, // eslint-disable-line
  projects: PropTypes.array.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired, // eslint-disable-line
  tasks: PropTypes.array.isRequired, // eslint-disable-line
};

export default connect(mapStateToProps)(withStyles(styles)(Reports));
