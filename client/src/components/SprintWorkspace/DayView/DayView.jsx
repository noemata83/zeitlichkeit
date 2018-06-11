import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Day from './Day/Day';

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

class DayView extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const processSprints = R.pipe(retrieveDates, groupByDates);
    if (!nextProps.loading) {
      const sprints = processSprints(nextProps.sprints.map(sprint => ({
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
  state = {
    sprints: [],
  };

  renderDayView = (sprints) => {
    const sortedDates = Object.keys(sprints).sort((a, b) => new Date(b) - new Date(a));
    return sortedDates.map(date => (
      <Day key={date.toString()} date={date} sprints={sprints[date]} />
    ));
  };

  render() {
    return (
      <div>
        {this.renderDayView(this.state.sprints)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprints: state.workspace.sprints,
  loading: state.workspace.sprint_loading,
});

DayView.defaultProps = {
  loading: true,
};

DayView.propTypes = {
  sprints: PropTypes.array.isRequired, // eslint-disable-line
  loading: PropTypes.bool, // eslint-disable-line
};

export default connect(mapStateToProps)(DayView);
