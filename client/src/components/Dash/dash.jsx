import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import {
  CardHeader,
  CardContent,
  List,
  CardActions,
  Button,
} from '@material-ui/core';
import {
  getUsers,
  getSprints,
  getActiveTasks,
  getTodaysSprints,
  getCurrentUser,
  getTasks,
  getProjects,
} from '../../store/reducers';
import TaskList from '../ProjectManager/Project/TaskList/taskList';
import classes from './dash.css';
import StackedBarChart from '../Reports/BarChart/StackedBarChart';
import { filterByUser } from '../../services/data';


const getDurationInMilliseconds = sprint =>
  new Date(sprint.end_time) - new Date(sprint.start_time);

const getTotalDurationInMilliseconds = sprints =>
  sprints.reduce(
    (duration, sprint) => duration + getDurationInMilliseconds(sprint),
    0,
  );

const ConvertToHours = seconds => seconds / 3600000;

const filterByProject = (project, sprints, tasks) =>
  sprints.filter((sprint) => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    return thetask.project === project;
  });

const generateBreakdown = (projects, sprints, tasks) => {
  const group = projects
    .reduce((grouped, project) => {
      grouped[project.name] = ConvertToHours(getTotalDurationInMilliseconds(filterByProject(project.name, sprints, tasks)));
      if (!grouped[project.name]) delete grouped[project.name];
      return grouped;
    }, {});
  group.date = new Date();
  return group;
};


const dash = ({ user, users, sprints, tasks, projects }) => {
  const data = [];
  data.push(generateBreakdown(projects, filterByUser(sprints, user.username),tasks));
  return (
    <div className={classes.dash}>
      <div className={classes.todos}>
        <Card className={classes.Card}>
          <CardHeader
            title="Active Tasks"
            classes={{ root: classes.cardHeader }}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <div style={{ overflowY: 'scroll', maxHeight: '32rem' }}>
              <List>
                <TaskList tasks={tasks} />
              </List>
            </div>
          </CardContent>
          <CardActions>
            <Link to="/dashboard/project">
              <Button size="small" color="primary">
                See More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
      <div className={classes.dayStats}>
        <Card className={classes.Card}>
          <CardHeader
            title="My Workday"
            classes={{ root: classes.cardHeader }}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <StackedBarChart
              svgWidth={250}
              svgHeight={250}
              data={data}
              yValue="duration"
              xValue="date"
            />
          </CardContent>
        </Card>
      </div>
      <div className={classes.team}>
        <Card className={classes.Card}>
          <CardHeader title="Team" />
        </Card>
      </div>

      <div className={classes.sessionLog}>
        <Card className={classes.Card}>
          <CardHeader title="Recent Work Sessions" />
          <CardContent />
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  users: getUsers(state),
  sprints: getTodaysSprints(state),
  tasks: getTasks(state),
  projects: getProjects(state),
});

dash.defaultProps = {
  user: {},
};

dash.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array.isRequired,
  sprints: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(dash);
