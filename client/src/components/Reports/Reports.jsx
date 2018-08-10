import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography, withStyles, FormControl, NativeSelect } from '@material-ui/core';

import BarChart from './BarChart/BarChart';
import PieChart from './PieChart/PieChart';
import moment from '../../services/moment';
import { getSprints, getProjects, getTasks, getCategories } from '../../store/reducers';

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

const compareDates = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getYear() === date2.getYear();

const filterByDay = (sprints, date) =>
  sprints.filter(sprint => compareDates(new Date(sprint.start_time), date));


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

const filterByCategory = (cat, sprints, tasks) => {
  const filteredsprints = sprints.filter((sprint) => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    return thetask.categories.includes(cat);
  });
  return filteredsprints;
};

const getTotalDuration = sprints =>
  sprints.reduce(
    (total, sprint) => moment.duration(total).add(getDurationInMilliseconds(sprint)),
    moment.duration(0),
  );

class Reports extends Component {
  state = {
    breakdown: 'PROJECT',
  }

  switchBreakdown = (event) => {
    this.setState({
      breakdown: event.target.value,
    });
  }

  generateWeek = (date) => {
    const week = [6, 5, 4, 3, 2, 1, 0];
    return week.map(day => new Date(addDays(date, -day)).toDateString());
  };

  generateWeekData = week => week.map(day => ({
    day,
    duration: ConvertToHours(getTotalDurationInMilliseconds(filterByDay(
      this.props.sprints,
      new Date(day),
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

  generateCategoryData = () =>
    this.props.categories.map(cat => ({
      name: cat.name,
      duration: ConvertToHours(getTotalDurationInMilliseconds(filterByCategory(
        cat.name,
        this.props.sprints,
        this.props.tasks,
      ))),
      color: cat.color,
    })).filter(cat => cat.duration !== 0);

  renderBreakdown = () => {
    switch (this.state.breakdown) {
      case 'PROJECT': {
        return (<PieChart
          svgHeight={700}
          svgWidth={600}
          valueName="duration"
          data={this.generateProjectData()}
          totalDuration={getTotalDuration(this.props.sprints).format('hh:mm:ss')}
        />);
      }
      case 'CATEGORY': {
        return (
          <BarChart
            svgHeight={500}
            svgWidth={800}
            yValue="duration"
            xValue="name"
            data={this.generateCategoryData()}
          />);
      }
      case 'CATEGORY_PCT': {
        return (
          <BarChart
            svgHeight={500}
            svgWidth={800}
            yValue="duration"
            xValue="name"
            data={this.generateCategoryData()}
            totalDuration={getTotalDuration(this.props.sprints).valueOf()}
          />
        );
      }
      default:
        return (<PieChart
          svgHeight={700}
          svgWidth={600}
          valueName="duration"
          data={this.generateProjectData()}
          totalDuration={getTotalDuration(this.props.sprints).format('hh:mm:ss')}
        />);
    }
  }
  render() {
    const { classes } = this.props;
    const weekData = this.generateWeekData(this.generateWeek(new Date()));
    // const projectData = this.generateProjectData();
    // const totalDuration = getTotalDuration(this.props.sprints).format('hh:mm:ss');
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
            Breakdown and Analysis
          </Typography>
          <FormControl>
            <NativeSelect
              value={this.state.breakdown}
              onChange={this.switchBreakdown}
              name="breakdown"
            >
              <option value="PROJECT">What percentage of time is spent on each project?</option>
              <option value="CATEGORY">How much work of each category has been done?</option>
              <option value="CATEGORY_PCT">What percentage of time is spent on work of each category?</option>
            </NativeSelect>
          </FormControl>
          {/* <Typography variant="title" classes={{ title: classes.title }}>
            Work Done By Project
          </Typography> */}
          <div style={{ textAlign: 'center' }}>
            {this.renderBreakdown()}
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprints: getSprints(state),
  projects: getProjects(state),
  tasks: getTasks(state),
  categories: getCategories(state),
});


// TODO: Fix the proptype definitions below! They are useless ATM.

Reports.propTypes = {
  sprints: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Reports));
