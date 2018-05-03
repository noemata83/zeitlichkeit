import React from 'react';
import moment from '../../../../services/moment';
import classes from './Day.css';

import Sprint from './Sprint';

export default props => {
    const sprintList = props.sprints.map((sprint, index) => (
        <Sprint key={index} sprint={sprint} />
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