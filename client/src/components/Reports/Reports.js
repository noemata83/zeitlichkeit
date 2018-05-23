import React, { Component } from 'react';
import { connect } from 'react-redux';

import BarChart from './WeekChart/BarChart';
import { Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
      }),
    title: {
        textAlign: "center"
    }
});

const addDays = (date, days) => {
    return new Date().setDate(date.getDate() + days);    
}

const filterByDay = (sprints, date) => {
    return sprints.filter(sprint => new Date(sprint.start_time).getDate() === date);
}

const getDurationInMilliseconds = sprints => {
    return sprints.reduce((duration, sprint) => duration + (new Date(sprint.end_time) - new Date(sprint.start_time)), 0);
}

const ConvertToHours = seconds => {
    return seconds / 3600000;
}

class Reports extends Component {

    generateWeek = (date) => {
        const week = [6, 5, 4, 3, 2, 1, 0];
        return week.map(day => new Date(addDays(date, -day)).toDateString());
    }

    generateWeekData = (week) => {
        return week.map(day => {
            return {
                day,
                duration: ConvertToHours(getDurationInMilliseconds(filterByDay(this.props.sprints, new Date(day).getDate())))
            }
        })
    }

    render() {
        const { classes } = this.props;
        const weekData = this.generateWeekData(this.generateWeek(new Date()));
        return (
            <div>
                <Paper className={classes.root}>
                    <Typography variant="title" classes={{title: classes.title}}>Hours Worked This Week</Typography>
                    <div style={{textAlign: "center"}}>
                        <BarChart data={weekData} yValue="duration" xValue="day" svgHeight={500} svgWidth={800} />
                    </div>
                </Paper>
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.workspace.sprints,
    }
}

Reports = withStyles(styles)(Reports);

export default connect(mapStateToProps)(Reports);