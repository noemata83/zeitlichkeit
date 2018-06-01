import React from 'react';
import moment from '../../../../services/moment';
import classes from './Task.css';

import Sprint from '../../Sprint/Sprint';
import { Toolbar, List, Chip } from '@material-ui/core';
import CategoryChip from '../../../UI/CategoryChip/CategoryChip';

export default props => {
    const sprintList = [...props.sprints].sort((a, b) => b.start_time - a.start_time).map((sprint, index) => (
        <Sprint key={index} sprint={sprint} label={sprint.start_time.toDateString()} />
    ));
    const categoryList = props.task.categories.map(category => <CategoryChip key={`${props.task}-${category}`} cat={category} />);
    const duration = props.sprints.reduce((total, sprint) => moment.duration(total).add(sprint.duration), moment.duration(0));
    return (
        <div className={classes.Task}>
            <Toolbar className={classes.ToolBar}>
                <div className={classes.Name}>
                    {props.task.name}
                </div>
                <div className={classes.CategoryList}>
                    {categoryList}
                </div>
                <div className={classes.Duration}>{duration.format('hh:mm:ss')}</div>         
            </Toolbar>
            <List>
                {sprintList}
            </List>
        </div>
    )
}