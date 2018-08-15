import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Day from './Day/Day';
import { getSprints, getCurrentUsername } from '../../../store/reducers';

const filterByUser = (sprints, user) => R.filter(sprint => sprint.owner === user, sprints);

const retrieveDates = sprints =>
  R.map(
    sprint => ({
      ...sprint,
      start_time: new Date(sprint.start_time),
      end_time: new Date(sprint.end_time),
    }),
    sprints,
  );
const groupByDates = sprints =>
  sprints.reduce((sprintsByDate, sprint) => {
    const sprintList = {
      ...sprintsByDate,
    };
    if (sprintsByDate[sprint.start_time.toDateString()]) {
      sprintList[sprint.start_time.toDateString()] = sprintsByDate[
        sprint.start_time.toDateString()
      ].concat(sprint);
    } else {
      sprintList[sprint.start_time.toDateString()] = [].concat(sprint);
    }
    return sprintList;
  }, {});

export class DayView extends Component {
  state = {
    sprints: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const processSprints = R.pipe(retrieveDates, groupByDates);
    if (!nextProps.loading) {
      const sprints = processSprints(filterByUser(nextProps.sprints, nextProps.user)
        .map(sprint => ({
          ...sprint,
          duration: new Date(new Date(sprint.end_time) - new Date(sprint.start_time))
            .toISOString().substr(11, 8),
        })));
      return {
        ...prevState,
        sprints,
      };
    }
    return { ...prevState };
  }

  renderDayView = (sprints) => {
    const sortedDates = Object.keys(sprints).sort((a, b) => new Date(b) - new Date(a));
    return sortedDates.map(date => (
      <Day key={date.toString()} date={date} compressed={this.props.compressed} sprints={sprints[date]} />
    ));
  };

  render() {
    return (
      <div style={{overflowY: 'auto', width: '100%', maxHeight: '100%' }}>
        {this.renderDayView(this.state.sprints)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprints: getSprints(state),
  loading: state.workspace.sprint_loading,
  user: getCurrentUsername(state),
});

DayView.defaultProps = {
  loading: true,
  compressed: false,
};

DayView.propTypes = {
  sprints: PropTypes.array.isRequired, // eslint-disable-line
  loading: PropTypes.bool,
  compressed: PropTypes.bool,
};

export default connect(mapStateToProps)(DayView);
