import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { getUsers, getSprints, getTasks } from '../../store/reducers';
import { getProjects } from '../../store/reducers/workspace';
import classes from './dash.css';
import { CardHeader } from '@material-ui/core';

class Dash extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,

  }

  render() {
    return (
      <div className={classes.dash}>
        <div className={classes.todos}>
          <Card className={classes.Card}>
            <CardHeader title="Active Tasks" />
          </Card>
        </div>
        <div className={classes.dayStats}>
          <Card className={classes.Card} >
            <CardHeader title="My Workday" />
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
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: getUsers(state),
  sprints: getSprints(state),
  tasks: getTasks(state),
  projects: getProjects(state),
});

export default connect(mapStateToProps)(Dash);
