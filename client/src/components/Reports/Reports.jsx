import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography, withStyles, FormControl, NativeSelect } from '@material-ui/core';

import BarChart from './BarChart/BarChart';
import StackedBarChart from './BarChart/StackedBarChart';
import PieChart from './PieChart/PieChart';
import { getSprints, getProjects, getTasks, getCategories } from '../../store/reducers';
import { getTotalDuration, getTotalDurationByDay, getTotalDurationByProject, getTotalDurationByCategory, generateWeek, generateWeeklyProjectStack, generateWorkWeek } from '../../services/data';

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
    duration: getTotalDurationByDay(
      this.props.sprints,
      new Date(day),
    ),
  }));

  generateProjectData = () =>
    this.props.projects.map(project => ({
      name: project.name,
      duration: getTotalDurationByProject(
        project.name,
        this.props.sprints,
        this.props.tasks,
      ),
    })).filter(project => project.duration !== 0);

  generateCategoryData = () =>
    this.props.categories.map(cat => ({
      name: cat.name,
      duration: getTotalDurationByCategory(
        cat.name,
        this.props.sprints,
        this.props.tasks,
      ),
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
    const { classes, projects, tasks, sprints } = this.props;
    const week = generateWorkWeek(new Date());
    const weekData = this.generateWeekData(week);
    // const weekStack = generateWeeklyProjectStack(projects, sprints, tasks, week);
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
            {/* <StackedBarChart
              data={weekStack}
              svgHeight={500}
              svgWidth={800}
              yValue="duration"
              xValue="date"
              margins={{
                right: 150,
                top: 20,
                bottom: 20,
                left: 20,
              }}
            /> */}
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
