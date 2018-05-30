import React from 'react';
import moment from '../../../../services/moment';
import classes from './Day.css';

import { List } from '@material-ui/core';
import Sprint from '../../Sprint/Sprint';
import Toolbar from '@material-ui/core/Toolbar';

export default props => {
    const sprintList = props.sprints.map((sprint, index) => (
        <Sprint key={index} sprint={sprint} label={sprint.task} />
    ));
    const duration = props.sprints.reduce((total, sprint) => moment.duration(total).add(sprint.duration), moment.duration(0));
    return (
        <div className={classes.Day}>
            <Toolbar className={classes.ToolBar}>
                <div className={classes.Date}>{props.date}</div>
                <div className={classes.Duration}>{duration.format('hh:mm:ss')}</div>         
            </Toolbar>
            <List>
                {sprintList}
            </List>
        </div>
    )
}