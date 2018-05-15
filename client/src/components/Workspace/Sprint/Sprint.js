import React from 'react';

import classes from './Sprint.css';
import { TableRow, TableCell } from 'material-ui';

export default props => (
    <TableRow className={classes.Sprint}>
        <TableCell className={classes.name}>{props.label}</TableCell>
        <TableCell className={classes.start}>{props.sprint.start_time.toLocaleTimeString()}</TableCell>
        <TableCell className={classes.end}>{props.sprint.end_time.toLocaleTimeString()}</TableCell>
        <TableCell className={classes.duration}>{props.sprint.duration}</TableCell>
        <TableCell>&times;</TableCell>
    </TableRow>
);