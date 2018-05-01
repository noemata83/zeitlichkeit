import React from 'react';
import parse from 'date-fns/parse';
import * as moment from 'moment'; 
import MomentDurationFormatSetup from 'moment-duration-format';
import classes from './Day.css';

import Sprint from './Sprint';

MomentDurationFormatSetup(moment);

export default props => {
    const sprintList = props.sprints.map((sprint, index) => (
        <div key={index}>
            <Sprint sprint={sprint} />
        </div>
    ));
    const duration = props.sprints.reduce((total, sprint) => moment.duration(total).add(sprint.duration), moment.duration(0));
    return (
        <div className={classes.Day}>
            <div className={classes.Date}>{props.date}</div>
            <div className={classes.Duration}>{duration.format('hh:mm:ss')}</div>
            {sprintList}
        </div>
    )
    
}