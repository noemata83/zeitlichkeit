import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  CardHeader,
  CardContent,
  List,
  Button,
  Icon,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  getUsers,
  getTodaysSprints,
  getCurrentUser,
  getProjects,
  getActiveTasks,
  getWorkspaceName,
  getTasks,
} from '../../store/reducers';
import {
  generateProjectStack,
  filterByUser,
} from '../../services/data';
import TaskList from '../ProjectManager/Project/TaskList/taskList';
import { DayView } from '../SprintWorkspace/DayView/DayView';
import classes from './dash.css';
import StackedBarChart from '../Reports/BarChart/StackedBarChart';


const dash = ({
  user,
  users,
  sprints,
  activeTasks,
  tasks,
  projects,
  workspace,
}) => {
  const data = [];
  data.push(generateProjectStack(projects, filterByUser(sprints, user.username), tasks));
  return (
  <Fragment>
    <h1 style={{padding: '1rem 1rem' }}>{workspace} At a Glance</h1>
    <div className={classes.dash}>
      <div className={classes.todos}>
        <Card className={classes.Card}>
          <CardHeader
            title="Active Tasks"
            classes={{ root: classes.cardHeader }}
            action={
              <Link to="/dashboard/project">
                <Button size="small" color="primary">
                  See More
                </Button>
              </Link>
            }
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
              <List>
                {tasks.length > 0 ? <TaskList tasks={activeTasks} /> :
                <ListItem>
                  <ListItemText primary="No active tasks to display!" />
                </ListItem>
              }
              </List>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.dayStats}>
        <Card className={classes.Card}>
          <CardHeader
            title="My Workday"
            classes={{ root: classes.cardHeader }}
            action={
              <Link to="/dashboard/reports">
                <Button size="small" color="primary">
                   See More
                </Button>
              </Link>
            }
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <div className={classes.chartContainer}>
              <StackedBarChart
                margins={{
                  top: 10,
                  right: 200,
                  bottom: 30,
                  left: 20,
                }}
                svgWidth={500}
                svgHeight={500}
                data={data}
                yValue="duration"
                xValue="date"
                compressed
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.team}>
        <Card className={classes.Card}>
          <CardHeader
            title="Team"
            classes={{ root: classes.cardHeader }}
            action={
              <Link to="/dashboard/team">
                <Button size="small" color="primary">
                  See More
                </Button>
              </Link>
            }
          />
          <CardContent
            classes={{ root: classes.cardContent }}
            style={{
              width: '100%',
              height: '100%',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className={classes.teamMenu}>
              {users.map(usr => (
                <div key={usr.username} className={classes.teamMember}>
                  <Icon
                    aria-haspopup="false"
                    color="primary"
                    classes={{ root: classes.UserIcon }}
                  >
                    <AccountCircle classes={{ root: classes.AccountCircle }} />
                  </Icon>
                  <Typography>
                    {usr.username}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={classes.sessionLog}>
        <Card className={classes.Card}>
          <CardHeader
            title="Today's Sessions"
            classes={{ root: classes.cardHeader }}
            action={
              <Link to="/dashboard/ledger">
                <Button size="small" color="primary">
                  See More
                </Button>
              </Link>
            }
          />
          <CardContent
            classes={{ root: classes.cardContent }}
          >
            <DayView sprints={sprints} loading={false} user={user.username} compressed />
          </CardContent>
        </Card>
      </div>
    </div>
  </Fragment>
);
};

const mapStateToProps = state => ({
  workspace: getWorkspaceName(state),
  user: getCurrentUser(state),
  users: getUsers(state),
  sprints: getTodaysSprints(state),
  tasks: getTasks(state),
  activeTasks: getActiveTasks(state),
  projects: getProjects(state),
});

dash.defaultProps = {
  user: {},
};

dash.propTypes = {
  workspace: PropTypes.string.isRequired,
  user: PropTypes.object,
  users: PropTypes.array.isRequired,
  sprints: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(dash);
