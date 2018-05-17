import React from 'react';
import moment from '../../../../services/moment';
import classes from './Day.css';

import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from '@material-ui/core/Table';
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