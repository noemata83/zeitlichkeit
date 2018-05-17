import React from 'react';
import moment from '../../../../services/moment';
import classes from './Task.css';

import Sprint from '../../Sprint/Sprint';
import { TableBody, Toolbar, Table, TableHead, TableRow, TableCell } from 'material-ui';

export default props => {
    const sprintList = [...props.sprints].sort((a, b) => b.start_time - a.start_time).map((sprint, index) => (
        <Sprint key={index} sprint={sprint} label={sprint.start_time.toDateString()} />
    ));
    const duration = props.sprints.reduce((total, sprint) => moment.duration(total).add(sprint.duration), moment.duration(0));
    return (
        <div className={classes.Task}>
            <Toolbar className={classes.ToolBar}>
                <div className={classes.Name}>{props.task}</div>
                <div className={classes.Duration}>{duration.format('hh:mm:ss')}</div>         
            </Toolbar>
            <Table aria-labelledby="tableTitle">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Task
                        </TableCell>
                        <TableCell>
                            Start Time
                        </TableCell>
                        <TableCell>
                            End Time
                        </TableCell>
                        <TableCell>
                            Duration
                        </TableCell>
                        <TableCell>
                            Delete?
                        </TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                {sprintList}
            </TableBody>
            </Table>
        </div>
    )
}